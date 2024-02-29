import { getHTML } from '../utility/requestCore';
import * as PostInfo from '../model/PostInfo';
import { parseId, retrieveLastBatchPosts } from './newPttStockInfo';
import exp from 'constants';

const domain = 'https://www.ptt.cc';

async function getNewPosts(): Promise<PostInfo.IPostInfo[] | null> {
  const lastBatchPosts = await retrieveLastBatchPosts();
  const lastBatchPostIds: Set<number> = new Set(lastBatchPosts.map((article) => article.id));
  const batchNo = +new Date(); //timestamp in ms
  let page = '';
  let continueFlag = true;
  let posts: PostInfo.IPostInfo[] = [];
  let stopCount = 3;
  let currentCount = 0;
  while (continueFlag && currentCount < stopCount) {
    currentCount++;
    let url = `${domain}/bbs/Stock/index${page || ''}.html`;
    console.log(`process url ${url}`);
    let $ = await getHTML(url);
    let newPosts = parsePosts($, batchNo);
    let foundLastProcessedRecord = false;

    for (const newPost of newPosts.reverse()) {
      if (lastBatchPostIds.has(newPost.id)) {
        foundLastProcessedRecord = true;
        break; // Stop the loop if match found
      }

      if (newPost.title?.trim()) {
        posts.push(newPost);
      }
    }

    if (foundLastProcessedRecord) {
      continueFlag = false;
    } else {
      page = getPreviousPageIndex($);
    }
  }

  try {
    if (posts.length > 0) {
      const savedPosts = await PostInfo.PostInfoModel.insertMany(posts);
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

export async function parsePostTest(): Promise<PostInfo.IPostInfo[]> {
  let url = `${domain}/bbs/Stock/index.html`;
  console.log(`process url ${url}`);
  let $ = await getHTML(url);
  let res = parsePosts($, 123);
  return res;
}

function parsePosts($: cheerio.Root, batchNo: number): PostInfo.IPostInfo[] {
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

export default { getNewPosts, processMessage, isHighlightAuthor, isSubscribedAuthor };

function processMessage(savedPosts: PostInfo.IPostInfo[] | null) {
  const messageBuilder: string[] = ['PTT Alert:', ''];
  if (savedPosts && savedPosts.length > 0) {
    savedPosts.forEach((post) => {
      if (post.tag == '標的' || isSubscribedAuthor(post.author)) {
        if (isHighlightAuthor(post.author)) {
          messageBuilder.push(`【✨大神來囉✨】`);
        }
        messageBuilder.push(`[${post.tag}] ${post.title}`);
        messageBuilder.push(`作者: ${post.author}`);
        messageBuilder.push(`${domain}/${post.href}`);
        messageBuilder.push('');
      }
    });
  }
  return messageBuilder;
}
function isHighlightAuthor(author: string | null): boolean {
  var gods = ['agogo1202', 'nuwai57', 'WADE0616', 'kobekid', 'DwyaneAndy'];

  return author !== null && gods.includes(author);
}
function isSubscribedAuthor(author: string | null): boolean {
  var subscribeAuthor = [
    'dearhau',
    'macross2',
    'bonbonwo2018',
    'm4vu0',
    'tacovirus',
    'MOMO0478',
    'ikariamman',
    'agogo1202',
    'pubg1106',
    'ninia178178',
    'nuwai57',
    'xuane',
    'Tadnone',
    'uzgo',
    'WADE0616',
    'wenfang2012',
    'cl3bp6',
    'kobekid',
    'a0933954587',
    'Crypto',
    'kone1869',
    'DwyaneAndy',
    'wayne6250',
    'Esandman',
    'adidas81923',
    'peter5479',
  ];
  return author !== null && subscribeAuthor.includes(author);
}
