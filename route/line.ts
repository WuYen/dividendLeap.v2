import express, { Router, NextFunction, Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';
import { LineTokenModel, ILineToken } from '../model/lineToken';
import config from '../utility/config';
import { today } from '../utility/dateTime';

const router: Router = express.Router();
const {
  LINE_NOTIFY_AUTH_URL,
  LINE_NOTIFY_TOKEN_URL,
  LINE_NOTIFY_CLIENT_ID,
  LINE_NOTIFY_CLIENT_SECRET,
  LINE_NOTIFY_CALL_BACK_URL,
  LINE_NOTIFY_URL,
} = config;

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const channel = req.query.channel;
  if (channel == undefined || channel?.length == 0) {
    res.json({ error: 'need channel as query parameter' });
  }
  res.redirect(
    `${LINE_NOTIFY_AUTH_URL}?response_type=code&client_id=${LINE_NOTIFY_CLIENT_ID}&redirect_uri=${LINE_NOTIFY_CALL_BACK_URL}&scope=notify&state=${channel}`
  );
});

router.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
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
      updateDate: today(),
    };
    //TODO: check if channel already exist in db
    await new LineTokenModel(tokenInfo).save();
    return res.json({ tokenInfo });
  } catch (error) {
    console.log('conver error', error);
    return res.send({ error: 'connect error' });
  }
});

router.get('/send', async (req: Request, res: Response, next: NextFunction) => {
  const message = req.query.msg;
  const channel = req.query.channel;
  if (!message) {
    return res.send('message is empty');
  }
  if (!channel) {
    return res.send('channel is empty');
  }
  const tokenInfo = await LineTokenModel.findOne({ channel: channel }).lean();
  if (tokenInfo == null || !tokenInfo.token.length) {
    return res.json({ message: 'no match token for ' + channel });
  }
  const token = tokenInfo.token;
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}` },
    data: qs.stringify({
      message: message,
    }),
    url: LINE_NOTIFY_URL,
  };
  const response = await axios(options);
  try {
    console.log('response result', response);
    return res.send(response.data);
  } catch (error) {
    console.log('send message fail', error);
    return res.send({ error: 'send message fail' });
  }
});

export default router;
