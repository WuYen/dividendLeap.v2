import express, { Router, NextFunction, Request, Response } from 'express';

import { StockListModel, IStockList } from '../model/stockList';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  const list: IStockList[] = await StockListModel.find();
  res.json(list);
});

export default router;
