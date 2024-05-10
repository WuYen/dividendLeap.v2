import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { LineTokenModel, ILineToken } from '../model/lineToken';
import config from '../utility/config';

export async function subscribeAuthor(channel: string): Promise<ILineToken | null> {
  const tokenInfo = await LineTokenModel.findOne({ channel: channel }).lean();
  return tokenInfo;
}

export async function subscribeStock(who: string, stocks: string[]): Promise<any> {
  // 訂閱, 移除, need to support batch
  // use who find target user in LineTokenSchema
  // check setting is null or not
  // validation, check stock different
  // add to setting.subscribeStock

  return null;
}

export default { subscribeAuthor, subscribeStock };
