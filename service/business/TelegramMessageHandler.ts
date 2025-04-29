import TelegramBot from 'node-telegram-bot-api';
import { LineTokenModel, TokenLevel } from '../../model/lineToken';
import stockPriceService from '../stockPriceService';
import { formatTimestampToString, toDateString, today, todayDate } from '../../utility/dateTime';
import { AuthorStatsModel } from '../../model/AuthorStats';
import { analysisPostById } from '../postStatsService';
import { conversationHandler } from './conversationHandler';
import openAIService from '../openAIService';
import { IMessage } from '../../model/ConversationModel';

export class TelegramMessageHandler {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.bot.on('message', this.handleMessage.bind(this));
    this.bot.on('callback_query', this.handleCallbackQuery.bind(this));
  }

  private async handleStartCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    const username = msg.chat.username || '';

    try {
      let user = await LineTokenModel.findOne({ tgChatId: chatId });
      //reference: [Deep Linking](https://core.telegram.org/bots/features#deep-linking)

      if (!user) {
        // 新增用戶資料
        user = new LineTokenModel({
          channel: username || 'tg',
          token: '',
          notifyEnabled: true,
          tokenLevel: [TokenLevel.Basic],
          updateDate: today(),
          favoritePosts: [],
          keywords: [],
          tgChatId: chatId,
          tgUserName: username,
        });
        await user.save();
        console.log('新用戶已建立:', user);
        this.bot.sendMessage(chatId, `歡迎, ${username}! 您的個人資料已建立。`);
      } else {
        console.log('已存在的用戶:', user);
        this.bot.sendMessage(chatId, `歡迎回來, ${username}!`);
      }
    } catch (error) {
      console.error('處理 /start 指令時出錯:', error);
      this.bot.sendMessage(chatId, '出現了一些問題，請稍後再試。');
    }
  }

  private async handleMessage(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id.toString();
    const text = msg.text || '';
    const quoteText = msg.reply_to_message?.text || ''; // The original message text
    console.log(`收到來自 chat ID: ${chatId} 的消息: ${text}${quoteText ? ` to ${quoteText}` : ''}`);

    if (/^\/start\b/.test(text)) {
      return this.handleStartCommand(msg);
    }

    const userInfo = await LineTokenModel.findOne({ tgChatId: chatId });

    if (userInfo?.tokenLevel.includes(TokenLevel.Premium)) {
      //process chat with AI
      const contextMessages = await conversationHandler.retrieveRelevantMessages(chatId);
      const userMessage: IMessage = { sender: 'user', message: text, timestamp: new Date() };
      const aiReplyText = await openAIService.handleTGChat([...contextMessages, userMessage]);

      this.bot.sendMessage(chatId, aiReplyText);

      const botReply: IMessage = { sender: 'ai', message: aiReplyText, timestamp: new Date() };
      await conversationHandler.updateConversation(chatId, userMessage, botReply);
    }
  }

  private async handleCallbackQuery(query: TelegramBot.CallbackQuery): Promise<void> {
    const chatId = query.message?.chat.id;
    const callbackData = query.data;

    if (!chatId || !callbackData) return;

    try {
      // 拆分 callback_data，獲取操作和參數
      const [action, param] = callbackData.split(':');

      // 根據 action 和 param 執行相應操作
      const messageId = query.message?.message_id; // 取得消息的 ID
      const commonOptions = {
        //reply_to_message_id: messageId, // 指定回覆原本的訊息
      };
      switch (action) {
        case 'get_stock_price':
          const priceContent = await this.getStockPrice(param); // param 是股票代號
          this.bot.sendMessage(chatId, priceContent, commonOptions);
          break;

        case 'get_author_performance':
          const authorPerformance = await this.getAuthorPerformance(param); // param 是作者 ID
          this.bot.sendMessage(chatId, authorPerformance, { ...commonOptions, parse_mode: 'Markdown' });
          break;

        case 'get_target_analysis':
          const targetAnalysis = await this.getTargetAnalysis(param); // param 是post id
          this.bot.sendMessage(chatId, targetAnalysis, { ...commonOptions, parse_mode: 'Markdown' });
          break;

        default:
          this.bot.sendMessage(chatId, '未知的操作。');
          break;
      }

      // 回應 callback query，解除 Telegram 的 loading 狀態
      this.bot.answerCallbackQuery(query.id);
    } catch (error) {
      console.error('處理 callback_query 時發生錯誤:', error);
      this.bot.sendMessage(chatId, '處理請求時發生錯誤，請稍後再試。');
    }
  }

  private async getStockPrice(symbol: string): Promise<string> {
    const intradayInfo = await stockPriceService.getStockPriceIntraday(symbol);
    if (intradayInfo && intradayInfo.lastPrice > 0) {
      return `${symbol}股價: ${intradayInfo.lastPrice} \n${formatTimestampToString(intradayInfo.lastUpdated)}`;
    } else {
      const start = todayDate();
      start.setDate(start.getDate() - 5); // 扣除5天
      const historicalInfo = await stockPriceService.getStockPriceByDates(symbol, toDateString(start), today());
      if (historicalInfo && historicalInfo?.data?.length) {
        const lastPrice = historicalInfo.data.reverse()[0];
        return `${symbol}股價: ${lastPrice.close} \n${lastPrice.date}`;
      }
    }
    return '查無資料';
  }

  private async getAuthorPerformance(authorId: string): Promise<string> {
    const authorStats = await AuthorStatsModel.findOne({ name: authorId }).lean();

    if (authorStats != null) {
      const message = `
      📊 **作者績效報告**
      
      **名稱**: ${authorStats.name}
      **平均增長率**: ${authorStats.mean.toFixed(2)}
      **最高增長率**: ${authorStats.maxRate.toFixed(2)}%
      **最低增長率**: ${authorStats.minRate.toFixed(2)}%
      **中位數增長率**: ${authorStats.median.toFixed(2)}
      **標準差**: ${authorStats.stdDev.toFixed(2)}
      **總增長率**: ${authorStats.totalRate.toFixed(2)}%
      **綜合排名**: ${authorStats.combinedRank}
      **評分**: ${authorStats.score.toFixed(2)}
      `;
      return message;
    }

    return '查無資料';
  }

  private async getTargetAnalysis(postId: string): Promise<string> {
    const stats = await analysisPostById(postId);

    if (stats != null) {
      const message = `
      📈 **標的分析資訊**

      **標題**: ${stats.title}
      **作者**: ${stats.author}
      **日期**: ${stats.date}

      **技術指標分析**:
      - **SMA 上漲**: ${stats.isSMAUp ? '✅' : '❌'}
      - **RSI 低位**: ${stats.isRSILow ? '✅' : '❌'}
      - **MACD 正向**: ${stats.isMACDPositive ? '✅' : '❌'}
      - **布林通道正向**: ${stats.isBollingerPositive ? '✅' : '❌'}
      - **隨機指標正向**: ${stats.isStochasticPositive ? '✅' : '❌'}
      - **股價在雲上**: ${stats.isPriceAboveCloud ? '✅' : '❌'}
      - **轉換線在基準線之上**: ${stats.isTenkanAboveKijun ? '✅' : '❌'}
      - **Senkou Span A 多頭**: ${stats.isSenkouSpanABullish ? '✅' : '❌'}
      - **遲行線在價格之上**: ${stats.isChikouAbovePrice ? '✅' : '❌'}

      **推薦購買**: ${stats.recommandBuying ? '是' : '否'}
      **推薦計數**: ${stats.recommandCount}

      📅 **分析期間**: ${new Date(stats.startDate).toLocaleDateString()} - ${new Date(
        stats.endDate
      ).toLocaleDateString()}
      `;
      return message;
    }
    return '查無資料'; // 假設返回的分析
  }
}
