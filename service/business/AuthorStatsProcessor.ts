import Queue from 'better-queue';
import { PostHistoricalResponse, processHistoricalInfo } from '../historicalService';
import { getPostsWithInDays } from '../pttStockPostService';
import { isValidStockPost } from '../../utility/stockPostHelper';
import { toDateString, todayDate } from '../../utility/dateTime';
import { AuthorModel } from '../../model/Author';
import { AuthorStatsModel, IAuthorStats, IStatsPost } from '../../model/AuthorStats';
import { IPostInfo } from '../../model/PostInfo';

interface AuthorPosts {
  rates: number[];
  posts: IStatsPost[];
}

export class AuthorStatsProcessor {
  private data: PostHistoricalResponse[] = [];
  private queue: Queue<IPostInfo, PostHistoricalResponse>;
  private isProcessing: boolean = false;
  private postsInQueue: number = 0;
  private maxExecutionTime: number = 30 * 60 * 1000; // 30 mins in milliseconds
  private timer: NodeJS.Timeout | null = null;

  constructor() {
    this.queue = new Queue(
      async (job: IPostInfo, done: Function) => {
        try {
          const result = await processHistoricalInfo(job, todayDate(), false);
          done(null, result);
        } catch (error) {
          console.error(`Error processing job for ${job.title}:`, error);
          done(error);
        }
      },
      { afterProcessDelay: 1500 }
    );

    this.queue.on('task_finish', (taskId: number, result: PostHistoricalResponse) => {
      if (result?.historicalInfo?.length > 0) {
        console.log(`Task finished: ${result.stockNo}`);
        this.data.push(result);
      } else {
        console.warn(`No historical info for ${result.title} by ${result.author}`);
      }

      // Decrement the number of posts in queue
      this.postsInQueue--;

      // When all posts are processed, trigger the final save
      if (this.postsInQueue === 0) {
        this.finishProcessing();
      }
    });
  }

  private async finishProcessing() {
    try {
      console.log(`Processing ${this.data.length} items`);
      await this.processRankingAndSaveToDB(this.data);
    } catch (error) {
      console.error('Error in processing final save:', error);
    } finally {
      this.data = [];
      this.clearTimeout();
      this.isProcessing = false; // Allow new process to start
    }
  }

  private startTimer() {
    this.clearTimeout(); // Ensure no previous timers are running
    this.timer = setTimeout(() => {
      console.warn('Queue processing exceeded 30 minutes, resetting...');
      this.resetProcessing();
    }, this.maxExecutionTime);
  }

  private clearTimeout() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private resetProcessing() {
    console.log('Resetting processing due to timeout.');
    this.queue = new Queue(
      async (job: IPostInfo, done: Function) => {
        try {
          const result = await processHistoricalInfo(job, todayDate(), false);
          done(null, result);
        } catch (error) {
          console.error(`Error processing job for ${job.title}:`, error);
          done(error);
        }
      },
      { afterProcessDelay: 1500 }
    );
    this.data = [];
    this.isProcessing = false;
    this.postsInQueue = 0;
    this.clearTimeout();
  }

  private async processRankingAndSaveToDB(postData: PostHistoricalResponse[]) {
    try {
      const authorPostsMap = postData.reduce((map, item) => {
        const { processedData } = item;
        const author = item.author as string;
        if (!map.has(author)) map.set(author, { rates: [], posts: [] });
        const authorData = map.get(author)!;
        const highest = processedData.find((x) => x.type === 'highest');
        if (highest) {
          authorData.rates.push(highest.diffPercent);
          authorData.posts.push({
            title: item.title,
            href: item.href as string,
            date: toDateString(new Date(item.id * 1000)),
            id: item.id,
            highest,
          });
        }
        return map;
      }, new Map<string, AuthorPosts>());

      let authors = await AuthorModel.find().lean().exec();
      const newAuthors = Array.from(authorPostsMap.keys())
        .filter((author) => !authors.some((a) => a.name === author))
        .map((name) => ({ name }));

      if (newAuthors.length > 0) {
        const insertedAuthors = await AuthorModel.insertMany(newAuthors);
        authors = authors.concat(insertedAuthors);
        console.log(`Inserted ${insertedAuthors.length} new authors`);
      }

      const newAuthorStats = Array.from(authorPostsMap.entries())
        .filter(([_, data]) => data.posts.length >= 3)
        .map(([author, data]) => {
          const rates = data.rates;
          const stats = this.calculateStats(rates);
          const authorInfo = authors.find((x) => x.name === author);
          if (!authorInfo) {
            console.warn(`Author info not found for ${author}`);
            return null;
          }
          return {
            name: author,
            ...stats,
            posts: data.posts,
            author: authorInfo._id,
            combinedRank: 0,
          };
        })
        .filter((x): x is IAuthorStats => x !== null && x.score > 5 && x.median > 10 && x.mean > 10)
        .sort((a, b) => b.score - a.score)
        .map((stat, index) => ({ ...stat, combinedRank: index + 1 }));

      const bulkOps = newAuthorStats.map((stat) => ({
        updateOne: {
          filter: { name: stat.name },
          update: { $set: stat },
          upsert: true,
        },
      }));

      if (bulkOps.length > 0) {
        const result = await AuthorStatsModel.bulkWrite(bulkOps);
        console.log(`Updated ${result.modifiedCount}, inserted ${result.upsertedCount} records`);
      } else {
        console.log('No records to update or insert');
      }
    } catch (error) {
      console.error('Error in processRankingAndSaveToDB:', error);
      throw error;
    }
  }

  private calculateStats(rates: number[]) {
    const totalRate = rates.reduce((a, b) => a + b, 0);
    const mean = totalRate / rates.length;
    const sortedRates = [...rates].sort((a, b) => a - b);
    const mid = Math.floor(rates.length / 2);
    const median = rates.length % 2 !== 0 ? sortedRates[mid] : (sortedRates[mid - 1] + sortedRates[mid]) / 2;
    const stdDev = Math.sqrt(rates.reduce((sum, rate) => sum + Math.pow(rate - mean, 2), 0) / rates.length);
    //加權計分：平均值和中位數各佔35%，最高值20%，標準差10%
    const score = mean * 0.35 + median * 0.35 + Math.max(...rates) * 0.2 + (1 / (stdDev + 1)) * 0.1;
    return { mean, maxRate: Math.max(...rates), minRate: Math.min(...rates), median, stdDev, totalRate, score };
  }

  public async newProcessAndUpdateAuthorStats(withInDays: number = 20): Promise<string> {
    if (this.isProcessing) {
      return 'Processing already in progress';
    }

    this.isProcessing = true;
    this.startTimer(); // Start the timer for the max execution time

    try {
      const posts = await getPostsWithInDays(withInDays, '標的');
      const authorPostsMap = posts.filter(isValidStockPost).reduce((map, post) => {
        const author = post.author as string;
        if (!map.has(author)) map.set(author, []);
        map.get(author)!.push(post);
        return map;
      }, new Map<string, IPostInfo[]>());

      let queuedPosts = 0;
      for (const [_, posts] of authorPostsMap) {
        if (posts.length >= 3) {
          posts.forEach((post) => {
            this.queue.push(post);
            this.postsInQueue++;
          });
          queuedPosts += posts.length;
        }
      }

      const message = `Queued ${queuedPosts} posts from ${authorPostsMap.size} authors`;
      console.log(message);
      return message;
    } catch (error) {
      this.clearTimeout();
      this.isProcessing = false;
      throw error;
    }
  }
}

// 导出一个默认的实例
export const authorStatsProcessorInstance = new AuthorStatsProcessor();
