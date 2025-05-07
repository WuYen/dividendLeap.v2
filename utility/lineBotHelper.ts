import { messagingApi, TextMessage, webhook, Message } from '@line/bot-sdk';
import config from '../utility/config';
import { PushMessageResponse, ReplyMessageResponse } from '@line/bot-sdk/dist/messaging-api/api';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: config.LINE_CHANNEL_ACCESS_TOKEN,
});

export const lineBotHelper = {
  verifySignature: (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
      return next(); // 跳過 signature 驗證
    }
    const bodyString = JSON.stringify(req.body);
    const channelSecret = config.LINE_CHANNEL_SECRET;
    const signature = req.get('X-Line-Signature');

    const hash = crypto.createHmac('SHA256', channelSecret).update(bodyString).digest('base64');

    if (hash !== signature) {
      return res.status(500).json({ message: 'signature validation failed' });
    }

    next();
  },

  // ========= LINE SDK =========
  replyText: (replyToken: string, text: string): Promise<ReplyMessageResponse> => {
    return client.replyMessage({
      replyToken,
      messages: [{ type: 'text', text } as TextMessage],
    });
  },

  pushText: (userId: string, text: string): Promise<PushMessageResponse> => {
    return client.pushMessage({
      to: userId,
      messages: [{ type: 'text', text } as TextMessage],
    });
  },

  pushRaw: (to: string, messages: Message[]): Promise<PushMessageResponse> => {
    return client.pushMessage({ to, messages });
  },

  getUserProfile: (userId: string): Promise<messagingApi.UserProfileResponse> => {
    return client.getProfile(userId);
  },

  getGroupProfile: (groupId: string): Promise<messagingApi.GroupSummaryResponse> => {
    return client.getGroupSummary(groupId);
  },

  // ========= Type Guards =========
  isFollowOrJoinEvent: (event: webhook.Event): event is webhook.FollowEvent | webhook.JoinEvent =>
    event.type === 'follow' || event.type === 'join',

  isUnfollowOrLeaveEvent: (event: webhook.Event): event is webhook.UnfollowEvent | webhook.LeaveEvent =>
    event.type === 'unfollow' || event.type === 'leave',

  isTextMessageEvent: (event: webhook.Event): event is webhook.MessageEvent & { message: webhook.TextMessageContent } =>
    event.type === 'message' && 'message' in event && (event.message as webhook.TextMessageContent).type === 'text',
};
