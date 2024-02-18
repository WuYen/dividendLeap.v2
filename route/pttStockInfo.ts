import express, { Router, NextFunction, Request, Response, urlencoded } from 'express';
import { getTodayWithTZ } from '../utility/dateTime';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const responseList: string[] = [];

  res.json({ msg: responseList.join('\n') });
});

export default router;
