// const mongoose = require('mongoose');

// // Schema
// const Schema = mongoose.Schema;

// const Model = mongoose.model(
//   'StockList', // all stock no and name
//   new Schema({
//     stockNo: String,
//     stockName: String,
//     updateDate: String,
//   })
// );

// module.exports = Model;

import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface
interface IStockList extends Document {
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

const StockListModel: Model<IStockList> = mongoose.model<IStockList>(
  'StockList', // all stock no and name
  StockListSchema
);

export { StockListModel, IStockList };
