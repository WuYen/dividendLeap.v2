// 目標: 追蹤貼文的績效 ->getPostsPerformance
// * 抓過去四個月標(120天)的貼文, 並且過濾title 有 stock no 的貼文 => getPosts
// * loop貼文計算&績效 => 先統計發文到現在最高點 -> getPriceForPosts
//   ** 找出發文的 title 裡面的 stockNo
//   ** 拉發文到現在所有的股價資訊
//   ** 找到高點, 計算差異value+rate
// * 把貼文用時間分群, 基於發文日 跟 當下時間 用日期分四個區間 -> groupData
//        第一區間: d-0 到 d-30 (即從今天起過去30天)
//        第二區間: d-31 到 d-60 (即從今天起過去31天到60天)
//        第三區間: d-61 到 d-90 (即從今天起過去61天到90天)
//        第四區間: d-91 到 d-120 (即從今天起過去91天到120天)

import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import { getDateRangeBaseOnPostedDate, getPriceInfoByDates, getStockNoFromTitle } from './pttAuthorService';

interface Performance {
  highestPrice: number;
  priceDiff: number;
  priceRate: number;
}

interface IPostInfoWithPerformance extends IPostInfo {
  performance: Performance;
}

interface GroupedPostsPerformance {
  lastMonth: IPostInfoWithPerformance[];
  twoMonthsAgo: IPostInfoWithPerformance[];
  threeMonthsAgo: IPostInfoWithPerformance[];
  fourMonthsAgo: IPostInfoWithPerformance[];
}

export async function getPostsPerformance(): Promise<GroupedPostsPerformance> {
  const posts = await getPosts();
  const postsWithPrice = await getPriceForPosts(posts);
  const result = groupData(new Date(), postsWithPrice);
  return result;
}

export async function getPosts(): Promise<IPostInfo[]> {
  const oneHundredTwentyDaysAgo = new Date();
  oneHundredTwentyDaysAgo.setDate(oneHundredTwentyDaysAgo.getDate() - 120);
  const unixTimestamp = Math.floor(oneHundredTwentyDaysAgo.getTime() / 1000);

  // 假設使用 mongoose 的 model 名為 Post
  const posts = await PostInfoModel.find({
    batchNo: { $gte: unixTimestamp },
    tag: '標的',
  }).lean();

  return posts;
}
export async function getPriceForPosts(posts: IPostInfo[]): Promise<IPostInfoWithPerformance[]> {
  const today = new Date();
  const postsWithPerformance: IPostInfoWithPerformance[] = [];

  for (const post of posts) {
    const stockNo = getStockNoFromTitle(post);
    if (stockNo) {
      const postDate = new Date(post.id * 1000);
      const [startDate, endDate] = getDateRangeBaseOnPostedDate(postDate, today);
      const priceInfo = await getPriceInfoByDates(stockNo, startDate, endDate);

      if (priceInfo) {
        const highestPrice = Math.max(...priceInfo.historicalInfo.map((p) => p.high));
        const postPrice = priceInfo.historicalInfo[0].open; // 假設發文當天的開盤價
        const priceDiff = highestPrice - postPrice;
        const priceRate = (priceDiff / postPrice) * 100;

        postsWithPerformance.push({
          ...post,
          performance: {
            highestPrice,
            priceDiff,
            priceRate,
          },
        });
      }
    }
  }

  return postsWithPerformance;
}

export function groupData(today: Date, posts: IPostInfoWithPerformance[]): GroupedPostsPerformance {
  const result: GroupedPostsPerformance = {
    lastMonth: [],
    twoMonthsAgo: [],
    threeMonthsAgo: [],
    fourMonthsAgo: [],
  };

  posts.forEach((post) => {
    const postDate = new Date(post.id * 1000);
    const daysDiff = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff <= 30) {
      result.lastMonth.push(post);
    } else if (daysDiff <= 60) {
      result.twoMonthsAgo.push(post);
    } else if (daysDiff <= 90) {
      result.threeMonthsAgo.push(post);
    } else if (daysDiff <= 120) {
      result.fourMonthsAgo.push(post);
    }
  });

  return result;
}
