import express, { Router, NextFunction, Request, Response, urlencoded } from 'express';
import { getTodayWithTZ } from '../utility/dateTime';
import yahooStockAPI from 'yahoo-stock-api';

const router: Router = express.Router();

interface IndexMapping {
  key: string;
  value: string;
}
const indexMapping: IndexMapping[] = [
  { key: 'DJI', value: '道瓊工業指數' },
  { key: 'GSPC', value: '標普500指數' },
  { key: 'IXIC', value: 'NASDAQ指數' },
];

function getValueByKey(key: string): string | undefined {
  const normalizedKey = key.replace(/[\^%5E]/g, ''); // Normalize the key before searching

  const mapping = indexMapping.find((item) => item.key === normalizedKey);

  return mapping?.value;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const responseList = [];
  for (let index = 0; index < indexMapping.length; index++) {
    const result = await getHistoricalPrices('^' + indexMapping[index].key);
    responseList.push(result);
  }
  const messageBuilder: string[] = ['美股大盤當日趨勢:', ''];
  let accuDiff = 0;
  responseList.forEach((result, index: number) => {
    const data = result.response;
    const symbol = indexMapping[index].key;
    if (data.length > 0) {
      var diffResult = processDataDiff(symbol, data);
      var message = processMessage(symbol, diffResult)
      messageBuilder.push(index + 1 + '. ' + message);
      accuDiff += diffResult.diffRatio;
    }
  });
  const date = formatDateToYYYYMMDD(responseList[0].response[0].date);
  messageBuilder[1] = '美股時間:' + date;

  // (3個指數%相加/3，大於0.5%上升/下降，若波動小於0.5%就"平平")
  var avgDiff = accuDiff / 3;
  if (Math.abs(avgDiff) > 0.5) {
    messageBuilder.push('預測明日台股趨勢為 ' + avgDiff > 0 ? '上升' : '下降')
  } else {
    messageBuilder.push('預測明日台股趨勢為 ' + '平平')
  }

  const encodeMsg = encodeURIComponent(messageBuilder.join('\n'));
  const channel = req.query.channel;
  res.redirect(`/line/send?msg=${encodeMsg}&channel=${channel}`);
});

router.get('/:symbol', async (req: Request, res: Response, next: NextFunction) => {
  const symbol = req.params.symbol;
  const channel = req.query.channel;
  const result = await getHistoricalPrices(symbol);
  // const data = result.response as HistoricalPricesResponse[];
  const data = result.response;
  let message = data.length > 0 ? processMessage(symbol, result.response) : '';
  const date = formatDateToYYYYMMDD(data[0].date);
  message += '\n收盤時間: ' + date;
  const encodeMsg = encodeURIComponent(message);
  res.redirect(`/line/send?msg=${encodeMsg}&channel=${channel}`);
});

router.get('/raw/:symbol', async (req: Request, res: Response, next: NextFunction) => {
  const symbol = req.params.symbol;
  const result = await getHistoricalPrices(symbol);
  res.json(result);
});

// 美股大盤當日趨勢:
// 台灣時間:xx:xx
// 1.道瓊工業指數 34,509 ↑113(0.33%)
// 2.S&P 500指數 4,505 ↓4(0.10%)
// 3.NASDAQ指數 14,113 ↓24(0.18%)

// 預測明日台股趨勢為 "上升"
// (3個指數%相加/3，大於0.5%上升/下降，若波動小於0.5%就"平平")

const getHistoricalPrices = async (stockNo: string): Promise<any> => {
  const yahoo = new yahooStockAPI();
  const endDate = getTodayWithTZ(-4);
  const startDate = getTodayWithTZ(-4);
  startDate.setDate(-3);
  console.log(`get yahoo stock ${stockNo}, ${startDate}->${endDate}`);

  return new Promise((resolve, reject) => {
    yahoo
      .getHistoricalPrices({
        startDate,
        endDate,
        symbol: Boolean(stockNo) ? stockNo : 'AAPL',
        frequency: '1d',
      })
      .then((response) => {
        if (response.error) {
          reject(response.message);
        } else {
          resolve(response);
        }
      })
      .catch(reject);
  });
};

interface IDiff {
  symbol: string;
  diff: number;
  diffRatio: number;
  close: number;
}

const processDataDiff = (symbol: string, data: any[]): IDiff => {
  // 取出最近的兩個 date 的資料
  const latestTwoDates = data.slice(0, 2);
  const [d0, d1] = latestTwoDates;

  const difference = d0.adjClose - d1.adjClose;
  const diffRatio = ((d0.adjClose - d1.adjClose) / d1.adjClose) * 100;
  const title = getValueByKey(symbol) || symbol;

  //道瓊工業指數 34,509 ↑113(0.33%)
  return { symbol, diff: difference, diffRatio, close: d0.adjClose };
};

const processMessage = (symbol: string, data: any[]): string => {
  // 取出最近的兩個 date 的資料
  const latestTwoDates = data.slice(0, 2);
  const [d0, d1] = latestTwoDates;

  const difference = d0.adjClose - d1.adjClose;
  const diff = Math.abs(difference).toFixed(2);
  const diffRatio = ((d0.adjClose - d1.adjClose) / d1.adjClose) * 100;
  const title = getValueByKey(symbol) || symbol;

  //道瓊工業指數 34,509 ↑113(0.33%)
  return `${title} ${d0.adjClose} ${difference > 0 ? '↑' : '↓'}${diff}(${diffRatio.toFixed(2)}%)`;
};

const processMessageV2 = (symbol: string, data: IDiff): string => {
  // 取出最近的兩個 date 的資料
  const title = getValueByKey(symbol) || symbol;
  const arrow = data.diff > 0 ? '↑' : '↓';
  const diff = Math.abs(data.diff).toFixed(2);
  const diffRatio = data.diffRatio.toFixed(2);

  //道瓊工業指數 34,509 ↑113(0.33%)
  return `${title} ${data.close} ${arrow}${diff}(${diffRatio}%)`;
};

function formatDateToYYYYMMDD(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default router;
