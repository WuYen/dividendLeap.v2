import express, { Router, NextFunction, Request, Response } from 'express';
import TelegramBotService from '../service/telegramBotService';
import config from '../utility/config';

const router: Router = express.Router();

const callbackPath = `/${config.TELEGRAM_CALLBACK_PATH}${config.TELEGRAM_BOT_TOKEN}`;
router.post(callbackPath, async (req: Request, res: Response, next: NextFunction) => {
  try {
    //handle telegram callback event
    TelegramBotService.getInstance().getBot().processUpdate(req.body);
    return res.sendSuccess(200, { message: 'success' });
  } catch (error) {
    console.log('send notify fail', error);
    return res.sendError(200, { message: 'fail' });
  }
});

export default router;
