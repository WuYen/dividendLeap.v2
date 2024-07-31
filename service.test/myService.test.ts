import { toggleFavoritePost } from '../service/myService';
import { IFavoritePost, LineTokenModel } from '../model/lineToken';
import { PostInfoModel } from '../model/PostInfo';
import { Types } from 'mongoose';

jest.mock('../model/lineToken');
jest.mock('../model/PostInfo');

describe('toggleFavoritePost', () => {
  const mockUserId = 'mockUserId';
  const mockPostId = '11111111';
  let mockUser = {
    favoritePosts: [] as IFavoritePost[],
    save: jest.fn().mockResolvedValue(true),
  };
  const mockPost = {
    _id: '11111111',
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

    await expect(toggleFavoritePost(mockUserId, '789')).rejects.toThrow('文章不存在');
  });

  it('should add post to favoritePosts if it is not already in the list', async () => {
    (LineTokenModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (PostInfoModel.findOne as jest.Mock).mockResolvedValue(mockPost);

    const result = await toggleFavoritePost(mockUserId, '456');

    expect(mockUser.favoritePosts.map((x) => x.postId)).toContain(mockPost._id);
    expect(mockUser.save).toHaveBeenCalled();
    expect(result).not.toBeNull();
    expect(result?.postId).toEqual(mockPostId);
  });

  it('should remove post from favoritePosts if it is already in the list', async () => {
    var id = new Types.ObjectId(11111111);
    var mockPost = {
      _id: id,
      postId: id,
      dateAdded: new Date(),
    };
    mockUser.favoritePosts.push(mockPost);
    (LineTokenModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (PostInfoModel.findOne as jest.Mock).mockResolvedValue(mockPost);

    const result = await toggleFavoritePost(mockUserId, '456');

    expect(mockUser.favoritePosts).toHaveLength(0);
    expect(mockUser.save).toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
