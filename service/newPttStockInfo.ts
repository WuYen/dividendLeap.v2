import { getHTML } from '../utility/requestCore';
import { IPostInfo } from '../model/PostInfo';

const domain = 'https://www.ptt.cc';

export async function getNewPosts(): Promise<IPostInfo[] | null> {
  // model add two new field, batch number and Id
  // id 就是 href 裡面 的某段網址

  // TODO-1: generate batch number according to current time stamp
  // TODO-2: add batch number to model
  // TODO-3: get last batch number and get index page html
  // TODO-4: parse html
  // TODO-5: get new article
  // TODO-6: save new article and save new batch
  // TODO-7: trigger send line notify
  return null;
}

function parseId(Link: string): number {
  const reg = new RegExp('https?://www.ptt.cc/bbs/.*/[GM]\\.(\\d+)\\..*');
  const strs = Link.match(reg);
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

function fastFindNewArticles(onlineArticles: IPostInfo[], savedArticles: IPostInfo[]): IPostInfo[] {
  const newArticles: IPostInfo[] = [];

  // Create a Set to store the IDs of the saved articles
  const savedArticleIds: Set<string> = new Set(savedArticles.map((article) => article.Id));

  for (const onlineArticle of onlineArticles) {
    if (!savedArticleIds.has(onlineArticle.Id)) {
      newArticles.push(onlineArticle);
    }
  }

  return newArticles;
}

export default { getNewPosts };
