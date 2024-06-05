import express, { Router, NextFunction, Request, Response, urlencoded } from 'express';
import { getTodayWithTZ, toDateString } from '../utility/dateTime';
import yahooFinance from 'yahoo-finance2';
import { HistoricalOptions } from 'yahoo-finance2/dist/esm/src/modules/historical';

const router: Router = express.Router();

interface IDiff {
  symbol: string;
  diff: number;
  diffRatio: number;
  close: number;
}
interface IndexMapping {
  key: string;
  value: string;
  query: string;
}
const indexMapping: IndexMapping[] = [
  { key: 'DJI', value: '道瓊工業指數', query: '%5EDJI' },
  { key: 'GSPC', value: '標普500指數', query: '%5EGSPC' },
  { key: 'IXIC', value: 'NASDAQ指數', query: '%5EIXIC' },
];

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const responseList = [];
  for (let index = 0; index < indexMapping.length; index++) {
    const result = await getHistoricalPrices(indexMapping[index].query);
    responseList.push(result);
  }
  const messageBuilder: string[] = ['美股大盤當日趨勢:', ''];
  let accuDiff = 0;
  responseList.forEach((result, index: number) => {
    const data = result;
    const symbol = indexMapping[index];
    if (data.length > 0) {
      var diffResult = processDataDiff(symbol.key, data);
      var message = processMessage(symbol.value, diffResult);
      messageBuilder.push(index + 1 + '. ' + message);
      accuDiff += diffResult.diffRatio;
    }
  });

  var d = new Date(responseList[0].slice(-1)[0].date);
  messageBuilder[1] = '美股時間:' + toDateString(d, '-');

  // (3個指數%相加/3，大於0.5%上升/下降，若波動小於0.5%就"平平")
  var avgDiff = accuDiff / 3;
  if (Math.abs(avgDiff) > 0.5) {
    messageBuilder.push('預測今日台股趨勢為 ' + (avgDiff > 0 ? '上升' : '下降'));
  } else {
    messageBuilder.push('預測今日台股趨勢為 ' + '平平');
  }

  const channel = req.query.channel || '';
  if (channel?.length) {
    const encodeMsg = encodeURIComponent(messageBuilder.join('\n'));
    res.redirect(`/line/send?msg=${encodeMsg}&channel=${channel}`);
  } else {
    res.sendSuccess(200, { message: messageBuilder.join('\n') });
  }
});

router.get('/raw/:symbol', async (req: Request, res: Response, next: NextFunction) => {
  const symbol = req.params.symbol;
  const result = await getHistoricalPrices(symbol);
  res.sendSuccess(200, { data: result });
});

// 美股大盤當日趨勢:
// 台灣時間:xx:xx
// 1.道瓊工業指數 34,509 ↑113(0.33%)
// 2.S&P 500指數 4,505 ↓4(0.10%)
// 3.NASDAQ指數 14,113 ↓24(0.18%)

// 預測明日台股趨勢為 "上升"
// (3個指數%相加/3，大於0.5%上升/下降，若波動小於0.5%就"平平")

const getHistoricalPrices = async (stockNo: string): Promise<any> => {
  // const yahoo = new yahooStockAPI();
  const endDate = getTodayWithTZ(-4);
  const startDate = getTodayWithTZ(-4);
  startDate.setDate(-3);
  console.log(`get ${stockNo}, from:${startDate}, to:${endDate}`);

  const query = Boolean(stockNo) ? stockNo : 'AAPL';
  const queryOptions: HistoricalOptions = { period1: startDate, interval: '1d' };
  const result = await yahooFinance.historical(query, queryOptions);
  return result;
};

const processDataDiff = (symbol: string, data: any[]): IDiff => {
  // 取出最近的兩個 date 的資料
  const latestTwoDates = data.slice(-2);
  const [d0, d1] = latestTwoDates;

  const difference = d0.adjClose - d1.adjClose;
  const diffRatio = ((d0.adjClose - d1.adjClose) / d1.adjClose) * 100;

  //道瓊工業指數 34,509 ↑113(0.33%)
  return { symbol, diff: difference, diffRatio, close: d0.adjClose };
};

const processMessage = (symbol: string, data: IDiff): string => {
  // 取出最近的兩個 date 的資料
  const title = symbol;
  const arrow = data.diff > 0 ? '↑' : '↓';
  const diff = Math.abs(data.diff).toFixed(2);
  const diffRatio = data.diffRatio.toFixed(2);

  //道瓊工業指數 34,509 ↑113(0.33%)
  return `${title} ${data.close.toFixed(2)} ${arrow}${diff}(${diffRatio}%)`;
};

export default router;
