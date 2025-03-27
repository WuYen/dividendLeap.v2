import { webhook } from '@line/bot-sdk';
import { UserSettingModel, Level } from '../model/UserSetting';
import { lineBotHelper } from '../utility/lineBotHelper';

export const lineEventService = {
  handleFollow: async (event: webhook.FollowEvent | webhook.JoinEvent) => {
    const source = event.source;

    let pushKey: string | undefined;
    let isGroup = false;
    let name: string | undefined = '';

    if (!source) return;

    if (source.type === 'user') {
      pushKey = source.userId as string;
      isGroup = false;
      const profile = await lineBotHelper.getUserProfile(source.userId as string);
      name = profile.displayName;
    } else if (source.type === 'group') {
      pushKey = source.groupId as string;
      isGroup = true;
      name = 'LINE 群組'; // 無法取得群組名稱，除非使用 group summary API
    } else if (source.type === 'room') {
      pushKey = source.roomId as string;
      isGroup = true;
      name = 'LINE 聊天室';
    }

    if (!pushKey) return;

    await UserSettingModel.findOneAndUpdate(
      { 'line.pushKey': pushKey },
      {
        $set: {
          line: {
            enabled: true,
            isGroup,
            pushKey,
            name,
            channelType: 'bot',
            messageLevel: Level.Basic,
          },
        },
      },
      { upsert: true, new: true }
    );
  },

  handleUnfollow: async (event: webhook.UnfollowEvent | webhook.LeaveEvent) => {
    const source = event.source;

    let pushKey: string | undefined;

    if (!source) return;

    if (source.type === 'user') pushKey = source.userId as string;
    else if (source.type === 'group') pushKey = source.groupId as string;
    else if (source.type === 'room') pushKey = source.roomId as string;

    if (!pushKey) return;

    await UserSettingModel.updateOne(
      { 'line.pushKey': pushKey },
      {
        $set: {
          'line.enabled': false,
        },
      }
    );
  },

  handleTextMessage: async (event: webhook.MessageEvent & { message: webhook.TextMessageContent }) => {
    const replyToken = event.replyToken as string;
    const userText = event.message.text as string;

    await lineBotHelper.replyText(replyToken, `你說的是：${userText}`);
  },
};
