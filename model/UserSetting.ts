import mongoose, { Model, Schema } from 'mongoose';
import { IFavoritePost } from './lineToken';

// 推播內容等級
export enum Level {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium',
  Test = 'test',
}

// LINE 推播設定
export interface LineNotifySetting {
  enabled: boolean;
  isGroup: boolean; // 是否為群組
  userId: string; // LINE ID
  displayName?: string; // LINE 顯示名稱（可選）
  messageLevel: Level;
}

// Telegram 推播設定
export interface TelegramNotifySetting {
  enabled: boolean;
  chatId: string;
  userName?: string;
  messageLevel: Level;
}

// Web Push 推播設定
export interface WebPushNotifySetting {
  enabled: boolean;
  endpoint: string;
  messageLevel: Level;
}

// 使用者設定介面
export interface IUserSetting {
  account: string; // 使用者帳號或識別 ID

  // 驗證資訊
  verifyCode?: string | null;
  verifyCodeExpires?: Date | null;

  // 使用者自訂內容
  favoritePosts: IFavoritePost[];
  keywords: string[];
  fugleApiKey?: string;

  // 通道設定
  line?: LineNotifySetting;
  telegram?: TelegramNotifySetting;
  webPush?: WebPushNotifySetting;
}

// 收藏貼文 schema
const FavoritePostSchema = new Schema<IFavoritePost>({
  postId: { type: Schema.Types.ObjectId, ref: 'PostInfo', required: true },
  cost: Number,
  shares: Number,
  notes: String,
  dateAdded: { type: Date, default: Date.now },
});

// 通道子 schema
const LineSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    isGroup: { type: Boolean, default: false },
    userId: { type: String, required: true },
    displayName: { type: String, default: null },
    messageLevel: {
      type: String,
      enum: Object.values(Level),
      default: Level.Basic,
    },
  },
  { _id: false }
);

const TelegramSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    chatId: { type: String, required: true },
    userName: { type: String, default: null },
    messageLevel: {
      type: String,
      enum: Object.values(Level),
      default: Level.Basic,
    },
  },
  { _id: false }
);

const WebPushSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    endpoint: { type: String, required: true },
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

    line: { type: LineSchema, default: undefined },
    telegram: { type: TelegramSchema, default: undefined },
    webPush: { type: WebPushSchema, default: undefined },
  },
  { timestamps: true }
);

const UserSettingModel: Model<IUserSetting> = mongoose.model<IUserSetting>('UserSetting', UserSettingSchema);

export { UserSettingModel };
