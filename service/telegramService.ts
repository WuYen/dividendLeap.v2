import TelegramBot from 'node-telegram-bot-api';
import config from '../utility/config';

class TelegramBotService {
  private static instance: TelegramBotService;
  private bot: TelegramBot;

  private constructor() {
    const token = config.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('Telegram bot token is required');
    }
    this.bot = new TelegramBot(token, {
      polling: {
        interval: 2000, // 每 2 秒輪詢一次
      },
    });

    this.setupEventListeners();
    console.log('Telegram bot construct successfully');
  }

  // 確保只會創建一個實例
  public static getInstance(): TelegramBotService {
    if (!TelegramBotService.instance) {
      TelegramBotService.instance = new TelegramBotService();
    }
    return TelegramBotService.instance;
  }

  public async sendMessage(chatId: string, message: string): Promise<TelegramBot.Message> {
    return this.sendMessageWithOptions(chatId, message);
  }

  public async sendMessageWithOptions(
    chatId: string,
    message: string,
    options?: TelegramBot.SendMessageOptions
  ): Promise<TelegramBot.Message> {
    try {
      const result = await this.bot.sendMessage(chatId, message, options);
      console.log('Message sent successfully:', result);
      return result; // The result will be of type TelegramBot.Message
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  // 設置事件監聽器
  private setupEventListeners(): void {
    const userProfiles: Record<string, any> = {};
    // 檢查 bot 是否正常運作
    this.bot.on('polling_error', (error) => {
      console.error('Polling error:', error);
    });

    this.bot.on('webhook_error', (error) => {
      console.error('Webhook error:', error);
    });

    this.bot.on('error', (error) => {
      console.error('Bot error:', error);
    });

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const firstName = msg.chat.first_name || '';
      const lastName = msg.chat.last_name || '';
      const username = msg.chat.username || '';

      // 檢查用戶是否已存在
      if (!userProfiles[chatId]) {
        // 建立新用戶的個人資料
        var profile = {
          chatId,
          firstName,
          lastName,
          username,
        };
        userProfiles[chatId] = profile;
        console.log('new user', profile);
        this.bot.sendMessage(chatId, `歡迎, ${firstName}! 您的個人資料已建立。`);
      } else {
        console.log('exist user', userProfiles[chatId]);
        this.bot.sendMessage(chatId, `歡迎回來, ${firstName}!`);
      }
    });

    // 收到消息時觸發
    this.bot.on('message', (msg: TelegramBot.Message) => {
      const chatId = msg.chat.id;
      //TODO: save to db, also figure out user name maybe create a user profile
      console.log(`Received a message from chat ID: ${chatId}`);
      this.bot.sendMessage(chatId, 'Hello! This is a test message from your bot.');
    });
  }
}

export default TelegramBotService;
