import express, { Router } from 'express';
import stockRoute from './stock';
import jobRoute from './job';
import lineRoute from './line';
import yahooRoute from './yahoo';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/stock',
    route: stockRoute,
  },
  {
    path: '/job',
    route: jobRoute,
  },
  {
    path: '/line',
    route: lineRoute,
  },
  {
    path: '/yahoo',
    route: yahooRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
