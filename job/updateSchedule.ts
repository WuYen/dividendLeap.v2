import { ScheduleModel, ISchedule } from '../model/schedule';

//https://goodinfo.tw/tw/StockDividendScheduleList.asp?MARKET_CAT=%E5%85%A8%E9%83%A8&INDUSTRY_CAT=%E5%85%A8%E9%83%A8&YEAR=%E5%8D%B3%E5%B0%87%E9%99%A4%E6%AC%8A%E6%81%AF
// var result = [];
// document
//   .querySelector('#tblDetail')
//   .querySelectorAll('tr[align="center"]')
//   .forEach((elem) => {
//     var td = elem.querySelectorAll('td');
//     const [year, month, day] = td[4].innerText.split('\n')[0].split(/['/]/); // split the input string by single quote and forward slash
//     const fullYear = `20${year}`; // prepend '20' to the year
//     result.push({
//       stockNo: td[1].innerText,
//       stockName: td[2].innerText,
//       date: `${fullYear}${month}${day}`,
//       cashDividen: td[15].innerText,
//     });
//   });

export default async function process(rawData: any[]) {
  const schedules: ISchedule[] = rawData.map((source: any) => {
    const newSchedule: ISchedule = {
      stockNo: source.stockNo,
      stockName: source.stockName,
      year: '2023',
      month: source.date.substring(4, 6),
      date: source.date,
      cashDividen: parseFloat(source.cashDividen),
      others: [],
      updateDate: '20230410',
      sourceType: '除權息預告',
    };
    return newSchedule;
  });
  console.log('sample data', schedules[0]);
  try {
    await ScheduleModel.deleteMany({ sourceType: '除權息預告' });
    await ScheduleModel.insertMany(schedules);
  } catch (error) {
    console.error('Update Schedule failed', error);
  }
}
