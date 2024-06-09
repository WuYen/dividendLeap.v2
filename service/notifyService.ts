import config from '../utility/config';
import { delay } from '../utility/delay';

import { ILineToken, TokenLevel } from '../model/lineToken';
import { AuthorModel, IAuthor } from '../model/Author';
import { IPostInfo } from '../model/PostInfo';

import lineService from './lineService';
import { getStockNoFromTitle } from './pttAuthorService';
import { PTT_DOMAIN, getNewPosts, isRePosts, processSinglePostToMessage } from './pttStockPostService';

export async function getNewPostAndSendLineNotify(channel: string, channels: string) {
  const newPosts = await getNewPosts();
  if (newPosts && newPosts.length) {
    const subscribeAuthor: IAuthor[] = await AuthorModel.find({}).lean();
    const tokenInfos: ILineToken[] | null = await retrieveUserLineToken(channel, channels);
    if (tokenInfos != null && tokenInfos.length > 0) {
      await notifyUsers(tokenInfos, newPosts, subscribeAuthor);
    }
    console.log(`new post: ${newPosts?.length}`);
  }
}

export async function notifyUsers(tokenInfos: ILineToken[], newPosts: IPostInfo[], subscribeAuthors: IAuthor[]) {
  for (const tokenInfo of tokenInfos) {
    for (const post of newPosts) {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      const isSubscribed = !!authorInfo;
      if ((post.tag === '標的' && !isRePosts(post)) || (isSubscribed && post.tag === '標的')) {
        let notifyContent: string[] = processSinglePostToMessage(post, isSubscribed);
        if (tokenInfo.tokenLevel.includes(TokenLevel.Test)) {
          notifyContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
          notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
        } else {
          notifyContent.push(`作者: ${post.author}`);
          notifyContent.push(`${PTT_DOMAIN}/${post.href}`);
          if (getStockNoFromTitle(post)) {
            notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
          }
          notifyContent.push('');
        }
        await lineService.sendMessage(tokenInfo.token, notifyContent.join('\n'));
        await delay(25);
      }
    }
  }
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
