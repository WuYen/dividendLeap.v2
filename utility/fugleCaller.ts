import axios from 'axios';
import config from '../utility/config';

//TODO: add type to handel call historical/candles or other endpoint

export async function fugleCaller(stockNo: string, query: string) {
  console.log(`call fugle historical/candles/${stockNo}?${query}`);
  return await axios.get(`https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/${stockNo}?${query}`, {
    headers: {
      'X-API-KEY': config.FUGLE_API_KEY,
    },
  });
}
