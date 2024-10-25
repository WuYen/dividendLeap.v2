import TelegramBot from 'node-telegram-bot-api';
import config from '../utility/config';
import { TelegramMessageHandler } from './business/TelegramMessageHandler';

class TelegramBotService {
  private static instance: TelegramBotService;
  private bot: TelegramBot;
  private messageHandler: TelegramMessageHandler;

  private constructor() {
    const token = config.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('Telegram bot token is required');
    }

    //TODO: should use callback
    this.bot = new TelegramBot(token, {
      polling: {
        interval: 2000, // 每 2 秒輪詢一次
      },
    });

    this.messageHandler = new TelegramMessageHandler(this.bot);

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
}

export default TelegramBotService;
