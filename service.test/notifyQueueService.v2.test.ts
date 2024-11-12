import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { processPostAndSendNotify, notifyQueue, postQueue } from '../service/notifyQueueService.v2'; // Adjust the import according to your module structure

jest.mock('../service/lineService', () => ({
  sendMessage: jest.fn(),
}));

jest.mock('../service/telegramBotService', () => ({
  sendMessageWithOptions: jest.fn(),
}));

jest.mock('../service/business/NotifyContentGenerator.v2', () => {
  const originalModule = jest.requireActual('../service/business/NotifyContentGenerator.v2');
  return {
    ...originalModule,
    NotifyContentGenerator: jest.fn().mockImplementation((post, authorInfo) => {
      return {
        post, // Store the post parameter
        authorInfo, // Store the authorInfo parameter
        getContent: jest.fn((type) => {
          // Return different mock content based on the type
          return Promise.resolve({
            post,
            contentType: type,
            isSubscribedAuthor: !!authorInfo,
            content: `${post.title}`,
            options: {},
          });
        }),
      };
    }),
  };
});

describe('processPostAndSendNotify', () => {
  const newPosts: IPostInfo[] = [
    {
      tag: '標的',
      title: '1 台積電漲停！散戶嗨翻：護盤有功',
      href: 'stock/M.1672225269.A.102',
      author: 'pttTestAuthor',
      date: '2023-10-04 23:54:09',
      batchNo: 12345,
      id: 123456,
    },
    {
      tag: '標的',
      title: '2 鴻海大跌！郭台銘：護盤沒用，要靠自身努力',
      href: 'stock/M.1672225269.A.103',
      author: 'anotherAuthor',
      date: '2023-10-04 23:55:09',
      batchNo: 12346,
      id: 123457,
    },
    {
      tag: '其他',
      title: '測試關鍵字測試',
      href: 'stock/M.1672225369.A.103',
      author: 'anotherAuthor',
      date: '2023-10-04 23:55:09',
      batchNo: 12346,
      id: 123457,
    },
  ];

  const subscribeAuthors: IAuthor[] = [
    {
      name: 'pttTestAuthor',
      likes: 100,
      dislikes: 50,
    },
  ];

  const users: ILineToken[] = [
    {
      channel: 'A', //預期收到三封通知,台積電(Telegram), 鴻海(NormalPostTG), 關鍵字(NormalPostTG)
      token: 'myToken1',
      updateDate: '2023-10-05 00:00:00',
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Test, TokenLevel.Standard],
      favoritePosts: [],
      keywords: ['關鍵'],
      tgChatId: '123',
    },
    {
      channel: 'B', //預期收到兩封通知,台積電(Premium), 鴻海(Standard)
      token: 'myToken2',
      updateDate: '2023-10-05 00:00:00',
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Standard],
      favoritePosts: [],
      keywords: [],
    },
    {
      channel: 'C', //預期收到兩封通知,台積電(Premium), 鴻海(Basic)
      token: 'myToken3',
      updateDate: '2023-10-05 00:00:00',
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Basic],
      favoritePosts: [],
      keywords: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    notifyQueue.resetStats();
    postQueue.resetStats();
  });

  it('should call postQueue and notifyQueue the correct number of times', async () => {
    const { sendMessage } = jest.requireMock('../service/lineService');
    const { sendMessageWithOptions } = jest.requireMock('../service/telegramBotService');

    await processPostAndSendNotify(newPosts, users, subscribeAuthors);

    await new Promise((resolve) => {
      postQueue.on('drain', resolve);
    });
    await new Promise((resolve) => {
      notifyQueue.on('drain', resolve);
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 100);
    });

    //assert queue behavior
    expect(postQueue.getStats().total).toEqual(6);
    expect(notifyQueue.getStats().total).toEqual(7);

    expect(sendMessageWithOptions).toHaveBeenCalledTimes(3);
    expect(sendMessage).toHaveBeenCalledTimes(4);
  });
});
