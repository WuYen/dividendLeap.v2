import express, { Router, Request, Response, NextFunction } from 'express';
import config from '../utility/config';
import { ClientConfig, MessageAPIResponseBase, messagingApi, webhook, HTTPFetchError } from '@line/bot-sdk';
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

router.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'success',
    message: 'Connected successfully!',
  });
});

function verifyLineSignature(req: Request, res: Response, next: NextFunction) {
  const bodyString = JSON.stringify(req.body); // 将请求主体转换为字符串

  const channelSecret = config.LINE_CHANNEL_SECRET; // Channel secret string

  const sign = crypto.createHmac('SHA256', channelSecret).update(bodyString).digest('base64');

  const signature = req.get('X-Line-Signature'); // 获取请求头中的签名

  // 比较签名是否匹配
  if (sign !== signature) {
    return res.status(500).json({
      status: 'signature validation failed',
    });
  }

  // 如果签名匹配，继续处理下一个中间件或路由处理程序
  next();
}

// This route is used for the Webhook.    , middleware(middlewareConfig)
router.post('/callback', verifyLineSignature, async (req: Request, res: Response): Promise<Response> => {
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

        // Return an error message.
        return res.status(500).json({
          status: 'error',
        });
      }
    })
  );

  // Return a successful message.
  return res.status(200).json({
    status: 'success',
    results,
  });
});

export default router;
