import express, { Router, NextFunction, Request, Response } from 'express';
import { today, latestTradeDate, getPureDate } from '../utility/dateTime';
import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';
import { getStockPrice } from '../service/finMindService';
import updateDayInfo from '../job/updateDayInfo';

const router: Router = express.Router();

router.get('/dayinfo', async (req: Request, res: Response, next: NextFunction) => {
  await updateDayInfo();
  res.json({ msg: 'success' });
});

export default router;
