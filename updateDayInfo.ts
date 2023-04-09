import mongoose from 'mongoose';
import { ScheduleModel, ISchedule } from './model/schedule';
import { DayInfoModel, IDayInfo } from './model/dayInfo';
import config from './utility/config';
import { getPureDate, latestTradeDate, today } from './utility/dateTime';
import { getStockPrice } from './service/finMindService';

mongoose.connect(config.MONGODB_URI).then(async () => {
  const schedule: ISchedule[] = await ScheduleModel.find({ sourceType: '除權息預告', date: { $gte: today() } })
    .sort({ date: 1 })
    .lean()
    .select('stockNo');

  const dayInfoList: IDayInfo[] = [];
  console.log('Total: ', schedule.length);
  for (let index = 0; index < schedule.length; index++) {
    const stockNo = schedule[index].stockNo;
    console.log('Process: ', index + 1, stockNo);
    const stockPriceInfo = (await getStockPrice(stockNo, latestTradeDate()))[0];

    const data: IDayInfo = {
      stockNo: stockNo,
      date: getPureDate(stockPriceInfo.date),
      year: '2023',
      month: '04',
      price: stockPriceInfo.close,
      updateDate: '20230409',
    };
    dayInfoList.push(data);
    await delay(getRandomIntInclusive(500, 1400));
  }
  console.log('Save: ', dayInfoList.length);
  DayInfoModel.insertMany(dayInfoList)
    .then(() => {
      console.log('Batch insert successful');
    })
    .catch((error: any) => {
      console.error('Batch insert failed', error);
    })
    .finally(() => {
      mongoose.disconnect();
    });
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
