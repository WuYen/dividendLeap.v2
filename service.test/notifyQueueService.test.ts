import { IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo } from '../model/PostInfo';
import { mainProcess, notifyQueue, postQueue } from '../service/notifyQueueService'; // Adjust the import according to your module structure
import * as geminiAIService from '../service/geminiAIService';

jest.mock('../service/lineService', () => ({
  sendMessage: jest.fn(),
}));

jest.mock('../service/geminiAIService', () => ({
  generateWithTunedModel: jest.fn(),
}));

jest.mock('../service/pttStockPostService');

describe('mainProcess', () => {
  const newPosts: IPostInfo[] = [
    {
      tag: 'stock',
      title: '1 台積電漲停！散戶嗨翻：護盤有功',
      href: 'stock/M.1672225269.A.102',
      author: 'pttTestAuthor',
      date: '2023-10-04 23:54:09',
      batchNo: 12345,
      id: 123456,
    },
    {
      tag: 'stock',
      title: '2 鴻海大跌！郭台銘：護盤沒用，要靠自身努力',
      href: 'stock/M.1672225269.A.103',
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
      channel: 'A-TEST+STAND',
      token: 'myToken1',
      updateDate: '2023-10-05 00:00:00',
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Test, TokenLevel.Standard],
      favoritePosts: [],
    },
    {
      channel: 'B-STAND',
      token: 'myToken2',
      updateDate: '2023-10-05 00:00:00',
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Standard],
      favoritePosts: [],
    },
    {
      channel: 'C-BASIC',
      token: 'myToken3',
      updateDate: '2023-10-05 00:00:00',
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Basic],
      favoritePosts: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call sendMessage the correct number of times', async () => {
    const { sendMessage } = jest.requireMock('../service/lineService');
    const { generateWithTunedModel } = jest.requireMock('../service/geminiAIService');
    generateWithTunedModel.mockResolvedValue('台積電漲停 ai message');
    const mockPttStockPostService = jest.requireMock('../service/pttStockPostService');

    mockPttStockPostService.fetchPostDetail.mockResolvedValue('台積電漲停！散戶嗨翻：護盤有功 mock');

    await mainProcess(newPosts, users, subscribeAuthors);

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

    expect(postQueue.getStats().total).toEqual(1);
    expect(geminiAIService.generateWithTunedModel).toHaveBeenCalledTimes(1);
    expect(notifyQueue.getStats().total).toEqual(6);
    expect(sendMessage).toHaveBeenCalledTimes(6);

    // Verify the calls for user A (test + standard)
    expect(sendMessage).toHaveBeenCalledWith('myToken1', expect.stringContaining('鴻海大跌'));
    expect(sendMessage).toHaveBeenCalledWith('myToken1', expect.stringContaining('台積電漲停 ai message'));

    // Verify the calls for user B (standard)
    expect(sendMessage).toHaveBeenCalledWith(
      'myToken2',
      expect.stringContaining('👍:100') && expect.stringContaining('台積電漲停')
    );
    expect(sendMessage).toHaveBeenCalledWith('myToken2', expect.stringContaining('鴻海大跌'));

    // Verify the calls for user C (basic)
    expect(sendMessage).toHaveBeenCalledWith('myToken3', expect.stringContaining('台積電漲停'));
    expect(sendMessage).toHaveBeenCalledWith('myToken3', expect.stringContaining('鴻海大跌'));
  });
});
