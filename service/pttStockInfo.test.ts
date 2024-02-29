import service from './pttStockInfo'; // Replace with the correct path to your file
import { IPostInfo } from '../model/PostInfo';

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
