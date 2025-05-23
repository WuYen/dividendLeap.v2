import { randomBytes } from 'crypto';
import { sign } from '../utility/auth';
import { Level, UserSettingModel } from '../model/UserSetting';
import { MessageChannel } from '../type/notify';
import { upsertChannel } from './business/upsertUserSetting';

export const generateVerifyCode = (): string => {
  const buffer = randomBytes(3); // 生成 3 个随机字节
  const code = buffer.readUIntBE(0, 3) % 100000; // 转换为 5 位数字
  return code.toString().padStart(5, '0'); // 确保是 5 位数字，不足的用 0 补全
};

// export const sendVerificationCode = async (account: string): Promise<string> => {
//TODO: use new UserSettingModel

//   if (!user) {
//     throw new Error('使用者不存在');
//   }

//   if (!user.level.includes(Level.Premium)) {
//     throw new Error('權限未開啟');
//   }

//   const verifyCode = generateVerifyCode();
//   const verifyCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 设置验证码 5 分钟后过期
//   user.verifyCode = verifyCode;
//   user.verifyCodeExpires = verifyCodeExpires;
//   await user.save();

//   const message = `您的驗證碼是: ${verifyCode}\n五分鐘內有效`;
//TODO: send message use lineBot

//   return '驗證碼已發送到 Line';
// };

// export const verifyCodeAndGenerateToken = async (account: string, verifyCode: string): Promise<string> => {
//   //TODO: use new UserSettingModel

//   if (!user) {
//     throw new Error('查無資料');
//   }

//   if (user.verifyCode !== verifyCode) {
//     throw new Error('驗證碼錯誤');
//   }

//   if (!user.verifyCodeExpires || new Date() > user.verifyCodeExpires) {
//     throw new Error('驗證碼過期');
//   }

//   const payload = { id: user.channel };
//   const jwtToken = sign(payload);

//   return jwtToken;
// };

export const registerExpoUser = async (account: string, pushToken: string): Promise<string> => {
  const duplicated = await UserSettingModel.findOne({
    'channels.token': pushToken,
    'channels.enabled': true,
    account: { $ne: account },
  });
  if (duplicated) {
    throw new Error('此推播 Token 已被其他帳號綁定');
  }

  const updatedChannel = await upsertChannel({
    account,
    token: pushToken,
    type: MessageChannel.Expo,
    updateData: {
      messageLevel: Level.Basic,
    },
  });

  console.log('registerExpoUser 資料已寫入 / 更新成功:', JSON.stringify(updatedChannel, null, 2));

  const jwtToken = sign({ id: account });
  return jwtToken;
};

export const loginExpoUser = async (account: string, pushToken: string): Promise<string> => {
  const user = await UserSettingModel.findOne({ 'channels.token': pushToken });

  if (!user) {
    throw new Error('帳號與推播資訊不符，請重新綁定或註冊');
  }

  const jwtToken = sign({ id: account });
  return jwtToken;
};

export default {
  generateVerifyCode,
  registerExpoUser,
  loginExpoUser,
};
