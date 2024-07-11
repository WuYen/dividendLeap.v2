import express, { Router, NextFunction, Response } from 'express';
import { IAuthRequest, authentication } from '../utility/auth';
import { toggleFavoritePost, addLikeToAuthor, getFavoritePosts } from '../service/myService';
import { getPostsWithInDays, searchPostsByTitle } from '../service/pttStockPostService';
import { getAuthorRankList } from '../service/pttAuthorService';

const router: Router = express.Router();

//驗證已登入的 middleware
router.use(authentication);

router.get('/post/:id/favorite', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id || '';
    await toggleFavoritePost(userId, postId);
    return res.sendSuccess(200, { message: '收藏成功' });
  } catch (error) {
    return res.sendError(500, { message: '收藏失敗' });
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

router.get('/author/:id/like', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.id;
    const authorInfo = await addLikeToAuthor(authorId);
    return res.sendSuccess(200, { message: 'Liked', data: authorInfo });
  } catch (error) {
    console.error('Error while liking author:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});

router.get('/authors/rank', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await getAuthorRankList();
    res.sendSuccess(200, { data: data });
  } catch (error) {
    console.error('Error while liking author:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});
export default router;
