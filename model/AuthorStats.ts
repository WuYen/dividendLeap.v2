import mongoose, { Schema, Document, Model, PopulatedDoc } from 'mongoose';
import { IAuthor } from './Author';
import { DiffInfo, DiffType } from '../service/historicalService';

export interface IStatsPost {
  title: string;
  href: string;
  date: string;
  id: number;
  highest: DiffInfo;
}

export interface IAuthorStats {
  name: string; // author name
  mean: number; // 平均%
  maxRate: number;
  minRate: number;
  median: number;
  stdDev: number; // 標準差
  posts: IStatsPost[];
  totalRate: number; //總報酬率
  score: number;
  combinedRank: number;
  author: PopulatedDoc<IAuthor & Document>; // 使用 PopulatedDoc
}

const AuthorStatsSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    mean: Number,
    maxRate: Number,
    minRate: Number,
    median: Number,
    stdDev: Number,
    posts: [
      {
        title: String,
        href: String,
        date: String,
        id: Number,
        highest: {
          date: String,
          diff: Number,
          diffPercent: Number,
          price: Number,
          type: {
            type: [String],
            enum: Object.values(DiffType),
          },
        },
      },
    ],
    totalRate: Number,
    score: Number,
    combinedRank: Number,
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  },
  { timestamps: true }
);

const AuthorStatsModel: Model<IAuthorStats> = mongoose.model<IAuthorStats>('AuthorStats', AuthorStatsSchema);

export { AuthorStatsModel };
