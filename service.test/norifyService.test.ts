import { processPostAndSendNotifyFromUserSetting } from '../service/notifyService';
import { IPostInfo } from '../model/PostInfo';
import { postQueue } from '../service/queue/postQueue';
import { IUserSetting, Level } from '../model/UserSetting';
import { IAuthor } from '../model/Author';
import { MessageChannel } from '../type/notify';

jest.mock('../service/queue/postQueue', () => ({
  postQueue: {
    push: jest.fn(),
  },
}));

jest.mock('../service/business/notifyContentGenerator.v2', () => {
  const originalModule = jest.requireActual('../service/business/notifyContentGenerator.v2');
  return {
    ...originalModule,
    NotifyContentGenerator: jest.fn().mockImplementation(() => ({})),
  };
});

describe('processPostAndSendNotifyFromUserSetting', () => {
  it('should correctly push notify envelope to postQueue', async () => {
    const mockPost = {
      id: 123456,
      author: 'testAuthor',
      tag: '標的',
      title: '🔥 好股票分享',
      date: '2023-10-04 23:54:09',
      href: '/test',
      batchNo: 123456,
    } as IPostInfo;

    const mockUserSetting: IUserSetting = {
      account: 'user1',

      verifyCode: null,
      verifyCodeExpires: null,

      // 使用者自訂
      favoritePosts: [], // 一定要加！
      keywords: ['好股票'],

      fugleApiKey: '', // optional 可不給也行

      // 各通道
      channels: [
        {
          type: MessageChannel.Line,
          enabled: true,
          token: 'linePushKey',
          messageLevel: Level.Premium,
          isGroup: false,
        },
        {
          type: MessageChannel.Telegram,
          enabled: true,
          token: 'telegramPushKey',
          messageLevel: Level.Premium,
        },
        {
          type: MessageChannel.Expo,
          enabled: true,
          token: 'ExponentPushToken[abc123]',
          messageLevel: Level.Premium,
        },
      ],
    };

    const mockAuthor = {
      name: 'testAuthor',
      likes: 100,
      dislikes: 50,
    } as IAuthor;

    await processPostAndSendNotifyFromUserSetting([mockPost], [mockUserSetting], [mockAuthor]);

    expect(postQueue.push).toHaveBeenCalledTimes(3);

    const callArgs = (postQueue.push as jest.Mock).mock.calls[0][0];

    expect(callArgs).toHaveProperty('contentGenerator');
    expect(callArgs).toHaveProperty('type');
    expect(callArgs).toHaveProperty('users');

    const allCalls = (postQueue.push as jest.Mock).mock.calls.map((args) => args[0]);

    // 平展所有被推播出去的 token 清單
    const allUsers = allCalls.flatMap((call) => call.users);

    // 驗證每個 channel 都有被加入
    expect(allUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ channel: 'line', token: 'linePushKey' }),
        expect.objectContaining({ channel: 'telegram', token: 'telegramPushKey' }),
        expect.objectContaining({ channel: 'expo', token: 'ExponentPushToken[abc123]' }),
      ])
    );
  });
});
