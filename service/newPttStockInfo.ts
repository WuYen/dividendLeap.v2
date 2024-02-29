import { getHTML } from '../utility/requestCore';
import { IPostInfo, PostInfoModel, LastRecordModel } from '../model/PostInfo';
import lineService from './lineService';
import pttStockInfo from './pttStockInfo';

const domain = 'https://www.ptt.cc';

export async function getNewPosts(): Promise<IPostInfo[] | null> {
  let batchNo = +new Date(); //timestamp in ms

  //process latest page
  let url = `${domain}/bbs/Stock/index.html`;
  let [lastBatchPosts, $] = await Promise.all([retrieveLastBatchPosts(), getHTML(url)]);
  let onlinePosts = parsePosts($, batchNo);
  let newPosts = fastFindNewPosts(onlinePosts, lastBatchPosts);

  // process previous page depends on foundLastProcessedRecord or not
  while (onlinePosts.length == newPosts.length) {
    //這一頁的資料都是新的, 可能要往上一頁看
    let page = getPreviousPageIndex($);
    url = `${domain}/bbs/Stock/index${page}.html`;
    $ = await getHTML(url);
    onlinePosts.concat(parsePosts($, batchNo));
    newPosts.concat(fastFindNewPosts(onlinePosts, lastBatchPosts));
  }

  let savedPosts = await savePostsAndUpdateLastRecord(newPosts);
  await sendNotify('token', savedPosts as IPostInfo[]);

  return savedPosts;
}

function parsePosts($: cheerio.Root, batchNo: number): IPostInfo[] {
  const posts: IPostInfo[] = [];

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
    const id = parseId(href as string);
    const postInfo: IPostInfo = {
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

function findNewPosts(onlinePosts: IPostInfo[], savedPosts: IPostInfo[]): IPostInfo[] {
  const newArticles: IPostInfo[] = [];

  for (const onlinePost of onlinePosts) {
    let isNew = true;

    for (const savedArticle of savedPosts) {
      if (onlinePost.id == savedArticle.id) {
        isNew = false;
        break;
      }
    }

    if (isNew) {
      newArticles.push(onlinePost);
    }
  }

  return newArticles;
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

export default { getNewPosts, parseId, processMessage, sendNotify, retrieveLastBatchPosts };

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

async function savePostsAndUpdateLastRecord(posts: IPostInfo[]) {
  try {
    if (posts.length > 0) {
      const savedPosts = await PostInfoModel.insertMany(posts);
      console.log('Posts saved size:', savedPosts.length);

      const lastRecordData = { lastProcessedRecord: savedPosts[0]._id };
      const lastRecordDataResult = await LastRecordModel.findOneAndUpdate({}, lastRecordData, {
        upsert: true,
        new: true,
      });
      console.log('Last record saved/updated', lastRecordDataResult);

      return savedPosts;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return null;
  }
}

async function sendNotify(token: string, posts: IPostInfo[]) {
  for (const post of posts) {
    if (post.tag == '標的' || pttStockInfo.isSubscribedAuthor(post.author)) {
      const messageBuilder = processMessage(post);
      const encodeMsg = encodeURIComponent(messageBuilder.join('\n'));
      const response = await lineService.sendMessage('token', encodeMsg);
      console.log(`notify sent `, response);
    }
  }
}

export function processMessage(post: IPostInfo): string[] {
  const messageBuilder: string[] = ['', 'PTT'];
  const isHighlightAuthor = pttStockInfo.isHighlightAuthor(post.author);
  isHighlightAuthor && messageBuilder.push(`【✨大神來囉✨】`);
  messageBuilder.push(`[${post.tag}] ${post.title}`);
  isHighlightAuthor && messageBuilder.push(`作者: ${post.author}`);
  messageBuilder.push(`${domain}/${post.href}`);
  messageBuilder.push('');
  return messageBuilder;
}

function getPreviousPageIndex($: cheerio.Root): string {
  //const link = $('a.btn.wide').attr('href');
  const link = $('a.btn.wide')
    .filter((_, element) => $(element).text().includes('上頁'))
    .attr('href');
  // Extract page number from the link using regular expression
  const match = link && link.match(/index(\d+)\.html/);
  const index = match ? match[1] : null;

  return index as string;
}
