import express, { Router, NextFunction, Request, Response } from 'express';
import { today, latestTradeDate, getPureDate } from '../utility/dateTime';
import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';
import { getStockPrice } from '../service/finMindService';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  const schedule: ISchedule[] = await ScheduleModel.find({ sourceType: '除權息預告', date: { $gte: today() } })
    .sort({ date: 1 })
    .lean()
    .select('stockNo');

  const latestTradeDateStr = latestTradeDate();
  const dayInfoList: IDayInfo[] = [];

  console.log('Total: ', schedule.length);
  for (let index = 0; index < schedule.length; index++) {
    const stockNo = schedule[index].stockNo;
    console.log('Process: ', index + 1, stockNo);
    const stockPriceInfo = (await getStockPrice(stockNo, latestTradeDateStr))[0];
    if (stockPriceInfo != undefined) {
      const data: IDayInfo = {
        stockNo: stockNo,
        date: getPureDate(stockPriceInfo.date),
        year: '2023',
        month: '04',
        price: stockPriceInfo.close,
        updateDate: '20230410',
      };
      dayInfoList.push(data);
    } else {
      console.log('day info unavailable: ', index + 1);
    }
    await delay(getRandomIntInclusive(500, 1400));
  }

  console.log('Save: ', dayInfoList.length);
  await DayInfoModel.deleteMany({ updateDate: '20230409' });
  DayInfoModel.insertMany(dayInfoList)
    .then(() => {
      console.log('Batch insert successful');
    })
    .catch((error: any) => {
      console.error('Batch insert failed', error);
    });

  res.json({ msg: 'success' });
});

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function delay(time: number) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('continue');
    }, time);
  });
}

export default router;
