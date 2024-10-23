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

  // 發送訊息的函數
  public async sendMessage(chatId: string, message: string): Promise<void> {
    try {
      await this.bot.sendMessage(chatId, message);
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  // 設置事件監聽器
  private setupEventListeners(): void {
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

    // 收到消息時觸發
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      console.log(`Received a message from chat ID: ${chatId}`);
      this.bot.sendMessage(chatId, 'Hello! This is a test message from your bot.');
    });
  }
}

export default TelegramBotService;
