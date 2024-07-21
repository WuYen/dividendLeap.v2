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

export async function toggleFavoritePost(userId: string, postId: string): Promise<MyPostHistoricalResponse | null> {
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

  // Re-fetch the updated favorite post with populated data
  const updatedFavoritePost = await LineTokenModel.findOne(
    { channel: userId, 'favoritePosts.postId': post._id },
    { 'favoritePosts.$': 1 }
  )
    .populate('favoritePosts.postId', '-__v')
    .lean();

  if (!updatedFavoritePost) {
    return null;
  }

  const updatedPost = updatedFavoritePost.favoritePosts[0];
  const processedPost = await processPostData(updatedPost);
  return processedPost;
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
      const processedPost = await processPostData(favoritePost);
      favoritePosts.push(processedPost);
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
): Promise<MyPostHistoricalResponse> {
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

    // Re-fetch the updated favorite post with populated data
    const updatedFavoritePost = await LineTokenModel.findOne(
      { channel: userId, 'favoritePosts.postId': post._id },
      { 'favoritePosts.$': 1 }
    )
      .populate('favoritePosts.postId', '-__v')
      .lean();

    if (!updatedFavoritePost) {
      throw new Error('更新後找不到文章');
    }

    // Assume there's only one favorite post with the given postId
    const updatedPost = updatedFavoritePost.favoritePosts[0];

    // Process the updated favorite post
    const processedPost = await processPostData(updatedPost);

    return processedPost;
  } catch (error) {
    console.error('Error updating favorite post info:', error);
    throw error;
  }
}

async function processPostData(favoritePost: any): Promise<MyPostHistoricalResponse> {
  const postInfo = favoritePost.postId as IPostInfo;
  const data = await processHistoricalInfo(postInfo);

  // 计算 profit 和 profitRate
  let profit: number | null = null;
  let profitRate: number | null = null;

  if (favoritePost.cost && favoritePost.shares) {
    const cost = favoritePost.cost;
    const shares = favoritePost.shares;

    // 股票市值: 找到 LATEST 类型的 processedData
    const latestData = data.processedData.find((d) => d.type === DiffType.LATEST);
    if (latestData) {
      const stockValue = latestData.price * shares; // 市值
      const costFee = cost * shares; // 成本
      const buyTransactionFee = costFee * 0.001425; // 買入手續費
      const totalCost = costFee + buyTransactionFee; // 成本 + 買入手續費
      const saleTransactionFee = stockValue * 0.001425; // 賣出手續費
      const tax = stockValue * 0.003;
      profit = parseFloat((stockValue - tax - saleTransactionFee - totalCost).toFixed(0));
      profitRate = parseFloat(((profit / totalCost) * 100).toFixed(2));
    }
  }

  return {
    ...data,
    cost: favoritePost.cost,
    shares: favoritePost.shares,
    notes: favoritePost.notes,
    profit,
    profitRate,
  };
}
