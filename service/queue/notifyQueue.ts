import Queue from 'better-queue';
import { NotifyEnvelope, MessageChannel, PostContent } from '../../type/notify';
import telegramBotService from '../telegramBotService';
import { lineBotHelper } from '../../utility/lineBotHelper';
import expoPushService from '../expoPushService';

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
      } else if (job.channel === MessageChannel.Expo) {
        const postContent = job.payload as PostContent;
        const data = postContent.post;
        // Expo push notification logic here
        await expoPushService.send(job.token, 'title', 'body', data);
      }

      done(null, job);
    } catch (error) {
      console.error(`Error processing notifyQueue job`, error);
      done(error);
    }
  },
  { afterProcessDelay: 10 }
);
