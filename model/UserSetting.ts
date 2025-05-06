import mongoose, { Model, Schema } from 'mongoose';
import { IFavoritePost } from './lineToken';

// 推播內容等級
export enum Level {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium',
  Test = 'test',
}

export interface ChannelSetting {
  type: 'line' | 'telegram' | 'webPush' | 'expo'; // 通道類型
  enabled: boolean; // 是否啟用
  token: string; // 通道的唯一標識（如 pushKey、chatId、endpoint 等）
  name?: string; // 通道名稱（可選）
  messageLevel: Level; // 推播內容等級
  isGroup?: boolean; // 是否為群組（目前僅適用於 LINE）
}

// 使用者設定介面
export interface IUserSetting {
  account: string;

  // 驗證資訊
  verifyCode?: string | null;
  verifyCodeExpires?: Date | null;

  // 使用者自訂內容
  favoritePosts: IFavoritePost[];
  keywords: string[];
  fugleApiKey?: string;

  // 通道設定（統一為陣列結構）
  channels: ChannelSetting[];
}

// 收藏貼文 schema
const FavoritePostSchema = new Schema<IFavoritePost>({
  postId: { type: Schema.Types.ObjectId, ref: 'PostInfo', required: true },
  cost: Number,
  shares: Number,
  notes: String,
  dateAdded: { type: Date, default: Date.now },
});

const ChannelSchema = new Schema<ChannelSetting>(
  {
    type: { type: String, enum: ['line', 'telegram', 'webPush', 'expo'], required: true },
    enabled: { type: Boolean, default: true },
    token: { type: String, required: true },
    name: { type: String, default: null },
    messageLevel: {
      type: String,
      enum: Object.values(Level),
      default: Level.Basic,
    },
  },
  { _id: false }
);

// 主 schema
const UserSettingSchema = new Schema<IUserSetting>(
  {
    account: { type: String, required: true, unique: true },
    verifyCode: { type: String, default: null },
    verifyCodeExpires: { type: Date, default: null },
    favoritePosts: { type: [FavoritePostSchema], default: [] },
    keywords: { type: [String], default: [] },
    fugleApiKey: { type: String, default: null },
    channels: { type: [ChannelSchema], default: [] },
  },
  { timestamps: true }
);

const UserSettingModel: Model<IUserSetting> = mongoose.model<IUserSetting>('UserSetting', UserSettingSchema);

export { UserSettingModel };
