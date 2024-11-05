import Queue from 'better-queue';

import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { isRePosts, isValidStockPostForNotify } from '../utility/stockPostHelper';
import lineService from './lineService';
import { ContentType, NotifyContentGenerator, PostContent } from './business/NotifyContentGenerator.v2';

import telegramBotService from './telegramBotService';

export interface MessageContent {
  content: string;
}

export interface NotifyEnvelop {
  token: string;
  channel: MessageChannel;
  payload: PostContent | MessageContent;
}

export enum MessageChannel {
  Line = 'line',
  Telegram = 'telegram',
}

// 創建隊列
export const notifyQueue = new Queue<NotifyEnvelop>(
  async (job: NotifyEnvelop, done: Function) => {
    try {
      if (job.channel === MessageChannel.Telegram) {
        await telegramBotService.sendMessageWithOptions(
          job.token,
          job.payload.content,
          (job.payload as PostContent)?.options
        );
      } else if (job.channel === MessageChannel.Line) {
        await lineService.sendMessage(job.token, job.payload.content);
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
    const {
      contentGenerator,
      type,
      users,
    }: { contentGenerator: NotifyContentGenerator; type: ContentType; users: NotifyEnvelop[] } = job;
    const result = await contentGenerator.getContent(type);
    done(null, { users, content: result });
  } catch (error) {
    console.error(`Error postQueue job ${job.id}:`, error);
    done(error);
  }
});

// 監聽完成和失敗事件
postQueue.on('task_finish', (taskId: number, result: any) => {
  const { users, content }: { users: NotifyEnvelop[]; content: PostContent } = result;
  for (const notifyEnvelop of users) {
    notifyEnvelop.payload = content;
    notifyQueue.push(notifyEnvelop);
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
      const contentGenerator = new NotifyContentGenerator(post, authorInfo || null);

      const notifyUsers = new Map<ContentType, NotifyEnvelop[]>();
      for (const tokenInfo of users) {
        const isMyKeywordMatch = tokenInfo.keywords?.some((keyword) => post.title.includes(keyword)) ?? false;

        if ((post.tag === '標的' && (isValidStockPostForNotify(post) || isSubscribedAuthor)) || isMyKeywordMatch) {
          let type: ContentType;
          let channel: MessageChannel = MessageChannel.Line;

          if (post.tag === '標的' && isSubscribedAuthor && !isRePosts(post)) {
            type = ContentType.Premium;
            if (tokenInfo.tgChatId != null) {
              type = ContentType.Telegram;
              channel = MessageChannel.Telegram;
            }
          } else {
            type = tokenInfo.tokenLevel.includes(TokenLevel.Standard) ? ContentType.Standard : ContentType.Basic;
          }

          if (!notifyUsers.get(type)) {
            notifyUsers.set(type, []);
          }

          let notify = {
            token: channel === MessageChannel.Line ? tokenInfo.token : tokenInfo.tgChatId,
            channel: channel,
          } as NotifyEnvelop;

          notifyUsers.get(type)?.push(notify);
        }
      }

      for (const key of notifyUsers.keys()) {
        const users = notifyUsers.get(key);
        if (users && users.length > 0) {
          postQueue.push({ contentGenerator, type: key, users });
        }
      }
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error);
    }
  }
}
