import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { IPostInfo, PostInfoModel, LastRecordModel } from '../model/PostInfo';
import { parseId } from '../utility/stockPostHelper';
import { AuthorHistoricalCache } from '../model/AuthorHistoricalCache';
import { isValidStockPost } from '../utility/stockPostHelper';
import { AuthorModel, IAuthor } from '../model/Author';
import { ILineToken } from '../model/lineToken';
import lineService from './lineService';
import { processPostAndSendNotify } from './notifyQueueService';

export const PTT_DOMAIN = 'https://www.ptt.cc';

export async function retrieveLastBatchPosts(): Promise<IPostInfo[]> {
  try {
    // Retrieve the last record from LastRecordModel
    const lastRecord = await LastRecordModel.findOne().populate('lastProcessedRecord').exec();

    if (!lastRecord || !lastRecord.lastProcessedRecord) {
      console.log('No last record found');
      return [];
    }

    // Retrieve posts using the batchNo from the last record
    const batchNo = lastRecord.lastProcessedRecord.batchNo;
    if (!batchNo) {
      console.log('No last batch No');
      return [];
    }
    const posts = await PostInfoModel.find({ batchNo }).exec();

    return posts;
  } catch (error) {
    console.error('Error retrieving last batch posts:', error);
    throw error;
  }
}

