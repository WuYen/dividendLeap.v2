import { IUserSetting } from '../model/UserSetting';
import { MessageChannel, NotifyEnvelope } from '../type/notify';
import { ContentType, NotifyContentGenerator } from './business/notifyContentGenerator.v2';
import { postQueue } from './queue/postQueue';
import { matchContentType } from './business/contentRuleTable';
import { isValidStockPostForNotify, isRePosts } from '../utility/stockPostHelper';
import { IAuthor } from '../model/Author';
import { IPostInfo } from '../model/PostInfo';

/**
 * 處理新貼文並根據 UserSetting 推播通知（使用 ContentRuleTable 決定通知類型）
 *
 * @param newPosts - 新抓到的文章清單
 * @param userSettings - 從 DB 撈出的所有使用者設定（包含關鍵字、推播設定等）
 * @param subscribeAuthors - 有被訂閱的作者列表（用來判斷 Premium 條件）
 */
export async function processPostAndSendNotifyFromUserSetting(
  newPosts: IPostInfo[],
  userSettings: IUserSetting[],
  subscribeAuthors: IAuthor[]
): Promise<void> {
  for (const post of newPosts) {
    try {
      // 判斷這篇文章的作者有沒有被訂閱
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      const isSubscribedAuthor = !!authorInfo;
      const isRepost = isRePosts(post); // 是否是轉貼文

      // 建立內容生成器（會用來產出不同 ContentType 對應的推播內容）
      const contentGenerator = new NotifyContentGenerator(post, authorInfo || null);

      // 通知使用者 Map（key 是 ContentType，value 是該類型要通知的使用者列表）
      const notifyUsers = new Map<ContentType, NotifyEnvelope[]>();

      // 遍歷每個使用者設定，判斷是否該通知、以及通知哪種內容
      for (const user of userSettings) {
        // 文章標題有包含使用者設定的關鍵字
        const keywordMatch = user.keywords?.some((k) => post.title.includes(k)) ?? false;

        // 是否這篇貼文符合通知條件（標的 + 被訂閱作者 or 關鍵字命中）
        const shouldNotify =
          (post.tag === '標的' && (isValidStockPostForNotify(post) || isSubscribedAuthor)) || keywordMatch;

        if (!shouldNotify) continue;

        for (const { type: channel, enabled, token, messageLevel } of user.channels) {
          // 該 channel 沒開啟就跳過
          if (!enabled) continue;

          // 查表決定該用哪種 ContentType（根據 post 屬性 + 訂閱狀態 + 等級）
          const contentType = matchContentType(channel, post.tag as string, isSubscribedAuthor, isRepost, messageLevel);
          if (!contentType) continue;

          // 包裝通知信封（不帶 content，之後 postQueue 會補上）
          const envelop = {
            token,
            channel,
          } as NotifyEnvelope;

          // 塞進對應 ContentType 的 bucket
          if (!notifyUsers.has(contentType)) notifyUsers.set(contentType, []);
          notifyUsers.get(contentType)!.push(envelop);
        }
      }

      // 把每種 ContentType 的通知推進 postQueue，統一生成內容並觸發通知
      for (const [contentType, users] of notifyUsers.entries()) {
        postQueue.push({ contentGenerator, type: contentType, users });
      }
    } catch (err) {
      console.error(`Error processing post ${post.id}`, err);
    }
  }
}
