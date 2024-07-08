import { IPostInfo } from '../model/PostInfo';
import fs from 'fs';
import path from 'path';
import { PostHistoricalResponse, DiffInfo, processHistoricalInfoWithDelay } from './historicalService';
import { getPostsWithInDays } from './pttStockPostService';
import { isValidStockPost } from '../utility/stockPostHelper';
import { toDateString } from '../utility/dateTime';

interface AuthorData {
  rates: number[];
  posts: SimplePost[];
}

interface AuthorStats {
  author: string;
  mean: number;
  maxRate: number;
  median: number;
  posts: SimplePost[];
  score?: number;
  meanRank?: number;
  medianRank?: number;
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
  multipleRanking(data);
}

export function multipleRanking(jsonData: PostHistoricalResponse[]) {
  try {
    // 计算每个作者的数据
    const authorStatsMap: Map<string, AuthorData> = new Map();

    jsonData.forEach((item) => {
      const { processedData } = item;
      const author = item.author as string;
      if (!authorStatsMap.has(author)) {
        authorStatsMap.set(author, { rates: [], posts: [] });
      }
      const highest = processedData.find((x) => x.type === 'highest') || processedData[0];
      if (highest) {
        const authorData = authorStatsMap.get(author)!;
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

    // 过滤掉发文少于三篇的作者
    const filteredAuthorStats = Array.from(authorStatsMap.entries())
      .filter(([author, data]) => data.posts.length >= 3)
      .map(([author, data]) => {
        const rates = data.rates;
        const mean = rates.reduce((a, b) => a + b, 0) / rates.length;
        const maxRate = Math.max(...rates);
        const sortedRates = rates.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedRates.length / 2);
        const median = sortedRates.length % 2 !== 0 ? sortedRates[mid] : (sortedRates[mid - 1] + sortedRates[mid]) / 2;

        return {
          author,
          mean,
          maxRate,
          median,
          posts: data.posts,
        } as AuthorStats;
      });

    // 对符合条件的作者数据进行排序
    const meanRanked = [...filteredAuthorStats].sort((a, b) => b.mean - a.mean);
    const medianRanked = [...filteredAuthorStats].sort((a, b) => b.median - a.median);
    const combinedRanked = [...filteredAuthorStats]
      .map((authorData) => ({
        ...authorData,
        score: (authorData.mean + authorData.median + authorData.maxRate) / 3,
      }))
      .sort((a, b) => b.score! - a.score!);

    // 添加排名字段
    meanRanked.forEach((authorData, index) => (authorData.meanRank = index + 1));
    medianRanked.forEach((authorData, index) => (authorData.medianRank = index + 1));
    combinedRanked.forEach((authorData, index) => (authorData.combinedRank = index + 1));

    // 将结果保存到文件
    const filePath = path.join(__dirname, '..', '/resource');
    writeResultToJsonFile(`${filePath}/mean_ranked_authors.json`, meanRanked);
    writeResultToJsonFile(`${filePath}/median_ranked_authors.json`, medianRanked);
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

      var filtered = rank.filter((x) => x.score && x.score > 5 && x.posts.length >= 3 && x.median > 10 && x.mean > 10);
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
