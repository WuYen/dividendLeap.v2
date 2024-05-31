import express, { Router, NextFunction, Request, Response } from 'express';
import { LineTokenModel } from '../model/lineToken';
import { IUserPayload, sign } from '../utility/auth';
import lineService from '../service/lineService';
import config from '../utility/config';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { account } = req.body;

  try {
    // 查找使用者資料
    const user = await LineTokenModel.findOne({ channel: account }).lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 產生 JWT
    const payload: IUserPayload = { id: user.channel };
    const jwtToken = sign(payload);

    await lineService.sendMessage(user.token, `${config.CLIENT_URL}/login/success?token=${jwtToken}`);

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
