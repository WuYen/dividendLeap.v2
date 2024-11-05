import Queue from 'better-queue';

import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { isRePosts, isValidStockPostForNotify } from '../utility/stockPostHelper';
import lineService from './lineService';
import { ContentType, NotifyContentGenerator, PostContent } from './business/NotifyContentGenerator';
import config from '../utility/config';
import telegramBotService from './telegramBotService';

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
      const postContent = job.payload as PostContent;
      if (job.user.tgChatId && postContent?.contentType == ContentType.Telegram) {
        await telegramBotService.sendMessageWithOptions(job.user.tgChatId, postContent.content, postContent.options);
      } else {
        await lineService.sendMessage(job.user.token, job.payload.content);
      }

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
    const { post, authorInfo, contentType, isSubscribedAuthor, users } = job;
    const result = await NotifyContentGenerator.getInstance().generateContent(
      post,
      authorInfo,
      contentType,
      isSubscribedAuthor
    );
    done(null, { users, content: result });
  } catch (error) {
    console.error(`Error postQueue job ${job.id}:`, error);
    done(error);
  }
});

// 監聽完成和失敗事件
postQueue.on('task_finish', (taskId: number, result: any) => {
  const { users, content }: { users: ILineToken[]; content: PostContent } = result;
  for (const tokenInfo of users as ILineToken[]) {
    notifyQueue.push({ user: tokenInfo, payload: content });
  }
  console.log(`postQueue task_finish for ${content.post.id} ${content.post.title}, notifyCount:${users.length}`);
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
        ContentType.Basic,
        isSubscribedAuthor
      );
      const standardContent = await NotifyContentGenerator.getInstance().generateContent(
        post,
        authorInfo,
        ContentType.Standard,
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
        console.log('Add job to postQueue ' + post.id);
        postQueue.push({
          post,
          authorInfo,
          contentType: ContentType.Premium,
          isSubscribedAuthor,
          users: delayNotifyUsers,
        });

        const tgUsers = delayNotifyUsers.filter((x) => x.tgChatId);
        if (tgUsers.length > 0) {
          postQueue.push({ post, authorInfo, contentType: ContentType.Telegram, isSubscribedAuthor, users: tgUsers });
        }
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
