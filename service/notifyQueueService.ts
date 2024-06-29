import Queue from "better-queue";
import config from "../utility/config";
import { IAuthor } from "../model/Author";
import { ILineToken, TokenLevel } from "../model/lineToken";
import { IPostInfo } from "../model/PostInfo";
import { prepareMessageByAI } from "./notifyService";
import { getStockNoFromTitle } from "./pttAuthorService";
import { PTT_DOMAIN } from "./pttStockPostService";

interface GeneratedContent {
  post: IPostInfo;
  content: string;
  level: TokenLevel;
  isSubscribedAuthor: boolean;
}

interface NotifyEnvelop {
  user: ILineToken;
  payload: GeneratedContent;
}

function generateBasicContent(post: IPostInfo, notifyContent: string[]): string {
  const baseContent = [...notifyContent];
  baseContent.push(`作者: ${post.author}`);
  baseContent.push(`${PTT_DOMAIN}/${post.href}`);
  if (getStockNoFromTitle(post)) {
    baseContent.push("");
    baseContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
  }
  baseContent.push("");
  return baseContent.join("\n");
}

function generateStandardContent(post: IPostInfo, authorInfo: IAuthor | undefined, notifyContent: string[]): string {
  const standardContent = [...notifyContent];
  standardContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ""}`);
  standardContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
  standardContent.push("");
  return standardContent.join("\n");
}

async function generateTestContent(post: IPostInfo): Promise<string> {
  //return await prepareMessageByAI(post.href as string);

  return new Promise((res, rej) => {
    setTimeout(() => {
      res("this is test for prepareMessageByAI content" + post.title);
    }, 8000);
  });
}

async function generateContent(
  post: IPostInfo,
  authorInfo: IAuthor | undefined,
  level: TokenLevel,
  isSubscribedAuthor: boolean
): Promise<GeneratedContent> {
  const notifyContent: string[] = [];
  if (isSubscribedAuthor && post.tag === "標的") {
    notifyContent.push(`【✨✨大神來囉✨✨】`);
  }
  notifyContent.push(`[${post.tag}] ${post.title}`);

  let textContent = "";
  switch (level) {
    case TokenLevel.Basic:
      textContent = generateBasicContent(post, notifyContent);
      break;
    case TokenLevel.Standard:
      textContent = generateStandardContent(post, authorInfo, notifyContent);
      break;
    case TokenLevel.Test:
      textContent = await generateTestContent(post);
      break;
  }

  return { post, content: textContent, level, isSubscribedAuthor };
}

// 創建隊列
const notifyQueue = new Queue(
  async (job: NotifyEnvelop, done: Function) => {
    try {
      console.log(`Sending notification ${job.payload.content} to ${job.user.channel}`);
      await new Promise((resolve) => setTimeout(resolve, 25)); // Wait for 25ms
      console.log(`Finish notifyQueue job \n`);
      done(null, job);
    } catch (error) {
      console.error(`Error processing notifyQueue job`, error);
      done(error);
    }
  },
  { afterProcessDelay: 25 }
);

const testQueue = new Queue(async (job: any, done: Function) => {
  try {
    const { post, authorInfo, level, isSubscribedAuthor, users } = job;
    const result = await generateContent(post, authorInfo, level, isSubscribedAuthor);
    console.log(`Finish testQueue job ${post.title}\n`);
    done(null, { users, content: result });
  } catch (error) {
    console.error(`Error testQueue job ${job.id}:`, error);
    done(error);
  }
});

// 監聽完成和失敗事件
testQueue.on("task_finish", (taskId: number, result: any) => {
  const { users, content } = result;
  for (const tokenInfo of users as ILineToken[]) {
    console.log(`=> add ${tokenInfo.channel} ${tokenInfo.tokenLevel.join(",")} to notifyQueue`);
    notifyQueue.push({ user: tokenInfo, payload: content });
  }
});

testQueue.on("task_failed", (taskId: number, error: Error) => {
  console.error(`Job ${taskId} failed with error: ${error}`);
});

export async function mainProcess(
  newPosts: IPostInfo[],
  users: ILineToken[],
  subscribeAuthors: IAuthor[]
): Promise<void> {
  for (const post of newPosts) {
    try {
      const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
      const isSubscribedAuthor = !!authorInfo;
      const basicContent = await generateContent(post, authorInfo, TokenLevel.Basic, isSubscribedAuthor);
      const standardContent = await generateContent(post, authorInfo, TokenLevel.Standard, isSubscribedAuthor);
      const delayNotifyUsers = [];

      for (const tokenInfo of users) {
        if (isSubscribedAuthor && tokenInfo.tokenLevel.includes(TokenLevel.Test)) {
          delayNotifyUsers.push(tokenInfo);
        } else {
          console.log(`=> add ${tokenInfo.channel} ${tokenInfo.tokenLevel.join(",")} to notifyQueue`);
          notifyQueue.push({
            user: tokenInfo,
            payload: tokenInfo.tokenLevel.includes(TokenLevel.Standard) ? standardContent : basicContent,
          });
        }
      }

      if (isSubscribedAuthor) {
        console.log("=> add job to testQueue " + post.id);
        testQueue.push({ post, authorInfo, level: TokenLevel.Test, isSubscribedAuthor, users: delayNotifyUsers });
      }
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error);
    }
  }
}

(async () => {
  // Mock data
  const newPosts: IPostInfo[] = [
    {
      tag: "stock",
      title: "1 台積電漲停！散戶嗨翻：護盤有功",
      href: "stock/M.1672225269.A.102",
      author: "pttTestAuthor",
      date: "2023-10-04 23:54:09",
      batchNo: 12345,
      id: 123456,
    },
    {
      tag: "stock",
      title: "2 鴻海大跌！郭台銘：護盤沒用，要靠自身努力",
      href: "stock/M.1672225269.A.103",
      author: "anotherAuthor",
      date: "2023-10-04 23:55:09",
      batchNo: 12346,
      id: 123457,
    },
  ];

  const subscribeAuthors: IAuthor[] = [
    {
      name: "pttTestAuthor",
      likes: 100,
      dislikes: 50,
    },
  ];

  const users: ILineToken[] = [
    {
      channel: "A-TEST+STAND",
      token: "myToken1",
      updateDate: "2023-10-05 00:00:00",
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Test, TokenLevel.Standard],
      favoritePosts: [],
    },
    {
      channel: "B-STAND",
      token: "myToken2",
      updateDate: "2023-10-05 00:00:00",
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Standard],
      favoritePosts: [],
    },
    {
      channel: "C-BASIC",
      token: "myToken3",
      updateDate: "2023-10-05 00:00:00",
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Basic],
      favoritePosts: [],
    },
  ];

  await mainProcess(newPosts, users, subscribeAuthors);
  return;
})();
