import mongoose, { Model, Schema } from 'mongoose';
import { StockHistoricalResponse } from '../utility/fugleTypes';

// 定义缓存结构
interface ICacheEntry {
  stockNo: string;
  startDate: string;
  endDate: string;
  data: StockHistoricalResponse;
  createdAt: Date;
}

// 定义 Mongoose Schema
const StockHistoricalCacheSchema = new Schema<ICacheEntry>({
  stockNo: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' },
});

StockHistoricalCacheSchema.index({ stockNo: 1, startDate: 1, endDate: 1 }, { unique: true });

const StockHistoricalCache: Model<ICacheEntry> = mongoose.model<ICacheEntry>(
  'StockHistoricalCache',
  StockHistoricalCacheSchema
);

export { StockHistoricalCache, ICacheEntry };
