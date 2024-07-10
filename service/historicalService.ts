import * as PostInfo from '../model/PostInfo';
import fugleService, { HistoricalDataInfo } from './fugleService';
import { toDateString, todayDate } from '../utility/dateTime';
import { IPostInfo } from '../model/PostInfo';
import { getStockNoFromTitle, isPostedInOneWeek } from '../utility/stockPostHelper';
import { delay } from '../utility/delay';

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

export interface PostHistoricalResponse extends IPostInfo {
  stockNo: string;
  processedData: DiffInfo[];
  historicalInfo: HistoricalDataInfo[];
  isRecentPost?: boolean;
  isFavorite?: boolean;
}

export async function processHistoricalInfo(
  postInfo: PostInfo.IPostInfo,
  today: Date = todayDate()
): Promise<PostHistoricalResponse> {
  const stockNo = getStockNoFromTitle(postInfo);
  const postDate = new Date(postInfo.id * 1000);
  const isRecentPost = isPostedInOneWeek(postDate, todayDate());
  const historicalPostInfo: PostHistoricalResponse = {
    ...postInfo,
    stockNo: stockNo,
    isFavorite: true,
    historicalInfo: [],
    processedData: [],
    isRecentPost,
  };

  //發文日 -> 今天
  const targetDates = getDateRangeBaseOnPostedDate(postDate, today);
  const result = await fugleService.getStockPriceByDates(stockNo, targetDates[0], targetDates[1]);

  if (result && result.data.length > 0) {
    const data = result.data.map((x) => ({ ...x, date: x.date.replace(/-/g, '') })).reverse();
    const base = getBasePointInfo(data, postDate, isRecentPost); // 發文日為基準
    const highest = getHighestPointInfo(data, base.price); //找到資料區間內最高點
    const latest = getLatestPointInfo(data, base.price); //找到最靠近今天的股價
    historicalPostInfo.historicalInfo = data;
    historicalPostInfo.processedData = [highest, latest, base];
  }

  return historicalPostInfo;
}

export async function processHistoricalInfoWithDelay(postInfo: PostInfo.IPostInfo): Promise<PostHistoricalResponse> {
  const target = await processHistoricalInfo(postInfo);
  await delay(1500);
  return target;
}

export function findNearestHistoricalInfo(historicalInfo: HistoricalDataInfo[], postDate: Date): HistoricalDataInfo {
  // 找到與 postDate 最接近的日期
  return historicalInfo.reduce((closest: HistoricalDataInfo, current: HistoricalDataInfo) => {
    const currentDate = new Date(
      parseInt(current.date.substring(0, 4)), // 年份
      parseInt(current.date.substring(4, 6)) - 1, // 月份（要減 1 因為月份從 0 開始）
      parseInt(current.date.substring(6)) // 日
    );

    const closestDate = new Date(
      parseInt(closest.date.substring(0, 4)), // 年份
      parseInt(closest.date.substring(4, 6)) - 1, // 月份
      parseInt(closest.date.substring(6)) // 日
    );

    // 計算當前日期與 postDate 之間的時間差
    const currentDiff = Math.abs(currentDate.getTime() - postDate.getTime());
    const closestDiff = Math.abs(closestDate.getTime() - postDate.getTime());

    // 如果當前日期比 closestDate 更接近 postDate，則更新 closest
    if (currentDiff < closestDiff) {
      return current;
    } else {
      return closest;
    }
  }, historicalInfo[0]);
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

export function roundToDecimal(value: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export function getBasePointInfo(data: HistoricalDataInfo[], postDate: Date, isRecentPost: boolean): DiffInfo {
  const basePoint = isRecentPost ? findNearestHistoricalInfo(data, postDate) : data[0];
  return {
    date: basePoint.date || '',
    diff: 0,
    diffPercent: 0,
    price: basePoint.close,
    type: DiffType.BASE,
  };
}

export function getHighestPointInfo(data: HistoricalDataInfo[], baseClose: number): DiffInfo {
  let highestPoint: HistoricalDataInfo = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i].close > highestPoint.close) {
      highestPoint = data[i];
    }
  }

  const highestDiff = roundToDecimal(highestPoint.close - baseClose, 2);
  const highestDiffPercent = parseFloat(((highestDiff / baseClose) * 100).toFixed(2));

  return {
    date: highestPoint.date || '',
    diff: highestDiff,
    diffPercent: highestDiffPercent,
    price: highestPoint.close,
    type: DiffType.HIGHEST,
  };
}

export function getLatestPointInfo(data: HistoricalDataInfo[], baseClose: number): DiffInfo {
  const latestTradePoint = data[data.length - 1];
  const latestDiff = roundToDecimal(latestTradePoint.close - baseClose, 2);
  const latestDiffPercent = parseFloat(((latestDiff / baseClose) * 100).toFixed(2));

  return {
    date: latestTradePoint.date || '',
    diff: latestDiff,
    diffPercent: latestDiffPercent,
    price: latestTradePoint.close,
    type: DiffType.LATEST,
  };
}
