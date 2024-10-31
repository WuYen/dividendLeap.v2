import express, { Express } from 'express';
import mongoose from 'mongoose';

import config from './utility/config';
import middleware from './utility/middleware';
import router from './route';
import TelegramBotService from './service/telegramBotService';

const app: Express = express();

app.use(middleware);
app.use(router);

let server: any;
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('MongoDB Connected!');
  server = app.listen(config.SERVER_PORT, () => {
    console.log('Server up on port:', config.SERVER_PORT);
  });
  TelegramBotService.getInstance();
});
