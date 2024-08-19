import express, { Router, NextFunction, Response } from 'express';
import { IAuthRequest } from '../utility/auth';

const router: Router = express.Router();

router.get('/keywords', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || '';
    //todo: get keyword of this user
    res.sendSuccess(200, { data: [''] });
  } catch (error) {
    console.error('Error while retrieve keywords:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});

router.post('/keywords/add', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || '';
    //todo: add keyword to this user
    res.sendSuccess(200, { data: [''] });
  } catch (error) {
    console.error('Error while retrieve keywords:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});

router.post('/keywords/remove', async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || '';
    //todo: remove keyword of this user
    res.sendSuccess(200, { data: [''] });
  } catch (error) {
    console.error('Error while retrieve keywords:', error);
    return res.sendError(500, { message: 'Internal server error' });
  }
});

export default router;
