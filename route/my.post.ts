import express, { Router, NextFunction, Response } from 'express';
import { IAuthRequest } from '../utility/auth';
import {
  toggleFavoritePost,
  getFavoritePosts,
  updateFavoritePostInfo,
  fetchAndProcessFavoritePost,
} from '../service/myService';
import { getPostsWithInDays, searchPostsByTitle } from '../service/pttStockPostService';

import { analysisPostById } from '../service/postStatsService';

const router: Router = express.Router();

router.get('/post/:id/favorite', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id || '';
    const favoritePost = await toggleFavoritePost(userId, postId);
    if (favoritePost) {
      const data = await fetchAndProcessFavoritePost(userId, favoritePost);
      return res.sendSuccess(200, { message: '收藏成功', data: data });
    } else {
      return res.sendSuccess(200, { message: '移除收藏成功', data: null });
    }
  } catch (error) {
    return res.sendError(500, { message: '收藏失敗' });
  }
});

router.post('/post/:id/update', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id || '';
    const favoritePost = await updateFavoritePostInfo(userId, postId, { ...req.body });
    const result = await fetchAndProcessFavoritePost(userId, favoritePost);
    return res.sendSuccess(200, { message: '更新成功', data: result });
  } catch (error) {
    console.error(error);
    return res.sendError(500, { message: '更新失敗' });
  }
});

router.get('/post/:id/stats', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const result = await analysisPostById(postId);
    return res.sendSuccess(200, { message: '成功', data: result });
  } catch (error) {
    return res.sendError(500, { message: '失敗' });
  }
});

router.get('/posts', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  var result = await getPostsWithInDays(2);
  return res.sendSuccess(200, { data: result });
});

router.get('/posts/search', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const keyword = req.query.search as string;
  const result = await searchPostsByTitle(keyword);
  return res.sendSuccess(200, { data: result });
});

router.get('/posts/favorite', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id || '';
  const result = await getFavoritePosts(userId);
  return res.sendSuccess(200, { data: result });
});

export default router;
