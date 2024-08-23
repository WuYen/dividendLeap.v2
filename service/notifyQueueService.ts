import Queue from 'better-queue';

import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { isRePosts, isValidStockPostForNotify } from '../utility/stockPostHelper';
import lineService from './lineService';
import { NotifyContentGenerator, PostContent } from './business/NotifyContentGenerator';
import config from '../utility/config';

export interface MessageContent {
  content: string;
}

export interface NotifyEnvelop {
  user: ILineToken;
  payload: PostContent | MessageContent;
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

export const postQueue = new Queue(async (job: any, done: Function) => {
  try {
    const { post, authorInfo, level, isSubscribedAuthor, users } = job;
    const result = await NotifyContentGenerator.getInstance().generateContent(
      post,
      authorInfo,
      level,
      isSubscribedAuthor
    );
    console.log(`Finish testQueue job ${post.title}\n`);
    done(null, { users, content: result });
  } catch (error) {
    console.error(`Error testQueue job ${job.id}:`, error);
    done(error);
  }
});

// 監聽完成和失敗事件
postQueue.on('task_finish', (taskId: number, result: any) => {
  const { users, content } = result;
  for (const tokenInfo of users as ILineToken[]) {
    console.log(`=> add ${tokenInfo.channel} ${tokenInfo.tokenLevel.join(',')} to notifyQueue`);
    notifyQueue.push({ user: tokenInfo, payload: content });
  }
});

postQueue.on('task_failed', (taskId: number, error: Error) => {
  console.error(`Job ${taskId} failed with error: ${error}`);
});

export async function processPostAndSendNotify(
  newPosts: IPostInfo[],
  users: ILineToken[],
  subscribeAuthors: IAuthor[]
): Promise<void> {
  for (const post of newPosts) {
    try {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      const isSubscribedAuthor = !!authorInfo;
      const basicContent = await NotifyContentGenerator.getInstance().generateContent(
        post,
        authorInfo,
        TokenLevel.Basic,
        isSubscribedAuthor
      );
      const standardContent = await NotifyContentGenerator.getInstance().generateContent(
        post,
        authorInfo,
        TokenLevel.Standard,
        isSubscribedAuthor
      );
      const delayNotifyUsers = [];

      for (const tokenInfo of users) {
        const isMyKeywordMatch =
          tokenInfo.keywords && tokenInfo.keywords.some((keyword) => post.title.includes(keyword));

        if ((post.tag === '標的' && (isValidStockPostForNotify(post) || isSubscribedAuthor)) || isMyKeywordMatch) {
          if (post.tag === '標的' && isSubscribedAuthor && !isRePosts(post)) {
            delayNotifyUsers.push(tokenInfo);
          } else {
            notifyQueue.push({
              user: tokenInfo,
              payload: tokenInfo.tokenLevel.includes(TokenLevel.Standard) ? standardContent : basicContent,
            });
          }
        }
      }

      if (post.tag === '標的' && isSubscribedAuthor && !isRePosts(post)) {
        console.log('=> add job to testQueue ' + post.id);
        postQueue.push({ post, authorInfo, level: TokenLevel.Test, isSubscribedAuthor, users: delayNotifyUsers });
      }
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error);
    }
  }
}

export async function sendPremiumInvitation(channel: string, channels: string): Promise<void> {
  try {
    const tokenInfos: ILineToken[] | null = await lineService.retrieveUserLineToken(channel, channels);

    if (!tokenInfos || tokenInfos.length === 0) {
      console.log('No token information found.');
      return;
    }

    for (const tokenInfo of tokenInfos) {
      if (tokenInfo.tokenLevel.includes(TokenLevel.Premium)) {
        const content = [''];
        content.push(`Hi ${tokenInfo.channel}`);
        content.push('邀請使用新功能');
        content.push('祝您使用愉快！');
        content.push(`${config.CLIENT_URL}/my?channel=${tokenInfo.channel}`);
        content.push('NOTE: 請使用外部瀏覽器打開');
        const invitationMessage = content.join('\n');
        notifyQueue.push({ user: tokenInfo, payload: { content: invitationMessage } } as NotifyEnvelop);
      }
    }
  } catch (error) {
    console.error('Error in sendPremiumInvitation:', error);
    throw error;
  }
}
