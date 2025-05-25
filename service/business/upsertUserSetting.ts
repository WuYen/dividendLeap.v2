import { UserSettingModel, ChannelSetting } from '../../model/UserSetting';

interface UpsertChannelParams {
  account: string; // 使用者帳號
  token: string; // 通道的唯一標識
  type: ChannelSetting['type']; // 通道類型
  updateData: Partial<ChannelSetting>; // 更新的資料
  arrayFilterType?: ChannelSetting['type']; // 用於 arrayFilters 的通道類型
}

export const upsertChannel = async ({
  account,
  token,
  type,
  updateData,
  arrayFilterType,
}: UpsertChannelParams): Promise<ChannelSetting | null> => {
  // 1️⃣ 取得或建立使用者設定
  let userSetting = await UserSettingModel.findOne({ account });
  if (!userSetting) {
    userSetting = new UserSettingModel({
      account,
      channels: [],
    });
  }

  // 2️⃣ 確保 channels 陣列存在
  if (!Array.isArray(userSetting.channels)) {
    userSetting.channels = [];
  }

  // 3️⃣ 檢查是否已存在同類型的 channel
  const targetType = arrayFilterType || type;
  const existingChannel = userSetting.channels.find((channel) => channel.type === targetType);

  if (existingChannel) {
    // ✅ 已存在 ➜ 更新內容
    existingChannel.token = token;
    existingChannel.enabled = true;
    Object.assign(existingChannel, updateData);
  } else {
    // ❌ 不存在 ➜ 新增 channel
    userSetting.channels.push({
      type,
      token,
      enabled: true,
      ...updateData,
    } as ChannelSetting);
  }

  // 4️⃣ 儲存資料
  await userSetting.save();

  // 5️⃣ 回傳更新後的那筆 channel
  return userSetting.channels.find((channel) => channel.type === type && channel.token === token) || null;
};
