import express, { Router, NextFunction, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { IAuthRequest, authentication } from '../utility/auth';
import { toggleFavoritePost, addLikeToAuthor, getFavoritePosts } from '../service/myService';
import { getLast50Posts } from '../service/pttStockPostService';

const router: Router = express.Router();

//驗證已登入的 middleware
router.use(authentication);

router.get('/post/:id/favorite', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id || '';
    await toggleFavoritePost(userId, postId);
    res.sendSuccess(200, { message: '收藏成功' });
  } catch (error) {
    res.sendError(500, { message: '收藏失敗' });
  }
});

router.get('/posts', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id || '';
  var result = await getLast50Posts();
  res.sendSuccess(200, { data: result });
});

router.get('/posts/favorite', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id || '';
  var result = await getFavoritePosts(userId);
  res.sendSuccess(200, { data: result });
});

router.get('/author/:id/like', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.id;
    const authorInfo = await addLikeToAuthor(authorId);
    res.sendSuccess(200, { message: 'Liked', data: authorInfo });
  } catch (error) {
    console.error('Error while liking author:', error);
    res.sendError(500, { message: 'Internal server error' });
  }
});

router.get('/authors/rank', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const filePath = path.join(__dirname, '..', '/resource/filtered_combined_ranked_authors.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    res.sendSuccess(200, { data: JSON.parse(fileContent) });
  } catch (error) {
    console.error('Error while liking author:', error);
    res.sendError(500, { message: 'Internal server error' });
  }
});
export default router;
