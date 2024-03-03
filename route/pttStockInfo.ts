import express, { Router, NextFunction, Request, Response } from 'express';
import service, { processSinglePostToMessage } from '../service/pttStockInfo';
import lineService from '../service/lineService';
import { delay } from '../utility/delay';
import { ILineToken } from '../model/lineToken';

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
  const channels = req.query.channels as string;
  if ((channel || channels) && newPosts && newPosts.length) {
    try {
      let tokenInfos: ILineToken[] | null = [];

      if (channel) {
        const token = await lineService.getTokenByChannel(channel);
        if (token == null) {
          throw new Error('No match token for ' + channel);
        }
        tokenInfos.push(token);
      } else if (channels) {
        const splitedChannel = channels.split(',');
        const retrivedTokens = await lineService.getTokensBychannels(splitedChannel);
        if (retrivedTokens == null || retrivedTokens.length < 1) {
          throw new Error('No match tokens for ' + channels);
        }
        tokenInfos = retrivedTokens;
      }

      for (const post of newPosts) {
        if (post.tag == '標的' || service.isSubscribedAuthor(post.author)) {
          const notifyContent = processSinglePostToMessage(post).join('\n');

          for (const tokenInfo of tokenInfos) {
            if (tokenInfo.channel == 'myline') {
              var customizContent = service.ProcessSinglePostToMessageToMyline(post).join('\n');
              const response = await lineService.sendMessage(tokenInfo.token, customizContent);
            } else {
              const response = await lineService.sendMessage(tokenInfo.token, notifyContent);
            }
            await delay(30);
          }

          messages.push(notifyContent);
        }
      }
    } catch (error) {
      console.log('send notify fail', error);
    }
  }

  res.json({ msg: messages });
});

export default router;
