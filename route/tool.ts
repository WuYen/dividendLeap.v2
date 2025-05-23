import express, { Router, NextFunction, Request, Response } from 'express';
import { FugleAPIBuilder } from '../utility/fugleCaller';
import { FugleDataset, QueryType, StockHistoricalQuery } from '../utility/fugleTypes';
import telegramBotService from '../service/telegramBotService';
import { sendPushNotification } from '../service/expoPushService';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';

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
  const id = req.query.id as string;
  const msg: string = req.query.msg as string;
  await telegramBotService.sendMessage(id, msg);
  return res.sendSuccess(200, { message: 'test' });
});

router.get('/push', async (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token as string;
  const postId = req.query.post as string;

  if (!postId || !token) {
    return res.status(400).json({ error: 'post 和 tokens 為必填' });
  }

  try {
    const post = await PostInfoModel.findOne<IPostInfo>({ id: postId });
    if (post) {
      const results = await sendPushNotification(post, [token]);
      return res.sendSuccess(200, { message: 'test', data: results.data });
    } else {
      return res.sendError(400, { message: '文章不存在', data: postId });
    }
  } catch (err) {
    return res.sendError(500, { message: '推播失敗', data: err });
  }
});

export default router;
