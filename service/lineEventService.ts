import { webhook } from '@line/bot-sdk';
import { UserSettingModel, Level } from '../model/UserSetting';
import { lineBotHelper } from '../utility/lineBotHelper';
import { MessageChannel } from '../type/notify';
import { upsertChannel } from './business/upsertUserSetting';
import { handleLineAIChat } from './lineAIChatService';

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
      const profile = await lineBotHelper.getGroupProfile(source.groupId as string);
      name = profile.groupName;
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

    const duplicated = await UserSettingModel.findOne({
      channels: { $elemMatch: { type: MessageChannel.Line, token: pushKey } },
    });
    if (duplicated) {
      await UserSettingModel.updateOne(
        { _id: duplicated._id },
        { $set: { 'channels.$[channel].enabled': true, 'channels.$[channel].name': name } },
        { arrayFilters: [{ 'channel.type': MessageChannel.Line, 'channel.token': pushKey }] }
      );
      return;
    }

    const updatedChannel = await upsertChannel({
      account: `line:${pushKey}`,
      token: pushKey,
      type: MessageChannel.Line,
      updateData: {
        name,
        isGroup,
        messageLevel: Level.Basic,
      },
    });

    console.log('[LINE][Follow] 資料已寫入 / 更新成功:', JSON.stringify(updatedChannel, null, 2));
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
      { 'channels.token': pushKey },
      {
        $set: {
          'channels.$[elem].enabled': false,
        },
      },
      {
        arrayFilters: [
          {
            'elem.token': pushKey,
            'elem.type': 'line',
          },
        ],
      }
    );

    console.log(`[LINE][Unfollow] 已將 pushKey ${pushKey} 的 line.enabled 設為 false`);
  },

  handleTextMessage: async (event: webhook.MessageEvent & { message: webhook.TextMessageContent }) => {
    await handleLineAIChat(event);
  },
};
