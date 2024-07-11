import axios from 'axios';
import config from './config';

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

export enum FinMindDataset {
  TaiwanStockPrice = 'TaiwanStockPrice',
  //TaiwanStockInfo = 'TaiwanStockInfo',
  // 其他数据集可以在这里添加
}

interface BaseQuery {
  dataset: FinMindDataset;
}

export interface StockPriceQuery extends BaseQuery {
  dataset: FinMindDataset.TaiwanStockPrice;
  data_id: string;
  start_date: string;
  end_date?: string;
}

type DatasetQueryMap = {
  [FinMindDataset.TaiwanStockPrice]: StockPriceQuery;
  //[FinMindDataset.TaiwanStockInfo]: TaiwanStockInfoQuery;
  // 其他数据集的映射可以在这里添加
};

export class QueryBuilder<T extends FinMindDataset> {
  private query: Partial<DatasetQueryMap[T]> = {};

  constructor(type: T) {
    this.query.dataset = type;
  }

  public setParam(params: Omit<DatasetQueryMap[T], 'dataset'>): this {
    this.query = { ...this.query, ...params };
    return this;
  }

  public toQueryString(): string {
    const { dataset } = this.query as DatasetQueryMap[T];
    let queryString = `dataset=${dataset}`;

    switch (dataset) {
      case FinMindDataset.TaiwanStockPrice:
        const { data_id, start_date, end_date } = this.query as StockPriceQuery;
        queryString += `&data_id=${data_id}&start_date=${start_date}&end_date=${end_date || start_date}`;
        break;
      // 其他数据集的处理逻辑可以在这里添加
    }

    return queryString;
  }

  public build(): Partial<DatasetQueryMap[T]> {
    return this.query;
  }
}

export async function finMindCaller(queryString: string) {
  try {
    const response = await axios.get(
      `https://api.finmindtrade.com/api/v4/data?${queryString}&token=${config.FINMIND_TOKEN}`
    );

    const rawData = response.data.data;
    return rawData;
  } catch (error) {
    console.log('finMind dayInfo error', error);
    return null;
  }
}

// export async function finMindCaller(stockNo: string, date: string) {
//   try {
//     const { year, month, day } = getDateFragment(date);
//     const dt = year + '-' + month + '-' + day;
//     const response = await axios.get(
//       `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${stockNo}&start_date=${dt}&end_date=${dt}&token=${config.FINMIND_TOKEN}`
//     );

//     const rawData = response.data.data;
//     return rawData;
//   } catch (error) {
//     console.log('finMind dayInfo error', error);
//     return null;
//   }
// }
