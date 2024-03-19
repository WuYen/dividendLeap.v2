import service, { isRePosts } from './pttStockInfo'; // Replace with the correct path to your file
import { IPostInfo } from '../model/PostInfo';
import { fastFindNewPosts, parseId, processSinglePostToMessage } from './pttStockInfo';

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

describe('processMessage', () => {
  test('should return an array with PTT Alert message when there are saved posts', () => {
    var savedPosts: IPostInfo[] = [
      {
        tag: '閒聊',
        title: 'Sample Title',
        href: 'sample-href',
        author: 'agogo1202',
        date: '2022-01-01',
        id: 123,
        batchNo: 4444,
      },
      {
        tag: '標的',
        title: 'gogoggo',
        href: 'sample-href',
        author: 'noman',
        date: '2022-01-01',
        id: 234,
        batchNo: 4444,
      },
      {
        tag: '閒聊',
        title: '2024/02/20 盤後閒聊',
        href: '/bbs/Stock/M.1708408802.A.B9B.html',
        author: 'vendan5566',
        date: '2/20',
        id: 3321,
        batchNo: 4444,
      },
      {
        tag: '新聞',
        title: '美股「融漲」紅燈亮了？這指標逼近達康泡',
        href: '/bbs/Stock/M.1708443435.A.7D5.html',
        author: 'Cartier',
        date: '2/20',
        id: 5315,
        batchNo: 4444,
      },
    ];

    var result = [];
    for (let index = 0; index < savedPosts.length; index++) {
      const post = savedPosts[index];
      var message = processSinglePostToMessage(post, false);
      result.push(message);
    }

    expect(result[0].includes('[閒聊] Sample Title')).toBeTruthy();
    expect(result[1].includes('[標的] gogoggo')).toBeTruthy();
    expect(result[2].includes('[閒聊] 2024/02/20 盤後閒聊')).toBeTruthy();
    expect(result[3].includes('[新聞] 美股「融漲」紅燈亮了？這指標逼近達康泡')).toBeTruthy();
  });
});

const deletedPost = `<div class="r-ent">
<div class="nrec"></div>
<div class="title">

  (本文已被刪除) [kcbug123]

</div>
<div class="meta">
  <div class="author">-</div>
  <div class="article-menu">
    
  </div>
  <div class="date"> 3/01</div>
  <div class="mark"></div>
</div>
</div>`;

describe('fastFindNewArticles', () => {
  it('should find new articles', () => {
    // Sample input for onlineArticles
    const onlineArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 2,
        id: 1,
      },
      {
        tag: 'Technology',
        title: 'Article 2',
        href: '/article/2',
        author: 'Jane Smith',
        date: '2022-01-02',
        batchNo: 2,
        id: 2,
      },
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ];

    // Sample input for savedArticles
    const savedArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 1,
        id: 1,
      },
      {
        tag: 'Technology',
        title: 'Article 2',
        href: '/article/2',
        author: 'Jane Smith',
        date: '2022-01-02',
        batchNo: 1,
        id: 2,
      },
    ];

    // Call the function with sample input
    const newArticles = fastFindNewPosts(onlineArticles, savedArticles);

    // Assert the result
    expect(newArticles).toEqual([
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ]);
  });

  it('handle delete articles', () => {
    // Sample input for onlineArticles
    const onlineArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 2,
        id: 1,
      },
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ];

    // Sample input for savedArticles
    const savedArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 1,
        id: 1,
      },
      {
        tag: 'Technology',
        title: 'Article 2',
        href: '/article/2',
        author: 'Jane Smith',
        date: '2022-01-02',
        batchNo: 1,
        id: 2,
      },
    ];

    // Call the function with sample input
    const newArticles = fastFindNewPosts(onlineArticles, savedArticles);

    // Assert the result
    expect(newArticles).toEqual([
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ]);
  });
});
