import express, { Router, NextFunction, Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';
import { LineTokenModel, ILineToken, TokenLevel } from '../model/lineToken';
import config from '../utility/config';
import { today } from '../utility/dateTime';
import lineService from '../service/lineService';
import { delay } from '../utility/delay';

const router: Router = express.Router();
const {
  LINE_NOTIFY_AUTH_URL,
  LINE_NOTIFY_TOKEN_URL,
  LINE_NOTIFY_CLIENT_ID,
  LINE_NOTIFY_CLIENT_SECRET,
  LINE_NOTIFY_CALL_BACK_URL,
  LINE_NOTIFY_CLIENT_SIDE_CALL_BACK_URL,
} = config;

router.get('/regis', async (req: Request, res: Response, next: NextFunction) => {
  //回傳註冊line token的 url
  const channel = req.query.channel as string;
  if (channel == undefined || channel?.length == 0 || channel?.trim()?.length == 0) {
    return res.json({ error: '不可以是空的' });
  }

  const existingCount = await LineTokenModel.countDocuments({ channel });
  if (existingCount > 0) {
    return res.json({ error: '名稱重複了' });
  }

  return res.json({
    redirectUrl: `${LINE_NOTIFY_AUTH_URL}?response_type=code&client_id=${LINE_NOTIFY_CLIENT_ID}&redirect_uri=${LINE_NOTIFY_CALL_BACK_URL}&scope=notify&state=${channel}`,
  });
});

router.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
  //把line token 存起來
  const code = req.query.code;
  const channel: string = req.query.state as string;
  console.log('callback ', `code:${code}, channel:${channel}`);

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: LINE_NOTIFY_CALL_BACK_URL,
      client_id: LINE_NOTIFY_CLIENT_ID,
      client_secret: LINE_NOTIFY_CLIENT_SECRET,
    }),
    url: LINE_NOTIFY_TOKEN_URL,
  };
  const oauthToken = await axios(options);

  try {
    console.log('oauthToken result', oauthToken.data);
    const access_token = oauthToken.data.access_token;
    const tokenInfo: ILineToken = {
      channel: channel,
      token: access_token,
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Basic],
      updateDate: today(),
    };
    const savedTokenInfo = await new LineTokenModel(tokenInfo).save();
    const count = await LineTokenModel.countDocuments({ notifyEnabled: true });
    await lineService.sendMessage(config.ADMIN_LINE_TOKEN, `新註冊的人: ${channel}, 使用者數量:${count}`);

    if (LINE_NOTIFY_CLIENT_SIDE_CALL_BACK_URL == '') {
      return res.json({ tokenInfo });
    } else {
      return res.redirect(LINE_NOTIFY_CLIENT_SIDE_CALL_BACK_URL + '?tokenInfo=' + JSON.stringify(savedTokenInfo));
    }
  } catch (error) {
    console.log('conver error', error);
    return res.send({ error: 'connect error' });
  }
});

router.get('/send', async (req: Request, res: Response, next: NextFunction) => {
  const message = req.query.msg as string;
  const channel = req.query.channel as string;
  if (!message) {
    return res.send('message is empty');
  }
  if (!channel) {
    return res.send('channel is empty');
  }

  try {
    const token = await lineService.getTokenByChannel(channel as string);
    if (token == null) {
      return res.json({ message: 'no match token for ' + channel });
    }
    const response = await lineService.sendMessage(token.token, message);
    console.log('send notify result', response);
    return res.send(response.data);
  } catch (error) {
    console.log('send notify fail', error);
    return res.send({ error: 'send message fail' });
  }
});

router.get('/test/callback', async (req: Request, res: Response, next: NextFunction) => {
  return res.redirect(
    LINE_NOTIFY_CLIENT_SIDE_CALL_BACK_URL + '?tokenInfo=' + JSON.stringify({ channel: '123', b: 456, c: 'adf$%bb' })
  );
});

router.get('/test/send', async (req: Request, res: Response, next: NextFunction) => {
  const message = req.query.msg as string;
  const channel = req.query.channel as string;
  const channels = req.query.channels as string;
  if (!message) {
    return res.send('message is empty');
  }
  if (!channel && !channels) {
    return res.send('channel is empty');
  }
  try {
    let tokens: ILineToken[] | null = [];

    if (channel) {
      const token = await lineService.getTokenByChannel(channel);
      if (token == null) {
        throw new Error('No match token for ' + channel);
      }
      tokens.push(token);
    } else if (channels) {
      const splitedChannel = channels.split(',');
      const retrivedTokens = await lineService.getTokensByChannels(splitedChannel);
      if (retrivedTokens == null || retrivedTokens.length < 1) {
        throw new Error('No match tokens for ' + channels);
      }
      tokens = retrivedTokens;
    }

    for (const token of tokens) {
      const response = await lineService.sendMessage(token.token, message);
      await delay(30);
    }

    return res.send({ success: 'send notify success' });
  } catch (error) {
    console.log('send notify fail', error);
    return res.send({ error: 'send notify fail' });
  }
});

export default router;
