import express, { Router, NextFunction, Request, Response } from 'express';
import { processAndUpdateAuthorStats } from '../service/authorStatsService';
const router: Router = express.Router();

router.get('/dayinfo', async (req: Request, res: Response, next: NextFunction) => {
  //await updateDayInfo();
  return res.sendSuccess(200, { message: 'success' });
});

router.get('/update/rank', async (req: Request, res: Response, next: NextFunction) => {
  await processAndUpdateAuthorStats();
  return res.sendSuccess(200, { message: 'success' });
});

export default router;
