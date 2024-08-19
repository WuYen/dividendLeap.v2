import Queue from 'better-queue';
import config from '../utility/config';
import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { getStockNoFromTitle, isRePosts, isValidStockPostForNotify } from '../utility/stockPostHelper';
import { PTT_DOMAIN, fetchPostDetail } from './pttStockPostService';
import lineService from './lineService';
import geminiAIService from './geminiAIService';
import stockPriceService from './stockPriceService';
import { formatTimestampToString } from '../utility/dateTime';
import { FugleAPIBuilder } from '../utility/fugleCaller';
import { FugleDataset } from '../utility/fugleTypes';
import { getIndustryName } from '../utility/stockHelper';

export interface PostContent {
  post: IPostInfo;
  content: string;
  level: TokenLevel;
  isSubscribedAuthor: boolean;
}

export interface MessageContent {
  content: string;
}

export interface NotifyEnvelop {
  user: ILineToken;
  payload: PostContent | MessageContent;
}

export class ContentGenerator {
  private static instance: ContentGenerator;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Method to get the single instance of ContentGenerator
  public static getInstance(): ContentGenerator {
    if (!ContentGenerator.instance) {
      ContentGenerator.instance = new ContentGenerator();
    }
    return ContentGenerator.instance;
  }

  async generateContent(
    post: IPostInfo,
    authorInfo: IAuthor | undefined,
    level: TokenLevel,
    isSubscribedAuthor: boolean
  ): Promise<PostContent> {
    const notifyContent: string[] = [''];
    if (isSubscribedAuthor && post.tag === '標的') {
      notifyContent.push('✨✨大神來囉✨✨');
    }

    const stockNo = getStockNoFromTitle(post);
    if (stockNo) {
      const response = await new FugleAPIBuilder(FugleDataset.StockIntradayTicker)
        .setParam({
          symbol: stockNo,
        })
        .get();
      notifyContent.push(`${response.exchange == 'TWSE' ? '上市' : '上櫃'}-${getIndustryName(response.industry)}`);
    }

    let textContent = '';
    switch (level) {
      case TokenLevel.Basic:
        notifyContent.push(`[${post.tag}] ${post.title}`);
        textContent = this.generateBasicContent(post, notifyContent);
        break;
      case TokenLevel.Standard:
        notifyContent.push(`[${post.tag}] ${post.title}`);
        textContent = this.generateStandardContent(post, authorInfo, notifyContent);
        break;
      case TokenLevel.Test:
        textContent = await this.generateAdvanceMessage(post, authorInfo, notifyContent);
        break;
    }

    return { post, content: textContent, level, isSubscribedAuthor };
  }

  private generateBasicContent(post: IPostInfo, notifyContent: string[]): string {
    const baseContent = [...notifyContent];
    baseContent.push(`作者: ${post.author}`);
    baseContent.push(`${config.CLIENT_URL}/${post.href}`);
    if (getStockNoFromTitle(post)) {
      baseContent.push('');
      baseContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
    }
    baseContent.push('');
    return baseContent.join('\n');
  }

  private generateStandardContent(post: IPostInfo, authorInfo: IAuthor | undefined, notifyContent: string[]): string {
    const standardContent = [...notifyContent];
    standardContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
    standardContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
    standardContent.push('');
    return standardContent.join('\n');
  }

  private async generateAdvanceMessage(
    post: IPostInfo,
    authorInfo: IAuthor | undefined,
    notifyContent: string[]
  ): Promise<string> {
    if (!post.href || !post.href.length) {
      console.log(`href is empty`);
      return '';
    }

    try {
      const href = `${PTT_DOMAIN}/${post.href}`;
      const postTextContent = await fetchPostDetail(href);

      if (!postTextContent) {
        return '';
      }

      const promptWords =
        '幫我分析文章\n' +
        '首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\n' +
        '如果文章中沒特別說明則該項顯示無\n' +
        '接著列出原文重點摘要盡量簡短\n' +
        '文章內容如下\n\n';
      console.log(`start prompt`);
      const promptResult = await geminiAIService.generateWithTunedModel(promptWords + postTextContent);

      notifyContent.push(`作者: ${post.author}`);
      try {
        const stockNo = getStockNoFromTitle(post);
        if (stockNo) {
          const intradayInfo = await stockPriceService.getStockPriceIntraday(stockNo);
          if (intradayInfo) {
            notifyContent.push(`${intradayInfo.name}股價: ${intradayInfo.lastPrice}`);
            notifyContent.push(`股價更新時間: ${formatTimestampToString(intradayInfo.lastUpdated)} \n`);
          }
        }
      } catch (error) {
        console.error('process message with getStockPriceIntraday fail', error);
      }

      notifyContent.push(promptResult);
      notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
      console.log(`end prompt`);
      return notifyContent.join('\n');
    } catch (error) {
      return '';
    }
  }
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
    const result = await ContentGenerator.getInstance().generateContent(post, authorInfo, level, isSubscribedAuthor);
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
      const basicContent = await ContentGenerator.getInstance().generateContent(
        post,
        authorInfo,
        TokenLevel.Basic,
        isSubscribedAuthor
      );
      const standardContent = await ContentGenerator.getInstance().generateContent(
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
