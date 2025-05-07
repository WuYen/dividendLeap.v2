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
  // 構建更新資料
  const update = {
    $set: {
      'channels.$[elem]': {
        type,
        token,
        enabled: true,
        ...updateData,
      },
    },
  };

  // 構建更新選項
  const options = {
    arrayFilters: [{ 'elem.type': arrayFilterType || type }],
    upsert: true,
    new: true,
  };

  // 執行 upsert 操作並返回結果
  const updatedUserSetting = await UserSettingModel.findOneAndUpdate({ account }, update, options);

  if (!updatedUserSetting) {
    throw new Error('更新失敗，找不到對應的使用者設定');
  }

  // 返回更新後的通道設定
  const updatedChannel = updatedUserSetting.channels.find(
    (channel) => channel.type === type && channel.token === token
  );
  return updatedChannel || null;
};
