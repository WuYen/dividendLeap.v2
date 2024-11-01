import axios from 'axios';
import config from './config';
import { FugleDataset, QueryType, ResponseType, StockHistoricalQuery } from './fugleTypes';
import asyncLocalStorage from '../utility/asyncLocalStorage';

export class FugleAPIBuilder<T extends FugleDataset> {
  private dataset: T;
  private params: QueryType<T> = {} as QueryType<T>;

  constructor(dataset: T) {
    this.dataset = dataset;
  }

  setParam(params: QueryType<T>): this {
    this.params = { ...this.params, ...params };
    return this;
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
    try {
      const fullUrl = this.getURL();
      console.log(`Calling Fugle: ${fullUrl}`);
      const response = await axios.get(fullUrl, {
        headers: {
          'X-API-KEY': this.getApiKey(),
        },
      });
      return response.data as ResponseType<T>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Request failed: ${error.message}, Status: ${error.response?.status}, StatusText: ${error.response?.statusText}, URL: ${error.config?.url}`
        );
      } else {
        throw error;
      }
    }
  }

  getURL(): string {
    const useProxy = config.FUGLE_API_USE_PROXY;
    const baseUrl: string = useProxy
      ? 'https://monneey-fe846abf0722.herokuapp.com/tool/proxy/fugle'
      : 'https://api.fugle.tw/marketdata/v1.0';
    switch (this.dataset) {
      case FugleDataset.StockHistorical:
        const historicalParams = this.params as StockHistoricalQuery;
        const { from, to, fields } = historicalParams;
        const fieldsString = fields && fields.length > 0 ? fields.join(',') : 'open,high,low,close,volume';
        return useProxy
          ? `${baseUrl}/historical?symbol=${this.params.symbol}&fields=${fieldsString}&from=${from}&to=${to}`
          : `${baseUrl}/stock/historical/candles/${this.params.symbol}?fields=${fieldsString}&from=${from}&to=${to}`;
      case FugleDataset.StockIntradayQuote:
        return useProxy
          ? `${baseUrl}/intradayquote?symbol=${this.params.symbol}`
          : `${baseUrl}/stock/intraday/quote/${this.params.symbol}`;
      case FugleDataset.StockIntradayTicker:
        return useProxy
          ? `${baseUrl}/intradayticker?symbol=${this.params.symbol}`
          : `${baseUrl}/stock/intraday/ticker/${this.params.symbol}`;
      default:
        throw new Error('Unsupported dataset');
    }
  }
}
