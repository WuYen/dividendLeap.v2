import Queue from 'better-queue';
import config from '../utility/config';
import { AuthorModel, IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { getStockNoFromTitle } from '../utility/stockPostHelper';
import { PTT_DOMAIN, fetchPostDetail, getNewPosts } from './pttStockPostService';
import lineService from './lineService';
import geminiAIService from './geminiAIService';
import { isRePosts } from '../utility/stockPostHelper';

interface GeneratedContent {
  post: IPostInfo;
  content: string;
  level: TokenLevel;
  isSubscribedAuthor: boolean;
}

interface NotifyEnvelop {
  user: ILineToken;
  payload: GeneratedContent;
}

// 創建隊列
export const notifyQueue = new Queue(
  async (job: NotifyEnvelop, done: Function) => {
    try {
      console.log(`Sending notification ${job.payload.content} to ${job.user.channel}`);
      await lineService.sendMessage(job.user.token, job.payload.content);
      console.log(`Finish notifyQueue job \n`);
      done(null, job);
    } catch (error) {
      console.error(`Error processing notifyQueue job`, error);
      done(error);
    }
  },
  { afterProcessDelay: 25 }
);

export const testQueue = new Queue(async (job: any, done: Function) => {
  try {
    const { post, authorInfo, level, isSubscribedAuthor, users } = job;
    const result = await generateContent(post, authorInfo, level, isSubscribedAuthor);
    console.log(`Finish testQueue job ${post.title}\n`);
    done(null, { users, content: result });
  } catch (error) {
    console.error(`Error testQueue job ${job.id}:`, error);
    done(error);
  }
});

// 監聽完成和失敗事件
testQueue.on('task_finish', (taskId: number, result: any) => {
  const { users, content } = result;
  for (const tokenInfo of users as ILineToken[]) {
    console.log(`=> add ${tokenInfo.channel} ${tokenInfo.tokenLevel.join(',')} to notifyQueue`);
    notifyQueue.push({ user: tokenInfo, payload: content });
  }
});

testQueue.on('task_failed', (taskId: number, error: Error) => {
  console.error(`Job ${taskId} failed with error: ${error}`);
});

export async function getNewPostAndSendLineNotify(channel: string, channels: string): Promise<any> {
  let newPosts = await getNewPosts();
  if (newPosts && newPosts.length) {
    const subscribeAuthors: IAuthor[] = await AuthorModel.find({}).lean();
    const targetPosts = newPosts.filter((post) => {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      return (post.tag === '標的' && !isRePosts(post)) || (!!authorInfo && post.tag === '標的');
    });
    if (targetPosts.length > 0) {
      const tokenInfos: ILineToken[] | null = await retrieveUserLineToken(channel, channels);
      if (tokenInfos != null && tokenInfos.length > 0) {
        await mainProcess(targetPosts, tokenInfos, subscribeAuthors);
      }
      console.log(`finish sending notify count:${tokenInfos.length}, post count:${targetPosts.length}`);
    }
  }
  return { postCount: newPosts?.length };
}

export async function mainProcess(
  newPosts: IPostInfo[],
  users: ILineToken[],
  subscribeAuthors: IAuthor[]
): Promise<void> {
  for (const post of newPosts) {
    try {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      const isSubscribedAuthor = !!authorInfo;
      const basicContent = await generateContent(post, authorInfo, TokenLevel.Basic, isSubscribedAuthor);
      const standardContent = await generateContent(post, authorInfo, TokenLevel.Standard, isSubscribedAuthor);
      const delayNotifyUsers = [];

      for (const tokenInfo of users) {
        if (isSubscribedAuthor && tokenInfo.tokenLevel.includes(TokenLevel.Test)) {
          delayNotifyUsers.push(tokenInfo);
        } else {
          console.log(`=> add ${tokenInfo.channel} ${tokenInfo.tokenLevel.join(',')} to notifyQueue`);
          notifyQueue.push({
            user: tokenInfo,
            payload: tokenInfo.tokenLevel.includes(TokenLevel.Standard) ? standardContent : basicContent,
          });
        }
      }

      if (isSubscribedAuthor) {
        console.log('=> add job to testQueue ' + post.id);
        testQueue.push({ post, authorInfo, level: TokenLevel.Test, isSubscribedAuthor, users: delayNotifyUsers });
      }
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error);
    }
  }
}

export async function prepareMessageByAI(post: IPostInfo, authorInfo: IAuthor | undefined): Promise<string> {
  const href = `https://www.ptt.cc/${post.href}`;

  if (href == null || !href.length) {
    return '';
  }
  console.log(`process url ${href}`);

  var postContent = '';
  try {
    var postContent = await fetchPostDetail(href);

    if (postContent == null || !href.length) {
      return '';
    }

    var promptWrod =
      '幫我分析文章\n' +
      '首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\n' +
      '如果文章中沒特別說明則該項顯示無\n' +
      '接著列出原文重點摘要盡量簡短\n' +
      '文章內容如下\n\n';
    console.log(`start prompt`);
    let promptResult = await geminiAIService.generateWithTunedModel(promptWrod + postContent);
    let textArray = ['【✨✨大神來囉✨✨】'];
    textArray.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
    textArray.push(promptResult);
    textArray.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
    console.log(`end prompt`);
    return textArray.join('\n');
  } catch (error) {
    return '';
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

function generateBasicContent(post: IPostInfo, notifyContent: string[]): string {
  const baseContent = [...notifyContent];
  baseContent.push(`作者: ${post.author}`);
  baseContent.push(`${PTT_DOMAIN}/${post.href}`);
  if (getStockNoFromTitle(post)) {
    baseContent.push('');
    baseContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
  }
  baseContent.push('');
  return baseContent.join('\n');
}

function generateStandardContent(post: IPostInfo, authorInfo: IAuthor | undefined, notifyContent: string[]): string {
  const standardContent = [...notifyContent];
  standardContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
  standardContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
  standardContent.push('');
  return standardContent.join('\n');
}

async function generateContent(
  post: IPostInfo,
  authorInfo: IAuthor | undefined,
  level: TokenLevel,
  isSubscribedAuthor: boolean
): Promise<GeneratedContent> {
  const notifyContent: string[] = [];
  if (isSubscribedAuthor && post.tag === '標的') {
    notifyContent.push(`【✨✨大神來囉✨✨】`);
  }
  notifyContent.push(`[${post.tag}] ${post.title}`);

  let textContent = '';
  switch (level) {
    case TokenLevel.Basic:
      textContent = generateBasicContent(post, notifyContent);
      break;
    case TokenLevel.Standard:
      textContent = generateStandardContent(post, authorInfo, notifyContent);
      break;
    case TokenLevel.Test:
      textContent = await prepareMessageByAI(post, authorInfo);
      break;
  }

  return { post, content: textContent, level, isSubscribedAuthor };
}
