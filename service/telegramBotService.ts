import TelegramBot from 'node-telegram-bot-api';
import config from '../utility/config';
import { TelegramMessageHandler } from './business/TelegramMessageHandler';

class TelegramBotService {
  private static instance: TelegramBotService;
  private bot: TelegramBot;
  private messageHandler: TelegramMessageHandler;

  private constructor(useWebhook: boolean) {
    const token = config.TELEGRAM_BOT_TOKEN;

    if (!token) {
      throw new Error('Telegram bot token is required');
    }

    if (useWebhook) {
      const callbackUrl = config.TELEGRAM_CALLBACK_URL;
      if (!callbackUrl) {
        throw new Error('Webhook URL is required for using TelegramBot with webhooks');
      }

      this.bot = new TelegramBot(token, { polling: false });
      this.bot.setWebHook(callbackUrl);
      console.log(`Telegram bot webhook set at ${callbackUrl}`);
    } else {
      // Set up the bot to use polling
      this.bot = new TelegramBot(token, {
        polling: {
          interval: 2000, // Poll every 2 seconds
        },
      });
      console.log('Telegram bot is using polling mode');
    }

    this.messageHandler = new TelegramMessageHandler(this.bot);

    console.log('Telegram bot construct successfully');
  }

  // 確保只會創建一個實例
  public static getInstance(): TelegramBotService {
    if (!TelegramBotService.instance) {
      TelegramBotService.instance = new TelegramBotService(config.TELEGRAM_USE_WEBHOOK);
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

  public processUpdate(req: { body: TelegramBot.Update }) {
    this.bot.processUpdate(req.body);
  }

  public async shutdown(): Promise<void> {
    if (this.bot.isPolling()) {
      console.log('Stopping bot polling...');
      await this.bot.stopPolling();
    } else {
      console.log('Closing bot webhook...');
      await this.bot.deleteWebHook();
    }
    console.log('Telegram bot shutdown completed');
  }
}

export default TelegramBotService;
