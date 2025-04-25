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
  isGroup: boolean;
  pushKey: string; // LINE Notify: token，LINE Bot: userId
  name?: string;
  messageLevel: Level;
  channelType: 'notify' | 'bot';
}

// Telegram 推播設定
export interface TelegramNotifySetting {
  enabled: boolean;
  pushKey: string; // chatId
  name?: string;
  messageLevel: Level;
}

// Web Push 推播設定
export interface WebPushNotifySetting {
  enabled: boolean;
  pushKey: string; // endpoint
  messageLevel: Level;
}

export interface ExpoNotifySetting {
  enabled: boolean;
  pushKey: string; // ExponentPushToken[...]
  messageLevel: Level;
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

  // 通道設定
  line?: LineNotifySetting;
  telegram?: TelegramNotifySetting;
  webPush?: WebPushNotifySetting;
  expoPush?: ExpoNotifySetting;
}

// 收藏貼文 schema
const FavoritePostSchema = new Schema<IFavoritePost>({
  postId: { type: Schema.Types.ObjectId, ref: 'PostInfo', required: true },
  cost: Number,
  shares: Number,
  notes: String,
  dateAdded: { type: Date, default: Date.now },
});

// LINE 通道 schema
const LineSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    isGroup: { type: Boolean, default: false },
    pushKey: { type: String, required: true },
    name: { type: String, default: null },
    messageLevel: {
      type: String,
      enum: Object.values(Level),
      default: Level.Basic,
    },
    channelType: {
      type: String,
      enum: ['notify', 'bot'],
      required: true,
    },
  },
  { _id: false }
);

// Telegram 通道 schema
const TelegramSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    pushKey: { type: String, required: true },
    name: { type: String, default: null },
    messageLevel: {
      type: String,
      enum: Object.values(Level),
      default: Level.Basic,
    },
  },
  { _id: false }
);

// WebPush 通道 schema
const WebPushSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    pushKey: { type: String, required: true },
    messageLevel: {
      type: String,
      enum: Object.values(Level),
      default: Level.Basic,
    },
  },
  { _id: false }
);

const ExpoSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: true },
  pushKey: { type: String, required: true },
  messageLevel: { type: String, enum: ['basic', 'premium'], default: 'basic' },
});

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
    expoPush: { type: ExpoSchema, default: undefined },
  },
  { timestamps: true }
);

const UserSettingModel: Model<IUserSetting> = mongoose.model<IUserSetting>('UserSetting', UserSettingSchema);

export { UserSettingModel };
