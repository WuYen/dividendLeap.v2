import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { LineTokenModel } from '../model/lineToken';
import config from '../utility/config';

async function getTokenByChannel(channel: string): Promise<string | null> {
  const tokenInfo = await LineTokenModel.findOne({ channel: channel }).lean();
  return tokenInfo == null || !tokenInfo.token.length ? null : tokenInfo.token;
}

async function sendMessage(token: string, message: string): Promise<AxiosResponse<any, any>> {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}` },
    data: qs.stringify({
      message: message,
    }),
    url: config.LINE_NOTIFY_URL,
  };
  const response = await axios(options);
  return response;
}

export default { sendMessage, getTokenByChannel };
