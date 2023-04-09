import mongoose, { Model, Schema } from 'mongoose';
interface IKeyValue {
  key: string;
  value: any;
}

// Interface
interface ISchedule {
  stockNo: string;
  stockName: string;
  year: string;
  month: string;
  date: string;
  cashDividen: number;
  others: IKeyValue[]; //{key,value}
  updateDate: string; //yyyymmdd
  sourceType: string;
}

// Schema
const ScheduleSchema: Schema = new Schema({
  stockNo: String,
  stockName: String,
  year: String,
  month: String,
  date: String,
  cashDividen: Number,
  others: Array,
  updateDate: String,
  sourceType: String,
});

const ScheduleModel: Model<ISchedule> = mongoose.model<ISchedule>('Schedule', ScheduleSchema);

export { ScheduleModel, ISchedule, IKeyValue };
