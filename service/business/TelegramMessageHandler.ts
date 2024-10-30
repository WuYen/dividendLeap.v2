import TelegramBot from 'node-telegram-bot-api';
import { LineTokenModel } from '../../model/lineToken';

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
      // 查找使用者
      let user = await LineTokenModel.findOne({ tgChatId: chatId });
      //reference: [Deep Linking](https://core.telegram.org/bots/features#deep-linking)

      if (!user) {
        // 新增用戶資料
        user = new LineTokenModel({
          tgChatId: chatId,
          tgUserName: username,
          channel: username,
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
    const chatId = msg.chat.id;
    const text = msg.text || '';
    console.log(`收到來自 chat ID: ${chatId} 的消息: ${text}`);
    // 檢查是否收到 /start 指令，並觸發 handleStartCommand
    if (/^\/start\b/.test(text)) {
      return this.handleStartCommand(msg); // 直接調用 handleStartCommand
    }

    if (/test/i.test(text.trim())) {
      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '取得 AAPL 當下股價', callback_data: 'get_stock_price:AAPL' },
              { text: '取得作者績效', callback_data: 'get_author_performance:12345' },
            ],
            [{ text: '取得標的分析資訊', callback_data: 'get_target_analysis:AAPL' }],
          ],
        },
      } as TelegramBot.SendMessageOptions;
      this.bot.sendMessage(chatId, `測試發文`, options);
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
      const options = {
        //reply_to_message_id: messageId, // 指定回覆原本的訊息
      };
      switch (action) {
        case 'get_stock_price':
          const stockPrice = await this.getStockPrice(param); // param 是股票代號

          // 修改原始訊息的文字內容，更新標的分析資訊
          //  this.bot.editMessageText(`${param} 的標的分析資訊：${targetAnalysis}`, {
          //   chat_id: chatId,
          //   message_id: messageId,
          // });
          this.bot.sendMessage(chatId, `${param} 的當前股價為：$${stockPrice}`, options);
          break;

        case 'get_author_performance':
          const authorPerformance = await this.getAuthorPerformance(param); // param 是作者 ID
          this.bot.sendMessage(chatId, `作者 ID ${param} 的績效為：${authorPerformance}`, options);
          break;

        case 'get_target_analysis':
          const targetAnalysis = await this.getTargetAnalysis(param); // param 是股票代號
          this.bot.sendMessage(chatId, `${param} 的標的分析資訊：${targetAnalysis}`, options);
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

  // 模擬的股價獲取方法，接收股票代號
  private async getStockPrice(symbol: string): Promise<string> {
    return '100.25'; // 假設返回的股價
  }

  // 模擬的作者績效獲取方法，接收作者 ID
  private async getAuthorPerformance(authorId: string): Promise<string> {
    return '85%'; // 假設返回的績效
  }

  // 模擬的標的分析資訊，接收股票代號
  private async getTargetAnalysis(symbol: string): Promise<string> {
    return '該標的表現良好，建議觀察'; // 假設返回的分析
  }
}
