import { webhook } from '@line/bot-sdk';
import { UserSettingModel, Level } from '../model/UserSetting';
import { lineBotHelper } from '../utility/lineBotHelper';

export const lineEventService = {
  handleFollow: async (event: webhook.FollowEvent | webhook.JoinEvent) => {
    const source = event.source;

    let pushKey: string | undefined;
    let isGroup = false;
    let name: string | undefined = '';

    if (!source) {
      console.warn('[LINE][Follow] 無 source，跳過');
      return;
    }

    if (source.type === 'user') {
      pushKey = source.userId as string;
      isGroup = false;
      const profile = await lineBotHelper.getUserProfile(source.userId as string);
      name = profile.displayName;
    } else if (source.type === 'group') {
      pushKey = source.groupId as string;
      isGroup = true;
      name = 'LINE 群組' + pushKey;
    } else if (source.type === 'room') {
      pushKey = source.roomId as string;
      isGroup = true;
      name = 'LINE 聊天室' + pushKey;
    }

    if (!pushKey) {
      console.warn('[LINE][Follow] 無 pushKey，跳過');
      return;
    }

    console.log(`[LINE][Follow] 來源：${source.type}，pushKey: ${pushKey}，name: ${name}`);

    const existing = await UserSettingModel.findOne({ 'line.pushKey': pushKey });

    const updateData = {
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
    };

    if (!existing) {
      console.log(`[LINE][Follow] 新註冊用戶，自動建立帳號 line-${pushKey}`);
      Object.assign(updateData, {
        $setOnInsert: {
          account: name,
        },
      });
    } else {
      console.log(`[LINE][Follow] 已註冊用戶，更新資料`);
    }

    const updated = await UserSettingModel.findOneAndUpdate({ 'line.pushKey': pushKey }, updateData, {
      upsert: true,
      new: true,
    });

    console.log('[LINE][Follow] 資料已寫入 / 更新成功:', JSON.stringify(updated, null, 2));
  },

  handleUnfollow: async (event: webhook.UnfollowEvent | webhook.LeaveEvent) => {
    const source = event.source;

    let pushKey: string | undefined;

    if (!source) {
      console.warn('[LINE][Unfollow] 無 source，跳過');
      return;
    }

    if (source.type === 'user') pushKey = source.userId as string;
    else if (source.type === 'group') pushKey = source.groupId as string;
    else if (source.type === 'room') pushKey = source.roomId as string;

    if (!pushKey) {
      console.warn('[LINE][Unfollow] 無 pushKey，跳過');
      return;
    }

    console.log(`[LINE][Unfollow] 來源：${source.type}，pushKey: ${pushKey}`);

    await UserSettingModel.updateOne(
      { 'line.pushKey': pushKey },
      {
        $set: {
          'line.enabled': false,
        },
      }
    );

    console.log(`[LINE][Unfollow] 已將 pushKey ${pushKey} 的 line.enabled 設為 false`);
  },

  handleTextMessage: async (event: webhook.MessageEvent & { message: webhook.TextMessageContent }) => {
    const replyToken = event.replyToken as string;
    const userText = event.message.text as string;

    await lineBotHelper.replyText(replyToken, `你說的是：${userText}`);

    console.log(`[LINE][TextMessage] 收到訊息：${userText}, 回覆：${userText}`);
  },
};
