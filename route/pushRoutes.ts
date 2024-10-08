// src/routes/pushRoutes.ts
import express, { Request, Response } from 'express';
import webPush from 'web-push';

const router = express.Router();

// 訂閱推播資訊儲存在記憶體中
const subscriptions: webPush.PushSubscription[] = [];

// 訂閱推播
router.post('/subscribe', (req: Request, res: Response) => {
  const subscription: webPush.PushSubscription = req.body;
  subscriptions.push(subscription);
  console.log('New subscription added:', subscription.endpoint);
  res.status(201).json({});
});

// 發送推播通知
router.post('/sendNotification', async (req: Request, res: Response) => {
  const { title, message } = req.body;

  const payload = JSON.stringify({ title, message });

  try {
    const sendNotifications = subscriptions.map((sub) =>
      webPush.sendNotification(sub as webPush.PushSubscription, payload).catch((err) => {
        console.error('Error sending notification to', sub.endpoint, err);
      })
    );

    await Promise.all(sendNotifications);

    res.status(200).json({ message: 'Notifications sent' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

export default router;
