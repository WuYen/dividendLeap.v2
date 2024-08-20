import { IPostInfo } from '../model/PostInfo';
import { toDateString, today } from '../utility/dateTime';
import { getStockNoFromTitle } from '../utility/stockPostHelper';
import { BatchStockHistoricalResponse, getCachedStockPriceByDatesBatch, StockRequest } from './stockPriceService';

async function fetchPostsFromLastFourWeeks(): Promise<IPostInfo[]> {
  //TODO: 找出過去一個月大神貼文
  throw new Error('Function not implemented.');
}

export async function generateWeeklyReport(): Promise<any> {
  // Step 1: Fetch Posts and Prices
  const posts = await fetchPostsFromLastFourWeeks();
  const prices = await fetchStockPrices(posts);

  // Step 2: Process Data
  const weeklyData = calculateWeeklyChanges(posts, prices);

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
  return result.filter((x) => x != null);
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

      const priceOnPostDate = stockPriceData.data.find((data) => data.date === postDateString);
      const latestPriceData = stockPriceData.data[stockPriceData.data.length - 1];

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
