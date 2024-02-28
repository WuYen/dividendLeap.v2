import { getHTML } from '../utility/requestCore';
import { IPostInfo } from '../model/PostInfo';

const domain = 'https://www.ptt.cc';

export async function getNewPosts(): Promise<IPostInfo[] | null> {
  // model add two new field, batch number and Id
  // id 就是 href 裡面 的某段網址
  const batchNo = +new Date();
  let url = `${domain}/bbs/Stock/index.html`;
  console.log(`process url ${url}`);
  let $ = await getHTML(url);
  let onlinePosts = parsePosts($);
  var newPosts = fastFindNewArticles(onlinePosts, []);
  // TODO-1: generate batch number according to current time stamp
  // TODO-2: add batch number to model
  // TODO-3: get last batch number and get index page html
  // TODO-4: parse html
  // TODO-5: get new article
  // TODO-6: save new article and save new batch
  // TODO-7: trigger send line notify
  return null;
}

function parsePosts($: cheerio.Root): IPostInfo[] {
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

    const postInfo: IPostInfo = {
      tag,
      title,
      href,
      author,
      date,
      Id: 100001,
      batchNo: 100001,
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

function findNewArticles(onlineArticles: IPostInfo[], savedArticles: IPostInfo[]): IPostInfo[] {
  const newArticles: IPostInfo[] = [];

  for (const onlineArticle of onlineArticles) {
    let isNew = true;

    for (const savedArticle of savedArticles) {
      if (onlineArticle.Id == savedArticle.Id) {
        isNew = false;
        break;
      }
    }

    if (isNew) {
      newArticles.push(onlineArticle);
    }
  }

  return newArticles;
}

export function fastFindNewArticles(onlineArticles: IPostInfo[], savedArticles: IPostInfo[]): IPostInfo[] {
  const newArticles: IPostInfo[] = [];

  // Create a Set to store the IDs of the saved articles
  const savedArticleIds: Set<number> = new Set(savedArticles.map((article) => article.Id));

  for (const onlineArticle of onlineArticles) {
    if (!savedArticleIds.has(onlineArticle.Id)) {
      newArticles.push(onlineArticle);
    }
  }

  return newArticles;
}

export default { getNewPosts, parseId };
