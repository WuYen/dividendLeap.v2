import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { parsePosts } from './pttStockPostService';
import fugleService, { HistoricalDataInfo } from './fugleService';
import { toDateString, todayDate } from '../utility/dateTime';
import { AuthorHistoricalCache, IHistoricalCache } from '../model/AuthorHistoricalCache';
import { IPostInfo } from '../model/PostInfo';
import { getStockNoFromTitle, isPostedInOneWeek, isRePosts } from '../utility/stockPostHelper';
import { delay } from '../utility/delay';

const domain = 'https://www.ptt.cc';

export async function getHtmlSource(author: string): Promise<cheerio.Root> {
  const url = `${domain}/bbs/Stock/search?q=author%3A${author}`;
  const $ = await getHTML(url);
  return $;
}

export function getTargetPosts(posts: PostInfo.IPostInfo[]): PostInfo.IPostInfo[] {
  return posts.filter((post) => post.tag == '標的' && !isRePosts(post));
}

export function getTargetDates(timestamp: number, closeDays: String[]) {
  const initialDate = new Date(timestamp * 1000);
  const targetDates: string[] = [];

  const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const isCloseDay = (date: Date): boolean => {
    const dateStr = date.toISOString().slice(0, 10);
    const formattedDateStr = dateStr.replace(/-/g, '');
    return closeDays.some((closeDay) => closeDay === dateStr || closeDay === formattedDateStr);
  };

  const getNextWeekday = (date: Date): Date => {
    const nextDay = new Date(date.getTime() + 86400000);
    return isWeekday(nextDay) && !isCloseDay(nextDay) ? nextDay : getNextWeekday(nextDay);
  };

  const getNextAvailableWeekday = (date: Date): Date => {
    let nextDay = new Date(date.getTime() + 86400000);
    let continueFlag = true;

    while (continueFlag) {
      if (isWeekday(nextDay) && !isCloseDay(nextDay)) {
        continueFlag = false;
        return nextDay;
      }
      nextDay = new Date(nextDay.getTime() + 86400000);
    }

    return nextDay;
  };

  const targetDate1 =
    isWeekday(initialDate) && !isCloseDay(initialDate) ? initialDate : getNextAvailableWeekday(initialDate);
  targetDates.push(targetDate1.toISOString().slice(0, 10).replace(/-/g, '')); //目標日

  const targetNextDay = getNextAvailableWeekday(targetDate1);
  targetDates.push(targetNextDay.toISOString().slice(0, 10).replace(/-/g, '')); //目標隔天

  //loop 兩週, 四週, 六週, 八週
  for (let i = 1; i < 5; i++) {
    let nextTargetDate = new Date(targetDate1.getTime() + i * 14 * 86400000);
    if (isWeekday(nextTargetDate) && !isCloseDay(nextTargetDate)) {
      targetDates.push(nextTargetDate.toISOString().slice(0, 10).replace(/-/g, ''));
    } else {
      targetDates.push(getNextAvailableWeekday(nextTargetDate).toISOString().slice(0, 10).replace(/-/g, ''));
    }
  }

  return targetDates; //[目標日, 目標隔天, 兩週, 四週, 六週, 八週]
}

export function getDateRangeBaseOnPostedDate(baseDate: Date, today: Date): string[] {
  if (isPostedInOneWeek(baseDate, today)) {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const oneWeeksAgo = new Date(today.getTime() - oneWeekInMilliseconds);
    return [toDateString(oneWeeksAgo), toDateString(today)];
  }

  const targetDate = new Date(baseDate);
  targetDate.setMonth(targetDate.getMonth() + 4);
  const finalDate = targetDate > today ? today : targetDate;
  return [toDateString(baseDate), toDateString(finalDate)];
}

export async function getPriceInfoByDates(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<PriceInfoResponse | null> {
  var result = await fugleService.getStockPriceByDates(stockNo, startDate, endDate);

  if (!result || result.data.length == 0) {
    return null;
  }

  const data = result.data.map((x) => ({ ...x, date: x.date.replace(/-/g, '') })).reverse();

  const highestPoint = getHighestPoint(data);
  const baseClose = data[0].close;
  const highest: DiffInfo = { date: highestPoint.date || '', diff: 0, diffPercent: 0, price: 0 };
  const targetDayInfo = data.find((x) => x.date === highestPoint.date);
  if (targetDayInfo) {
    highest.type = DiffType.HIGHEST;
    highest.diff = roundToDecimal(targetDayInfo.close - baseClose, 2);
    highest.price = targetDayInfo.close;
    highest.diffPercent = parseFloat(((highest.diff / baseClose) * 100).toFixed(2));
  }

  return { stockNo, historicalInfo: data, processedData: [highest] };
}

export function getHighestPoint(data: HistoricalDataInfo[]): HistoricalDataInfo {
  let highestPoint: HistoricalDataInfo = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i].close > highestPoint.close) {
      highestPoint = data[i];
    }
  }

  return highestPoint;
}

