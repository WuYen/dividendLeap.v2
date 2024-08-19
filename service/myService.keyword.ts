import { LineTokenModel } from '../model/lineToken';

export async function getKeywords(userId: string): Promise<string[]> {
  const user = await LineTokenModel.findOne({ channel: userId });

  if (!user) {
    throw new Error('使用者不存在');
  }

  return user.keywords;
}

export async function updateKeywords(userId: string, keywords: string[]): Promise<string[]> {
  if (!keywords || !Array.isArray(keywords)) {
    throw new Error('關鍵字錯誤');
  }

  const user = await LineTokenModel.findOne({ channel: userId });

  if (!user) {
    throw new Error('使用者不存在');
  }

  // Add new keywords to the existing list, avoiding duplicates
  user.keywords = [...new Set([...user.keywords, ...keywords])];

  await user.save();
  return user.keywords;
}

export async function deleteKeywords(userId: string, keywords: string[]): Promise<string[]> {
  if (!keywords || !Array.isArray(keywords)) {
    throw new Error('關鍵字錯誤');
  }

  const user = await LineTokenModel.findOne({ channel: userId });

  if (!user) {
    throw new Error('使用者不存在');
  }

  // Remove the specified keywords from the user's keyword list
  user.keywords = user.keywords.filter((keyword) => !keywords.includes(keyword));

  await user.save();
  return user.keywords;
}
