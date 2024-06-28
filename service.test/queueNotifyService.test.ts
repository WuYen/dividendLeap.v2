// import { IAuthor } from '../model/Author';
// import { IPostInfo } from '../model/PostInfo';
// import { ILineToken, TokenLevel } from '../model/lineToken';
// import { mainProcess } from '../service/queueNotifyService';

// describe('test send notify with queue', () => {
//   // Mock data
//   const newPosts: IPostInfo[] = [
//     {
//       tag: 'stock',
//       title: '台積電漲停！散戶嗨翻：護盤有功',
//       href: 'https://www.ptt.cc/stock/M.1672225269.A.102',
//       author: 'pttTestAuthor',
//       date: '2023-10-04 23:54:09',
//       batchNo: 12345,
//       id: 123456,
//     },
//     {
//       tag: 'stock',
//       title: '鴻海大跌！郭台銘：護盤沒用，要靠自身努力',
//       href: 'https://www.ptt.cc/stock/M.1672225269.A.103',
//       author: 'anotherAuthor',
//       date: '2023-10-04 23:55:09',
//       batchNo: 12346,
//       id: 123457,
//     },
//   ];

//   const subscribeAuthors: IAuthor[] = [
//     {
//       name: 'pttTestAuthor',
//       likes: 100,
//       dislikes: 50,
//     },
//   ];

//   const users: ILineToken[] = [
//     {
//       channel: 'C123456789',
//       token: 'myToken1',
//       updateDate: '2023-10-05 00:00:00',
//       notifyEnabled: true,
//       tokenLevel: [TokenLevel.Test, TokenLevel.Standard],
//       favoritePosts: [],
//     },
//     {
//       channel: 'C987654321',
//       token: 'myToken2',
//       updateDate: '2023-10-05 00:00:00',
//       notifyEnabled: true,
//       tokenLevel: [TokenLevel.Standard],
//       favoritePosts: [],
//     },
//     {
//       channel: 'C012345678',
//       token: 'myToken3',
//       updateDate: '2023-10-05 00:00:00',
//       notifyEnabled: true,
//       tokenLevel: [TokenLevel.Basic],
//       favoritePosts: [],
//     },
//   ];

//   it('should word', async () => {
//     await mainProcess(newPosts, users, subscribeAuthors);
//   });
// });