export function roundToDecimal(value: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export enum DiffType {
  HIGHEST = 'highest',
  LATEST = 'latest',
  BASE = 'base',
}

export interface DiffInfo {
  date: string;
  diff: number;
  diffPercent: number;
  price: number;
  type?: DiffType;
}

export interface PriceInfoResponse {
  stockNo: string;
  processedData: DiffInfo[];
  historicalInfo: HistoricalDataInfo[];
}

export interface AuthorHistoricalResponse extends PriceInfoResponse, IPostInfo {
  isRecentPost?: boolean;
  isFavorite?: boolean;
}

export function processRecentPost(postDate: Date, info: PriceInfoResponse) {
  // info.historicalInfo 裡面找到最靠近 postDate 的  跟 today 的股價
  const nearestDay = findNearestHistoricalInfo(info.historicalInfo, postDate);
  if (nearestDay) {
    const baseClose = nearestDay.close;
    const lastElement = info.historicalInfo[info.historicalInfo.length - 1]; //supposed to be today
    const processLastElement: DiffInfo = {
      date: lastElement.date || '',
      diff: 0,
      diffPercent: 0,
      price: 0,
      type: DiffType.LATEST,
    };
    processLastElement.diff = roundToDecimal(lastElement.close - baseClose, 2);
    processLastElement.price = lastElement.close;
    processLastElement.diffPercent = parseFloat(((processLastElement.diff / baseClose) * 100).toFixed(2));
    info.historicalInfo = [nearestDay]; // 會往在發文日前抓很多天, 去找到離發文日最近的一天
    info.processedData = [processLastElement];
  }
}

function findNearestHistoricalInfo(
  historicalInfo: HistoricalDataInfo[],
  postDate: Date
): HistoricalDataInfo | undefined {
  // 找到與 postDate 最接近的日期
  return historicalInfo.reduce((closest: HistoricalDataInfo | undefined, current: HistoricalDataInfo) => {
    // const currentDate = new Date(current.date);
    // const closestDate = closest ? new Date(closest.date) : null;

    const currentDate = new Date(
      parseInt(current.date.substring(0, 4)), // 年份
      parseInt(current.date.substring(4, 6)) - 1, // 月份（要減 1 因為月份從 0 開始）
      parseInt(current.date.substring(6))
    ); // 日

    const closestDate = closest
      ? new Date(
          parseInt(closest.date.substring(0, 4)), // 年份
          parseInt(closest.date.substring(4, 6)) - 1, // 月份
          parseInt(closest.date.substring(6))
        )
      : null; // 日

    // 計算當前日期與 postDate 之間的時間差
    const currentDiff = Math.abs(currentDate.getTime() - postDate.getTime());
    const closestDiff = closestDate ? Math.abs(closestDate.getTime() - postDate.getTime()) : Infinity;

    // 如果當前日期比 closestDate 更接近 postDate，則更新 closest
    if (currentDiff < closestDiff) {
      return current;
    } else {
      return closest;
    }
  }, undefined);
}

function getAuthorWithRecentPostList() {
  // try {
  //   // 根据作者名查找作者及其帖子
  //   const authorNames = ['uzgo', 'kobekid']; // 假设这里是你的作者名数组
  //   const authorsWithPosts = await AuthorModel.aggregate([
  //     { $match: { name: { $in: authorNames } } },
  //     {
  //       $lookup: {
  //         from: 'postinfos', // 假设这是帖子集合的名称
  //         localField: 'name', // 使用作者的名字进行匹配
  //         foreignField: 'author', // 假设这是帖子中作者的字段名
  //         as: 'posts',
  //       },
  //     },
  //     { $project: { name: 1, posts: { $slice: ['$posts', 5] } } }, // 限制每个作者的帖子数量为 5 条
  //   ]);
  //   console.log(JSON.stringify(authorsWithPosts));
  // } catch (err) {
  //   console.error(err);
  // }
}

export async function getAuthorHistoryPosts(authorId: string) {
  const $ = await getHtmlSource(authorId);
  const posts = parsePosts($, +new Date());
  const storedPosts = await PostInfo.PostInfoModel.find({ author: authorId })
    .sort({ id: -1 }) // 按 id 降序排列
    .limit(8) // 限定返回數量
    .lean()
    .exec();

  const combinedPosts = [...posts, ...storedPosts].filter(
    (postInfo, index, self) => index === self.findIndex((item) => item.id === postInfo.id)
  );
  combinedPosts.sort((a, b) => b.id - a.id);
  console.log(`posts.length:${combinedPosts.length}`);

  const result: AuthorHistoricalResponse[] = [];
  for (let i = 0; i < Math.min(combinedPosts.length, 8); i++) {
    const target: AuthorHistoricalResponse = await processHistoricalInfo(combinedPosts[i]);
    result.push(target);
  }

  // Delete any existing result for the authorId
  await AuthorHistoricalCache.deleteMany({ authorId }).exec();
  const newResult: IHistoricalCache = {
    timestamp: +Date.now(),
    authorId,
    data: result,
  };
  await new AuthorHistoricalCache(newResult).save();
  return result;
}

export async function processHistoricalInfo(postInfo: PostInfo.IPostInfo): Promise<AuthorHistoricalResponse> {
  const stockNo = getStockNoFromTitle(postInfo);
  const postDate = new Date(postInfo.id * 1000);
  const isRecentPost = isPostedInOneWeek(postDate, todayDate());
  var target: AuthorHistoricalResponse = {
    ...postInfo,
    stockNo,
    historicalInfo: [],
    processedData: [],
    isRecentPost,
  };
  if (stockNo) {
    const targetDates = getDateRangeBaseOnPostedDate(postDate, todayDate());
    const resultInfo: PriceInfoResponse | null = await getPriceInfoByDates(stockNo, targetDates[0], targetDates[1]);
    if (resultInfo) {
      isRecentPost && processRecentPost(postDate, resultInfo);
      target.historicalInfo = resultInfo.historicalInfo;
      target.processedData = resultInfo.processedData;
    }
  }
  return target;
}

export async function processHistoricalInfoWithDelay(postInfo: PostInfo.IPostInfo): Promise<AuthorHistoricalResponse> {
  const target = await processHistoricalInfo(postInfo);
  await delay(1500);
  return target;
}
