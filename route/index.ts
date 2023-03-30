import express, { Router } from 'express';
import stockRoute from './stock';

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
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
