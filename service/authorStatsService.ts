import Queue from 'better-queue';
import { PostHistoricalResponse, processHistoricalInfo, processHistoricalInfoWithDelay } from './historicalService';
import { getPostsWithInDays } from './pttStockPostService';
import { isValidStockPost } from '../utility/stockPostHelper';
import { toDateString } from '../utility/dateTime';
import { AuthorModel, IAuthor } from '../model/Author';
import { AuthorStatsModel, IAuthorStats, IStatsPost } from '../model/AuthorStats';
import { FlattenMaps, Types } from 'mongoose';
import { IPostInfo } from '../model/PostInfo';

interface AuthorPosts {
  rates: number[];
  posts: IStatsPost[];
}

// export interface AuthorStats extends IAuthor {
//   mean: number; //平均報酬率
//   maxRate: number; //報酬率最高的一篇
//   minRate: number; //報酬率最低的一篇
//   totalRate: number; //所有貼文報酬率加總
//   median: number; //報酬率中位數
//   stdDev: number; // 標準差
//   posts: IStatsPost[]; //貼文
//   score: number; // 用來衡量作者績效的分數
//   combinedRank?: number;
// }

// export async function getDataAndProcessToResult() {
//   var posts = await getPostsWithInDays(120, '標的');
//   var filterPost = posts.filter((x) => isValidStockPost(x));
//   var data: PostHistoricalResponse[] = [];
//   for (const post of filterPost) {
//     const result = await processHistoricalInfoWithDelay(post);
//     data.push(result);
//   }
//   const authors = await AuthorModel.find().lean().exec();
//   processRankingAndWriteToFile(data, authors);
// }

// export function processRankingAndWriteToFile(jsonData: PostHistoricalResponse[], authors: IAuthor[]) {
//   try {
//     // 把每個貼文的最高點以作者為單位去 group 起來
//     const authorPostsMap: Map<string, AuthorPosts> = new Map();
//     jsonData.forEach((item) => {
//       const { processedData } = item;
//       const author = item.author as string;
//       if (!authorPostsMap.has(author)) {
//         authorPostsMap.set(author, { rates: [], posts: [] });
//       }

//       const highest = processedData.find((x) => x.type === 'highest');
//       if (highest) {
//         const authorData = authorPostsMap.get(author)!;
//         const formatDate = toDateString(new Date(item.id * 1000));
//         authorData.rates.push(highest.diffPercent);
//         authorData.posts.push({
//           title: item.title,
//           href: item.href as string,
//           date: formatDate,
//           id: item.id,
//           highest: highest,
//         });
//       }
//     });

//     const combinedRanked = Array.from(authorPostsMap.entries())
//       .filter(([author, data]) => data.posts.length >= 3)
//       .map(([author, data]) => {
//         const rates = data.rates;
//         const totalRate = rates.reduce((a, b) => a + b, 0);
//         const mean = totalRate / rates.length;
//         const maxRate = Math.max(...rates);
//         const minRate = Math.min(...rates);
//         const sortedRates = rates.slice().sort((a, b) => a - b);
//         const mid = Math.floor(sortedRates.length / 2);
//         const median = sortedRates.length % 2 !== 0 ? sortedRates[mid] : (sortedRates[mid - 1] + sortedRates[mid]) / 2;

//         // 计算标准差
//         const stdDev = Math.sqrt(rates.reduce((sum, rate) => sum + Math.pow(rate - mean, 2), 0) / rates.length);

//         const authorInfo = authors.find((x) => x.name === author);

//         const authorData = {
//           mean,
//           maxRate,
//           minRate,
//           median,
//           stdDev,
//           posts: data.posts,
//           totalRate,
//           ...(authorInfo ? authorInfo : { name: author, likes: 0, dislikes: 0 }),
//         };

//         // 计算得分
//         const score =
//           authorData.mean * 0.35 + // 35% 权重给平均值
//           authorData.median * 0.35 + // 35% 权重给中位数
//           authorData.maxRate * 0.2 + // 20% 权重给最高值
//           (1 / (authorData.stdDev + 1)) * 0.1; // 10% 权重给标准差的倒数（越稳定越高分）

