import service from './pttStockInfo'; // Replace with the correct path to your file
import { IPostInfo } from '../model/PostInfo';
import { fastFindNewPosts, parseId } from './pttStockInfo';

describe('isHighlightAuthor', () => {
  // Test cases
  test('Highlight author is recognized', () => {
    const highlightAuthor: string = 'agogo1202';
    expect(service.isHighlightAuthor(highlightAuthor)).toBe(true);
  });

  test('Non-highlight author is not recognized', () => {
    const nonHighlightAuthor: string = 'JohnDoe';
    expect(service.isHighlightAuthor(nonHighlightAuthor)).toBe(false);
  });

  test('Null author is not recognized', () => {
    const nullAuthor: string | null = null;
    expect(service.isHighlightAuthor(nullAuthor)).toBe(false);
  });
});

describe('test utility', () => {
  it('shouild get id', async () => {
    var result = parseId('https://www.ptt.cc/bbs/Stock/M.1709040700.A.47E.html');
    expect(typeof result).toBe('number');
    expect(result).toEqual(1709040700);

    result = parseId('/bbs/Stock/M.1709040700.A.47E.html');
    expect(typeof result).toBe('number');
    expect(result).toEqual(1709040700);
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

    const result = service.processMessage(savedPosts);

    expect(result.includes('[閒聊] Sample Title')).toBeTruthy();
    expect(result.includes('[標的] gogoggo')).toBeTruthy();
    expect(result.includes('[閒聊] 2024/02/20 盤後閒聊')).toBeFalsy();
    expect(result.includes('[新聞] 美股「融漲」紅燈亮了？這指標逼近達康泡')).toBeFalsy();
  });

  test('should return an empty array when savedPosts is null', () => {
    const savedPosts: IPostInfo[] | null = null;

    const result = service.processMessage(savedPosts);

    expect(result.length).toEqual(2);
  });

  // Add more tests as needed
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
