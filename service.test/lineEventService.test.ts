import { lineEventService } from '../service/lineEventService';
import { UserSettingModel } from '../model/UserSetting';
import { lineBotHelper } from '../utility/lineBotHelper';
import { upsertChannel } from '../service/business/upsertUserSetting';
import { webhook } from '@line/bot-sdk';

jest.mock('../model/UserSetting');
jest.mock('../utility/lineBotHelper');
jest.mock('../service/business/upsertUserSetting');

const mockFindOne = jest.fn();
const mockUpdateOne = jest.fn();
const mockReplyText = jest.fn();
const mockUpsertChannel = jest.fn();

UserSettingModel.findOne = mockFindOne;
UserSettingModel.updateOne = mockUpdateOne;
lineBotHelper.replyText = mockReplyText;
(upsertChannel as jest.Mock).mockImplementation(mockUpsertChannel);

describe('Line Event Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleFollow', () => {
    it('should add a new user on follow event', async () => {
      const fakeEvent = {
        source: { type: 'user', userId: 'U123' },
      };

      lineBotHelper.getUserProfile = jest.fn().mockResolvedValue({ displayName: '新朋友' });
      mockFindOne.mockResolvedValue(null);
      mockUpsertChannel.mockResolvedValue({ account: '新朋友', token: 'U123' });

      await lineEventService.handleFollow(fakeEvent as webhook.FollowEvent);

      expect(mockFindOne).toHaveBeenCalledWith({ 'channels.token': 'U123', 'channels.enabled': true });
      expect(mockUpsertChannel).toHaveBeenCalledWith({
        account: '新朋友',
        token: 'U123',
        type: 'line',
        updateData: {
          name: '新朋友',
          isGroup: false,
          messageLevel: 'basic',
        },
      });
    });

    it('should skip if user already exists', async () => {
      const fakeEvent = {
        source: { type: 'user', userId: 'U123' },
      };

      mockFindOne.mockResolvedValue({ account: '已存在' });

      await lineEventService.handleFollow(fakeEvent as webhook.FollowEvent);

      expect(mockFindOne).toHaveBeenCalledWith({ 'channels.token': 'U123', 'channels.enabled': true });
    });
  });

  describe('handleUnfollow', () => {
    it('should disable pushKey when user unfollows', async () => {
      const fakeEvent = {
        source: { type: 'user', userId: 'U888' },
      };

      mockUpdateOne.mockResolvedValue({ acknowledged: true, modifiedCount: 1 });

      await lineEventService.handleUnfollow(fakeEvent as webhook.UnfollowEvent);

      expect(mockUpdateOne).toHaveBeenCalledWith(
        { 'channels.token': 'U888' },
        {
          $set: {
            'channels.$[elem].enabled': false,
          },
        },
        {
          arrayFilters: [
            {
              'elem.token': 'U888',
              'elem.type': 'line',
            },
          ],
        }
      );
    });

    it('should skip if source is missing', async () => {
      const fakeEvent = { source: null };

      await lineEventService.handleUnfollow(fakeEvent as unknown as webhook.UnfollowEvent);
    });
  });
});
