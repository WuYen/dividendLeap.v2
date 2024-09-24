import mongoose, { Model, Schema } from 'mongoose';

interface IAuthor {
  name: string;
  likes: number; // 新增点赞字段
  dislikes: number; // 新增倒赞字段
}

const AuthorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {
      type: Number,
      default: 0, // 默认值为 0
    },
    dislikes: {
      type: Number,
      default: 0, // 默认值为 0
    },
  },
  { timestamps: true }
);

const AuthorModel: Model<IAuthor> = mongoose.model<IAuthor>('Author', AuthorSchema);

export { AuthorModel, IAuthor };
