import express, { Router, NextFunction, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/health', async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: `I'm alive` + new Date() });
});

export default router;
