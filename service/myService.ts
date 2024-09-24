import mongoose, { FlattenMaps } from 'mongoose';
import { AuthorModel, IAuthor } from '../model/Author';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import { IFavoritePost, LineTokenModel } from '../model/lineToken';
import {
  DiffType,
  getDateRangeBaseOnPostedDate,
  PostHistoricalResponse,
  processHistoricalInfo,
  processHistoricalInfoWithData,
} from './historicalService';
import { getStockNoFromTitle } from '../utility/stockPostHelper';
import { todayDate } from '../utility/dateTime';
import { getCachedStockPriceByDatesBatch, StockRequest } from './stockPriceService';

export interface MyPostHistoricalResponse extends PostHistoricalResponse {
  cost?: number;
  shares?: number;
  notes?: string;
  profit: number | null;
  profitRate?: number | null;
}

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

export async function toggleFavoritePost(userId: string, postId: string): Promise<IFavoritePost | null> {
  const user = await LineTokenModel.findOne({ channel: userId });

  if (!userId || !user) {
    throw new Error('使用者不存在');
  }

  const post = await PostInfoModel.findOne({ id: postId });
  if (!post) {
    throw new Error('文章不存在');
  }

  const favoritePostIndex = user.favoritePosts.findIndex((fp) => fp.postId?.toString() === post._id.toString());

  let updatedFavoritePost: IFavoritePost | null = null;

  if (favoritePostIndex !== -1) {
    user.favoritePosts.splice(favoritePostIndex, 1);
  } else {
    const newFavoritePost: IFavoritePost = {
      postId: post._id,
      dateAdded: new Date(),
    };
    user.favoritePosts.push(newFavoritePost);
    updatedFavoritePost = newFavoritePost;
  }

  await user.save();
  return updatedFavoritePost;
}

export async function fetchAndProcessFavoritePost(
  userId: string,
  favoritePost: IFavoritePost
): Promise<MyPostHistoricalResponse | null> {
  const updatedFavoritePost = await LineTokenModel.findOne(
    { channel: userId, 'favoritePosts.postId': favoritePost.postId },
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

export async function getFavoritePosts(userId: string): Promise<MyPostHistoricalResponse[]> {
  const rawData = await LineTokenModel.findOne({ channel: userId }).populate('favoritePosts.postId', '-__v').lean();
  let favoritePosts: MyPostHistoricalResponse[] = [];

  if (rawData?.favoritePosts && rawData?.favoritePosts.length > 0) {
    favoritePosts = await processPostDataBatch(rawData.favoritePosts);
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
): Promise<IFavoritePost> {
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
  // Return the updated favorite post information
  const updatedFavoritePost = result.favoritePosts.find((favoritePost) => {
    const postId = favoritePost.postId as mongoose.Types.ObjectId;
    return postId && postId.equals(post._id);
  });

  if (!updatedFavoritePost) {
    throw new Error('未找到更新的文章');
  }

  return updatedFavoritePost;
}

async function processPostData(favoritePost: any): Promise<MyPostHistoricalResponse> {
  const postInfo = favoritePost.postId as IPostInfo;
  const data = await processHistoricalInfo(postInfo);

  let profit: number | null = null;
  let profitRate: number | null = null;

  if (favoritePost.cost && favoritePost.shares) {
    const latestData = data.processedData.find((d) => d.type === DiffType.LATEST);
    if (latestData) {
      const result = calculateProfit(favoritePost.cost, favoritePost.shares, latestData.price);
      profit = result.profit;
      profitRate = result.profitRate;
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

async function processPostDataBatch(posts: FlattenMaps<IFavoritePost>[]): Promise<MyPostHistoricalResponse[]> {
  const today = todayDate();

  const stockRequests = posts
    .map((post) => {
      const postInfo = post.postId as IPostInfo;
      const stockNo = getStockNoFromTitle(postInfo);
      const postDate = new Date(postInfo.id * 1000);
      const dateRange = getDateRangeBaseOnPostedDate(postDate, today);
      return { stockNo, startDate: dateRange[0], endDate: dateRange[1] } as StockRequest;
    })
    .filter((request) => request.stockNo !== '');

  const data = await getCachedStockPriceByDatesBatch(stockRequests);
  const processedPosts = await Promise.all(
    posts.map(async (post) => {
      const postInfo = post.postId as IPostInfo;
      const stockNo = getStockNoFromTitle(postInfo);
      const postDate = new Date(postInfo.id * 1000);
      const dateRange = getDateRangeBaseOnPostedDate(postDate, today);

      // 找到對應的 stockData
      const stockData = data.find(
        (d) => d?.stockNo === stockNo && d?.startDate === dateRange[0] && d?.endDate === dateRange[1]
      );

      const historicalInfo = processHistoricalInfoWithData(postInfo, stockData ? stockData.data : null, today);

      let profit: number | null = null;
      let profitRate: number | null = null;

      if (post.cost && post.shares) {
        const latestData = historicalInfo.processedData.find((d) => d.type === DiffType.LATEST);
        if (latestData) {
          const result = calculateProfit(post.cost, post.shares, latestData.price);
          profit = result.profit;
          profitRate = result.profitRate;
        }
      }

      return {
        ...historicalInfo,
        cost: post.cost,
        shares: post.shares,
        notes: post.notes,
        profit,
        profitRate,
      };
    })
  );
  return processedPosts;
}

function calculateProfit(
  cost: number,
  shares: number,
  latestPrice: number
): { profit: number | null; profitRate: number | null } {
  if (cost && shares && latestPrice) {
    const stockValue = latestPrice * shares; // 市值
    const costFee = cost * shares; // 成本
    const buyTransactionFee = costFee * 0.001425; // 買入手續費
    const totalCost = costFee + buyTransactionFee; // 成本 + 買入手續費
    const saleTransactionFee = stockValue * 0.001425; // 賣出手續費
    const tax = stockValue * 0.003;
    const profit = parseFloat((stockValue - tax - saleTransactionFee - totalCost).toFixed(0));
    const profitRate = parseFloat(((profit / totalCost) * 100).toFixed(2));
    return { profit, profitRate };
  }
  return { profit: null, profitRate: null };
}
