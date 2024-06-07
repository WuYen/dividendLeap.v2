import { AuthorModel, IAuthor } from '../model/Author';
import { LineTokenModel } from '../model/lineToken';

async function addLikeToAuthor(authorId: string): Promise<IAuthor | null> {
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

  return authorInfo;
}

async function toggleWatchPost(postId: string): Promise<any> {
  // 找到訂閱的人
  // 更新訂閱內容
  // 回傳更新後的清單
}

export default {};
