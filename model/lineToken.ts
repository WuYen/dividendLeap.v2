import mongoose, { Model, PopulatedDoc, Schema } from 'mongoose';
import { IPostInfo } from './PostInfo';

enum TokenLevel {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium',
  Test = 'test',
}

// Interface
interface ILineToken {
  channel: string;
  token: string;
  updateDate: string;
  notifyEnabled: boolean;
  tokenLevel: TokenLevel[]; // 類型為陣列
  verifyCode?: string | null;
  verifyCodeExpires?: Date | null;
  favoritePosts: mongoose.Types.ObjectId[] | PopulatedDoc<IPostInfo>[]; // 新增字段
}

// Schema
const LineTokenSchema: Schema = new Schema({
  channel: {
    type: String,
    required: true,
    unique: true,
  },
  token: String,
  updateDate: String,
  notifyEnabled: {
    type: Boolean,
    default: true,
  },
  tokenLevel: {
    type: [String],
    enum: Object.values(TokenLevel),
    default: [TokenLevel.Basic],
  },
  verifyCode: { type: String, default: null },
  verifyCodeExpires: { type: Date, default: null },
  favoritePosts: {
    type: [Schema.Types.ObjectId],
    ref: 'PostInfo',
    default: [],
  },
});

const LineTokenModel: Model<ILineToken> = mongoose.model<ILineToken>('LineToken', LineTokenSchema);

export { LineTokenModel, ILineToken, TokenLevel };

async function updateExistData() {
  await LineTokenModel.updateMany(
    {}, // 查詢條件為空，表示選擇所有文件
    {
      $set: { tokenLevel: [TokenLevel.Basic] }, // 將 tokenTypes 設置為 [TokenType.Basic]
    },
    { multi: true } // 選項 { multi: true } 表示更新多個文件
  )
    .then(() => {
      console.log('所有現有文件的 tokenTypes 已更新為預設值 [TokenType.Basic]');
    })
    .catch((err) => {
      console.error('更新失敗:', err);
    });
}
