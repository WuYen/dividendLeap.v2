import config from '../../utility/config';
import { IAuthor } from '../../model/Author';
import { TokenLevel } from '../../model/lineToken';
import { IPostInfo } from '../../model/PostInfo';
import { getStockNoFromTitle } from '../../utility/stockPostHelper';
import { PTT_DOMAIN, fetchPostDetail } from '../pttStockPostService';
import geminiAIService from '../geminiAIService';
import stockPriceService from '../stockPriceService';
import { formatTimestampToString } from '../../utility/dateTime';
import { FugleAPIBuilder } from '../../utility/fugleCaller';
import { FugleDataset } from '../../utility/fugleTypes';
import { getIndustryName } from '../../utility/stockHelper';
import { delay } from '../../utility/delay';

export interface PostContent {
  post: IPostInfo;
  content: string;
  level: TokenLevel;
  isSubscribedAuthor: boolean;
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
    level: TokenLevel,
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

    let textContent = '';
    switch (level) {
      case TokenLevel.Basic:
        textContent = this.generateBasicContent(post, notifyContent);
        break;
      case TokenLevel.Standard:
        textContent = this.generateStandardContent(post, authorInfo, notifyContent);
        break;
      case TokenLevel.Test:
        textContent = await this.generateAdvanceMessage(post, authorInfo);
        break;
    }

    return { post, content: textContent, level, isSubscribedAuthor };
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

  private async generateAdvanceMessage(post: IPostInfo, authorInfo: IAuthor | undefined): Promise<string> {
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

      const promptResult = await geminiAIService.generateWithTunedModel(promptWords + postTextContent);
      const notifyContent: string[] = [''];
      try {
        const stockNo = getStockNoFromTitle(post);

        if (stockNo) {
          const intradayInfo = await stockPriceService.getStockPriceIntraday(stockNo);
          if (intradayInfo) {
            notifyContent.push(`${intradayInfo.name}股價: ${intradayInfo.lastPrice}`);
            notifyContent.push(`股價更新時間: ${formatTimestampToString(intradayInfo.lastUpdated)}`);
          }
          await delay(100);
          const stockInfo = await new FugleAPIBuilder(FugleDataset.StockIntradayTicker)
            .setParam({ symbol: stockNo })
            .get();
          stockInfo &&
            notifyContent.push(
              `${stockInfo.exchange == 'TWSE' ? '上市' : '上櫃'}-${getIndustryName(stockInfo.industry)}`
            );
        }
      } catch (error) {
        console.error('process message with getStockPriceIntraday fail', error);
      }
      notifyContent.push(`作者: ${post.author} \n`);
      notifyContent.push(promptResult);
      notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
      console.log(`end prompt`);
      return notifyContent.join('\n');
    } catch (error) {
      return '';
    }
  }
}
