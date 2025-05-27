import express, { Router, Request, Response } from 'express';
import {
  loginExpoUser,
  registerExpoUser,
  sendVerificationCode,
  verifyCodeAndGenerateToken,
} from '../service/authService';

const router: Router = express.Router();

router.post('/account', async (req: Request, res: Response) => {
  try {
    const { account } = req.body;
    const message = await sendVerificationCode(account);
    return res.sendSuccess(200, { message: '' });
  } catch (error) {
    console.error(error);
    return res.sendError(500, { message: (error as Error).message });
  }
});

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { account, verifyCode } = req.body;
    const token = await verifyCodeAndGenerateToken(account, verifyCode);
    return res.sendSuccess(200, { message: '登入成功', data: token });
  } catch (error) {
    console.error(error);
    return res.sendError(500, { message: (error as Error).message });
  }
});

router.post('/expo/register', async (req, res) => {
  const { account, pushToken } = req.body;
  try {
    const token = await registerExpoUser(account, pushToken);
    return res.sendSuccess(200, { message: '註冊成功', data: { token } });
  } catch (error) {
    console.error('[expo/register]', error);
    return res.sendError(400, { message: (error as Error).message });
  }
});

router.post('/expo', async (req, res) => {
  const { account, pushToken } = req.body;
  try {
    const token = await loginExpoUser(account, pushToken);
    return res.sendSuccess(200, { message: '登入成功', data: { token } });
  } catch (error) {
    console.error('[expo/login]', error);
    return res.sendError(401, { message: (error as Error).message });
  }
});

export default router;
