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

export function getMonthRangeFrom(timestamp: number, today: Date): string[] {
  const baseDate = new Date(timestamp * 1000);
  const targetDate = new Date(baseDate);
  targetDate.setMonth(targetDate.getMonth() + 4);
  const finalDate = targetDate > today ? today : targetDate;
  return [toDateString(baseDate), toDateString(finalDate)];
}

export async function getPriceInfo(
  stockNo: string,
  today: string,
  dateRange: string[]
): Promise<PriceInfoResponse | null> {
  console.log(`start getPriceInfo for ${stockNo} at ${today}`);
  const dateRangeWithinToday: string[] = [];

  for (const date of dateRange) {
    if (date > today) {
      dateRangeWithinToday.push(today);
      break;
    }
    dateRangeWithinToday.push(date);
  }

  var result = await fugleService.getStockPriceByDates(
    stockNo,
    dateRangeWithinToday[0],
    dateRangeWithinToday[dateRangeWithinToday.length - 1]
  );

  if (!result || result.data.length == 0) {
    return null;
  }

  const rawData = result.data.map((x) => ({ ...x, date: x.date.replace(/-/g, '') })).reverse();
  const baseClose = rawData[0].close;
  const processedDates: DiffInfo[] = dateRange.map((dateStr) => {
    const target: DiffInfo = { date: dateStr, diff: 0, diffPercent: 0, price: 0 };
    const targetDayInfo = rawData.find((x) => x.date === dateStr);
    if (targetDayInfo) {
      target.diff = roundToDecimal(targetDayInfo.close - baseClose, 2);
      target.price = targetDayInfo.close;
      target.diffPercent = parseFloat(((target.diff / baseClose) * 100).toFixed(2));
    }
    return target;
  });

  return { stockNo, processedData: processedDates, historicalInfo: rawData };
}

export async function getPriceInfoByRange(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<PriceInfoResponse | null> {
  var result = await fugleService.getStockPriceByDates(stockNo, startDate, endDate);

  if (!result || result.data.length == 0) {
    return null;
  }

  const data = result.data.map((x) => ({ ...x, date: x.date.replace(/-/g, '') })).reverse();

  const highest = getHighestPoint(data);
  const baseClose = data[0].close;
  const target: DiffInfo = { date: highest.date || '', diff: 0, diffPercent: 0, price: 0 };
  const targetDayInfo = data.find((x) => x.date === highest.date);
  if (targetDayInfo) {
    target.diff = roundToDecimal(targetDayInfo.close - baseClose, 2);
    target.price = targetDayInfo.close;
    target.diffPercent = parseFloat(((target.diff / baseClose) * 100).toFixed(2));
  }

  return { stockNo, historicalInfo: data, processedData: [target] };
}

export function getHighestPoint(data: HistoricalDataInfo[]): HistoricalDataInfo {
  let highestPoint: HistoricalDataInfo = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i].high > highestPoint.high) {
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
