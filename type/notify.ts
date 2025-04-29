import { IPostInfo } from '../model/PostInfo';
import TelegramBot from 'node-telegram-bot-api';

export enum MessageChannel {
  Line = 'line',
  Telegram = 'telegram',
  Expo = 'expo',
}

export interface MessageContent {
  content: string;
}

export interface NotifyEnvelope {
  token: string;
  channel: MessageChannel;
  payload: PostContent | MessageContent;
}

export interface PostContent {
  post: IPostInfo;
  content: string;
  contentType: ContentType;
  isSubscribedAuthor: boolean;
  options: TelegramBot.SendMessageOptions | any | null;
}

export enum ContentType {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium',
  Telegram = 'telegram',
}
