import config from '../utility/config';
import { delay } from '../utility/delay';

import { ILineToken, TokenLevel } from '../model/lineToken';
import { AuthorModel, IAuthor } from '../model/Author';
import { IPostInfo } from '../model/PostInfo';

import lineService from './lineService';
import { getStockNoFromTitle } from './pttAuthorService';
import { PTT_DOMAIN, getNewPosts, isRePosts } from './pttStockPostService';
import { mainProcess } from './notifyQueueService';

export async function getNewPostAndSendLineNotify(channel: string, channels: string): Promise<any> {
  let newPosts = await getNewPosts();
  if (newPosts && newPosts.length) {
    const subscribeAuthor: IAuthor[] = await AuthorModel.find({}).lean();
    const tokenInfos: ILineToken[] | null = await retrieveUserLineToken(channel, channels);
    if (tokenInfos != null && tokenInfos.length > 0) {
      await notifyUsers(tokenInfos, newPosts, subscribeAuthor);
    }
    console.log(`new post: ${newPosts?.length}`);
  }
  return { postCount: newPosts?.length };
}

export async function notifyUsers(tokenInfos: ILineToken[], newPosts: IPostInfo[], subscribeAuthors: IAuthor[]) {
  var messages = prepareMessage(newPosts, subscribeAuthors);

  for (const tokenInfo of tokenInfos) {
    for (const message of messages) {
      if (tokenInfo.tokenLevel.includes(TokenLevel.Standard)) {
        await lineService.sendMessage(tokenInfo.token, message.standard);
      } else {
        await lineService.sendMessage(tokenInfo.token, message.basic);
      }
      await delay(25);
    }
  }

  await mainProcess(
    messages.filter((x) => x.isSubscribed).map((x) => x.post),
    tokenInfos.filter((x) => x.tokenLevel.includes(TokenLevel.Test)),
    subscribeAuthors
  );
}

export function prepareMessage(
  newPosts: IPostInfo[],
  subscribeAuthors: IAuthor[]
): { standard: string; basic: string; post: IPostInfo; isSubscribed: boolean }[] {
  return newPosts
    .filter((post) => {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      return (post.tag === '標的' && !isRePosts(post)) || (!!authorInfo && post.tag === '標的');
    })
    .map((post) => {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      const isSubscribed = !!authorInfo;

      const notifyContent: string[] = [];
      if (isSubscribed && post.tag === '標的') {
        notifyContent.push(`【✨✨大神來囉✨✨】`);
      }
      notifyContent.push(`[${post.tag}] ${post.title}`);

      //基本訊息
      const baseContent = [...notifyContent];
      baseContent.push(`作者: ${post.author}`);
      baseContent.push(`${PTT_DOMAIN}/${post.href}`);
      if (getStockNoFromTitle(post)) {
        baseContent.push('');
        baseContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
      }
      baseContent.push('');

      //標準訊息
      const standardContent = [...notifyContent];
      standardContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
      standardContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
      standardContent.push('');

      return { isSubscribed, post, standard: standardContent.join('\n'), basic: baseContent.join('\n') };
    });
}

async function retrieveUserLineToken(channel: string, channels: string) {
  let tokenInfos: ILineToken[] | null = [];

  if (channel) {
    const token = await lineService.getTokenByChannel(channel);
    if (token == null) {
      throw new Error('No match token for ' + channel);
    }
    tokenInfos.push(token);
  } else if (channels) {
    const splittedChannel = channels.split(',');
    const savedTokens = await lineService.getTokensByChannels(splittedChannel);
    if (savedTokens == null || savedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = savedTokens;
  } else {
    const retrivedTokens = await lineService.getAllEnabledChannel();
    if (retrivedTokens == null || retrivedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = retrivedTokens;
  }
  return tokenInfos;
}
