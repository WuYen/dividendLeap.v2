import { randomBytes } from 'crypto';
import { LineTokenModel, TokenLevel } from '../model/lineToken';
import { sign } from '../utility/auth';
import lineService from '../service/lineService';

export const generateVerifyCode = (): string => {
  const buffer = randomBytes(3); // 生成 3 个随机字节
  const code = buffer.readUIntBE(0, 3) % 100000; // 转换为 5 位数字
  return code.toString().padStart(5, '0'); // 确保是 5 位数字，不足的用 0 补全
};

export const sendVerificationCode = async (account: string): Promise<string> => {
  const user = await LineTokenModel.findOne({ channel: account });

  if (!user) {
    throw new Error('使用者不存在');
  }

  if (!user.tokenLevel.includes(TokenLevel.Premium)) {
    throw new Error('權限未開啟');
  }

  const verifyCode = generateVerifyCode();
  const verifyCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 设置验证码 5 分钟后过期
  user.verifyCode = verifyCode;
  user.verifyCodeExpires = verifyCodeExpires;
  await user.save();

  const message = `您的驗證碼是: ${verifyCode}\n五分鐘內有效`;
  await lineService.sendMessage(user.token, message);

  return '驗證碼已發送到 Line';
};

export const verifyCodeAndGenerateToken = async (account: string, verifyCode: string): Promise<string> => {
  const user = await LineTokenModel.findOne({ channel: account }).lean();

  if (!user) {
    throw new Error('查無資料');
  }

  if (user.verifyCode !== verifyCode) {
    throw new Error('驗證碼錯誤');
  }

  if (!user.verifyCodeExpires || new Date() > user.verifyCodeExpires) {
    throw new Error('驗證碼過期');
  }

  const payload = { id: user.channel };
  const jwtToken = sign(payload);

  return jwtToken;
};

export default {
  generateVerifyCode,
  sendVerificationCode,
  verifyCodeAndGenerateToken,
};
