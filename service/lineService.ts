import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { LineTokenModel, ILineToken } from '../model/lineToken';
import config from '../utility/config';

async function getTokenByChannel(channel: string): Promise<ILineToken | null> {
  const tokenInfo = await LineTokenModel.findOne({ channel: channel }).lean();
  return tokenInfo;
}

async function getTokensBychannels(channels: string[]): Promise<ILineToken[] | null> {
  const tokenInfo = await LineTokenModel.find({ channel: { $in: channels } }).lean();
  if (!tokenInfo || tokenInfo.length === 0) {
    return null;
  }
  return tokenInfo;
}

async function getAllEnabledChannel(): Promise<ILineToken[] | null> {
  const tokenInfo = await LineTokenModel.find({ notifyEnabled: true }).lean();
  return tokenInfo;
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

export default { sendMessage, getTokenByChannel, getTokensBychannels, getAllEnabledChannel };
