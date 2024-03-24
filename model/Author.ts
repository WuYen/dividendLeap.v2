import mongoose, { Model, Schema } from 'mongoose';

interface IAuthor {
  name: string;
}

const AuthorSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const AuthorModel: Model<IAuthor> = mongoose.model<IAuthor>('Author', AuthorSchema);

export { AuthorModel, IAuthor };
