import express, { Router, NextFunction, Request, Response } from 'express';

import { AuthorModel } from '../model/Author';
import { AuthorHistoricalCache } from '../model/AuthorHistoricalCache';
import { PostHistoricalResponse } from '../service/historicalService';
import { fetchPostDetail, getLast50Posts, getNewPostAndSendLineNotify } from '../service/pttStockPostService';
import { getAuthorHistoryPosts, getAuthors } from '../service/pttAuthorService';
import { commentSentimentAnalysis } from '../service/postStatsService';

const router: Router = express.Router();

router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await getLast50Posts();
  return res.sendSuccess(200, { message: 'success', data: { posts: savedPosts } });
});

router.get('/authors', async (req: Request, res: Response, next: NextFunction) => {
  const result = await getAuthors();
  return res.sendSuccess(200, { message: 'success', data: result });
});

router.get('/author/:id', async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.id;
  const refresh = Boolean(req.query.refresh === 'true');
  const existingResult = await AuthorHistoricalCache.findOne({ authorId }).lean().exec();

  if (!refresh && existingResult && Date.now() - existingResult.timestamp < 3 * 60 * 60 * 1000) {
    return res.sendSuccess(200, { message: 'success', data: existingResult.data });
  } else {
    const result: PostHistoricalResponse[] = await getAuthorHistoryPosts(authorId);
    return res.sendSuccess(200, { message: 'success', data: result });
  }
});

router.get('/new', async (req: Request, res: Response, next: NextFunction) => {
  try {
    var { postCount } = await getNewPostAndSendLineNotify(req.query.channel as string, req.query.channels as string);
    return res.sendSuccess(200, {
      message: `send notify success, postCount: ${postCount}`,
    });
  } catch (error) {
    console.log('send notify fail', error);
    return res.sendSuccess(500, { message: 'send notify fail' });
  }
});

router.get('/post/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.sendError(500, { message: 'no postId' });
    }

    var postContent = await fetchPostDetail(`https://www.ptt.cc/bbs/Stock/${postId}`);

    return res.sendSuccess(200, {
      message: `send notify success`,
      data: postContent,
    });
  } catch (error) {
    console.log('send notify fail', error);
    return res.sendError(500, { message: 'send notify fail' });
  }
});

router.get('/post/:id/comment', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.sendError(500, { message: 'invalid input params' });
    }

    const text = await commentSentimentAnalysis(`https://www.ptt.cc/bbs/Stock/${postId}`);
    console.log(text);
    return res.sendSuccess(200, {
      message: `success`,
      data: text,
    });
  } catch (error) {
    console.log('send notify fail', error);
    return res.sendError(500, { message: 'send notify fail' });
  }
});

export default router;
