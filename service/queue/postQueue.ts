import Queue from 'better-queue';
import { PostContent, NotifyContentGenerator, ContentType } from '../business/NotifyContentGenerator.v2';
import { NotifyEnvelope } from '../../type/notify';
import { notifyQueue } from './notifyQueue';

interface PostQueueJob {
  contentGenerator: NotifyContentGenerator;
  type: ContentType;
  users: NotifyEnvelope[];
}

export const postQueue = new Queue<PostQueueJob>(async (job, done) => {
  try {
    const { contentGenerator, type, users } = job;
    const result = await contentGenerator.getContent(type);
    done(null, { users, content: result });
  } catch (error) {
    console.error(`Error postQueue job ${job.type}:`, error);
    done(error);
  }
});

postQueue.on('task_finish', (taskId: number, result: { users: NotifyEnvelope[]; content: PostContent }) => {
  for (const notify of result.users) {
    notify.payload = result.content;
    notifyQueue.push(notify);
  }
});
