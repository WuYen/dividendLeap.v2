import mongoose from 'mongoose';
import { ScheduleModel, ISchedule } from './model/schedule';
import config from './utility/config';

const rawData = [
  {
    stockNo: '1234',
    stockName: '黑松',
    date: '20230710',
    cashDividen: '1.8',
  },
  {
    stockNo: '1293',
    stockName: '利統',
    date: '20230419',
    cashDividen: '0.7',
  },
  {
    stockNo: '1315',
    stockName: '達新',
    date: '20230414',
    cashDividen: '3.5',
  },
  {
    stockNo: '1524',
    stockName: '耿鼎',
    date: '20230413',
    cashDividen: '1',
  },
  {
    stockNo: '1587',
    stockName: '吉茂',
    date: '20230602',
    cashDividen: '1',
  },
  {
    stockNo: '1604',
    stockName: '聲寶',
    date: '20230427',
    cashDividen: '1.5',
  },
  {
    stockNo: '2064',
    stockName: '晉椿',
    date: '20230413',
    cashDividen: '1',
  },
  {
    stockNo: '2070',
    stockName: '精湛',
    date: '20230412',
    cashDividen: '1.5',
  },
  {
    stockNo: '2109',
    stockName: '華豐',
    date: '20230414',
    cashDividen: '0.4',
  },
  {
    stockNo: '2313',
    stockName: '華通',
    date: '20230413',
    cashDividen: '2.7',
  },
  {
    stockNo: '2324',
    stockName: '仁寶',
    date: '20230420',
    cashDividen: '1.2',
  },
  {
    stockNo: '2359',
    stockName: '所羅門',
    date: '20230710',
    cashDividen: '1.5',
  },
  {
    stockNo: '2368',
    stockName: '金像電',
    date: '20230413',
    cashDividen: '3.5',
  },
  {
    stockNo: '2382',
    stockName: '廣達',
    date: '20230414',
    cashDividen: '6',
  },
  {
    stockNo: '2450',
    stockName: '神腦',
    date: '20230620',
    cashDividen: '2.2',
  },
  {
    stockNo: '2477',
    stockName: '美隆電',
    date: '20230427',
    cashDividen: '0.8',
  },
  {
    stockNo: '2496',
    stockName: '卓越',
    date: '20230414',
    cashDividen: '3.3',
  },
  {
    stockNo: '2528',
    stockName: '皇普',
    date: '20230413',
    cashDividen: '0.5',
  },
  {
    stockNo: '2535',
    stockName: '達欣工',
    date: '20230420',
    cashDividen: '2.5',
  },
  {
    stockNo: '2636',
    stockName: '台驊投控',
    date: '20230529',
    cashDividen: '5',
  },
  {
    stockNo: '3158',
    stockName: '嘉實',
    date: '20230414',
    cashDividen: '5',
  },
  {
    stockNo: '3257',
    stockName: '虹冠電',
    date: '20230426',
    cashDividen: '1',
  },
  {
    stockNo: '3289',
    stockName: '宜特',
    date: '20230413',
    cashDividen: '1',
  },
  {
    stockNo: '3557',
    stockName: '嘉威',
    date: '20230626',
    cashDividen: '5',
  },
  {
    stockNo: '4207',
    stockName: '環泰',
    date: '20230420',
    cashDividen: '0.35',
  },
  {
    stockNo: '4528',
    stockName: '江興鍛',
    date: '20230414',
    cashDividen: '1.3',
  },
  {
    stockNo: '4532',
    stockName: '瑞智',
    date: '20230413',
    cashDividen: '0.9',
  },
  {
    stockNo: '4568',
    stockName: '科際精密',
    date: '20230420',
    cashDividen: '3.8',
  },
  {
    stockNo: '4575',
    stockName: '銓寶',
    date: '20230420',
    cashDividen: '2',
  },
  {
    stockNo: '4973',
    stockName: '廣穎',
    date: '20230414',
    cashDividen: '2',
  },
  {
    stockNo: '5201',
    stockName: '凱衛',
    date: '20230413',
    cashDividen: '0.45',
  },
  {
    stockNo: '5212',
    stockName: '凌網',
    date: '20230419',
    cashDividen: '2.6',
  },
  {
    stockNo: '5278',
    stockName: '尚凡',
    date: '20230420',
    cashDividen: '2.79',
  },
  {
    stockNo: '5287',
    stockName: '數字',
    date: '20230413',
    cashDividen: '4.5',
  },
  {
    stockNo: '5388',
    stockName: '中磊',
    date: '20230413',
    cashDividen: '4.5',
  },
  {
    stockNo: '5432',
    stockName: '新門',
    date: '20230710',
    cashDividen: '1',
  },
  {
    stockNo: '5520',
    stockName: '力泰',
    date: '20230414',
    cashDividen: '3.95',
  },
  {
    stockNo: '5522',
    stockName: '遠雄',
    date: '20230615',
    cashDividen: '3',
  },
  {
    stockNo: '5547',
    stockName: '久舜',
    date: '20230412',
    cashDividen: '1.6',
  },
  {
    stockNo: '6028',
    stockName: '公勝保經',
    date: '20230420',
    cashDividen: '3',
  },
  {
    stockNo: '6104',
    stockName: '創惟',
    date: '20230413',
    cashDividen: '2.5',
  },
  {
    stockNo: '6128',
    stockName: '上福',
    date: '20230706',
    cashDividen: '2.2',
  },
  {
    stockNo: '6224',
    stockName: '聚鼎',
    date: '20230420',
    cashDividen: '1.5',
  },
  {
    stockNo: '6231',
    stockName: '系微',
    date: '20230712',
    cashDividen: '6.3',
  },
  {
    stockNo: '6274',
    stockName: '台燿',
    date: '20230413',
    cashDividen: '4',
  },
  {
    stockNo: '6294',
    stockName: '智基',
    date: '20230414',
    cashDividen: '8.8',
  },
  {
    stockNo: '6470',
    stockName: '宇智',
    date: '20230420',
    cashDividen: '3.998',
  },
  {
    stockNo: '6548',
    stockName: '長科*',
    date: '20230608',
    cashDividen: '0.81',
  },
  {
    stockNo: '6732',
    stockName: '昇佳電子',
    date: '20230413',
    cashDividen: '15',
  },
  {
    stockNo: '6737',
    stockName: '秀育',
    date: '20230419',
    cashDividen: '1',
  },
  {
    stockNo: '6747',
    stockName: '亨泰光',
    date: '20230413',
    cashDividen: '9.095',
  },
  {
    stockNo: '6756',
    stockName: '威鋒電子',
    date: '20230414',
    cashDividen: '7.489',
  },
  {
    stockNo: '6771',
    stockName: '平和環保',
    date: '20230413',
    cashDividen: '4',
  },
  {
    stockNo: '6780',
    stockName: '學習王',
    date: '20230417',
    cashDividen: '1.2',
  },
  {
    stockNo: '8027',
    stockName: '鈦昇',
    date: '20230420',
    cashDividen: '2.003',
  },
  {
    stockNo: '8996',
    stockName: '高力',
    date: '20230413',
    cashDividen: '1.5',
  },
  {
    stockNo: '9962',
    stockName: '有益',
    date: '20230413',
    cashDividen: '1.8',
  },
];
//https://goodinfo.tw/tw/StockDividendScheduleList.asp?MARKET_CAT=%E5%85%A8%E9%83%A8&INDUSTRY_CAT=%E5%85%A8%E9%83%A8&YEAR=%E5%8D%B3%E5%B0%87%E9%99%A4%E6%AC%8A%E6%81%AF
// var result =[];
// document.querySelector("#tblDetail").querySelectorAll('tr[align="center"]').forEach(elem=>{
//     var td = elem.querySelectorAll("td");
//     const [year, month, day] = td[4].innerText.split('\n')[0].split(/['/]/); // split the input string by single quote and forward slash
// const fullYear = `20${year}`; // prepend '20' to the year
//     result.push({
//        stockNo: td[1].innerText,
//         stockName: td[2].innerText,
//         date: `${year}${month}${day}`,
//         cashDividen: td[15].innerText,
//     })
// })
const schedules: ISchedule[] = rawData.map((source: any) => {
  const newSchedule: ISchedule = {
    stockNo: source.stockNo,
    stockName: source.stockName,
    year: '2023',
    month: source.date.substring(4, 6),
    date: source.date, //dividend date '20210601'
    cashDividen: parseFloat(source.cashDividen),
    others: [],
    updateDate: '20230410',
    sourceType: '除權息預告',
  };
  return newSchedule;
});

console.log('sample data', schedules[0]);

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI).then(async () => {
  await ScheduleModel.deleteMany({ sourceType: '除權息預告' });

  ScheduleModel.insertMany(schedules)
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
