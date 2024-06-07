import { AuthorModel, IAuthor } from '../model/Author';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import { LineTokenModel } from '../model/lineToken';

export async function addLikeToAuthor(authorId: string): Promise<IAuthor | null> {
  let authorInfo = await AuthorModel.findOne({ name: authorId }).exec();

  if (!authorInfo) {
    authorInfo = new AuthorModel({
      name: authorId,
      likes: 0,
      dislikes: 0,
    });
  }

  authorInfo.likes += 1;

  await authorInfo.save();

  return authorInfo.toObject();
}

export async function addFavoritePost(userId: string, postId: string): Promise<any> {
  // 更新用户的 favoritePosts
  const user = await LineTokenModel.findOne({ channel: userId });

  if (!userId || !user) {
    throw new Error('使用者不存在');
  }

  // 查找 PostInfo 的 ObjectId
  const post = await PostInfoModel.findOne({ id: postId });
  if (!post) {
    throw new Error('文章不存在');
  }

  user.favoritePosts.push(post._id);
  await user.save();
}

export async function getFavoritePosts(userId: string): Promise<any> {
  const rawData = await LineTokenModel.findOne({ channel: userId }).populate('favoritePosts', '-_id -__v').lean();
  return rawData?.favoritePosts as IPostInfo[];
}

export default { addLikeToAuthor };
