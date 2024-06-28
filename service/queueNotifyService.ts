// import Queue from 'queue';

// import { AuthorModel, IAuthor } from '../model/Author';
// import { IPostInfo } from '../model/PostInfo';
// import { ILineToken, TokenLevel } from '../model/lineToken';
// import config from '../utility/config';
// import lineService from './lineService';
// import { prepareMessageByAI } from './notifyService';
// import { getStockNoFromTitle } from './pttAuthorService';
// import { PTT_DOMAIN, getNewPosts } from './pttStockPostService';

// const basicQueue = new Queue({ concurrency: 2, results: [] });
// const standardQueue = new Queue({ concurrency: 2, results: [] });
// const testQueue = new Queue({ concurrency: 1, results: [] });
// const notifyQueue = new Queue({ concurrency: 1, results: [] }); // Set concurrency to 1 for controlled dequeue

// interface GeneratedContent {
//   post: IPostInfo;
//   content: string;
//   level: TokenLevel;
//   isSubscribedAuthor: boolean;
// }

// async function getNewPostAndSendLineNotify() {
//   const newPosts = await getNewPosts();
//   if (newPosts && newPosts.length) {
//     const subscribeAuthors: IAuthor[] = await AuthorModel.find({}).lean();
//     const users = await getUsersForPost();
//     await mainProcess(newPosts, users, subscribeAuthors);
//   }
// }

// // 測試場景
// // 兩筆 newPosts, 一筆是 subscribe author, 一筆不是
// // 一筆 subscribeAuthors
// // 三筆 users, 第一位A 身份 test+standard, 第二位B只有 standard, 第三位C只有 basic

// // 驗證 sendNotification 被呼叫 六次
// // A 有一則test, 一則 standard
// // B 有兩則standard
// // C 有兩則 basic

// export async function mainProcess(newPosts: IPostInfo[], users: ILineToken[], subscribeAuthors: IAuthor[]) {
//   // 會先loop post 去產生推播訊息的內容, 然後訊息產生完會觸發 success event, event 裡面去 loop user,
//   // 然後往 notifyQueue 塞 task, notifyQueue 自己dequeue 觸發呼叫line 發通知

//   setupQueueListeners(users);
//   console.log(`Start processing newPosts, size: ${newPosts.length}`);
//   for (const post of newPosts) {
//     const authorInfo = subscribeAuthors.find((x) => x.name === post.author);
//     const isSubscribedAuthor = !!authorInfo;

//     basicQueue.push(() => generateContent(post, authorInfo, TokenLevel.Basic, isSubscribedAuthor));
//     standardQueue.push(() => generateContent(post, authorInfo, TokenLevel.Standard, isSubscribedAuthor));

//     if (isSubscribedAuthor) {
//       testQueue.push(() => generateContent(post, authorInfo, TokenLevel.Test, isSubscribedAuthor));
//     }
//   }

//   // Start processing all queues
//   basicQueue.start();
//   standardQueue.start();
//   testQueue.start();
//   notifyQueue.start();

//   // Wait for all content generation and notifications to complete
//   await Promise.all([
//     new Promise((resolve) => basicQueue.addEventListener('end', resolve)),
//     new Promise((resolve) => standardQueue.addEventListener('end', resolve)),
//     new Promise((resolve) => testQueue.addEventListener('end', resolve)),
//     new Promise((resolve) => notifyQueue.addEventListener('end', resolve)),
//   ]);

//   console.log('All processing completed');
// }

// function setupQueueListeners(users: ILineToken[]) {
//   const listener = (e: any) => {
//     const content: GeneratedContent = e.detail.result;
//     console.log(`Content generated for post ${content.post.id} at level ${content.level}`);
//     queueNotifications(content, users);
//   };

//   basicQueue.addEventListener('success', listener);
//   standardQueue.addEventListener('success', listener);
//   testQueue.addEventListener('success', listener);
// }

// function queueNotifications(content: GeneratedContent, users: ILineToken[]) {
//   for (const user of users) {
//     if (shouldSendNotification(user, content.level, content.isSubscribedAuthor)) {
//       notifyQueue.push(() => sendNotificationWithDelay(user, content.content));
//     }
//   }
// }

// async function generateContent(
//   post: IPostInfo,
//   authorInfo: IAuthor | undefined,
//   level: TokenLevel,
//   isSubscribedAuthor: boolean
// ): Promise<GeneratedContent> {
//   const notifyContent: string[] = [];
//   if (isSubscribedAuthor && post.tag === '標的') {
//     notifyContent.push(`【✨✨大神來囉✨✨】`);
//   }
//   notifyContent.push(`[${post.tag}] ${post.title}`);

//   let textContent = '';
//   switch (level) {
//     case TokenLevel.Basic:
//       textContent = generateBasicContent(post, notifyContent);
//     case TokenLevel.Standard:
//       textContent = generateStandardContent(post, authorInfo, notifyContent);
//     case TokenLevel.Test:
//       textContent = await generateTestContent(post);
//   }

//   return { post, content: textContent, level, isSubscribedAuthor };
// }

// function generateBasicContent(post: IPostInfo, notifyContent: string[]): string {
//   const baseContent = [...notifyContent];
//   baseContent.push(`作者: ${post.author}`);
//   baseContent.push(`${PTT_DOMAIN}/${post.href}`);
//   if (getStockNoFromTitle(post)) {
//     baseContent.push('');
//     baseContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
//   }
//   baseContent.push('');
//   return baseContent.join('\n');
// }

// function generateStandardContent(post: IPostInfo, authorInfo: IAuthor | undefined, notifyContent: string[]): string {
//   const standardContent = [...notifyContent];
//   standardContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
//   standardContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
//   standardContent.push('');
//   return standardContent.join('\n');
// }

// async function generateTestContent(post: IPostInfo): Promise<string> {
//   //TODO: mock a function to test
//   return await prepareMessageByAI(post.href as string);
// }

// function shouldSendNotification(user: ILineToken, level: TokenLevel, isSubscribedAuthor: boolean): boolean {
//   if (isSubscribedAuthor && user.tokenLevel.includes(TokenLevel.Test) && level === TokenLevel.Test) {
//     return true;
//   }
//   if (!isSubscribedAuthor && user.tokenLevel.includes(TokenLevel.Standard) && level === TokenLevel.Standard) {
//     return true;
//   }
//   if (user.tokenLevel.includes(TokenLevel.Basic) && level === TokenLevel.Basic) {
//     return true;
//   }
//   return false;
// }

// async function sendNotificationWithDelay(user: ILineToken, content: string) {
//   await new Promise((resolve) => setTimeout(resolve, 25)); // Wait for 25ms
//   await sendNotification(user, content);
// }

// async function sendNotification(user: ILineToken, content: string) {
//   //TODO: real send message await lineService.sendMessage(tokenInfo.token, message.standard);
//   console.log(`Sending notification to user ${user.channel}: ${content}`);
// }

// // Other helper functions remain unchanged...
// async function getUsersForPost(): Promise<ILineToken[]> {
//   const retrievedTokens = await lineService.getAllEnabledChannel();
//   if (retrievedTokens == null || retrievedTokens.length < 1) {
//     console.log('no available user');
//     return [];
//   }
//   return retrievedTokens;
// }
