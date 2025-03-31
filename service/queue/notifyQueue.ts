import Queue from 'better-queue';
import telegramBotService from '../telegramBotService';
import { NotifyEnvelope, MessageChannel } from '../../type/notify';
import { lineBotHelper } from '../../utility/lineBotHelper';

export const notifyQueue = new Queue<NotifyEnvelope>(
  async (job: NotifyEnvelope, done: Function) => {
    try {
      const content = job.payload.content;
      const options = (job.payload as any)?.options;
      console.log(`[notifyQueue] Processing job for channel: ${job.channel}, token: ${job.token}`);
      if (job.channel === MessageChannel.Telegram) {
        await telegramBotService.sendMessageWithOptions(job.token, content, options);
      } else if (job.channel === MessageChannel.Line) {
        try {
          await lineBotHelper.pushText(job.token, content);
        } catch (err: any) {
          if (err.statusCode === 403) {
            console.warn(`[notifyQueue] LINE user ${job.token} has blocked the bot.`);
          } else {
            console.error(`[notifyQueue] Failed to push LINE message to ${job.token}`, err);
          }
        }
      }

      done(null, job);
    } catch (error) {
      console.error(`Error processing notifyQueue job`, error);
      done(error);
    }
  },
  { afterProcessDelay: 10 }
);
