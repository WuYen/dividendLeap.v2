import express, { Router, NextFunction, Request, Response, urlencoded } from 'express';
import service from '../service/pttStockInfo';
import newService from '../service/newPttStockInfo';
import lineService from '../service/lineService';
import { delay } from '../utility/delay';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await service.getNewPosts();

  const messageBuilder: string[] = service.processMessage(savedPosts);

  const channel = req.query.channel || '';
  if (channel?.length) {
    if (messageBuilder.length > 3) {
      const encodeMsg = encodeURIComponent(messageBuilder.join('\n'));
      res.redirect(`/line/send?msg=${encodeMsg}&channel=${channel}`);
    }
  }
  res.json({ msg: messageBuilder.join('\n') });
});

router.get('/new', async (req: Request, res: Response, next: NextFunction) => {
  const savedPosts = await service.getNewPosts();
  const messages: string[] = [];
  const channel = req.query.channel as string;
  if (channel && savedPosts && savedPosts.length) {
    try {
      const token = await lineService.getTokenByChannel(channel as string);
      if (token == null) {
        throw new Error('no match token for ' + channel);
      }

      for (const post of savedPosts) {
        if (post.tag == '標的' || service.isSubscribedAuthor(post.author)) {
          const message = newService.processMessage(post).join('\n');
          const response = await lineService.sendMessage(token, message);
          console.log('send notify result', response);
          messages.push(message);
          await delay(30);
        }
      }
    } catch (error) {
      console.log('send notify fail', error);
    }
  }

  res.json({ msg: messages });
});

export default router;
