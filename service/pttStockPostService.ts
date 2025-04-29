import { getHTMLWithPuppeteer } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { IPostInfo, PostInfoModel, LastRecordModel } from '../model/PostInfo';
import { parseId } from '../utility/stockPostHelper';
import { AuthorHistoricalCache } from '../model/AuthorHistoricalCache';
import { AuthorModel } from '../model/Author';
import lineService from './lineService';
import { processPostAndSendNotify } from './notifyQueueService.v2';
import axios from 'axios';
import { processPostAndSendNotifyFromUserSetting } from './notifyService';
import { UserSettingModel } from '../model/UserSetting';

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
    let $ = await getHTMLWithPuppeteer(url);
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
  const $ = await getHTMLWithPuppeteer(url);

  //擷取content
  const mainContent = $('#main-content');
  mainContent.find('.richcontent').remove();
  mainContent.find('a[href^="https://i.imgur.com/"]').remove(); // Remove <a> elements with href starting with "https://i.imgur.com/"
  mainContent.find('.f2').each((index, element) => {
    $(element).nextAll().remove();
    $(element).remove();
  });
  return mainContent.text().trim();
}

export async function fetchPostDetailProxy(id: string): Promise<string> {
  const response = await axios.get(`https://monneey-fe846abf0722.herokuapp.com/ptt/post/${id}`);

  return response.data.data;
}

export async function fetchPostComment(url: string): Promise<string[]> {
  const $ = await getHTMLWithPuppeteer(url);

  //擷取留言
  // <div class='push'>
  //   <span class='hl push-tag'>推 </span>
  //   <span class='f3 hl push-userid'>Vinccc </span>
  //   <span class='f3 push-content'>: 定期定額滿合適的啊 去買富邦的保單 不如買富邦的</span>
  //   <span class='push-ipdatetime'> 08/20 15:13</span>
  // </div>;
  const comment: string[] = [];
  $('.push').each((index, element) => {
    const pushTag = $(element).find('.push-tag').text().trim();
    const pushContent = $(element).find('.push-content').text().trim();
    const combinedText = `${pushTag}${pushContent}`;
    comment.push(combinedText);
  });

  return comment;
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

export async function searchPostsByAuthor(keyword: string): Promise<IPostInfo[]> {
  // 构建查询条件
  const query = {
    author: { $regex: keyword, $options: 'i' }, // 'i' 选项表示不区分大小写
  };

  // 查找符合条件的帖子
  const posts = await PostInfoModel.find(query).sort({ id: -1 }).select('-_id -__v').lean();
  return posts;
}

export async function getNewPostAndSendLineNotify(channel: string, channels: string): Promise<any> {
  const newPosts = await getNewPosts();
  if (!newPosts?.length) return { postCount: 0 };

  // 同時撈資料
  const [subscribeAuthors, tokenInfos, users] = await Promise.all([
    AuthorModel.find({}).lean(),
    lineService.retrieveUserLineToken(channel, channels),
    UserSettingModel.find({}).lean(),
  ]);

  const notifyTasks: Promise<any>[] = [];

  if (tokenInfos?.length) {
    //TODO: 舊路 之後等 notifyService 重構完再拔掉
    notifyTasks.push(processPostAndSendNotify(newPosts, tokenInfos, subscribeAuthors));
  }

  if (users?.length) {
    try {
      notifyTasks.push(processPostAndSendNotifyFromUserSetting(newPosts, users, subscribeAuthors));
    } catch (error) {
      console.error('Error processing user settings for notifications: ', error);
    }
  }

  // 等待通知任務完成
  await Promise.all(notifyTasks);

  // 清掉這些作者的 cache
  const authorsWithNewPosts = [...new Set(newPosts.map((post) => post.author))];
  await invalidateAuthorCache(authorsWithNewPosts);

  return { postCount: newPosts.length };
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
