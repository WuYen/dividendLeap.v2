import express, { Router, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { LineTokenModel } from '../model/lineToken';
import { IUserPayload, sign } from '../utility/auth';
import lineService from '../service/lineService';
import config from '../utility/config';

const router: Router = express.Router();

// 生成驗證碼的函數
const generateVerifyCode = () => {
  const buffer = randomBytes(3); // 生成 3 個隨機字節
  const code = buffer.readUIntBE(0, 3) % 100000; // 轉換為 5 位數字
  return code.toString().padStart(5, '0'); // 確保是 5 位數字，不足的用 0 補全
};

router.post('/account', async (req: Request, res: Response) => {
  const { account } = req.body;

  try {
    // 查找使用者資料
    const user = await LineTokenModel.findOne({ channel: account });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 生成驗證碼
    const verifyCode = generateVerifyCode();
    const verifyCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 設置驗證碼 5 分鐘後過期
    user.verifyCode = verifyCode;
    user.verifyCodeExpires = verifyCodeExpires;
    await user.save();
    const message = `您的驗證碼是: ${verifyCode}`;
    await lineService.sendMessage(user.token, message);

    res.json({ message: 'Verification code sent to your Line.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/verify', async (req: Request, res: Response) => {
  const { account, verifyCode } = req.body;

  try {
    // 查找使用者資料
    const user = await LineTokenModel.findOne({ channel: account }).lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.verifyCode !== verifyCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // 檢查驗證碼是否過期
    if (!user.verifyCodeExpires || new Date() > user.verifyCodeExpires) {
      return res.status(400).json({ error: 'Verification code expired' });
    }

    // 產生 JWT
    const payload: IUserPayload = { id: user.channel };
    const jwtToken = sign(payload);

    res.json({ message: 'Login successful', token: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
