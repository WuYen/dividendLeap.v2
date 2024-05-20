import { LineTokenModel, IUserSetting } from '../model/lineToken';

export async function subscribeStock(channel: string, stocks: string[]): Promise<any> {
  try {
    const lineToken = await LineTokenModel.findOne({ channel: channel });
    if (lineToken == null) {
      return null;
    }
    // 確認 lineToken.setting.subscribeStock 是陣列
    lineToken.setting ??= {} as IUserSetting;
    lineToken.setting.subscribeStock ??= [];

    // 新增或刪除 subscribeStock
    for (const stock of stocks) {
      const index = lineToken.setting.subscribeStock.indexOf(stock);
      if (index === -1) {
        lineToken.setting.subscribeStock.push(stock);
      } else {
        lineToken.setting.subscribeStock.splice(index, 1);
      }
    }

    // 儲存變更
    const result = await lineToken.save();
    return result.setting?.subscribeStock;
  } catch (e) {
    return null;
  }
}

export function isSubscribedPost(title: string, subscribeNo: string[]) {
  return subscribeNo.some((target) => title.includes(target));
}

export default { subscribeStock, isSubscribedPost };
