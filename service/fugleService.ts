import axios from 'axios';
import { getDateFragment } from '../utility/dateTime';
import config from '../utility/config';

/**
 * fugle candles stock data
 * https://developer.fugle.tw/docs/data/http-api/historical/candles
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
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
//TODO: move this caller to utility, and make historical/candles to something like channel
async function fugleCaller(stockNo: string, query: string) {
  console.log(`call fugle historical/candles/${stockNo}?${query}`);
  return await axios.get(`https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/${stockNo}?${query}`, {
    headers: {
      'X-API-KEY': config.FUGLE_API_KEY,
    },
  });
}

export default {
  getStockPriceByDates,
  getStockPrice,
};

//getStockPrice('1314', '20240319');
