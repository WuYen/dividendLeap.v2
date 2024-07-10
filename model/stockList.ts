import mongoose, { Model, Schema } from 'mongoose';

interface IStockList {
  stockNo: string;
  stockName: string;
  updateDate: string;
}

// Schema
const StockListSchema: Schema = new Schema({
  stockNo: String,
  stockName: String,
  updateDate: String,
});

// All stock no and name
const StockListModel: Model<IStockList> = mongoose.model<IStockList>('StockList', StockListSchema);

export { StockListModel, IStockList };
