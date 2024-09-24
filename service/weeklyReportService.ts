import { AuthorModel } from '../model/Author';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import { toDateString, today } from '../utility/dateTime';
import { getStockNoFromTitle, isValidStockPost } from '../utility/stockPostHelper';
import { BatchStockHistoricalResponse, getCachedStockPriceByDatesBatch, StockRequest } from './stockPriceService';

async function fetchPostsFromLastFourWeeks(authorList: string[]): Promise<IPostInfo[]> {
  const threeMonthsAgo = Math.floor(Date.now() / 1000) - 1 * 30 * 24 * 60 * 60; // 取得三個月前的 Unix timestamp (10 碼)

  return await PostInfoModel.find({
    author: { $in: authorList },
    id: { $gte: threeMonthsAgo },
  }).exec();
}

export async function generateWeeklyReport(): Promise<any> {
  // Step 1: Fetch Posts and Prices
  const authors = await AuthorModel.find({}).lean().exec();
  const posts = await fetchPostsFromLastFourWeeks(authors.map((x) => x.name));
  const targetPosts = posts.filter((x) => x.tag == '標的' && isValidStockPost(x)).splice(0, 5);

  const prices = await fetchStockPrices(targetPosts);

  // Step 2: Process Data
  const weeklyData = calculateWeeklyChanges(targetPosts, prices);
  console.log(weeklyData);
  // sample out put
  // [
  //   {
  //     postId: 1721643502,
  //     stockNo: '2308',
  //     postDate: '20240722',
  //     postTitle: '2308台達電',
  //     initialPrice: 373.5,
  //     latestPrice: 402.5,
  //     priceChangeValue: 29,
  //     priceChangePercentage: 7.764390896921017,
  //     highestPrice: 427,
  //     lowestPrice: 347
  //   },
  // ]
  return weeklyData;
}

async function fetchStockPrices(posts: IPostInfo[]): Promise<BatchStockHistoricalResponse[]> {
  var request: StockRequest[] = posts
    .map((post) => {
      const startDate = new Date(post.id * 1000); // 假設發文日當基準 回測 發文當下值不值得買
      return {
        stockNo: getStockNoFromTitle(post),
        startDate: toDateString(startDate),
        endDate: today(),
      } as StockRequest;
    })
    .filter((x) => x.stockNo);
  var result = await getCachedStockPriceByDatesBatch(request);
  return result.filter((x) => x != null) as BatchStockHistoricalResponse[];
}

function calculateWeeklyChanges(posts: IPostInfo[], prices: BatchStockHistoricalResponse[]) {
  return posts
    .map((post) => {
      const stockNo = getStockNoFromTitle(post);
      const postDate = new Date(post.id * 1000);
      const postDateString = toDateString(postDate);

      const stockPriceData = prices.find((price) => price.stockNo === stockNo);

      if (!stockPriceData) {
        return null; // No price data available for this stock
      }

      const latestPriceData = stockPriceData.data[0];
      const priceOnPostDate = stockPriceData.data[stockPriceData.data.length - 1];

      if (!priceOnPostDate || !latestPriceData) {
        return null; // No price data available for the post date or latest date
      }

      const priceChangeValue = latestPriceData.close - priceOnPostDate.close;
      const priceChangePercentage = (priceChangeValue / priceOnPostDate.close) * 100;

      const highestPrice = Math.max(...stockPriceData.data.map((data) => data.high));
      const lowestPrice = Math.min(...stockPriceData.data.map((data) => data.low));

      return {
        postId: post.id,
        stockNo,
        postDate: postDateString,
        postTitle: post.title,
        initialPrice: priceOnPostDate.close,
        latestPrice: latestPriceData.close,
        priceChangeValue,
        priceChangePercentage,
        highestPrice,
        lowestPrice,
      };
    })
    .filter((result) => result !== null);
}
