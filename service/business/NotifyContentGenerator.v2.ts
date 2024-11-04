import config from '../../utility/config';
import { IAuthor } from '../../model/Author';
import { TokenLevel } from '../../model/lineToken';
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

export interface PostContent {
  post: IPostInfo;
  isSubscribedAuthor: boolean;
  contentMap?: Map<TokenLevel, string>;
}

interface StockPriceContent {
  stockNo: string;
  stockName: string;
  industryName: string;
  price: string;
  updateDate: string;
  exchangeType: '上市' | '上櫃';
}

export class NotifyContentGenerator {
  private post: IPostInfo;
  private authorInfo: IAuthor | undefined;
  private isSubscribedAuthor: boolean = false;

  constructor(post: IPostInfo, authorInfo: IAuthor | undefined) {
    this.post = post;
    this.authorInfo = authorInfo;
    this.isSubscribedAuthor = !!authorInfo;
  }

  async generateAllContent(): Promise<PostContent> {
    const notifyContent: string[] = [''];
    if (this.isSubscribedAuthor && this.post.tag === '標的') {
      notifyContent.push('✨✨大神來囉✨✨');
    }
    notifyContent.push(`[${this.post.tag}] ${this.post.title}`);
    const stockNo = getStockNoFromTitle(this.post);
    if (stockNo) {
      const response = await this.generateStockContent(stockNo);
      notifyContent.push(`${response?.exchangeType}-${response?.industryName}`);
    }

    let result = {
      post: this.post,
      isSubscribedAuthor: this.isSubscribedAuthor,
      contentMap: new Map(),
    } as PostContent;

    result.contentMap?.set(TokenLevel.Basic, this.generateBasicContent(this.post, notifyContent));
    result.contentMap?.set(
      TokenLevel.Standard,
      this.generateStandardContent(this.post, this.authorInfo, notifyContent)
    );

    //TODO: 確認以下兩個產生的內容訊息
    //TODO: 改用 ContentType, and process Telegram message
    //TODO: check when should calling generatePostSummaryWithAI
    let postSummary = await this.generatePostSummaryByAI(this.post, this.authorInfo);
    result.contentMap?.set(TokenLevel.Premium, postSummary);
    result.contentMap?.set(TokenLevel.Test, postSummary);
    return result;
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

  private async generatePostSummaryByAI(post: IPostInfo, authorInfo: IAuthor | undefined): Promise<string> {
    if (!post.href || !post.href.length) {
      console.log(`href is empty`);
      return '';
    }

    try {
      const postTextContent = await fetchPostDetail(`${PTT_DOMAIN}/${post.href}`);

      if (!postTextContent || postTextContent.length == 0) {
        console.log(`postTextContent is empty`);
        return '';
      }

      const promptWords =
        '幫我分析文章\n' +
        '首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\n' +
        '如果文章中沒特別說明則該項顯示無\n' +
        '接著列出原文重點摘要盡量簡短\n' +
        '文章內容如下\n\n';

      const promptResult = await geminiAIService.generateWithTunedModel(promptWords + postTextContent);
      return promptResult;
    } catch (error) {
      console.error('generatePostSummary fail', error);
      return '';
    }
  }

  private async generateStockContent(stockNo: string): Promise<StockPriceContent | null> {
    try {
      const stockInfo = await new FugleAPIBuilder(FugleDataset.StockIntradayTicker).setParam({ symbol: stockNo }).get();

      if (stockInfo) {
        await delay(50);
        const intradayInfo = await stockPriceService.getStockPriceIntraday(stockNo);
        if (intradayInfo && intradayInfo.lastPrice > 0) {
          return {
            stockNo,
            stockName: stockInfo.name,
            industryName: getIndustryName(stockInfo.industry),
            price: `${intradayInfo.lastPrice}`,
            updateDate: formatTimestampToString(intradayInfo.lastUpdated),
            exchangeType: stockInfo.exchange == 'TWSE' ? '上市' : '上櫃',
          };
        } else {
          const start = todayDate();
          start.setDate(start.getDate() - 5); // Deduct 5 days
          const historicalInfo = await stockPriceService.getStockPriceByDates(stockNo, toDateString(start), today());

          if (historicalInfo && historicalInfo.data.length) {
            const lastPrice = historicalInfo.data.reverse()[0];
            return {
              stockNo,
              stockName: stockInfo.name,
              industryName: getIndustryName(stockInfo.industry),
              price: `${lastPrice.close}`,
              updateDate: lastPrice.date,
              exchangeType: stockInfo.exchange == 'TWSE' ? '上市' : '上櫃',
            };
          }
        }
      }
    } catch (error) {
      console.error('Error generating stock price content', error);
    }

    // Return null if no data is found or an error occurs
    return null;
  }
}