//         return { ...authorData, score } as AuthorStats;
//       })
//       .sort((a, b) => b.score - a.score);

//     combinedRanked.forEach((authorData, index) => (authorData.combinedRank = index + 1));

//     const filePath = path.join(__dirname, '..', '/resource');
//     writeResultToJsonFile(`${filePath}/combined_ranked_authors.json`, combinedRanked);
//   } catch (err) {
//     console.error('Error parsing JSON:', err);
//   }
// }

// export function filterPositive() {
//   const filePath = path.join(__dirname, '..', '/resource/ranked_authors.json');
//   fs.readFile(filePath, 'utf8', (err: any, data: any) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return;
//     }
//     try {
//       var rank = JSON.parse(data) as AuthorStats[];

//       var filtered = rank.filter((x) => x.score && x.score > 5 && x.median > 10 && x.mean > 10);
//       filtered.forEach((authorData, index) => {
//         authorData.posts.sort((a, b) => a.date.localeCompare(b.date));
//         authorData.combinedRank = index + 1;
//       });
//       const filePath = path.join(__dirname, '..', '/resource');
//       writeResultToJsonFile(`${filePath}/filtered_combined_ranked_authors.json`, filtered);
//     } catch (err) {
//       console.error('Error parsing JSON:', err);
//     }
//   });
// }

// function writeResultToJsonFile(filePath: string, result: any) {
//   const jsonContent = JSON.stringify(result, null, 2); // 格式化 JSON
//   fs.writeFileSync(filePath, jsonContent, 'utf8');
// }

// export async function importRankedAuthorsToMongoDB() {
//   try {
//     const filePath = path.join(__dirname, '..', '/resource/ranked_authors.json');
//     const data = await fs.promises.readFile(filePath, 'utf8');
//     const rankedAuthors = JSON.parse(data) as AuthorStats[];

//     // 清除現有的排名數據
//     await AuthorStatsModel.deleteMany({});

//     // 獲取所有作者
//     const authors = await AuthorModel.find().lean().exec();

//     // 創建一個 Map 來快速查找作者
//     const authorMap = new Map(authors.map((author) => [author.name, author]));

//     // 收集所有要插入的數據
//     const authorStatsToInsert: Partial<IAuthorStats>[] = [];

//     for (const authorData of rankedAuthors) {
//       const authorModel = authorMap.get(authorData.name);

//       if (authorModel) {
//         const rankData: Partial<IAuthorStats> = {
//           name: authorData.name,
//           mean: authorData.mean,
//           maxRate: authorData.maxRate,
//           minRate: authorData.minRate,
//           median: authorData.median,
//           stdDev: authorData.stdDev,
//           posts: authorData.posts,
//           totalRate: authorData.totalRate,
//           score: authorData.score,
//           combinedRank: authorData.combinedRank,
//           author: authorModel._id,
//         };

//         authorStatsToInsert.push(rankData);
//       } else {
//         console.warn(`Author not found: ${authorData.name}`);
//       }
//     }

//     // 一次性插入所有數據
//     if (authorStatsToInsert.length > 0) {
//       await AuthorStatsModel.insertMany(authorStatsToInsert);
//     }

//     console.log(`Data import completed successfully. Inserted ${authorStatsToInsert.length} records.`);
//   } catch (error) {
//     console.error('Error importing data:', error);
//   }
// }

const queue = new Queue(
  async function (job: IPostInfo, done: Function) {
    try {
      const result = await processHistoricalInfo(job);
      done(null, result);
    } catch (error) {
      done(error);
    }
  },
  { afterProcessDelay: 1500 }
);

let data: PostHistoricalResponse[] = [];

// 監聽完成和失敗事件
queue.on('task_finish', (taskId: number, result: PostHistoricalResponse) => {
  console.log('task_finish', result.stockNo);
  if (result && result.historicalInfo && result.historicalInfo.length > 0) {
    console.log('data push', result.stockNo);
    data.push(result);
  } else {
    console.warn(`can not retrieve historical Info for ${result.title}-${result.author}`);
  }
});

