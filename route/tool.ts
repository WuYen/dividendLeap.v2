import express, { Router, NextFunction, Request, Response } from 'express';
const router: Router = express.Router();

router.get('/healthy', async (req: Request, res: Response, next: NextFunction) => {
  return res.sendSuccess(200, { message: `I'm alive, today is ` + new Date() });
});

router.get('/unhealthy', async (req: Request, res: Response, next: NextFunction) => {
  return res.sendError(200, { message: 'error' });
});

export default router;
