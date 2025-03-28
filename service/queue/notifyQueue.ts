import Queue from 'better-queue';
import telegramBotService from '../telegramBotService';
import lineService from '../lineService';
import { NotifyEnvelope, MessageChannel } from '../../type/notify';

export const notifyQueue = new Queue<NotifyEnvelope>(
  async (job: NotifyEnvelope, done: Function) => {
    try {
      const content = job.payload.content;
      const options = (job.payload as any)?.options;

      if (job.channel === MessageChannel.Telegram) {
        await telegramBotService.sendMessageWithOptions(job.token, content, options);
      } else if (job.channel === MessageChannel.Line) {
        await lineService.sendMessage(job.token, content);
      }

      done(null, job);
    } catch (error) {
      console.error(`Error processing notifyQueue job`, error);
      done(error);
    }
  },
  { afterProcessDelay: 10 }
);
