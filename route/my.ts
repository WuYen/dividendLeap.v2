import express, { Router, NextFunction, Request, Response } from 'express';
import { today } from '../utility/dateTime';
import { IAuthRequest, authentication } from '../utility/auth';

import { ScheduleModel, ISchedule } from '../model/schedule';
import { DayInfoModel, IDayInfo } from '../model/dayInfo';
import { AuthorModel } from '../model/Author';

const router: Router = express.Router();

//驗證已登入的 middleware
router.use(authentication);

router.get('/watch/post/:id', async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;
  res.sendSuccess(200, { message: 'hello' });
});

router.get('/author/:id/like', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.id !== 'myline') {
      res.sendError(401, { message: 'UNAUTHORIZED' });
      return;
    }
    let authorId = req.params.id;
    let authorInfo = await AuthorModel.findOne({ name: authorId }).exec();

    if (!authorInfo) {
      authorInfo = new AuthorModel({
        name: authorId,
        likes: 0,
        dislikes: 0,
      });
    }

    authorInfo.likes += 1;

    await authorInfo.save();

    res.sendSuccess(200, { message: 'Liked' });
  } catch (error) {
    console.error('Error while liking author:', error);
    res.sendError(500, { message: 'Internal server error' });
  }
});

export default router;
