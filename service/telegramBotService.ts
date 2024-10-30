import TelegramBot from 'node-telegram-bot-api';
import config from '../utility/config';
import { TelegramMessageHandler } from './business/TelegramMessageHandler';

class TelegramBotService {
  private static instance: TelegramBotService;
  private bot: TelegramBot;
  private messageHandler: TelegramMessageHandler;

  private constructor() {
    const token = config.TELEGRAM_BOT_TOKEN;
    const useWebhook = config.TELEGRAM_USE_WEBHOOK;

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
      this.bot = new TelegramBot(token, {
        polling: {
          interval: 2000, // Poll every 2 seconds
        },
      });
      console.log('Telegram bot is using polling mode');
    }

    this.messageHandler = new TelegramMessageHandler(this.bot);

    // 設置 Bot Commands
    // this.bot.setMyCommands([
    //   { command: '/start', description: '開始與 Bot 的互動' },
    //   { command: '/help', description: '顯示幫助訊息' },
    //   { command: '/info', description: '獲取有關此 Bot 的資訊' },
    // ]);

    console.log('Telegram bot construct successfully');
  }

  public static getInstance(): TelegramBotService {
    if (!TelegramBotService.instance) {
      console.log('Initialize telegram bot');
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
