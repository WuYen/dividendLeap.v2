export enum FugleDataset {
  StockHistorical = 'StockHistorical',
  StockIntradayQuote = 'StockIntradayQuote',
  StockIntradayTicker = 'StockIntradayTicker',
}

interface BaseParam {
  symbol: string;
}

export interface StockHistoricalQuery extends BaseParam {
  from: string;
  to: string;
  fields?: string[];
}

export interface StockIntradayQuoteQuery extends BaseParam {}

export interface StockIntradayTickerQuery extends BaseParam {}

export interface StockHistoricalResponse {
  symbol: string;
  type: string;
  exchange: string;
  market: string;
  timeframe: string;
  data: HistoricalDataInfo[];
}

export interface HistoricalDataInfo {
  date: string; //原始"2024-03-19" or 處理過會是yyyyMMdd
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  turnover: number;
  change: number;
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

export interface StockIntradayTickerResponse {
  date: string;
  type: string;
  exchange: string;
  market: string;
  symbol: string;
  name: string;
  nameEn: string;
  industry: string;
  securityType: string;
  referencePrice: number;
  limitUpPrice: number;
  limitDownPrice: number;
  canDayTrade: boolean;
  canBuyDayTrade: boolean;
  canBelowFlatMarginShortSell: boolean;
  canBelowFlatSBLShortSell: boolean;
  isAttention: boolean;
  isDisposition: boolean;
  isUnusuallyRecommended: boolean;
  isSpecificAbnormally: boolean;
  matchingInterval: number;
  securityStatus: string;
  boardLot: number;
  tradingCurrency: string;
  exercisePrice: number;
  exercisedVolume: number;
  cancelledVolume: number;
  remainingVolume: number;
  exerciseRatio: number;
  capPrice: number;
  floorPrice: number;
  maturityDate: string;
  previousClose: number;
  openTime: string;
  closeTime: string;
  isNewlyCompiled: boolean;
}

export type QueryType<T extends FugleDataset> = T extends FugleDataset.StockHistorical
  ? StockHistoricalQuery
  : T extends FugleDataset.StockIntradayQuote
  ? StockIntradayQuoteQuery
  : T extends FugleDataset.StockIntradayTicker
  ? StockIntradayTickerQuery
  : never;

export type ResponseType<T extends FugleDataset> = T extends FugleDataset.StockHistorical
  ? StockHistoricalResponse
  : T extends FugleDataset.StockIntradayQuote
  ? StockIntradayQuoteResponse
  : T extends FugleDataset.StockIntradayTicker
  ? StockIntradayTickerResponse
  : never;
