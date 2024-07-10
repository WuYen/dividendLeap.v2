import { promises as fs } from 'fs';
import path from 'path';
import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { parsePosts } from './pttStockPostService';
import { AuthorHistoricalCache, IHistoricalCache } from '../model/AuthorHistoricalCache';
import { isRePosts } from '../utility/stockPostHelper';
import { PostHistoricalResponse, processHistoricalInfo } from './historicalService';
import { AuthorStats } from './rankingService';
import { AuthorModel, IAuthor } from '../model/Author';

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
    .limit(15) // 限定返回數量
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

export async function getAuthors(): Promise<IAuthor[]> {
  const result = await AuthorModel.find().sort({ likes: -1 }).lean().exec();
  return result;
}

export async function getAuthorRankList() {
  const isProd = process.env.NODE_ENV === 'production';
  const filePath = path.join(__dirname, isProd ? '../resource/ranked_authors.json' : '../resource/ranked_authors.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const rankedAuthors = JSON.parse(fileContent) as AuthorStats[];
  const authors = await getAuthors();

  const authorMap = new Map<string, AuthorStats>();

  // 首先添加 rankedAuthors 到 Map
  for (const author of rankedAuthors) {
    authorMap.set(author.name, author);
  }

  // 然后处理 authors 列表
  for (const author of authors) {
    if (!authorMap.has(author.name)) {
      // 如果 authorMap 中没有这个作者，创建一个新的 AuthorStats 对象
      authorMap.set(author.name, {
        ...author,
        mean: 0,
        maxRate: 0,
        minRate: 0,
        totalRate: 0,
        median: 0,
        posts: [],
        score: 0,
        combinedRank: 0,
      });
    } else {
      // 如果已存在，更新 likes 和 dislikes
      const existingAuthor = authorMap.get(author.name)!;
      existingAuthor.likes = author.likes;
      existingAuthor.dislikes = author.dislikes;
    }
  }

  // 将 Map 转换回数组
  const combinedAuthors = Array.from(authorMap.values());
  combinedAuthors.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.likes - a.likes;
  });

  return combinedAuthors;
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
