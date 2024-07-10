import mongoose, { Model, Schema } from 'mongoose';
import { FugleStockHistoricalResponse } from '../service/stockPriceService';

// 定义缓存结构
interface ICacheEntry {
  stockNo: string;
  startDate: string;
  endDate: string;
  data: FugleStockHistoricalResponse;
  lastUpdated: Date;
}

// 定义 Mongoose Schema
const StockHistoricalCacheSchema = new Schema<ICacheEntry>({
  stockNo: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const StockHistoricalCache: Model<ICacheEntry> = mongoose.model<ICacheEntry>(
  'StockHistoricalCache',
  StockHistoricalCacheSchema
);

export { StockHistoricalCache, ICacheEntry };
