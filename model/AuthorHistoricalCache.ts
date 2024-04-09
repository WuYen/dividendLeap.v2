import mongoose, { Model, Schema } from 'mongoose';

interface IHistoricalCache {
  timestamp: number;
  authorId: string;
  data: any[];
}

const AuthorHistoricalSchema: Schema = new Schema({
  timestamp: { type: Number, required: true },
  authorId: { type: String, required: true },
  data: { type: Array, required: true },
});

const AuthorHistoricalCache: Model<IHistoricalCache> = mongoose.model<IHistoricalCache>(
  'AuthorHistoricalCache',
  AuthorHistoricalSchema
);

export { AuthorHistoricalCache, IHistoricalCache };
