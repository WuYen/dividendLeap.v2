import express, { Router, NextFunction, Request, Response } from 'express';

import { StockListModel, IStockList } from '../model/stockList';
import { ScheduleModel, ISchedule } from '../model/schedule';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  //const list: IStockList[] = await StockListModel.find();

  const schedule: ISchedule[] = await ScheduleModel.find({ sourceType: '除權息預告', year: '2023' });
  res.json({ schedule });
});

export default router;
