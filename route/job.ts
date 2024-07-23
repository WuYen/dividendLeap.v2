import express, { Router, NextFunction, Request, Response } from 'express';
import { newProcessAndUpdateAuthorStats } from '../service/authorStatsService';
const router: Router = express.Router();

// router.get('/dayinfo', async (req: Request, res: Response, next: NextFunction) => {
//   await updateDayInfo();
//   return res.sendSuccess(200, { message: 'success' });
// });

router.get('/update/rank', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resultMessage = await newProcessAndUpdateAuthorStats(120);
    return res.sendSuccess(200, { message: resultMessage });
  } catch (error) {
    console.error(error);
    res.sendError(500, { message: 'update rank fail' });
  }
});

export default router;
