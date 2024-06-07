import express, { Router, NextFunction, Request, Response } from 'express';
import { today } from '../utility/dateTime';
import { IAuthRequest, authentication } from '../utility/auth';

import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';
import { AuthorModel } from '../model/Author';
import { addFavoritePost, addLikeToAuthor, getFavoritePosts } from '../service/myService';

const router: Router = express.Router();

//驗證已登入的 middleware
router.use(authentication);

router.get('/post/:id/favorite', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id || '';
    await addFavoritePost(userId, postId);
    res.sendSuccess(200, { message: '收藏成功' });
  } catch (error) {
    res.sendError(500, { message: '收藏失敗' });
  }
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

export default router;
