import { Model, Schema, model } from 'mongoose';

interface IPostInfo {
  tag: string | null;
  title: string;
  href: string | null;
  author: string | null;
  date: string | null;
}

const PostInfoSchema: Schema = new Schema({
  tag: { type: String, default: null },
  title: { type: String, required: true },
  href: { type: String, default: null },
  author: { type: String, default: null },
  date: { type: String, default: null },
});

const PostInfoModel: Model<IPostInfo> = model<IPostInfo>('PostInfo', PostInfoSchema);

// Add lastRecordSchema for PostInfo
const LastRecordSchema: Schema = new Schema({
  lastProcessedRecord: {
    type: Schema.Types.ObjectId,
    ref: 'PostInfo',
  },
});

const LastRecordModel: Model<any> = model('LastRecord', LastRecordSchema);

export { IPostInfo, PostInfoModel, LastRecordModel };
