import { StockHistoricalCache } from '../model/stockHistoricalCache';
import { getDateFragment, toDateString } from '../utility/dateTime';
import { FugleAPIBuilder, getHistoricalCandles } from '../utility/fugleCaller';
import { FugleDataset, StockHistoricalResponse } from '../utility/fugleTypes';

export interface FugleStockHistoricalResponse {
  symbol: string;
  type: string;
  exchange: string;
  market: string;
  timeframe: string;
  data: HistoricalDataInfo[];
}

export interface HistoricalDataInfo {
  date: string; //原始"2024-03-19" or 處理過會是yyyyMMdd
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  turnover: number;
  change: number;
}

export async function getStockPriceByDates(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<FugleStockHistoricalResponse | null> {
  try {
    const { ...startFragment } = getDateFragment(startDate);
    const start = startFragment.year + '-' + startFragment.month + '-' + startFragment.day;
    const { ...endFragment } = getDateFragment(endDate);
    const end = endFragment.year + '-' + endFragment.month + '-' + endFragment.day;
    const query = `fields=open,high,low,close,volume&from=${start}&to=${end}`;
    const response = await getHistoricalCandles(stockNo, query);
    const rawData = response.data as FugleStockHistoricalResponse;
    return rawData;
  } catch (error) {
    console.log('fugle dayInfo error', error);
    return null;
  }
}

export async function getStockPriceByDatesNew(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<StockHistoricalResponse | null> {
  try {
    const historicalData = await new FugleAPIBuilder(FugleDataset.StockHistorical)
      .setParam({
        symbol: stockNo,
        from: toDateString(startDate),
        to: toDateString(endDate),
      })
      .get();
    return historicalData;
  } catch (error) {
    console.log('fugle dayInfo error', error);
    return null;
  }
}

export async function getCachedStockPriceByDates(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<FugleStockHistoricalResponse | null> {
  let cachedData = await StockHistoricalCache.findOne({ stockNo, startDate, endDate });

  if (cachedData && !isCacheExpired(new Date(), cachedData.createdAt)) {
    console.log(`Cache hit ${stockNo}`);
    return cachedData.data;
  }

  try {
    const rawData = await getStockPriceByDates(stockNo, startDate, endDate);

    if (rawData) {
      await StockHistoricalCache.findOneAndUpdate(
        { stockNo, startDate, endDate },
        {
          $set: {
            data: rawData,
            createdAt: new Date(),
          },
        },
        { upsert: true, new: true }
      );
      console.log('Data fetched and cached');
      return rawData;
    }
    console.log('No data returned from original interface');
    return null;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}

// 定义关键时间点
const MARKET_CLOSE_HOUR = 14; // 假设市场收盘时间是下午2点

export function isCacheExpired(now: Date, createdAt: Date): boolean {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const cacheDate = new Date(createdAt);
  const cacheDay = new Date(cacheDate.getFullYear(), cacheDate.getMonth(), cacheDate.getDate());
  const marketCloseTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), MARKET_CLOSE_HOUR, 0, 0);

  // 如果缓存是今天创建的
  if (cacheDay.getTime() === today.getTime()) {
    // 只有在当前时间是盘后，且缓存是在今天盘中或盘前创建的情况下，才视为过期
    return now >= marketCloseTime && cacheDate < marketCloseTime;
  }

  // 如果缓存是昨天创建的
  if (cacheDay.getTime() === today.getTime() - 86400000) {
    return now >= marketCloseTime;
  }

  return true; // 如果缓存比昨天还早，视为过期（虽然实际上可能已经被 TTL 删除）
}

export default {
  getStockPriceByDates,
  getCachedStockPriceByDates,
};
