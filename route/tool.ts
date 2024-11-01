import express, { Router, NextFunction, Request, Response } from 'express';
import { FugleAPIBuilder } from '../utility/fugleCaller';
import { FugleDataset, QueryType, StockHistoricalQuery } from '../utility/fugleTypes';
import TelegramBotService from '../service/telegramBotService';
const router: Router = express.Router();

router.get('/healthy', async (req: Request, res: Response, next: NextFunction) => {
  return res.sendSuccess(200, { message: `I'm alive, today is ` + new Date() });
});

router.get('/unhealthy', async (req: Request, res: Response, next: NextFunction) => {
  return res.sendError(200, { message: 'error' });
});

router.get('/proxy/fugle/:endpoint', async (req: Request, res: Response, next: NextFunction) => {
  const endpoint = req.params.endpoint;

  const endpointToDatasetMap: { [key: string]: FugleDataset } = {
    historical: FugleDataset.StockHistorical,
    intradayquote: FugleDataset.StockIntradayQuote,
    intradayticker: FugleDataset.StockIntradayTicker,
  };

  const targetDataset = endpointToDatasetMap[endpoint];

  if (!targetDataset) {
    return res.status(400).send({ message: 'Invalid endpoint' });
  }
  try {
    // 使用適當的 QueryType 泛型來生成 API Builder
    const builder = new FugleAPIBuilder(targetDataset);

    // 根據 dataset 動態構建相應的查詢參數類型
    let queryParams: QueryType<typeof targetDataset>;

    switch (targetDataset) {
      case FugleDataset.StockHistorical:
        queryParams = {
          symbol: req.query.symbol as string,
          from: req.query.from as string,
          to: req.query.to as string,
          fields: (req.query.fields as string)?.split(','),
        } as StockHistoricalQuery;
        break;
      case FugleDataset.StockIntradayQuote:
      case FugleDataset.StockIntradayTicker:
        queryParams = {
          symbol: req.query.symbol as string,
        } as QueryType<typeof targetDataset>;
        break;
      default:
        return res.status(400).send({ message: 'Unsupported dataset' });
    }

    // 設置參數並呼叫 API
    const result = await builder.setParam(queryParams).get();

    return res.status(200).send(result);
  } catch (error) {
    console.error('Error calling Fugle API:', error);
    return res.status(500).send({ message: 'Failed to fetch data from Fugle API' });
  }
});

router.get('/tg/send', async (req: Request, res: Response, next: NextFunction) => {
  await TelegramBotService.getInstance().sendMessage('', 'test');
  return res.sendSuccess(200, { message: 'test' });
});

export default router;
