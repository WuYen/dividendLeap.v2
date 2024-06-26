import express, { Router, Request, Response, NextFunction } from 'express';
import config from '../utility/config';
import {
  ClientConfig,
  MessageAPIResponseBase,
  messagingApi,
  webhook,
  HTTPFetchError,
  ImageMessage,
} from '@line/bot-sdk';
import * as crypto from 'crypto';

const router: Router = express.Router();

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: config.LINE_CHANNEL_ACCESS_TOKEN,
};

// Create a new LINE SDK client.
const client = new messagingApi.MessagingApiClient(clientConfig);

const isTextEvent = (event: any): event is webhook.MessageEvent & { message: webhook.TextMessageContent } => {
  return event.type === 'message' && event.message && event.message.type === 'text';
};

// Function handler to receive the text.
const textEventHandler = async (event: webhook.Event): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (!isTextEvent(event)) {
    return;
  }

  // Process all message related variables here.
  // Create a new message.
  // Reply to the user.
  await client.replyMessage({
    replyToken: event.replyToken as string,
    messages: [
      {
        type: 'text',
        text: event.message.text,
      },
    ],
  });
};

router.get('/', async (req: Request, res: Response) => {
  return res.sendSuccess(200, { message: 'Connected successfully!' });
});

router.get('/send/to/me', async (req: Request, res: Response) => {
  const type = req.query.type || 'text';

  if (type === 'text') {
    var result = await client.pushMessage({
      to: config.LINE_USER_ID,
      messages: [{ type: 'text', text: 'hello, world' }],
    });
  } else if (type === 'image') {
    var imageMessage: ImageMessage = {
      type: 'image',
      originalContentUrl: 'https://payload.cargocollective.com/1/6/208500/3947868/erosie_writers_block.jpg',
      previewImageUrl: 'https://payload.cargocollective.com/1/6/208500/3947868/erosie_writers_block.jpg',
    };
    var result = await client.pushMessage({
      to: config.LINE_USER_ID,
      messages: [imageMessage],
    });
  }
  return res.sendSuccess(200, { message: 'send message successfully!' });
});

function verifyLineSignature(req: Request, res: Response, next: NextFunction) {
  const bodyString = JSON.stringify(req.body); // 将请求主体转换为字符串

  const channelSecret = config.LINE_CHANNEL_SECRET; // Channel secret string

  const sign = crypto.createHmac('SHA256', channelSecret).update(bodyString).digest('base64');

  const signature = req.get('X-Line-Signature'); // 获取请求头中的签名

  // 比较签名是否匹配
  if (sign !== signature) {
    return res.sendError(500, { message: 'signature validation failed' });
  }

  // 如果签名匹配，继续处理下一个中间件或路由处理程序
  next();
}

// This route is used for the Webhook.    , middleware(middlewareConfig)
router.post('/callback', verifyLineSignature, async (req: Request, res: Response) => {
  const callbackRequest: webhook.CallbackRequest = req.body;
  const events: webhook.Event[] = callbackRequest.events!;
  const results = await Promise.all(
    events.map(async (event: webhook.Event) => {
      try {
        await textEventHandler(event);
      } catch (err: unknown) {
        if (err instanceof HTTPFetchError) {
          console.error(err.status);
          console.error(err.headers.get('x-line-request-id'));
          console.error(err.body);
        } else if (err instanceof Error) {
          console.error(err);
        }

        return res.sendError(500, { message: 'callback error' });
      }
    })
  );

  return res.sendSuccess(200, { data: results });
});

export default router;
