import express, { Router, Request, Response } from 'express';
import { sendVerificationCode, verifyCodeAndGenerateToken } from '../service/authService';

const router: Router = express.Router();

router.post('/account', async (req: Request, res: Response) => {
  try {
    const { account } = req.body;
    const message = await sendVerificationCode(account);
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { account, verifyCode } = req.body;
    const token = await verifyCodeAndGenerateToken(account, verifyCode);
    res.json({ message: '登入成功', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
