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

    // 檢查是否收到 /start 指令，並觸發 handleStartCommand
    if (/^\/start\b/.test(text)) {
      return this.handleStartCommand(msg); // 直接調用 handleStartCommand
    }

    //TODO: get user, decided calling AI or not

    // 處理其他訊息
    console.log(`收到來自 chat ID: ${chatId} 的消息: ${text}`);
    //this.bot.sendMessage(chatId, 'Hello! 這是一條測試訊息。');
  }
}
