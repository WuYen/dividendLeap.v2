import express, { Router } from 'express';
import stockRoute from './stock';
import jobRoute from './job';
import lineRoute from './lineNotify';
import yahooRoute from './yahoo';
import pttStockInfo from './pttStockInfo';
import tool from './tool';

const router = express.Router();

interface IRoute {
  path: string | string[];
  route: Router;
}

const defaultIRoute: IRoute[] = [
  { path: '/stock', route: stockRoute },
  { path: '/job', route: jobRoute },
  { path: ['/line', '/line/notify'], route: lineRoute },
  { path: '/line/message', route: lineRoute },
  { path: '/yahoo', route: yahooRoute },
  { path: '/ptt', route: pttStockInfo },
  { path: '/tool', route: tool },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

router.use(['/line/notify', '/line'], lineRoute);

export default router;
