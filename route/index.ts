import express, { Router } from 'express';
import jobRouter from './job';
import lineMessageRouter from './lineMessage';
import yahooRouter from './yahoo';
import pttStockRouter from './pttStock';
import toolRouter from './tool';
import loginRouter from './login';
import myRouter from './my/index';
import telegramRoute from './telegram';

const router = express.Router();

interface IRoute {
  path: string | string[];
  route: Router;
}

const defaultIRoute: IRoute[] = [
  { path: '/ptt', route: pttStockRouter },
  { path: '/my', route: myRouter },
  { path: '/line/message', route: lineMessageRouter },
  { path: '/yahoo', route: yahooRouter },
  { path: '/login', route: loginRouter },
  { path: '/job', route: jobRouter },
  { path: '/tool', route: toolRouter },
  { path: '/telegram', route: telegramRoute },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
