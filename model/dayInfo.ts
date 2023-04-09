import { Model, Schema, model } from 'mongoose';

interface IDayInfo {
  stockNo: string;
  date: string;
  year: string;
  month: string;
  price: number;
  updateDate: string;
}

const DayInfoSchema: Schema = new Schema({
  stockNo: { type: String, required: true },
  date: { type: String, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  price: { type: Number, required: true },
  updateDate: { type: String, required: true },
});

const DayInfoModel: Model<IDayInfo> = model<IDayInfo>('DayInfo', DayInfoSchema);

export { IDayInfo, DayInfoModel };
