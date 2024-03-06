import mongoose, { Model, Schema } from 'mongoose';

// Interface
interface ILineToken {
  channel: string;
  token: string;
  updateDate: string;
  notifyEnabled: boolean;
}

// Schema
const LineTokenSchema: Schema = new Schema({
  channel: String,
  token: String,
  updateDate: String,
  notifyEnabled: {
    type: Boolean,
    default: true,
  },
});
// All stock no and name
const LineTokenModel: Model<ILineToken> = mongoose.model<ILineToken>('LineToken', LineTokenSchema);

export { LineTokenModel, ILineToken };
