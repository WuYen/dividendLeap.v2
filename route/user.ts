import express, { Router, NextFunction, Request, Response } from 'express';
import { today } from '../utility/dateTime';
import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';
import { authentication } from '../utility/auth';

const router: Router = express.Router();

//驗證已登入的 middleware
router.use(authentication);

router.get('/watch/post/:id', async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;
  res.sendSuccess(200, { message: 'hello' });
});

export default router;