export async function getLast50Posts(): Promise<PostInfo.IPostInfo[] | null> {
  try {
    const latestPosts = await PostInfoModel.find({}).sort({ id: -1 }).select('-_id -__v').limit(50).lean();
    return latestPosts;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function getNewPosts(): Promise<PostInfo.IPostInfo[] | null> {
  //const lastBatchPosts = await retrieveLastBatchPosts();
  const previousSavedPosts = await PostInfoModel.find({}).sort({ id: -1 }).limit(25).lean();
  const previousSavedPostIds: Set<number> = new Set(previousSavedPosts.map((article) => article.id));
  const batchNo = +new Date(); //timestamp in ms
  const newPosts = await fetchNewPosts(PTT_DOMAIN, batchNo, previousSavedPostIds);

  try {
    if (newPosts.length > 0) {
      const savedPosts = await PostInfo.PostInfoModel.insertMany(newPosts);
      console.log('Posts saved size:', savedPosts.length);

      const lastRecordData = { lastProcessedRecord: savedPosts[0]._id };
      const lastRecordDataResult = await PostInfo.LastRecordModel.findOneAndUpdate({}, lastRecordData, {
        upsert: true,
        new: true,
      });
      console.log('Last record saved/updated', lastRecordDataResult);

      return savedPosts;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function fetchNewPosts(
  domain: string,
  batchNo: number,
  previousSavedPostIds: Set<number>
): Promise<PostInfo.IPostInfo[]> {
  let page = '';
  let posts: PostInfo.IPostInfo[] = [];
  let currentCount = 0;
  let continueFlag = true;
  let stopCount = 3;

  while (continueFlag && currentCount < stopCount) {
    currentCount++;
    let url = `${domain}/bbs/Stock/index${page}.html`;
    console.log(`process url ${url}`);
    let $ = await getHTML(url);
    let onlinePosts = parsePosts($, batchNo);

    for (const post of onlinePosts.reverse()) {
      if (previousSavedPostIds.has(post.id)) {
        continueFlag = false;
        break;
      } else {
        if (post.title?.trim()) {
          posts.push(post);
        }
      }
    }

    if (continueFlag) {
      page = getPreviousPageIndex($);
    }
  }

  return posts.sort((a, b) => b.id - a.id);
}

export function parsePosts($: cheerio.Root, batchNo: number): PostInfo.IPostInfo[] {
  const posts: PostInfo.IPostInfo[] = [];

  var postElements = $('div.r-ent');
  var separator = $('.r-list-sep');
  if (separator && separator.length > 0) {
    const elementAbovoSeparator = separator.prev('div.r-ent').first();
    postElements = postElements.slice(0, $('div.r-ent').index(elementAbovoSeparator) + 1);
  }

  postElements.each((index, element) => {
    const titleElement = $(element).find('div.title a');
    const tag = titleElement.text().match(/\[(.*?)\]/)?.[1] || null;
    const title = titleElement
      .text()
      .replace(/\[.*?\]/, '')
      .trim();
    const href = titleElement.attr('href') || null;
    const author = $(element).find('div.author').text() || null;
    const date = $(element).find('div.date').text().trim() || null;
    const id = href !== null ? parseId(href) : 0;
    const postInfo: PostInfo.IPostInfo = {
      tag,
      title,
      href,
      author,
      date,
      id,
      batchNo,
    };

    posts.push(postInfo);
  });

  return posts;
}

export function getPreviousPageIndex($: cheerio.Root): string {
  //const link = $('a.btn.wide').attr('href');
  const link = $('a.btn.wide')
    .filter((_, element) => $(element).text().includes('上頁'))
    .attr('href');
  // Extract page number from the link using regular expression
  const match = link && link.match(/index(\d+)\.html/);
  const index = match ? match[1] : null;

  return index as string;
}

export async function fetchPostDetail(url: string): Promise<string> {
  const $ = await getHTML(url);

  const mainContent = $('#main-content');
  // Remove richcontent items
  mainContent.find('.richcontent').remove();

  // Remove <a> elements with href starting with "https://i.imgur.com/"
  mainContent.find('a[href^="https://i.imgur.com/"]').remove();

  mainContent.find('.f2').each((index, element) => {
    $(element).nextAll().remove();
    $(element).remove();
  });

  const text = mainContent.text().trim();

  return text;
}

export async function getPostsWithInDays(days: number = 120, tag: string = ''): Promise<IPostInfo[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const unixTimestamp = Math.floor(startDate.getTime());

  const query = {
    batchNo: { $gte: unixTimestamp },
    ...(tag && { tag }),
  };

  // 查找符合条件的帖子
  const posts = await PostInfoModel.find(query).sort({ id: -1 }).select('-_id -__v').lean();
  return posts;
}

export async function searchPostsByTitle(keyword: string): Promise<IPostInfo[]> {
  // 构建查询条件
  const query = {
    title: { $regex: keyword, $options: 'i' }, // 'i' 选项表示不区分大小写
  };

  // 查找符合条件的帖子
  const posts = await PostInfoModel.find(query).sort({ id: -1 }).select('-_id -__v').lean();
  return posts;
}

export async function getNewPostAndSendLineNotify(channel: string, channels: string): Promise<any> {
  let newPosts = await getNewPosts();
  if (newPosts && newPosts.length) {
    const subscribeAuthors: IAuthor[] = await AuthorModel.find({}).lean();
    const targetPosts = newPosts.filter((post) => {
      const isSubscribeAuthor = !!subscribeAuthors.find((x) => x.name === post.author);
      return post.tag === '標的' && (isValidStockPost(post) || isSubscribeAuthor);
    });
    if (targetPosts.length > 0) {
      const tokenInfos: ILineToken[] | null = await lineService.retrieveUserLineToken(channel, channels);
      if (tokenInfos != null && tokenInfos.length > 0) {
        await processPostAndSendNotify(targetPosts, tokenInfos, subscribeAuthors);
      }
      console.log(`finish sending notify count:${tokenInfos.length}, post count:${targetPosts.length}`);
    }
    // Invalidate cache for authors with new posts
    const authorsWithNewPosts = [...new Set(targetPosts.map((post) => post.author))];
    await invalidateAuthorCache(authorsWithNewPosts);
  }
  return { postCount: newPosts?.length };
}

async function invalidateAuthorCache(authors: (string | null)[]): Promise<void> {
  // Filter out null authors
  const validAuthors = authors.filter((author) => author !== null) as string[];

  // Find which authors have existing cache entries
  const existingCaches = await AuthorHistoricalCache.find({ authorId: { $in: validAuthors } }).exec();

  if (existingCaches.length > 0) {
    const authorIdsToInvalidate = existingCaches.map((cache) => cache.authorId);
    await AuthorHistoricalCache.deleteMany({ authorId: { $in: authorIdsToInvalidate } }).exec();
    console.log(`Cache invalidated for authors: ${authorIdsToInvalidate.join(', ')}`);
  }
}

export default {
  getNewPosts,
  getLast50Posts,
};
