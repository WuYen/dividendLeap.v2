import { IPostInfo } from '../model/PostInfo';
import { TokenLevel } from '../model/lineToken';
import { notifyUsers, prepareMessage } from '../service/notifyService';

// Mock the modules
jest.mock('../service/lineService', () => ({
  sendMessage: jest.fn(),
}));

describe('notify service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should send notify successfully', async () => {
    const tokenInfos = [
      {
        channel: 'channel1',
        token: 'token1',
        updateDate: '2023-05-01',
        notifyEnabled: true,
        tokenLevel: [TokenLevel.Standard],
        favoritePosts: [],
      },
      {
        channel: 'channel2',
        token: 'token2',
        updateDate: '2023-05-01',
        notifyEnabled: true,
        tokenLevel: [TokenLevel.Basic],
        favoritePosts: [],
      },
    ];

    const newPosts = [
      {
        tag: '標的',
        title: '標題1',
        href: 'https://example.com/post1',
        author: '作者1',
        date: '2023-05-01',
        batchNo: 1,
        id: 1,
      },
    ];

    const subscribeAuthors = [
      {
        name: '作者1',
        likes: 10,
        dislikes: 2,
      },
    ];

    await notifyUsers(tokenInfos, newPosts, subscribeAuthors);

    const { sendMessage } = jest.requireMock('../service/lineService');
    expect(sendMessage).toHaveBeenCalledTimes(2);

    // Test for token1 (TokenLevel.Test)
    expect(sendMessage).toHaveBeenCalledWith('token1', expect.stringContaining('標題1'));
    expect(sendMessage).toHaveBeenCalledWith('token1', expect.stringContaining('作者: 作者1 👍:10'));
    // expect(sendMessage).toHaveBeenCalledWith('token1', expect.stringContaining('https://example.com/ptt/author/作者1'));

    // Test for token2 (TokenLevel.Basic)
    expect(sendMessage).toHaveBeenCalledWith('token2', expect.stringContaining('標題1'));
    expect(sendMessage).toHaveBeenCalledWith('token2', expect.stringContaining('作者: 作者1'));
    //expect(sendMessage).toHaveBeenCalledWith('token2', expect.stringContaining('https://example.com/post2'));
  });

  test('prepareMessage', () => {
    var posts: IPostInfo[] = [
      {
        id: 1709219216,
        tag: '情報',
        title: '3413 京鼎 股利：12',
        href: '/bbs/Stock/M.1709219216.A.243.html',
        author: 'adidas32',
        date: '2/29',
        batchNo: 123,
      },
      {
        id: 1709262770,
        tag: '標的',
        title: '8028 昇陽半導體 多',
        href: '/bbs/Stock/M.1709262770.A.35C.html',
        author: 'CCF2016',
        date: '3/01',
        batchNo: 123,
      },
      {
        id: 1709297008,
        tag: '標的',
        title: '6139亞翔-拉不拉多3',
        href: '/bbs/Stock/M.1709297008.A.E0B.html',
        author: 'ninia178178',
        date: '3/01',
        batchNo: 123,
      },
    ];
    const subscribeAuthors = [
      {
        name: 'CCF2016',
        likes: 10,
        dislikes: 2,
      },
    ];
    var messages = prepareMessage(posts, subscribeAuthors);
    expect(messages.length).toEqual(2);

    expect(messages[0].basic.includes('【✨✨大神來囉✨✨】')).toBeTruthy();
    expect(messages[0].basic.includes('作者: CCF2016 👍:10')).toBeFalsy();

    expect(messages[0].standard.includes('【✨✨大神來囉✨✨】')).toBeTruthy();
    expect(messages[0].standard.includes('作者: CCF2016 👍:10')).toBeTruthy();

    expect(messages[1].basic.includes('【✨✨大神來囉✨✨】')).toBeFalsy();
    expect(messages[1].basic.includes('[標的] 6139亞翔-拉不拉多3')).toBeTruthy();
    expect(messages[1].basic.includes('作者: ninia178178')).toBeTruthy();
    expect(messages[1].basic.includes(`/ptt/author/ninia178178`)).toBeTruthy();
    expect(messages[1].basic.includes(`/bbs/Stock/M.1709297008.A.E0B.html`)).toBeTruthy();

    expect(messages[1].standard.includes('【✨✨大神來囉✨✨】')).toBeFalsy();
    expect(messages[1].standard.includes('[標的] 6139亞翔-拉不拉多3')).toBeTruthy();
    expect(messages[1].standard.includes('作者: ninia178178')).toBeTruthy();
    expect(messages[1].standard.includes(`/ptt/author/ninia178178`)).toBeTruthy();
    expect(messages[1].standard.includes(`}/bbs/Stock/M.1709297008.A.E0B.html`)).toBeFalsy();
  });
});
