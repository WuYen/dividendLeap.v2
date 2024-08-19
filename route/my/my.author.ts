import express, { Router, NextFunction, Response } from 'express';
import { IAuthRequest } from '../../utility/auth';
import { addLikeToAuthor } from '../../service/myService';
import { getAuthorRankList } from '../../service/pttAuthorService';

const router: Router = express.Router();

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
