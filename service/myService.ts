import { AuthorModel, IAuthor } from '../model/Author';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import { LineTokenModel } from '../model/lineToken';
import { toDateString, todayDate } from '../utility/dateTime';
import fugleService, { HistoricalDataInfo } from './fugleService';
import {
  AuthorHistoricalResponse,
  DiffInfo,
  getHighestPoint,
  getStockNoFromTitle,
  isPostedInOneWeek,
  roundToDecimal,
} from './pttAuthorService';

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
  // 更新用户的 favoritePosts
  const user = await LineTokenModel.findOne({ channel: userId });

  if (!userId || !user) {
    throw new Error('使用者不存在');
  }

  // 查找 PostInfo 的 ObjectId
  const post = await PostInfoModel.findOne({ id: postId });
  if (!post) {
    throw new Error('文章不存在');
  }

  const postIndex = user.favoritePosts.indexOf(post._id);
  if (postIndex !== -1) {
    user.favoritePosts.splice(postIndex, 1);
  } else {
    user.favoritePosts.push(post._id);
  }

  await user.save();
}

interface IFavoritePostInfo extends AuthorHistoricalResponse {
  isFavorite: boolean;
}

export async function getFavoritePosts(userId: string): Promise<IFavoritePostInfo[]> {
  const rawData = await LineTokenModel.findOne({ channel: userId }).populate('favoritePosts', '-_id -__v').lean();
  const favoritePosts: IFavoritePostInfo[] = [];

  if (rawData?.favoritePosts) {
    for (const postInfo of rawData.favoritePosts as IPostInfo[]) {
      const stockNo = getStockNoFromTitle(postInfo);
      const postDate = new Date(postInfo.id * 1000);
      const historicalPostInfo: AuthorHistoricalResponse = {
        ...postInfo,
        stockNo: '',
        historicalInfo: [],
        processedData: [],
        isRecentPost: isPostedInOneWeek(postDate, todayDate()),
      };

      if (stockNo) {
        historicalPostInfo.stockNo = stockNo;
        //發文日 > 今天
        const result = await fugleService.getStockPriceByDates(
          stockNo,
          toDateString(postDate),
          toDateString(todayDate())
        );

        if (result && result.data.length > 0) {
          const data = result.data.map((x) => ({ ...x, date: x.date.replace(/-/g, '') })).reverse();
          const baseClose = data[0].close; // 已發文日為基準

          //找到資料區間內最高點
          const highestPoint: HistoricalDataInfo = getHighestPoint(data);
          const highest: DiffInfo = { date: highestPoint.date || '', diff: 0, diffPercent: 0, price: 0 };
          highest.type = 'highest';
          highest.diff = roundToDecimal(highestPoint.close - baseClose, 2);
          highest.price = highestPoint.close;
          highest.diffPercent = parseFloat(((highest.diff / baseClose) * 100).toFixed(2));

          //找到最靠近今天的股價
          const lastestTradePoint = data[data.length - 1];
          const latest: DiffInfo = { date: lastestTradePoint.date || '', diff: 0, diffPercent: 0, price: 0 };
          latest.type = 'latest';
          latest.diff = roundToDecimal(lastestTradePoint.close - baseClose, 2);
          latest.price = lastestTradePoint.close;
          latest.diffPercent = parseFloat(((latest.diff / baseClose) * 100).toFixed(2));

          historicalPostInfo.historicalInfo = data;
          historicalPostInfo.processedData = [highest, latest];
        }

        // const historicalPostInfo = await processHistoricalInfo(postInfo as IPostInfo);
        favoritePosts.push({
          ...historicalPostInfo,
          isFavorite: true, // 确保这是 IFavoritePostInfo 的一部分
        } as IFavoritePostInfo);
      }
    }
  }

  return favoritePosts;
}
