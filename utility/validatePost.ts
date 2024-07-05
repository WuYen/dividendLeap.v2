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
