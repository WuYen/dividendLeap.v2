import { TokenLevel } from '../model/lineToken';
import { notifyUsers } from '../service/notifyService';

// Mock the modules
jest.mock('../service/lineService', () => ({
  sendMessage: jest.fn(),
}));

describe('verify notify shold be sent', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('base on user', () => {
    it('should send verification code successfully', async () => {
      const tokenInfos = [
        {
          channel: 'channel1',
          token: 'token1',
          updateDate: '2023-05-01',
          notifyEnabled: true,
          tokenLevel: [TokenLevel.Test],
        },
        {
          channel: 'channel2',
          token: 'token2',
          updateDate: '2023-05-01',
          notifyEnabled: true,
          tokenLevel: [TokenLevel.Basic],
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
  });
});
