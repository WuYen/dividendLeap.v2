import config from '../utility/config';
import { delay } from '../utility/delay';

import { ILineToken, TokenLevel } from '../model/lineToken';
import { AuthorModel, IAuthor } from '../model/Author';
import { IPostInfo } from '../model/PostInfo';

import lineService from './lineService';
import { getStockNoFromTitle } from './pttAuthorService';
import { PTT_DOMAIN, fetchPostDetail, getNewPosts, isRePosts } from './pttStockPostService';
import * as geminiAIService from './geminiAIService';

export async function getNewPostAndSendLineNotify(channel: string, channels: string): Promise<any> {
  let notifyCount = 0;
  let newPosts = await getNewPosts();
  if (newPosts && newPosts.length) {
    const subscribeAuthor: IAuthor[] = await AuthorModel.find({}).lean();
    const tokenInfos: ILineToken[] | null = await retrieveUserLineToken(channel, channels);
    if (tokenInfos != null && tokenInfos.length > 0) {
      notifyCount++;
      await notifyUsers(tokenInfos, newPosts, subscribeAuthor);
    }
    console.log(`new post: ${newPosts?.length}`);
  }
  return { notifyCount: notifyCount, postCount: newPosts?.length };
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
}

export function prepareMessage(
  newPosts: IPostInfo[],
  subscribeAuthors: IAuthor[]
): { standard: string; basic: string }[] {
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

      return { standard: standardContent.join('\n'), basic: baseContent.join('\n') };
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

export async function prepareMessageByAI(url: string): Promise<string> {
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
