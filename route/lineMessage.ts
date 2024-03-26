import express, { Router, Request, Response } from 'express';
import config from '../utility/config';
import {
  ClientConfig,
  MessageAPIResponseBase,
  messagingApi,
  middleware,
  MiddlewareConfig,
  webhook,
  HTTPFetchError,
} from '@line/bot-sdk';

const router: Router = express.Router();

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: config.LINE_CHANNEL_ACCESS_TOKEN,
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: config.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: config.LINE_CHANNEL_SECRET,
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

// Register the LINE middleware.
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
// app.use(middleware(middlewareConfig));

// Route handler to receive webhook events.
// This route is used to receive connection tests.
router.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'success',
    message: 'Connected successfully!',
  });
});

// This route is used for the Webhook.
router.post('/callback', async (req: Request, res: Response): Promise<Response> => {
  const callbackRequest: webhook.CallbackRequest = req.body;
  const events: webhook.Event[] = callbackRequest.events!;

  // Process all the received events asynchronously.
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
