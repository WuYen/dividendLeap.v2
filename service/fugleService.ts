import axios from 'axios';
import { getDateFragment } from '../utility/dateTime';
import config from '../utility/config';

/**
 * fugle candles stock data
 * https://developer.fugle.tw/docs/data/http-api/historical/candles
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
export async function getStockPrice(stockNo: string, date: string) {
  try {
    const { year, month, day } = getDateFragment(date);
    const to = year + '-' + month + '-' + day;
    const { ...stDate } = getDateFragment('20240318');
    const from = stDate.year + '-' + stDate.month + '-' + stDate.day;
    //X-API-KEY: <YOUR_API_KEY> add in header
    const query = `fields=open,high,low,close,volume&from=${from}&to=${to}`;
    const response = await axios.get(`https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/0050?${query}`, {
      headers: {
        'X-API-KEY': config.FUGLE_API_KEY,
      },
    });
    // {"date":"2024-03-19","open":153.4,"high":154.55,"low":153,"close":154.05,"volume":8872114}
    const rawData = response.data as FugleStockHistoricalResponse[];
    console.log(rawData);
    return rawData;
  } catch (error) {
    console.log('finMind dayInfo error', error);
    return null;
  }
}

interface FugleStockHistoricalResponse {
  symbol: string;
  type: string;
  exchange: string;
  market: string;
  timeframe: string;
  data: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    turnover: number;
    change: number;
  }>;
}

//getStockPrice('1314', '20240319');
