import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StockListModel, IStockList } from './model/stockList';
import config from './utility/config';

const port = 8000;

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
  const list: IStockList[] = await StockListModel.find();

  res.json(list);
});

app.listen(port, async () => {
  console.log('config.MONGODB_URI', config.MONGODB_URI);

  await mongoose.connect(config.MONGODB_URI);
  console.log(`now listening on port ${port}`);
});
