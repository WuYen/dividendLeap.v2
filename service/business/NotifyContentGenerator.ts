import config from '../../utility/config';
import { IAuthor } from '../../model/Author';
import { IPostInfo } from '../../model/PostInfo';
import { getStockNoFromTitle } from '../../utility/stockPostHelper';
import { PTT_DOMAIN, fetchPostDetail } from '../pttStockPostService';
import geminiAIService from '../geminiAIService';
import stockPriceService from '../stockPriceService';
import { formatTimestampToString, toDateString, today, todayDate } from '../../utility/dateTime';
import { FugleAPIBuilder } from '../../utility/fugleCaller';
import { FugleDataset } from '../../utility/fugleTypes';
import { getIndustryName } from '../../utility/stockHelper';
import { delay } from '../../utility/delay';
import TelegramBot from 'node-telegram-bot-api';

export enum ContentType {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium',
  Telegram = 'telegram',
}

export interface PostContent {
  post: IPostInfo;
  content: string;
  contentType: ContentType;
  isSubscribedAuthor: boolean;
  options: TelegramBot.SendMessageOptions | any | null;
}

export class NotifyContentGenerator {
  private static instance: NotifyContentGenerator;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Method to get the single instance of ContentGenerator
  public static getInstance(): NotifyContentGenerator {
    if (!NotifyContentGenerator.instance) {
      NotifyContentGenerator.instance = new NotifyContentGenerator();
    }
    return NotifyContentGenerator.instance;
  }

  async generateContent(
    post: IPostInfo,
    authorInfo: IAuthor | undefined,
    contentType: ContentType,
    isSubscribedAuthor: boolean
  ): Promise<PostContent> {
    const notifyContent: string[] = [''];
    if (isSubscribedAuthor && post.tag === '標的') {
      notifyContent.push('✨✨大神來囉✨✨');
    }
    notifyContent.push(`[${post.tag}] ${post.title}`);
    const stockNo = getStockNoFromTitle(post);
    if (stockNo) {
      const response = await new FugleAPIBuilder(FugleDataset.StockIntradayTicker)
        .setParam({
          symbol: stockNo,
        })
        .get();
      notifyContent.push(`${response.exchange == 'TWSE' ? '上市' : '上櫃'}-${getIndustryName(response.industry)}`);
    }
    //TODO: want to create share data by post, need cache, don't want to call generateAdvanceMessage twice
    let textContent = '';
    let options = null;
    switch (contentType) {
      case ContentType.Basic:
        textContent = this.generateBasicContent(post, notifyContent);
        break;
      case ContentType.Standard:
        textContent = this.generateStandardContent(post, authorInfo, notifyContent);
        break;
      case ContentType.Premium:
        textContent = (await this.generateAdvanceMessage(post, authorInfo)).join('\n');
        break;
      case ContentType.Telegram:
        const temp = await this.generateAdvanceMessage(post, authorInfo);
        temp.pop();
        textContent = temp.join('\n');
        isSubscribedAuthor &&
          stockNo &&
          (options = {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '取得股價', callback_data: `get_stock_price:${stockNo}` },
                  { text: '作者資訊', callback_data: `get_author_performance:${post?.author}` },
                ],
                [{ text: '取得標的分析資訊', callback_data: `get_target_analysis:${post?.id}` }],
                [{ text: '打開網頁', url: `https://www.ptt.cc/${post.href}` }],
              ],
            },
          } as TelegramBot.SendMessageOptions);
        break;
    }

    return { post, content: textContent, contentType, isSubscribedAuthor, options };
  }

  private generateBasicContent(post: IPostInfo, notifyContent: string[]): string {
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

  private generateStandardContent(post: IPostInfo, authorInfo: IAuthor | undefined, notifyContent: string[]): string {
    const standardContent = [...notifyContent];
    standardContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
    standardContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
    standardContent.push('');
    return standardContent.join('\n');
  }

  private async generateAdvanceMessage(post: IPostInfo, authorInfo: IAuthor | undefined): Promise<string[]> {
    if (!post.href || !post.href.length) {
      console.log(`href is empty`);
      return [];
    }

    try {
      const href = `${PTT_DOMAIN}/${post.href}`;
      const postTextContent = await fetchPostDetail(href);

      if (!postTextContent) {
        return [];
      }

      const promptWords =
        '幫我分析文章\n' +
        '首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\n' +
        '如果文章中沒特別說明則該項顯示無\n' +
        '接著列出原文重點摘要盡量簡短\n' +
        '文章內容如下\n\n';

      const promptResult = await geminiAIService.generateWithTunedModel(promptWords + postTextContent);
      const notifyContent: string[] = [''];
      try {
        const stockNo = getStockNoFromTitle(post);

        if (stockNo) {
          const stockInfo = await new FugleAPIBuilder(FugleDataset.StockIntradayTicker).setParam({ symbol: stockNo }).get();
          if (stockInfo) {
            await delay(50);
            const intradayInfo = await stockPriceService.getStockPriceIntraday(stockNo);
            if (intradayInfo && intradayInfo.lastPrice > 0) {
              notifyContent.push(`${stockInfo.name}股價: ${intradayInfo.lastPrice}`);
              notifyContent.push(`股價更新時間: ${formatTimestampToString(intradayInfo.lastUpdated)}`);
            } else {
              const start = todayDate();
              start.setDate(start.getDate() - 5); // 扣除5天
              const historicalInfo = await stockPriceService.getStockPriceByDates(stockNo, toDateString(start), today());
              if (historicalInfo && historicalInfo?.data?.length) {
                const lastPrice = historicalInfo.data.reverse()[0];
                notifyContent.push(`${stockInfo.name}股價: ${lastPrice.close}`);
                notifyContent.push(`股價更新時間: ${lastPrice.date}`);
              }
            }

            notifyContent.push(`${stockInfo.exchange == 'TWSE' ? '上市' : '上櫃'}-${getIndustryName(stockInfo.industry)}`);
          }
        }
      } catch (error) {
        console.error('process message with getStockPriceIntraday fail', error);
      }
      notifyContent.push(`作者: ${post.author} \n`);
      notifyContent.push(promptResult);
      notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
      return notifyContent;
    } catch (error) {
      console.error('generateAdvanceMessage fail', error);
      return [];
    }
  }
}
