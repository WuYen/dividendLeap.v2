import express, { Router, NextFunction, Request, Response } from 'express';
import service, { processSinglePostToMessage } from '../service/pttStockInfo';
import lineService from '../service/lineService';
import { delay } from '../utility/delay';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await service.getLast50Posts();

  res.json({ posts: savedPosts });
});

//TODO: test send processed message to line
//TODO: move subscribe user to mongoDB
//TODO: move process message to a function argument that can input base on user profile
//TODO: trigger send line notify to multiple user

router.get('/new', async (req: Request, res: Response, next: NextFunction) => {
  const newPosts = await service.getNewPosts();
  const messages: string[] = [];
  const channel = req.query.channel as string;
  if (channel && newPosts && newPosts.length) {
    try {
      const token = await lineService.getTokenByChannel(channel as string);
      if (token == null) {
        throw new Error('no match token for ' + channel);
      }

      for (const post of newPosts) {
        if (post.tag == '標的' || service.isSubscribedAuthor(post.author)) {
          const notifyContent = processSinglePostToMessage(post).join('\n');
          const response = await lineService.sendMessage(token, notifyContent);
          console.log('send notify result', response);
          messages.push(notifyContent);
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
