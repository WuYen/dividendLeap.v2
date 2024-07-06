import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { IPostInfo, PostInfoModel, LastRecordModel } from '../model/PostInfo';
import { parseId } from '../utility/stockPostHelper';

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

export async function getPostsWithInDays(days: number = 120): Promise<IPostInfo[]> {
  const oneHundredTwentyDaysAgo = new Date();
  oneHundredTwentyDaysAgo.setDate(oneHundredTwentyDaysAgo.getDate() - days);
  const unixTimestamp = Math.floor(oneHundredTwentyDaysAgo.getTime() / 1000);

  // 假設使用 mongoose 的 model 名為 Post
  const posts = await PostInfoModel.find({
    batchNo: { $gte: unixTimestamp },
    tag: '標的',
  }).lean();

  return posts;
}

export default {
  getNewPosts,
  getLast50Posts,
};
