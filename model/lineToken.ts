import mongoose, { Model, Schema } from 'mongoose';

// Interface
interface ILineToken {
  channel: string;
  token: string;
  updateDate: string;
  notifyEnabled: boolean;
  // subscribedAuthors: Schema.Types.ObjectId[];
  // highlightAuthors: Schema.Types.ObjectId[];
}

// Schema
const LineTokenSchema: Schema = new Schema({
  channel: {
    type: String,
    required: true,
    unique: true, // Add the unique constraint here
  },
  token: String,
  updateDate: String,
  notifyEnabled: {
    type: Boolean,
    default: true,
  },
  // subscribedAuthors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
  // highlightAuthors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
});
// All stock no and name
const LineTokenModel: Model<ILineToken> = mongoose.model<ILineToken>('LineToken', LineTokenSchema);

export { LineTokenModel, ILineToken };
