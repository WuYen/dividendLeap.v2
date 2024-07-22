import express, { Router, NextFunction, Request, Response } from 'express';
import { processAuthorStatsWithQueue } from '../service/authorStatsService';
const router: Router = express.Router();

router.get('/dayinfo', async (req: Request, res: Response, next: NextFunction) => {
  //await updateDayInfo();
  return res.sendSuccess(200, { message: 'success' });
});

router.get('/update/rank', async (req: Request, res: Response, next: NextFunction) => {
  await processAuthorStatsWithQueue();
  return res.sendSuccess(200, { message: 'success' });
});

export default router;
