import Queue from 'better-queue';

import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { getStockNoFromTitle, isRePosts, isValidStockPostForNotify } from '../utility/stockPostHelper';
import lineService from './lineService';
import { NotifyContentGenerator, PostContent } from './business/NotifyContentGenerator';
import config from '../utility/config';
import TelegramBotService from './telegramBotService';
import TelegramBot from 'node-telegram-bot-api';

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
      const promises: Promise<any>[] = [lineService.sendMessage(job.user.token, job.payload.content)];
      //TODO-2: 之後不會兩個都送, tg and line 只會二選一, 根據 notifyQueue.push 這邊push 的內容決定
      if (job.user.tgChatId) {
        var options = {};
        if ((job.payload as PostContent).post !== undefined) {
          //TODO-3: pending on TODO-1, once finish following logic should be removed
          //TODO-4: handle option, option should be in part of NotifyEnvelop payload
          const postContent = job.payload as PostContent;
          if (postContent.isSubscribedAuthor) {
            const post = postContent.post as IPostInfo;
            const symbol = getStockNoFromTitle(postContent.post as IPostInfo);
            options = {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: '取得股價', callback_data: `get_stock_price:${symbol}` },
                    { text: '作者資訊', callback_data: `get_author_performance:${post?.author}` },
                  ],
                  [{ text: '取得標的分析資訊', callback_data: `get_target_analysis:${post?.id}` }],
                ],
              },
            } as TelegramBot.SendMessageOptions;
          }
        }
        promises.push(
          TelegramBotService.getInstance().sendMessageWithOptions(job.user.tgChatId, job.payload.content, options)
        );
      }

      await Promise.all(promises);
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
        console.log('Add job to postQueue ' + post.id);
        postQueue.push({ post, authorInfo, level: TokenLevel.Test, isSubscribedAuthor, users: delayNotifyUsers });
        //TODO-1: Add new logic in NotifyContentGenerator
        //1. check if tg user exists,
        //2. process tg message,
        //3. then push to postQueue,
        //4. post queue will have new type of message, TokenLevel 改成 message type
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
