import express, { Router, NextFunction, Request, Response } from 'express';

import { AuthorModel } from '../model/Author';
import { AuthorHistoricalCache } from '../model/AuthorHistoricalCache';

import { AuthorHistoricalResponse, getAuthorHistoryPosts } from '../service/pttAuthorService';
import { getLast50Posts } from '../service/pttStockPostService';
import { getNewPostAndSendLineNotify } from '../service/notifyService';

const router: Router = express.Router();

router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await getLast50Posts();
  res.sendSuccess(200, { message: 'success', data: { posts: savedPosts } });
});

router.get('/authors', async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthorModel.find().sort({ likes: -1 }).lean().exec();
  res.sendSuccess(200, { message: 'success', data: result });
});

router.get('/author/:id', async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.id;
  const refresh = Boolean(req.query.refresh === 'true');
  const existingResult = await AuthorHistoricalCache.findOne({ authorId }).lean().exec();

  if (!refresh && existingResult && Date.now() - existingResult.timestamp < 3 * 60 * 60 * 1000) {
    res.sendSuccess(200, { message: 'success', data: existingResult.data });
  } else {
    const result: AuthorHistoricalResponse[] = await getAuthorHistoryPosts(authorId);
    res.sendSuccess(200, { message: 'success', data: result });
  }
});

router.get('/new', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getNewPostAndSendLineNotify(req.query.channel as string, req.query.channels as string);
    return res.sendSuccess(200, { message: 'send notify success' });
  } catch (error) {
    console.log('send notify fail', error);
    return res.sendSuccess(500, { message: 'send notify fail' });
  }
});

export default router;
