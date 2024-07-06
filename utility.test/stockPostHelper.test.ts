import { IPostInfo } from '../model/PostInfo';
import { getStockNoFromTitle, isRePosts, parseId } from '../utility/stockPostHelper';

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

it('Figure out stockNo from title', async () => {
  const rawPosts: IPostInfo[] = [
    {
      tag: '標的',
      title: '3450聯鈞 光通多',
      href: '/bbs/Stock/M.1708494416.A.203.html',
      author: 'WADE0616',
      date: '2/21',
      id: 1708494416,
      batchNo: 0,
    },
    {
      tag: '標的',
      title: '6789采鈺',
      href: '/bbs/Stock/M.1706854985.A.CDD.html',
      author: 'WADE0616',
      date: '2/02',
      id: 1706854985,
      batchNo: 0,
    },
    {
      tag: '標的',
      title: '3036文曄',
      href: '/bbs/Stock/M.1695810630.A.248.html',
      author: 'WADE0616',
      date: '9/27',
      id: 1695810630,
      batchNo: 0,
    },
    {
      tag: '標的',
      title: '6472 保瑞 除權多 長投賺爛',
      href: '/bbs/Stock/M.1691327482.A.186.html',
      author: 'WADE0616',
      date: '8/06',
      id: 1691327482,
      batchNo: 0,
    },
    {
      tag: '標的',
      title: '3163 波若威 被刪文多',
      href: '/bbs/Stock/M.1688452709.A.7B4.html',
      author: 'WADE0616',
      date: '7/04',
      id: 1688452709,
      batchNo: 0,
    },
  ];
  const expectStockNo: String[] = ['3450', '6789', '3036', '6472', '3163'];
  const actualStockNo = rawPosts.map((post) => getStockNoFromTitle(post));

  expect(actualStockNo).toHaveLength(expectStockNo.length);
  actualStockNo.forEach((stockNo) => {
    expect(expectStockNo).toContain(stockNo);
  });
});
