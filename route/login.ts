import express, { Router, Request, Response } from 'express';
import { sendVerificationCode, verifyCodeAndGenerateToken } from '../service/authService';

const router: Router = express.Router();

router.post('/account', async (req: Request, res: Response) => {
  try {
    const { account } = req.body;
    const message = await sendVerificationCode(account);
    res.sendSuccess(200, { message });
  } catch (error) {
    console.error(error);
    res.sendError(500, { message: (error as Error).message });
  }
});

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { account, verifyCode } = req.body;
    const token = await verifyCodeAndGenerateToken(account, verifyCode);
    res.sendSuccess(200, { message: '登入成功', data: token });
  } catch (error) {
    console.error(error);
    res.sendError(500, { message: (error as Error).message });
  }
});

export default router;
