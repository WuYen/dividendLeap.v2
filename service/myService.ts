import { AuthorModel, IAuthor } from '../model/Author';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import { LineTokenModel } from '../model/lineToken';
import { DiffType, PostHistoricalResponse, processHistoricalInfo } from './historicalService';

export async function addLikeToAuthor(authorId: string): Promise<IAuthor | null> {
  let authorInfo = await AuthorModel.findOne({ name: authorId }).exec();

  if (!authorInfo) {
    authorInfo = new AuthorModel({
      name: authorId,
      likes: 0,
      dislikes: 0,
    });
  }

  authorInfo.likes += 1;

  await authorInfo.save();

  return authorInfo.toObject();
}

export async function toggleFavoritePost(userId: string, postId: string): Promise<any> {
  const user = await LineTokenModel.findOne({ channel: userId });

  if (!userId || !user) {
    throw new Error('使用者不存在');
  }

  const post = await PostInfoModel.findOne({ id: postId });
  if (!post) {
    throw new Error('文章不存在');
  }

  const favoritePostIndex = user.favoritePosts.findIndex((fp) => fp.postId?.toString() === post._id.toString());

  if (favoritePostIndex !== -1) {
    // 如果已存在，則移除
    user.favoritePosts.splice(favoritePostIndex, 1);
  } else {
    // 如果不存在，則添加
    user.favoritePosts.push({
      postId: post._id,
      dateAdded: new Date(),
    });
  }

  await user.save();
  return user;
}

export interface MyPostHistoricalResponse extends PostHistoricalResponse {
  cost?: number;
  shares?: number;
  notes?: string;
  profit: number | null;
  profitRate?: number | null;
}

export async function getFavoritePosts(userId: string): Promise<MyPostHistoricalResponse[]> {
  const rawData = await LineTokenModel.findOne({ channel: userId }).populate('favoritePosts.postId', '-__v').lean();

  const favoritePosts: MyPostHistoricalResponse[] = [];

  if (rawData?.favoritePosts) {
    for (const favoritePost of rawData.favoritePosts) {
      const postInfo = favoritePost.postId as IPostInfo;
      const data = await processHistoricalInfo(postInfo);

      // 计算 profit 和 profitRate
      let profit: number | null = null;
      let profitRate: number | null = null;

      if (favoritePost.cost !== undefined && favoritePost.shares !== undefined) {
        const cost = favoritePost.cost;
        const shares = favoritePost.shares;

        // 股票市值: 找到 LATEST 类型的 processedData
        const latestData = data.processedData.find((d) => d.type === DiffType.LATEST);
        if (latestData) {
          const stockValue = latestData.price * shares;
          const transactionFee = cost * shares * 0.001425;
          profit = stockValue - transactionFee - cost * shares;
          profitRate = (profit / (cost * shares)) * 100;
        }
      }

      favoritePosts.push({
        ...data,
        cost: favoritePost.cost,
        shares: favoritePost.shares,
        notes: favoritePost.notes,
        profit,
        profitRate,
      });
    }
  }

  return favoritePosts;
}

export async function updateFavoritePostInfo(
  userId: string,
  postId: string,
  updateInfo: {
    cost?: number;
    shares?: number;
    notes?: string;
  }
) {
  try {
    const post = await PostInfoModel.findOne({ id: postId });
    if (!post) {
      throw new Error('文章不存在');
    }

    const result = await LineTokenModel.findOneAndUpdate(
      {
        channel: userId,
        'favoritePosts.postId': post._id,
      },
      {
        $set: {
          'favoritePosts.$.cost': updateInfo.cost,
          'favoritePosts.$.shares': updateInfo.shares,
          'favoritePosts.$.notes': updateInfo.notes,
        },
      },
      { new: true }
    );

    if (!result) {
      throw new Error('更新失敗');
    }

    return result;
  } catch (error) {
    console.error('Error updating favorite post info:', error);
    throw error;
  }
}
