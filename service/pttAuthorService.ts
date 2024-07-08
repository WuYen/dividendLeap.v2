import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { parsePosts } from './pttStockPostService';
import { AuthorHistoricalCache, IHistoricalCache } from '../model/AuthorHistoricalCache';
import { isRePosts } from '../utility/stockPostHelper';
import { PostHistoricalResponse, processHistoricalInfo } from './historicalService';

const domain = 'https://www.ptt.cc';

export async function getHtmlSource(author: string): Promise<cheerio.Root> {
  const url = `${domain}/bbs/Stock/search?q=author%3A${author}`;
  const $ = await getHTML(url);
  return $;
}

export function getTargetPosts(posts: PostInfo.IPostInfo[]): PostInfo.IPostInfo[] {
  return posts.filter((post) => post.tag == '標的' && !isRePosts(post));
}

export async function getAuthorHistoryPosts(authorId: string) {
  const $ = await getHtmlSource(authorId);
  const posts = parsePosts($, +new Date());
  const storedPosts = await PostInfo.PostInfoModel.find({ author: authorId })
    .sort({ id: -1 }) // 按 id 降序排列
    .limit(8) // 限定返回數量
    .lean()
    .exec();

  const combinedPosts = [...posts, ...storedPosts].filter(
    (postInfo, index, self) => index === self.findIndex((item) => item.id === postInfo.id)
  );
  combinedPosts.sort((a, b) => b.id - a.id);
  console.log(`posts.length:${combinedPosts.length}`);

  const result: PostHistoricalResponse[] = [];
  for (let i = 0; i < Math.min(combinedPosts.length, 8); i++) {
    const target: PostHistoricalResponse = await processHistoricalInfo(combinedPosts[i]);
    result.push(target);
  }

  // Delete any existing result for the authorId
  await AuthorHistoricalCache.deleteMany({ authorId }).exec();
  const newResult: IHistoricalCache = {
    timestamp: +Date.now(),
    authorId,
    data: result,
  };
  await new AuthorHistoricalCache(newResult).save();
  return result;
}

// function getAuthorWithRecentPostList() {
//   try {
//     // 根据作者名查找作者及其帖子
//     const authorNames = ['uzgo', 'kobekid']; // 假设这里是你的作者名数组
//     const authorsWithPosts = await AuthorModel.aggregate([
//       { $match: { name: { $in: authorNames } } },
//       {
//         $lookup: {
//           from: 'postinfos', // 假设这是帖子集合的名称
//           localField: 'name', // 使用作者的名字进行匹配
//           foreignField: 'author', // 假设这是帖子中作者的字段名
//           as: 'posts',
//         },
//       },
//       { $project: { name: 1, posts: { $slice: ['$posts', 5] } } }, // 限制每个作者的帖子数量为 5 条
//     ]);
//     console.log(JSON.stringify(authorsWithPosts));
//   } catch (err) {
//     console.error(err);
//   }
// }
