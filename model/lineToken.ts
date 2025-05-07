// import mongoose, { Model, PopulatedDoc, Schema } from 'mongoose';
// import { IPostInfo } from './PostInfo';

// enum TokenLevel {
//   Basic = 'basic',
//   Standard = 'standard',
//   Premium = 'premium',
//   Test = 'test',
// }

// interface IFavoritePost {
//   postId: mongoose.Types.ObjectId | PopulatedDoc<IPostInfo>;
//   cost?: number;
//   shares?: number;
//   notes?: string;
//   dateAdded?: Date;
// }

// // Interface of user info
// interface ILineToken {
//   channel: string;
//   token: string;
//   updateDate: string;
//   notifyEnabled: boolean;
//   tokenLevel: TokenLevel[]; // 類型為陣列
//   verifyCode?: string | null;
//   verifyCodeExpires?: Date | null;
//   favoritePosts: IFavoritePost[];
//   keywords: string[]; // 新增關鍵字儲存
//   fugleApiKey?: string;
//   tgChatId?: string; //使用telegram 的user id
//   tgUserName?: string; //使用telegram 的user id
// }

// const FavoritePostSchema = new Schema<IFavoritePost>({
//   postId: { type: Schema.Types.ObjectId, ref: 'PostInfo', required: true },
//   cost: { type: Number },
//   shares: { type: Number },
//   notes: { type: String },
//   dateAdded: { type: Date, default: Date.now },
// });

// // Schema
// const LineTokenSchema: Schema = new Schema<ILineToken>(
//   {
//     channel: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     token: String,
//     updateDate: String,
//     notifyEnabled: {
//       type: Boolean,
//       default: true,
//     },
//     tokenLevel: {
//       type: [String],
//       enum: Object.values(TokenLevel),
//       default: [TokenLevel.Basic],
//     },
//     verifyCode: { type: String, default: null },
//     verifyCodeExpires: { type: Date, default: null },
//     favoritePosts: { type: [FavoritePostSchema], default: [] },
//     keywords: { type: [String], default: [] }, // 新增關鍵字儲存
//     fugleApiKey: { type: String, default: null }, // 新增個人token
//     tgChatId: { type: String, default: null }, // Telegram chat ID
//     tgUserName: { type: String, default: null }, // Telegram username
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
//   }
// );

// const LineTokenModel: Model<ILineToken> = mongoose.model<ILineToken>('LineToken', LineTokenSchema);

// export { LineTokenModel, ILineToken, TokenLevel, IFavoritePost };
