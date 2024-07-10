import fs from 'fs';
import path from 'path';
import { PostHistoricalResponse, DiffInfo, processHistoricalInfoWithDelay } from './historicalService';
import { getPostsWithInDays } from './pttStockPostService';
import { isValidStockPost } from '../utility/stockPostHelper';
import { toDateString } from '../utility/dateTime';
import { AuthorModel, IAuthor } from '../model/Author';

interface AuthorPosts {
  rates: number[];
  posts: SimplePost[];
}

export interface AuthorStats extends IAuthor {
  mean: number; //平均報酬率
  maxRate: number; //報酬率最高的一篇
  minRate: number; //報酬率最低的一篇
  totalRate: number; //所有貼文報酬率加總
  median: number; //報酬率中位數
  posts: SimplePost[]; //貼文
  score: number; // 用來衡量作者績效的分數
  combinedRank?: number;
}

interface SimplePost {
  title: string;
  href: string;
  date: string;
  id: number;
  highest: DiffInfo;
}

export async function getDataAndProcessToResult() {
  var posts = await getPostsWithInDays(120);
  var filterPost = posts.filter((x) => isValidStockPost(x));
  var data: PostHistoricalResponse[] = [];
  for (const post of filterPost) {
    const result = await processHistoricalInfoWithDelay(post);
    data.push(result);
  }
  const authors = await AuthorModel.find().lean().exec();
  processRankingAndWriteToFile(data, authors);
}

export function processRankingAndWriteToFile(jsonData: PostHistoricalResponse[], authors: IAuthor[]) {
  try {
    // 把每個貼文的最高點以作者為單位去 group 起來
    const authorPostsMap: Map<string, AuthorPosts> = new Map();
    jsonData.forEach((item) => {
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

    // 过滤掉发文少于三篇的作者, 幾算統計數值
    // const filteredAuthorStats = Array.from(authorPostsMap.entries())
    //   .filter(([author, data]) => data.posts.length >= 3)
    //   .map(([author, data]) => {
    //     const rates = data.rates;
    //     const totalRate = rates.reduce((a, b) => a + b, 0);
    //     const mean = totalRate / rates.length;
    //     const maxRate = Math.max(...rates);
    //     const minRate = Math.min(...rates);
    //     const sortedRates = rates.slice().sort((a, b) => a - b);
    //     const mid = Math.floor(sortedRates.length / 2);
    //     const median = sortedRates.length % 2 !== 0 ? sortedRates[mid] : (sortedRates[mid - 1] + sortedRates[mid]) / 2;
    //     const authorInfo = authors.find((x) => x.name === author);

    //     return {
    //       mean,
    //       maxRate,
    //       minRate,
    //       median,
    //       posts: data.posts,
    //       totalRate,
    //       ...(authorInfo ? authorInfo : { name: author, likes: 0, dislikes: 0 }),
    //     } as AuthorStats;
    //   });

    // 对符合条件的作者数据进行排序
    // const meanRanked = [...filteredAuthorStats].sort((a, b) => b.mean - a.mean);
    // const medianRanked = [...filteredAuthorStats].sort((a, b) => b.median - a.median);
    // const combinedRanked = [...filteredAuthorStats]
    //   .map((authorData) => ({
    //     ...authorData,
    //     score: (authorData.mean + authorData.median + authorData.maxRate) / 3,
    //   }))
    //   .sort((a, b) => b.score! - a.score!);

    const combinedRanked = Array.from(authorPostsMap.entries())
      .filter(([author, data]) => data.posts.length >= 3)
      .map(([author, data]) => {
        const rates = data.rates;
        const totalRate = rates.reduce((a, b) => a + b, 0);
        const mean = totalRate / rates.length;
        const maxRate = Math.max(...rates);
        const minRate = Math.min(...rates);
        const sortedRates = rates.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedRates.length / 2);
        const median = sortedRates.length % 2 !== 0 ? sortedRates[mid] : (sortedRates[mid - 1] + sortedRates[mid]) / 2;

        // 计算标准差
        const stdDev = Math.sqrt(rates.reduce((sum, rate) => sum + Math.pow(rate - mean, 2), 0) / rates.length);

        const authorInfo = authors.find((x) => x.name === author);

        const authorData = {
          mean,
          maxRate,
          minRate,
          median,
          stdDev,
          posts: data.posts,
          totalRate,
          ...(authorInfo ? authorInfo : { name: author, likes: 0, dislikes: 0 }),
        };

        // 计算得分
        const score =
          authorData.mean * 0.35 + // 35% 权重给平均值
          authorData.median * 0.35 + // 35% 权重给中位数
          authorData.maxRate * 0.2 + // 20% 权重给最高值
          (1 / (authorData.stdDev + 1)) * 0.1; // 10% 权重给标准差的倒数（越稳定越高分）

        return { ...authorData, score } as AuthorStats;
      })
      .sort((a, b) => b.score - a.score);

    // 添加排名字段
    // meanRanked.forEach((authorData, index) => (authorData.meanRank = index + 1));
    // medianRanked.forEach((authorData, index) => (authorData.medianRank = index + 1));
    combinedRanked.forEach((authorData, index) => (authorData.combinedRank = index + 1));

    // 将结果保存到文件
    const filePath = path.join(__dirname, '..', '/resource');
    // writeResultToJsonFile(`${filePath}/mean_ranked_authors.json`, meanRanked);
    // writeResultToJsonFile(`${filePath}/median_ranked_authors.json`, medianRanked);
    writeResultToJsonFile(`${filePath}/combined_ranked_authors.json`, combinedRanked);
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
}

export function filterPositive() {
  const filePath = path.join(__dirname, '..', '/resource/combined_ranked_authors.json');
  fs.readFile(filePath, 'utf8', (err: any, data: any) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    try {
      var rank = JSON.parse(data) as AuthorStats[];

      var filtered = rank.filter((x) => x.score && x.score > 5 && x.median > 10 && x.mean > 10);
      filtered.forEach((authorData, index) => (authorData.combinedRank = index + 1));
      const filePath = path.join(__dirname, '..', '/resource');
      writeResultToJsonFile(`${filePath}/filtered_combined_ranked_authors.json`, filtered);
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
}

function writeResultToJsonFile(filePath: string, result: any) {
  const jsonContent = JSON.stringify(result, null, 2); // 格式化 JSON
  fs.writeFileSync(filePath, jsonContent, 'utf8');
}
