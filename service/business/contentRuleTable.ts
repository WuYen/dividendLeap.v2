import { Level } from '../../model/UserSetting';
import { ContentType } from './notifyContentGenerator.v2';
import { MessageChannel } from '../../type/notify';

export interface Rule {
  channel: MessageChannel | '*';
  tag: string | '*';
  isSubscribedAuthor: boolean | '*';
  isRepost: boolean | '*';
  level: Level | '*';
  contentType: ContentType;
}

const contentRuleTable: Rule[] = [
  // Telegram 特例：標的 + 訂閱作者 + 非轉貼 + Premium 用戶
  {
    channel: MessageChannel.Telegram,
    tag: '標的',
    isSubscribedAuthor: true,
    isRepost: false,
    level: Level.Premium,
    contentType: ContentType.Telegram,
  },
  // Telegram 普通使用者：標的 or 關鍵字 ➜ NormalPostTG
  {
    channel: MessageChannel.Telegram,
    tag: '*',
    isSubscribedAuthor: '*',
    isRepost: '*',
    level: '*',
    contentType: ContentType.NormalPostTG,
  },
  // Line Premium：標的 + 訂閱作者 + 非轉貼
  {
    channel: MessageChannel.Line,
    tag: '標的',
    isSubscribedAuthor: true,
    isRepost: false,
    level: Level.Premium,
    contentType: ContentType.Premium,
  },
  // Line Premium：標的 + 訂閱作者 + 轉貼
  {
    channel: MessageChannel.Line,
    tag: '標的',
    isSubscribedAuthor: true,
    isRepost: true,
    level: Level.Premium,
    contentType: ContentType.Standard,
  },
  // Line Premium：關鍵字
  {
    channel: MessageChannel.Line,
    tag: '*',
    isSubscribedAuthor: '*',
    isRepost: false,
    level: Level.Premium,
    contentType: ContentType.Standard,
  },
  // Line Standard 使用者
  {
    channel: MessageChannel.Line,
    tag: '*',
    isSubscribedAuthor: '*',
    isRepost: '*',
    level: Level.Standard,
    contentType: ContentType.Standard,
  },
  // Line Basic fallback
  {
    channel: MessageChannel.Line,
    tag: '*',
    isSubscribedAuthor: '*',
    isRepost: '*',
    level: Level.Basic,
    contentType: ContentType.Basic,
  },
  // Expo Premium：標的 + 訂閱作者 + 非轉貼 ➔ Standard
  {
    channel: MessageChannel.Expo,
    tag: '標的',
    isSubscribedAuthor: true,
    isRepost: false,
    level: Level.Premium,
    contentType: ContentType.Standard,
  },
  // Expo Premium：標的 + 非訂閱作者 + 非轉貼 ➔ Basic
  {
    channel: MessageChannel.Expo,
    tag: '標的',
    isSubscribedAuthor: false,
    isRepost: false,
    level: Level.Premium,
    contentType: ContentType.Basic,
  },
  // Expo Premium：關鍵字通知 ➔ Basic
  {
    channel: MessageChannel.Expo,
    tag: '*',
    isSubscribedAuthor: '*',
    isRepost: false,
    level: Level.Premium,
    contentType: ContentType.Basic,
  },
];

export function matchContentType(
  channel: MessageChannel,
  tag: string,
  isSubscribedAuthor: boolean,
  isRepost: boolean,
  userLevel: Level
): ContentType | null {
  console.log('[matchContentType] Checking content type with:');
  console.log({ channel, tag, isSubscribedAuthor, isRepost, userLevel });

  const rule = contentRuleTable.find((r, index) => {
    const matched =
      (r.channel === channel || r.channel === '*') &&
      (r.tag === tag || r.tag === '*') &&
      (r.isSubscribedAuthor === isSubscribedAuthor || r.isSubscribedAuthor === '*') &&
      (r.isRepost === isRepost || r.isRepost === '*') &&
      (r.level === userLevel || r.level === '*');

    if (matched) {
      console.log(`[matchContentType] Rule matched at index ${index}:`, r);
    }

    return matched;
  });

  if (!rule) {
    console.warn('[matchContentType] No matching rule found!');
  }

  return rule?.contentType ?? null;
}
