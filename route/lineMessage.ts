import express, { Router, Request, Response, NextFunction } from 'express';
import config from '../utility/config';
import { webhook, ImageMessage } from '@line/bot-sdk';
import { lineEventService } from '../service/lineEventService';
import { lineBotHelper } from '../utility/lineBotHelper';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  return res.sendSuccess(200, { message: 'Connected successfully!' });
});

router.get('/send/to/me', async (req: Request, res: Response) => {
  const type = req.query.type || 'text';

  if (type === 'text') {
    await lineBotHelper.pushText(config.LINE_USER_ID, 'hello, world');
  } else if (type === 'image') {
    const imageMessage: ImageMessage = {
      type: 'image',
      originalContentUrl: 'https://payload.cargocollective.com/1/6/208500/3947868/erosie_writers_block.jpg',
      previewImageUrl: 'https://payload.cargocollective.com/1/6/208500/3947868/erosie_writers_block.jpg',
    };
    await lineBotHelper.pushRaw(config.LINE_USER_ID, [imageMessage]);
  }
  return res.sendSuccess(200, { message: 'send message successfully!' });
});

router.post('/callback', lineBotHelper.verifySignature, async (req: Request, res: Response) => {
  const events: webhook.Event[] = req.body.events;

  await Promise.all(
    events.map(async (event) => {
      try {
        if (lineBotHelper.isFollowOrJoinEvent(event)) {
          await lineEventService.handleFollow(event);
        } else if (lineBotHelper.isUnfollowOrLeaveEvent(event)) {
          await lineEventService.handleUnfollow(event);
        } else if (lineBotHelper.isTextMessageEvent(event)) {
          const userText = event.message.text as string;
          console.log(`[LINE][TextMessage] 收到訊息：${userText}`);
          // await lineEventService.handleTextMessage(event);
        }
      } catch (error) {
        console.error('LINE Event Error:', error);
      }
    })
  );

  res.sendSuccess(200, { message: 'ok' });
});

export default router;
