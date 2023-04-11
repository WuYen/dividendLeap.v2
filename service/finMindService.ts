import axios from 'axios';
import { getDateFragment } from '../utility/dateTime';
import config from '../utility/config';

/**
 * 從 finMind 抓每日盤後個股股價
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
export async function getStockPrice(stockNo: string, date: string) {
  try {
    const { year, month, day } = getDateFragment(date);
    const dt = year + '-' + month + '-' + day;
    const response = await axios.get(
      `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${stockNo}&start_date=${dt}&end_date=${dt}&token=${config.FINMIND_TOKEN}`
    );
    // {
    //     date: '2023-04-07',
    //     stock_id: '1314',
    //     Trading_Volume: 4816759,
    //     Trading_money: 47519775,
    //     open: 9.88,
    //     max: 9.9,
    //     min: 9.85,
    //     close: 9.86,
    //     spread: 0,
    //     Trading_turnover: 1455
    // }
    const rawData = response.data.data;
    return rawData;
  } catch (error) {
    console.log('finMind dayInfo error', error);
    return null;
  }
}

// getStockPrice('1314', '20230407');
