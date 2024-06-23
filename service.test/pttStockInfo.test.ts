import { isRePosts } from '../service/pttStockPostService'; // Replace with the correct path to your file
import { IPostInfo } from '../model/PostInfo';
import { parseId } from '../service/pttStockPostService';

describe('test utility', () => {
  it('shouild get id', async () => {
    var result = parseId('https://www.ptt.cc/bbs/Stock/M.1709040700.A.47E.html');
    expect(typeof result).toBe('number');
    expect(result).toEqual(1709040700);

    result = parseId('/bbs/Stock/M.1709040700.A.47E.html');
    expect(typeof result).toBe('number');
    expect(result).toEqual(1709040700);
  });

  it('should return true if post title contains "re:" as a separate word', () => {
    const post: IPostInfo = {
      id: 123,
      tag: '請益',
      title: 'Re:  關於大量未實現損益',
      href: '/bbs/Stock/M.1709218876.A.B93.html',
      author: 'cgagod',
      date: '2/29',
      batchNo: 1709220361794,
    };
    expect(isRePosts(post)).toBe(true);
  });

  it('should return false if post title not contains Re: ', () => {
    const post: IPostInfo = {
      id: 456,
      tag: '標的',
      title: 'NVDA尾盤5分鐘發生什麼事情',
      href: '/bbs/Stock/M.1709243920.A.902.html',
      author: 'wen17',
      date: '3/01',
      batchNo: 1709257208580,
    };

    expect(isRePosts(post)).toBe(false);
  });

  it('should not send re post', () => {
    const post: IPostInfo = {
      id: 123,
      tag: '標的',
      title: 'Re:  2880 華南金 多',
      href: '/bbs/Stock/M.1710472460.A.BDE.html',
      author: 'cgagod',
      date: '2/29',
      batchNo: 1709220361794,
    };
    var shouldSend = !isRePosts(post);
    expect(isRePosts(post)).toBe(true);
    expect(shouldSend).toBe(false);
  });
});

// jest.setTimeout(10000);
// describe('fetch post detail', () => {
//   it('shouild get post content as string', async () => {
//     var result = await fetchPostDetail('empty url');
//     expect(typeof result).toBe('string');
//   });

//   it('shouild get post content as string', async () => {
//     var result = await processSinglePostDetailToMessage('empty url');
//     console.log('prompt result', result);
//     await lineService.sendMessage(config.ADMIN_LINE_TOKEN, result);
//     expect(typeof result).toBe('string');
//   });
// });
