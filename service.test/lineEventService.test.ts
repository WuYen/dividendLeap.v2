import { lineEventService } from '../service/lineEventService';
import { lineBotHelper } from '../utility/lineBotHelper';
import { UserSettingModel } from '../model/UserSetting';

jest.mock('../utility/lineBotHelper');
jest.mock('../model/UserSetting');

describe('lineEventService - handleFollow with logging and account from name', () => {
  const mockFindOneAndUpdate = jest.fn();
  const mockFindOne = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (UserSettingModel.findOneAndUpdate as any) = mockFindOneAndUpdate;
    (UserSettingModel.findOne as any) = mockFindOne;
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should set account to name if new user', async () => {
    const fakeEvent = {
      source: { type: 'user', userId: 'U777' },
    };

    (lineBotHelper.getUserProfile as jest.Mock).mockResolvedValue({ displayName: '中二少年' });
    mockFindOne.mockResolvedValue(null); // New user

    await lineEventService.handleFollow(fakeEvent as any);

    expect(mockFindOne).toHaveBeenCalledWith({ 'line.pushKey': 'U777' });

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { 'line.pushKey': 'U777' },
      {
        $set: {
          line: {
            enabled: true,
            isGroup: false,
            pushKey: 'U777',
            name: '中二少年',
            channelType: 'bot',
            messageLevel: 'basic',
          },
        },
        $setOnInsert: {
          account: '中二少年',
        },
      },
      { upsert: true, new: true }
    );
  });

  it('should NOT set account if user already exists', async () => {
    const fakeEvent = {
      source: { type: 'user', userId: 'U888' },
    };

    (lineBotHelper.getUserProfile as jest.Mock).mockResolvedValue({ displayName: '老用戶' });
    mockFindOne.mockResolvedValue({ account: '老用戶' }); // Existing user

    await lineEventService.handleFollow(fakeEvent as any);

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { 'line.pushKey': 'U888' },
      {
        $set: {
          line: {
            enabled: true,
            isGroup: false,
            pushKey: 'U888',
            name: '老用戶',
            channelType: 'bot',
            messageLevel: 'basic',
          },
        },
      },
      { upsert: true, new: true }
    );
  });
});
