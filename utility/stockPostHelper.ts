import { IPostInfo } from '../model/PostInfo';

// 使用數組來存儲排除關鍵字
const excludeKeywords = [
  '討論',
  '心得',
  '請益',
  '問題',
  '嗎',
  '大盤',
  '台指',
  '解盤',
  '請問',
  '請教',
  'etf',
  '？',
  '?',
  '放棄',
];
// 保護詞組
const protectedPhrases = ['航空'];

// 使用正則表達式來匹配特定模式
const replyPattern = /^\s*r(?:e)?:\s|\(re\)|\[re\]/i;
const negativePattern = /\b(做|看|操作|建立|持有)空\b|空(單|頭|方|軍|頭部隊)/;
const stockNoPattern = /\b\d{4}\b/g;
const countryPattern = /\b(hk|jp|us)\b/i;

export function isValidStockPost(post: IPostInfo): boolean {
  const { title } = post;
  const lowerTitle = title.toLowerCase();

  // 1. 檢查回覆標記
  if (replyPattern.test(lowerTitle)) {
    return false;
  }

  // 2. 檢查股票代碼
  const stockNos = title.match(stockNoPattern) || [];
  if (stockNos.length !== 1) {
    return false; // 沒有股票代碼或多於一個股票代碼
  }

  // 3. 檢查受保護的短語
  if (protectedPhrases.some((phrase) => lowerTitle.includes(phrase.toLowerCase()))) {
    return true; // 如果包含保護短語，直接視為有效
  }

  // 4. 檢查排除關鍵字
  if (excludeKeywords.some((keyword) => lowerTitle.includes(keyword))) {
    return false;
  }

  // 5. 檢查負面上下文（做空相關）
  if (negativePattern.test(title)) {
    return false;
  }

  // 6. 檢查 .HK 和 .JP（不論大小寫）
  if (countryPattern.test(title)) {
    return false;
  }

  // 7. 額外檢查 "空"（如果不在保護短語中）
  if (lowerTitle.includes('空')) {
    return false;
  }

  return true;
}

export function isRePosts(post: IPostInfo): boolean {
  const title = post.title.toLowerCase(); // 将标题转换为小写以进行不区分大小写的比较
  return Boolean(
    post.title && // 确保标题存在
      title.includes('re:')
  );
}

export function parseId(link: string): number {
  const reg = new RegExp('(?:https?://(?:www\\.)?ptt\\.cc)?/bbs/.*/[GM]\\.(\\d+)\\..*');
  const strs = link.match(reg);
  if (!strs || strs.length < 2) {
    return 0;
  }
  const id = parseInt(strs[1]);
  if (isNaN(id)) {
    return 0;
  }
  return id;
}

export function getStockNoFromTitle(post: IPostInfo) {
  const match = post.title.match(/\d{4,5}/);
  return match ? match[0] : '';
}

export function isPostedInOneWeek(baseDate: Date, today: Date): boolean {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const diffFromToday = today.getTime() - baseDate.getTime();
  return diffFromToday < oneWeekInMilliseconds;
}
