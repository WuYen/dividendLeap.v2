import express, { Router, NextFunction, Response } from 'express';
import { IAuthRequest } from '../../utility/auth';
import { deleteKeywords, getKeywords, updateKeywords } from '../../service/myService.keyword';

const router: Router = express.Router();

router.get('/keywords', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || '';
    const keywords = await getKeywords(userId);
    res.sendSuccess(200, { data: keywords });
  } catch (error) {
    console.error('Error while retrieve keywords:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});

router.post('/keywords/add', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || '';
    const keywords = req.body.keywords as string[]; // Assume keywords are sent in the body as an array of strings
    const updatedKeywords = await updateKeywords(userId, keywords);
    res.sendSuccess(200, { data: updatedKeywords });
  } catch (error) {
    console.error('Error while adding keywords:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});

router.post('/keywords/remove', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || '';
    const keywords = req.body.keywords as string[]; // Assume keywords are sent in the body as an array of strings
    const updatedKeywords = await deleteKeywords(userId, keywords);
    res.sendSuccess(200, { data: updatedKeywords });
  } catch (error) {
    console.error('Error while removing keywords:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});

export default router;