queue.on('drain', async () => {
  try {
    // const authors = await AuthorModel.find().lean().exec();
    // await processRankingAndSaveToDB(data, authors);
    console.log('drain, data size: ' + data.length, data.map((x) => x.stockNo).join(','));
    data = []; // 清空data以便下次使用
  } catch (error) {
    console.error('Error processing and updating author stats:', error);
    data = []; // 清空data以便下次使用
  }
});

export async function processAuthorStatsWithQueue() {
  const posts = await getPostsWithInDays(20, '標的');
  const filterPost = posts.filter((x) => isValidStockPost(x));
  for (const post of filterPost) {
    queue.push(post);
  }
}

export async function processAndUpdateAuthorStats() {
  try {
    const posts = await getPostsWithInDays(120, '標的');
    const filterPost = posts.filter((x) => isValidStockPost(x));
    const data: PostHistoricalResponse[] = [];

    for (const post of filterPost) {
      const result = await processHistoricalInfoWithDelay(post);
      data.push(result);
    }

    const authors = await AuthorModel.find().lean().exec();
    await processRankingAndSaveToDB(data, authors);

    console.log('Author stats processing and updating completed successfully.');
  } catch (error) {
    console.error('Error processing and updating author stats:', error);
    throw error;
  }
}

async function processRankingAndSaveToDB(
  postData: PostHistoricalResponse[],
  authors: (FlattenMaps<IAuthor> & {
    _id: Types.ObjectId;
  })[]
) {
  try {
    const authorPostsMap: Map<string, AuthorPosts> = new Map();
    postData.forEach((item) => {
      const { processedData } = item;
      const author = item.author as string;
      if (!authorPostsMap.has(author)) {
        authorPostsMap.set(author, { rates: [], posts: [] });
      }

      const highest = processedData.find((x) => x.type === 'highest');
      if (highest) {
        const authorData = authorPostsMap.get(author)!;
        const formatDate = toDateString(new Date(item.id * 1000));
        authorData.rates.push(highest.diffPercent);
        authorData.posts.push({
          title: item.title,
          href: item.href as string,
          date: formatDate,
          id: item.id,
          highest: highest,
        });
      }
    });

    const authorStatsToUpdate: Partial<IAuthorStats>[] = [];

    Array.from(authorPostsMap.entries())
      .filter(([author, data]) => data.posts.length >= 3)
      .forEach(([author, data]) => {
        const rates = data.rates;
        const totalRate = rates.reduce((a, b) => a + b, 0);
        const mean = totalRate / rates.length;
        const maxRate = Math.max(...rates);
        const minRate = Math.min(...rates);
        const sortedRates = rates.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedRates.length / 2);
        const median = sortedRates.length % 2 !== 0 ? sortedRates[mid] : (sortedRates[mid - 1] + sortedRates[mid]) / 2;
        const stdDev = Math.sqrt(rates.reduce((sum, rate) => sum + Math.pow(rate - mean, 2), 0) / rates.length);

        const authorInfo = authors.find((x) => x.name === author);

        if (authorInfo) {
          // 计算得分
          const score =
            mean * 0.35 + // 35% 权重给平均值
            median * 0.35 + // 35% 权重给中位数
            maxRate * 0.2 + // 20% 权重给最高值
            (1 / (stdDev + 1)) * 0.1; // 10% 权重给标准差的倒数（越稳定越高分）

          authorStatsToUpdate.push({
            name: author,
            mean,
            maxRate,
            minRate,
            median,
            stdDev,
            posts: data.posts,
            totalRate,
            score,
            author: authorInfo._id,
          });
        }
      });

    //TODO: creat author that not exist

    // 清除現有的排名數據 TODO: 更新資料
    await AuthorStatsModel.deleteMany({});

    // 插入新的排名數據
    if (authorStatsToUpdate.length > 0) {
      await AuthorStatsModel.insertMany(authorStatsToUpdate);
    }
    console.log(`Data processing and saving completed. Updated ${authorStatsToUpdate.length} records.`);
  } catch (error) {
    console.error('Error processing ranking and saving to DB:', error);
    throw error;
  }
}
