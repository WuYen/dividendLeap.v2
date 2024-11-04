import Queue from 'better-queue';

import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { isRePosts, isValidStockPostForNotify } from '../utility/stockPostHelper';
import lineService from './lineService';
import { NotifyContentGenerator, PostContent } from './business/NotifyContentGenerator.v2';

import TelegramBotService from './telegramBotService';

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
      if (job.user.tgChatId) {
        const post = job.payload as PostContent;
        await TelegramBotService.getInstance().sendMessageWithOptions(job.user.tgChatId, post.content, post.options);
      } else {
        await lineService.sendMessage(job.user.token, job.payload.content);
      }

      done(null, job);
    } catch (error) {
      console.error(`Error processing notifyQueue job`, error);
      done(error);
    }
  },
  { afterProcessDelay: 10 }
);

export const postQueue = new Queue(async (job: any, done: Function) => {
  try {
    const { contentGenerator, level, users } = job;
    const result = await (contentGenerator as NotifyContentGenerator).getContent(level);
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
      const contentGenerator = new NotifyContentGenerator(post, authorInfo);

      const delayNotifyUsers = new Map<string, ILineToken[]>();
      for (const tokenInfo of users) {
        const isMyKeywordMatch = tokenInfo.keywords?.some((keyword) => post.title.includes(keyword)) ?? false;

        if ((post.tag === '標的' && (isValidStockPostForNotify(post) || isSubscribedAuthor)) || isMyKeywordMatch) {
          let key: string;
          if (post.tag === '標的' && isSubscribedAuthor && !isRePosts(post)) {
            key = tokenInfo.tgChatId == null ? 'advance' : 'tg';
          } else {
            key = tokenInfo.tokenLevel.includes(TokenLevel.Standard) ? 'Standard' : 'Basic';
          }

          if (!delayNotifyUsers.get(key)) {
            delayNotifyUsers.set(key, []);
          }
          delayNotifyUsers.get(key)?.push(tokenInfo);
        }
      }

      for (const key of delayNotifyUsers.keys()) {
        postQueue.push({ contentGenerator, level: key, isSubscribedAuthor, users: delayNotifyUsers.get(key) });
      }
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error);
    }
  }
}
