import { notifyQueue } from '../../service/queue/notifyQueue';
import telegramBotService from '../../service/telegramBotService';
import { lineBotHelper } from '../../utility/lineBotHelper';
import expoPushService from '../../service/expoPushService';
import { NotifyEnvelope, MessageChannel, PostContent, ContentType } from '../../type/notify';
import { IPostInfo } from '../../model/PostInfo';

// Mock 推播服務
jest.mock('../../service/telegramBotService', () => ({
  sendMessageWithOptions: jest.fn(),
}));

jest.mock('../../utility/lineBotHelper', () => {
  return {
    lineBotHelper: {
      pushText: jest.fn().mockResolvedValue({ message: 'Message pushed' }),
    },
  };
});
jest.mock('../../service/expoPushService', () => ({
  send: jest.fn(),
}));

describe('notifyQueue', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call telegramBotService.sendMessageWithOptions when channel is Telegram', (done) => {
    const job: NotifyEnvelope = {
      token: 'telegram_token',
      channel: MessageChannel.Telegram,
      payload: { content: 'Test Telegram Message' },
    };

    notifyQueue.push(job, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual(job);
      expect(telegramBotService.sendMessageWithOptions).toHaveBeenCalledWith(
        'telegram_token',
        'Test Telegram Message',
        undefined
      );
      done();
    });
  });

  it('should call lineBotHelper.pushText when channel is Line', (done) => {
    const job: NotifyEnvelope = {
      token: 'line_token',
      channel: MessageChannel.Line,
      payload: { content: 'Test Line Message' },
    };

    notifyQueue.push(job, (error, result) => {
      try {
        expect(error).toBeNull();
        expect(result).toEqual(job);
        expect(lineBotHelper.pushText).toHaveBeenCalledWith('line_token', 'Test Line Message');
        done(); // 標記測試完成
      } catch (err) {
        done(err); // 發生錯誤時，傳遞給 Jest
      }
    });
  });

  it('should call expoPushService.send when channel is Expo', (done) => {
    const job: NotifyEnvelope = {
      token: 'expo_token',
      channel: MessageChannel.Expo,
      payload: {
        post: { id: 1, title: 'Sample Post', tag: '', href: '', author: '', date: '', batchNo: 123 } as IPostInfo,
        content: 'Test Expo Message',
        contentType: ContentType.Basic,
        isSubscribedAuthor: true,
        options: null,
      } as PostContent,
    };

    notifyQueue.push(job, (error, result) => {
      try {
        expect(error).toBeNull();
        expect(result).toEqual(job);
        expect(expoPushService.send).toHaveBeenCalledWith('expo_token', 'Sample Post', 'Test Expo Message', {
          id: 1,
          title: 'Sample Post',
          tag: '',
          href: '',
          author: '',
          date: '',
          batchNo: 123,
        });
        done(); // 標記測試完成
      } catch (err) {
        done(err); // 發生錯誤時，傳遞給 Jest
      }
    });
  });

  it('should call done with error if processing fails', (done) => {
    const error = new Error('Mock Error');
    (telegramBotService.sendMessageWithOptions as jest.Mock).mockRejectedValueOnce(error);

    const job: NotifyEnvelope = {
      token: 'telegram_token',
      channel: MessageChannel.Telegram,
      payload: { content: 'Test Telegram Message' },
    };

    notifyQueue.push(job, (err) => {
      try {
        expect(err).toEqual(error);
        done(); // 標記測試完成
      } catch (testErr) {
        done(testErr); // 發生錯誤時，傳遞給 Jest
      }
    });
  });
});
