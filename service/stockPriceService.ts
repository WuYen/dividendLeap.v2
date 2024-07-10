import { StockHistoricalCache } from '../model/stockHistoricalCache';
import { getDateFragment } from '../utility/dateTime';
import { fugleCaller } from '../utility/fugleCaller';

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

export async function getStockPrice(stockNo: string, date: string): Promise<FugleStockHistoricalResponse | null> {
  try {
    const { year, month, day } = getDateFragment(date);
    const dt = year + '-' + month + '-' + day;
    const query = `fields=open,high,low,close,volume&from=${dt}&to=${dt}`;
    const response = await fugleCaller(stockNo, query);
    const rawData = response.data as FugleStockHistoricalResponse;
    return rawData;
  } catch (error) {
    console.log('fugle dayInfo error', error);
    return null;
  }
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
    const response = await fugleCaller(stockNo, query);
    const rawData = response.data as FugleStockHistoricalResponse;
    return rawData;
  } catch (error) {
    console.log('fugle dayInfo error', error);
    return null;
  }
}

const CACHE_EXPIRATION_HOURS = 24;
function isCacheExpired(lastUpdated: Date): boolean {
  //TODO: 要考慮 盤前 盤後  關鍵時間點  還有是不是跨天
  const expirationTime = new Date(lastUpdated.getTime() + CACHE_EXPIRATION_HOURS * 60 * 60 * 1000);
  return new Date() > expirationTime;
}

export async function getCachedStockPriceByDates(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<FugleStockHistoricalResponse | null> {
  let cachedData = await StockHistoricalCache.findOne({ stockNo, startDate, endDate });

  if (cachedData && !isCacheExpired(cachedData.lastUpdated)) {
    console.log('Cache hit');
    return cachedData.data;
  }

  try {
    const rawData = await getStockPriceByDates(stockNo, startDate, endDate);

    if (rawData) {
      // 更新缓存
      await StockHistoricalCache.findOneAndUpdate(
        { stockNo, startDate, endDate },
        {
          $set: {
            data: rawData,
            lastUpdated: new Date(),
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

export default {
  getStockPriceByDates,
  getStockPrice,
};

//getStockPrice('1314', '20240319');
