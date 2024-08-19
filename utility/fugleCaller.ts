import axios from 'axios';
import config from './config';
import { FugleDataset, QueryType, ResponseType, StockHistoricalQuery } from './fugleTypes';
import asyncLocalStorage from '../utility/asyncLocalStorage';

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
      case FugleDataset.StockIntradayTicker:
        return `${this.baseUrl}/stock/intraday/ticker/${this.params.symbol}`;
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
      case FugleDataset.StockIntradayTicker:
        return '';
      default:
        throw new Error('Unsupported dataset');
    }
  }

  private getApiKey(): string {
    const store = asyncLocalStorage.getStore();
    if (store) {
      const apiKey = store.get('fugleApiKey');
      if (apiKey) {
        return apiKey;
      }
    }
    return config.FUGLE_API_KEY;
  }

  async get(): Promise<ResponseType<T>> {
    const url = this.getUrl();
    const queryString = this.getQueryString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    console.log(`Calling Fugle: ${fullUrl}`);

    const response = await axios.get(fullUrl, {
      headers: {
        'X-API-KEY': this.getApiKey(),
      },
    });
    return response.data as ResponseType<T>;
  }

  getURL(): string {
    const url = this.getUrl();
    const queryString = this.getQueryString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return fullUrl;
  }
}
