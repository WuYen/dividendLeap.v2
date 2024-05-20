import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import config from '../utility/config';
import { delay } from '../utility/delay';
import lineService from './lineService';
import { getStockNoFromTitle } from './pttStockAuthor';
import { isRePosts, processSinglePostToMessage } from './pttStockInfo';
import subscribeService from './subscribeService';

export async function notifyUsers(tokenInfos: ILineToken[], newPosts: any[], subscribeAuthors: IAuthor[]) {
  for (const tokenInfo of tokenInfos) {
    for (const post of newPosts) {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      const isSubscribed = !!authorInfo;

      if (tokenInfo.setting?.subscribeStock) {
        await handleNotification(tokenInfo, post, isSubscribed, false);
      } else if ((post.tag === '標的' || isSubscribed) && !isRePosts(post)) {
        const isPrimary = !tokenInfo.tokenLevel.includes(TokenLevel.Test);
        await handleNotification(tokenInfo, post, isSubscribed, isPrimary);
      }
    }
  }
}

async function handleNotification(tokenInfo: ILineToken, post: any, isSubscribed: boolean, isPrimary: boolean) {
  const userSubscribed =
    tokenInfo.setting?.subscribeStock &&
    subscribeService.isSubscribedPost(post.title, tokenInfo.setting.subscribeStock);
  if (userSubscribed || (!isPrimary && (post.tag === '標的' || isSubscribed) && !isRePosts(post))) {
    let notifyContent: string[] = processSinglePostToMessage(post, isSubscribed, isPrimary);

    if (isPrimary) {
      if (post.tag === '標的' && getStockNoFromTitle(post)) {
        notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
      }
    } else {
      notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}?token=${tokenInfo.channel}`);
    }

    await lineService.sendMessage(tokenInfo.token, notifyContent.join('\n'));
    await delay(25);
  }
}

export default {
  notifyUsers,
};
