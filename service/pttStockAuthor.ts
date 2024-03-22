import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { IPostInfo, PostInfoModel, LastRecordModel } from '../model/PostInfo';
import { isRePosts } from './pttStockInfo';
import fugleService from './fugleService';
import { getDateFragment } from '../utility/dateTime';

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

export async function getPriceInfo(stockNo: string, today: string, dateRange: string[]) {
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

  const filteredData = result?.data.filter((dataObj) => {
    const dateStr = dataObj.date.replace(/-/g, '');
    return dateRangeWithinToday.includes(dateStr);
  });

  const baseClose = filteredData[0].close;
  const percentageDiffs: PercentageDiff[] = dateRangeWithinToday
    .slice(1)
    .filter((dateStr) => {
      const dataObj = result?.data.find((obj) => obj.date.replace(/-/g, '') === dateStr);
      return dataObj !== undefined; // 过滤掉没有找到对应数据对象的日期字符串
    })
    .map((dateStr) => {
      const dataObj = result?.data.find((obj) => obj.date.replace(/-/g, '') === dateStr)!; // 由于经过了过滤,这里可以确定 dataObj 不为 null 或 undefined
      const closeValue = dataObj.close;
      const diffPercent = ((closeValue - baseClose) / baseClose) * 100;
      const diffPercentFixed = parseFloat(diffPercent.toFixed(2));
      return { date: dataObj.date, diffPercentFixed, price: closeValue };
    });

  return { stockNo, filteredData, percentageDiffs, rawData: result.data };
}

interface PercentageDiff {
  date: string;
  diffPercentFixed: number;
  price: number;
}
