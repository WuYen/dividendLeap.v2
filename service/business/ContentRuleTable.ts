import { Level } from '../../model/UserSetting';
import { ContentType } from './NotifyContentGenerator.v2';
import { MessageChannel } from '../notifyQueueService.v2';

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
];

export function matchContentType(
  channel: MessageChannel,
  tag: string,
  isSubscribedAuthor: boolean,
  isRepost: boolean,
  userLevel: Level
): ContentType | null {
  const rule = contentRuleTable.find(
    (r) =>
      (r.channel === channel || r.channel === '*') &&
      (r.tag === tag || r.tag === '*') &&
      (r.isSubscribedAuthor === isSubscribedAuthor || r.isSubscribedAuthor === '*') &&
      (r.isRepost === isRepost || r.isRepost === '*') &&
      (r.level === userLevel || r.level === '*')
  );
  return rule?.contentType ?? null;
}
