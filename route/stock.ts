import express, { Router, NextFunction, Request, Response } from 'express';
import { today } from '../utility/dateTime';
import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';

const router: Router = express.Router();

let cache: IListResult[] = [];
let cacheTimestamp: number = 0;

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  if (cache.length > 0) {
    if (+new Date() < cacheTimestamp + 600000) {
      res.json({ schedule: cache });
      return;
    } else {
      console.log('cache expire');
    }
  }
  const dayInfoList: IDayInfo[] = await DayInfoModel.find().lean();
  const schedule: ISchedule[] = await ScheduleModel.find({ sourceType: '除權息預告', date: { $gte: today() } })
    .sort({ date: 1 })
    .lean();

  const result: IListResult[] = [];
  for (let index = 0; index < schedule.length; index++) {
    const stockSchedule = schedule[index];
    const stockPriceInfo = dayInfoList.find((x) => x.stockNo == stockSchedule.stockNo);
    if (!Boolean(stockSchedule?.cashDividen)) {
      continue;
    }

    const yieldRatio = stockPriceInfo?.price
      ? ((stockSchedule.cashDividen / stockPriceInfo.price) * 100).toFixed(2)
      : '-';
    const dividendDate = stockSchedule.date;
    const formattedDate = `${dividendDate.slice(0, 4)}-${dividendDate.slice(4, 6)}-${dividendDate.slice(6)}`;
    const data: IListResult = {
      stockNo: stockSchedule.stockNo || '',
      stockName: stockSchedule.stockName || '',
      year: stockSchedule.year || '',
      month: stockSchedule.month || '',
      date: formattedDate,
      cashDividen: stockSchedule.cashDividen.toFixed(2) || '-',
      price: stockPriceInfo?.price.toFixed(2) || '-',
      priceDate: stockPriceInfo?.date || '-',
      yieldRatio: yieldRatio || '-',
    };

    result.push(data);
  }
  result.sort((x, y) => {
    if (x.date !== y.date) {
      return x.date.localeCompare(y.date); // sort by field "a"
    } else {
      return y.yieldRatio.localeCompare(x.yieldRatio); // sort by field "b"
    }
  });
  cache = result;
  cacheTimestamp = +new Date();
  res.json({ schedule: result });
});

interface IListResult {
  stockNo: string;
  stockName: string;
  year: string;
  month: string;
  date: string;
  cashDividen: string;
  price: string;
  priceDate: string;
  yieldRatio: string;
}

export default router;
