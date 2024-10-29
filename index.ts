import express, { Express } from 'express';
import mongoose from 'mongoose';
import webPush from 'web-push';
import path from 'path';

import config from './utility/config';
import middleware from './utility/middleware';
import router from './route';

const app: Express = express();

app.use(middleware);
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

// 設定 web-push 的 VAPID 詳細資訊
const publicVapidKey = process.env.VAPID_PUBLIC_KEY!;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY!;

webPush.setVapidDetails(
  'mailto:your-email@example.com', // 替換為你的電子郵件
  publicVapidKey,
  privateVapidKey
);

let server: any;
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('MongoDB Connected!');
  server = app.listen(config.SERVER_PORT, () => {
    console.log('Server up on port:', config.SERVER_PORT);
  });
});
