import express, { Router } from 'express';
import stockRouter from './stock';
import jobRouter from './job';
import lineRouter from './lineNotify';
import lineMessageRouter from './lineMessage';
import yahooRouter from './yahoo';
import pttStockInfoRouter from './pttStockInfo';
import toolRouter from './tool';
import loginRouter from './login';

const router = express.Router();

interface IRoute {
  path: string | string[];
  route: Router;
}

const defaultIRoute: IRoute[] = [
  { path: '/stock', route: stockRouter },
  { path: '/job', route: jobRouter },
  { path: ['/line/notify', '/line'], route: lineRouter },
  { path: '/line/message', route: lineMessageRouter },
  { path: '/yahoo', route: yahooRouter },
  { path: '/ptt', route: pttStockInfoRouter },
  { path: '/tool', route: toolRouter },
  { path: '/login', route: loginRouter },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
