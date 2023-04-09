import express, { Router, NextFunction, Request, Response } from 'express';
import { today } from '../utility/dateTime';
import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  //const list: IStockList[] = await StockListModel.find();
  //const scheduleNoList: string[] = await ScheduleModel.distinct('stockNo');
  const dayInfoList: IDayInfo[] = await DayInfoModel.find().lean();
  const schedule: ISchedule[] = await ScheduleModel.find({ sourceType: '除權息預告', date: { $gte: today() } })
    .sort({ date: 1 })
    .lean();

  const result: IListResult[] = [];
  for (let index = 0; index < schedule.length; index++) {
    const stockSchedule = schedule[index];
    const stockPriceInfo = dayInfoList.find((x) => x.stockNo == stockSchedule.stockNo);
    if (!Boolean(stockSchedule?.cashDividen) || !stockPriceInfo) {
      continue;
    }

    const yieldRatio = (((stockSchedule?.cashDividen || 0) / (stockPriceInfo?.price || 0)) * 100).toFixed(2);
    const dividendDate = stockSchedule.date;
    const formattedDate = `${dividendDate.slice(0, 4)}-${dividendDate.slice(4, 6)}-${dividendDate.slice(6)}`;
    const data: IListResult = {
      stockNo: stockSchedule?.stockNo || '',
      stockName: stockSchedule?.stockName || '',
      year: stockSchedule?.year || '',
      month: stockSchedule?.month || '',
      date: formattedDate,
      cashDividen: stockSchedule?.cashDividen.toFixed(2) || '',
      price: stockPriceInfo?.price.toFixed(2) || '',
      priceDate: stockPriceInfo?.date || '',
      yieldRatio: yieldRatio || '',
    };

    result.push(data);
  }

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
