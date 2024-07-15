export enum FugleDataset {
  StockHistorical = 'StockHistorical',
  StockIntradayQuote = 'StockIntradayQuote',
}

interface BaseParam {
  symbol: string;
}

export interface StockHistoricalQuery extends BaseParam {
  from: string;
  to: string;
  fields?: string[];
}

export interface StockIntradayQuoteQuery extends BaseParam {
  // 可能不需要額外的參數
}

export type QueryType<T extends FugleDataset> = T extends FugleDataset.StockHistorical
  ? StockHistoricalQuery
  : T extends FugleDataset.StockIntradayQuote
  ? StockIntradayQuoteQuery
  : never;

export interface StockHistoricalResponse {
  symbol: string;
  type: string;
  exchange: string;
  market: string;
  timeframe: string;
  data: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    turnover: number;
    change: number;
  }>;
}

export interface StockIntradayQuoteResponse {
  date: string;
  type: string;
  exchange: string;
  market: string;
  symbol: string;
  name: string;
  referencePrice: number;
  previousClose: number;
  openPrice: number;
  openTime: number;
  highPrice: number;
  highTime: number;
  lowPrice: number;
  lowTime: number;
  closePrice: number;
  closeTime: number;
  avgPrice: number;
  change: number;
  changePercent: number;
  amplitude: number;
  lastPrice: number;
  lastSize: number;
  bids: Array<{
    price: number;
    size: number;
  }>;
  asks: Array<{
    price: number;
    size: number;
  }>;
  total: {
    tradeValue: number;
    tradeVolume: number;
    tradeVolumeAtBid: number;
    tradeVolumeAtAsk: number;
    transaction: number;
    time: number;
  };
  lastTrade: {
    bid: number;
    ask: number;
    price: number;
    size: number;
    time: number;
    serial: number;
  };
  lastTrial: {
    bid: number;
    ask: number;
    price: number;
    size: number;
    time: number;
    serial: number;
  };
  isClose: boolean;
  serial: number;
  lastUpdated: number;
}

export type ResponseType<T extends FugleDataset> = T extends FugleDataset.StockHistorical
  ? StockHistoricalResponse
  : T extends FugleDataset.StockIntradayQuote
  ? StockIntradayQuoteResponse
  : never;
