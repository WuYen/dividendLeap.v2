import mongoose, { Model, PopulatedDoc, Schema } from 'mongoose';
import { IPostInfo } from './PostInfo';

enum TokenLevel {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium',
  Test = 'test',
}

interface IFavoritePost {
  postId: mongoose.Types.ObjectId | PopulatedDoc<IPostInfo>;
  cost?: number;
  shares?: number;
  // 其他可能的個人化資訊
  notes?: string;
  dateAdded?: Date;
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
  favoritePosts: IFavoritePost[];
  keywords: string[]; // 新增關鍵字儲存
  fugleApiKey?: string; // Add this line
}

const FavoritePostSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'PostInfo', required: true },
  cost: { type: Number },
  shares: { type: Number },
  notes: { type: String },
  dateAdded: { type: Date, default: Date.now },
});

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
  favoritePosts: [FavoritePostSchema],
  keywords: { type: [String], default: [] }, // 新增關鍵字儲存
  fugleApiKey: { type: String, default: null }, // 新增個人token
});

const LineTokenModel: Model<ILineToken> = mongoose.model<ILineToken>('LineToken', LineTokenSchema);

export { LineTokenModel, ILineToken, TokenLevel, IFavoritePost };

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

async function migrateData() {
  // 获取原始 MongoDB 集合
  const collection = mongoose.connection.db.collection('linetokens');

  // 查询数据
  const rawData = await collection.find({ channel: 'Zack' }).toArray();

  for (const doc of rawData) {
    // 在这里对数据进行处理和转换

    // 使用新的模型进行更新
    await LineTokenModel.updateOne(
      { channel: doc.channel },
      {
        $set: {
          updateDate: '20240720',
          // 新的数据格式
          favoritePosts: doc.favoritePosts.map((post: any) => ({
            postId: post._id,
            cost: post.cost?.toString() || '',
            shares: post.shares?.toString() || '',
            notes: post.notes || '',
          })),
        },
      }
    );
  }

  console.log('Data migration completed.');
}
