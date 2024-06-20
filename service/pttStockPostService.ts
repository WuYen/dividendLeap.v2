import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { IPostInfo, PostInfoModel, LastRecordModel } from '../model/PostInfo';
import config from '../utility/config';
import * as geminiAIService from './geminiAIService';

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

export function fastFindNewPosts(onlinePosts: IPostInfo[], savedPosts: IPostInfo[]): IPostInfo[] {
  const newPosts: IPostInfo[] = [];

  // Create a Set to store the IDs of the saved articles
  const savedPostsIds: Set<number> = new Set(savedPosts.map((article) => article.id));

  for (const onlinePost of onlinePosts) {
    if (!savedPostsIds.has(onlinePost.id)) {
      newPosts.push(onlinePost);
    }
  }

  return newPosts;
}

export function parseId(link: string): number {
  const reg = new RegExp('(?:https?://(?:www\\.)?ptt\\.cc)?/bbs/.*/[GM]\\.(\\d+)\\..*');
  const strs = link.match(reg);
  if (!strs || strs.length < 2) {
    return 0;
  }
  const id = parseInt(strs[1]);
  if (isNaN(id)) {
    return 0;
  }
  return id;
}

export function processSinglePostToMessage(post: IPostInfo, isSubscribed: boolean): string[] {
  const messageBuilder: string[] = ['', ''];
  if (isSubscribed && post.tag == '標的') {
    messageBuilder.push(`【✨✨大神來囉✨✨】`);
  }
  messageBuilder.push(`[${post.tag}] ${post.title}`);
  return messageBuilder;
}

export function isRePosts(post: IPostInfo): boolean {
  const title = post.title.toLowerCase(); // 将标题转换为小写以进行不区分大小写的比较
  return Boolean(
    post.title && // 确保标题存在
      title.includes('re:')
  );
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

export async function processSinglePostDetailToMessage(url: string): Promise<string> {
  url = url || 'https://www.ptt.cc/bbs/Stock/M.1718714778.A.27E.html';

  console.log(`process url ${url}`);

  var postContent = await fetchPostDetail(url);

  var promptWrod =
    '幫我分析文章\n' +
    '首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\n' +
    '如果文章中沒特別說明則該項顯示無\n' +
    '接著列出原文重點摘要盡量簡短\n' +
    '文章內容如下\n\n';

  var promptResult = await geminiAIService.generateWithText(promptWrod + postContent);

  return promptResult;
}

export default {
  getNewPosts,
  getLast50Posts,
};
