import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';
import { getPureDate, latestTradeDate, today, getDateFragment } from '../utility/dateTime';
import { getStockPrice } from '../service/finMindService';
import { delay } from '../utility/delay';

async function process() {
  const schedule: ISchedule[] = await ScheduleModel.find({ sourceType: '除權息預告', date: { $gte: today() } })
    .sort({ date: 1 })
    .lean()
    .select('stockNo');

  const latestTradeDateStr = latestTradeDate();
  const todayStr = today();
  const dayInfoList: IDayInfo[] = [];

  console.log('Total: ', schedule.length);
  for (let index = 0; index < schedule.length; index++) {
    const stockNo = schedule[index].stockNo;
    console.log('Process:', index + 1, stockNo);
    const stockPriceInfo = (await getStockPrice(stockNo, latestTradeDateStr))[0];
    if (stockPriceInfo != undefined) {
      const pureDate = getPureDate(stockPriceInfo.date);
      const dateTimeFragment = getDateFragment(pureDate);
      const data: IDayInfo = {
        stockNo: stockNo,
        date: pureDate,
        year: dateTimeFragment.year,
        month: dateTimeFragment.month,
        price: stockPriceInfo.close,
        updateDate: todayStr,
      };
      dayInfoList.push(data);
    } else {
      console.log('day info unavailable: ', index + 1);
    }
    await delay([500, 1400]);
  }

  try {
    if (dayInfoList.length > 0) {
      await DayInfoModel.deleteMany({});
      await DayInfoModel.insertMany(dayInfoList);
      console.log('Save: ', dayInfoList.length);
    }
  } catch (error) {
    console.error('Batch operation failed', error);
  }
}

export default process;
