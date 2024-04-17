import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { isRePosts } from './pttStockInfo';
import fugleService, { HistoricalDataInfo } from './fugleService';
import { toDateString } from '../utility/dateTime';

const domain = 'https://www.ptt.cc';

export async function getHtmlSource(author: string): Promise<cheerio.Root> {
  const url = `${domain}/bbs/Stock/search?q=author%3A${author}`;
  const $ = await getHTML(url);
  return $;
}

export function getTargetPosts(posts: PostInfo.IPostInfo[]): PostInfo.IPostInfo[] {
  return posts.filter((post) => post.tag == '標的' && !isRePosts(post));
}

export function getStockNoFromTitle(post: PostInfo.IPostInfo) {
  const match = post.title.match(/\d{4,5}/);
  return match ? match[0] : '';
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

export function isPostedInOneWeek(baseDate: Date, today: Date): boolean {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const diffFromToday = today.getTime() - baseDate.getTime();
  return diffFromToday < oneWeekInMilliseconds;
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

function roundToDecimal(value: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export interface DiffInfo {
  date: string;
  diff: number;
  diffPercent: number;
  price: number;
}

export interface PriceInfoResponse {
  stockNo: string;
  processedData: DiffInfo[];
  historicalInfo: HistoricalDataInfo[];
}

export function processRecentPost(postDate: Date, info: PriceInfoResponse) {
  // info.historicalInfo 裡面找到最靠近 postDate 的  跟 today 的股價
  // historicalInfo   date: string; //"2024-03-19"
  const nearestDay = findNearestHistoricalInfo(info.historicalInfo, postDate);
  if (nearestDay) {
    const baseClose = nearestDay.close;
    const lastElement = info.historicalInfo[info.historicalInfo.length - 1]; //supposed to be today
    const processLastElement: DiffInfo = { date: lastElement.date || '', diff: 0, diffPercent: 0, price: 0 };
    processLastElement.diff = roundToDecimal(lastElement.close - baseClose, 2);
    processLastElement.price = lastElement.close;
    processLastElement.diffPercent = parseFloat(((processLastElement.diff / baseClose) * 100).toFixed(2));
    info.historicalInfo = [nearestDay];
    info.processedData = [processLastElement];
  }
}

function findNearestHistoricalInfo(
  historicalInfo: HistoricalDataInfo[],
  postDate: Date
): HistoricalDataInfo | undefined {
  // 將 postDate 轉換為 YYYY-MM-DD 格式的字串
  const postDateString = postDate.toISOString().split('T')[0];

  // 找到與 postDate 最接近的日期
  return historicalInfo.reduce((closest: HistoricalDataInfo | undefined, current: HistoricalDataInfo) => {
    const currentDate = new Date(current.date);
    const closestDate = closest ? new Date(closest.date) : null;

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
