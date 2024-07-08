import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { LineTokenModel, ILineToken } from '../model/lineToken';
import config from '../utility/config';

async function getTokenByChannel(channel: string): Promise<ILineToken | null> {
  const tokenInfo = await LineTokenModel.findOne({ channel: channel }).lean();
  return tokenInfo;
}

async function getTokensByChannels(channels: string[]): Promise<ILineToken[] | null> {
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

async function retrieveUserLineToken(channel: string, channels: string) {
  let tokenInfos: ILineToken[] | null = [];

  if (channel) {
    const token = await getTokenByChannel(channel);
    if (token == null) {
      throw new Error('No match token for ' + channel);
    }
    tokenInfos.push(token);
  } else if (channels) {
    const splittedChannel = channels.split(',');
    const savedTokens = await getTokensByChannels(splittedChannel);
    if (savedTokens == null || savedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = savedTokens;
  } else {
    const retrivedTokens = await getAllEnabledChannel();
    if (retrivedTokens == null || retrivedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = retrivedTokens;
  }
  return tokenInfos;
}

export default { retrieveUserLineToken, sendMessage, getTokenByChannel, getTokensByChannels, getAllEnabledChannel };
