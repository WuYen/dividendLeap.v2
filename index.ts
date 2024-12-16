import express, { Express } from 'express';
import mongoose from 'mongoose';

import config from './utility/config';
import middleware from './utility/middleware';
import router from './route';
import { runPuppeteer } from './utility/puppeteerHelper';

const app: Express = express();

app.use(middleware);
app.use(router);

(async () => {
  try {
    console.info(`start run puppeteer`);
    await runPuppeteer();
    console.info(`run puppeteer finish`);
  } catch (exception) {
    console.error(`try run puppeteer fail`, exception);
  }
})();

let server: any;
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('MongoDB Connected!');
  server = app.listen(config.SERVER_PORT, () => {
    console.log('Server up on port:', config.SERVER_PORT);
  });
});
