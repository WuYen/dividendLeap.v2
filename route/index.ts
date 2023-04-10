import express, { Router } from 'express';
import stockRoute from './stock';
import jobRoute from './job';

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
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
