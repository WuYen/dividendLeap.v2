import axios from 'axios';
import config from '../utility/config';
import { FugleDataset, QueryType, ResponseType, StockHistoricalQuery } from './fugleTypes';

export async function getHistoricalCandles(stockNo: string, query: string) {
  //TODO: should remove once new FugleAPIBuilder is ready
  console.log(`call fugle historical/candles/${stockNo}?${query}`);
  return await axios.get(`https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/${stockNo}?${query}`, {
    headers: {
      'X-API-KEY': config.FUGLE_API_KEY,
    },
  });
}

async function fugleCaller(url: string) {
  console.log(`Calling Fugle API: ${url}`);
  return await axios.get(url, {
    headers: {
      'X-API-KEY': config.FUGLE_API_KEY,
    },
  });
}

export class FugleAPIBuilder<T extends FugleDataset> {
  private readonly baseUrl: string = 'https://api.fugle.tw/marketdata/v1.0';
  private dataset: T;
  private params: QueryType<T> = {} as QueryType<T>;

  constructor(dataset: T) {
    this.dataset = dataset;
  }

  setParam(params: QueryType<T>): this {
    this.params = { ...this.params, ...params };
    return this;
  }

  private getUrl(): string {
    switch (this.dataset) {
      case FugleDataset.StockHistorical:
        return `${this.baseUrl}/stock/historical/candles/${this.params.symbol}`;
      case FugleDataset.StockIntradayQuote:
        return `${this.baseUrl}/stock/intraday/quote/${this.params.symbol}`;
      default:
        throw new Error('Unsupported dataset');
    }
  }

  private getQueryString(): string {
    switch (this.dataset) {
      case FugleDataset.StockHistorical:
        const historicalParams = this.params as StockHistoricalQuery;
        const { from, to, fields } = historicalParams;
        const fieldsString = fields && fields.length > 0 ? fields.join(',') : 'open,high,low,close,volume';
        return `fields=${fieldsString}&from=${from}&to=${to}`;
      case FugleDataset.StockIntradayQuote:
        // Intraday quote 可能不需要額外的查詢參數
        return '';

      default:
        throw new Error('Unsupported dataset');
    }
  }

  async get(): Promise<ResponseType<T>> {
    const url = this.getUrl();
    const queryString = this.getQueryString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await fugleCaller(fullUrl);
    return response.data as ResponseType<T>;
  }
}
