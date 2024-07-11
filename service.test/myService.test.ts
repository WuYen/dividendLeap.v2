import { toggleFavoritePost } from '../service/myService';
import { LineTokenModel } from '../model/lineToken';
import { PostInfoModel } from '../model/PostInfo';

jest.mock('../model/lineToken');
jest.mock('../model/PostInfo');

describe('toggleFavoritePost', () => {
  const mockUserId = 'mockUserId';
  const mockPostId = 'mockPostId';
  let mockUser = {
    favoritePosts: [] as string[],
    save: jest.fn().mockResolvedValue(true),
  };
  const mockPost = {
    _id: 'mockPostObjectId',
    id: 456,
    tag: '標的',
    title: 'NVDA尾盤5分鐘發生什麼事情',
    href: '/bbs/Stock/M.1709243920.A.902.html',
    author: 'wen17',
    date: '3/01',
    batchNo: 1709257208580,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = {
      favoritePosts: [],
      save: jest.fn().mockResolvedValue(true),
    };
  });

  it('should throw an error if user does not exist', async () => {
    (LineTokenModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(toggleFavoritePost(mockUserId, mockPostId)).rejects.toThrow('使用者不存在');
  });

  it('should throw an error if post does not exist', async () => {
    (LineTokenModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (PostInfoModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(toggleFavoritePost(mockUserId, mockPostId)).rejects.toThrow('文章不存在');
  });

  it('should add post to favoritePosts if it is not already in the list', async () => {
    (LineTokenModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (PostInfoModel.findOne as jest.Mock).mockResolvedValue(mockPost);

    await toggleFavoritePost(mockUserId, mockPostId);

    expect(mockUser.favoritePosts).toContain(mockPost._id);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('should remove post from favoritePosts if it is already in the list', async () => {
    mockUser.favoritePosts.push(mockPost._id);
    (LineTokenModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (PostInfoModel.findOne as jest.Mock).mockResolvedValue(mockPost);

    await toggleFavoritePost(mockUserId, mockPostId);

    expect(mockUser.favoritePosts).toHaveLength(0);
    expect(mockUser.save).toHaveBeenCalled();
  });
});
