import { IPostInfo } from '../model/PostInfo';
import { getPriceForPosts, groupData } from '../service/postTrendService';
import { getPriceInfoByDates } from '../service/pttAuthorService';

jest.mock('../service/pttAuthorService', () => ({
  ...jest.requireActual('../service/pttAuthorService'),
  getPriceInfoByDates: jest.fn(),
}));

describe('getPriceForPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate performance for posts correctly', async () => {
    const mockPosts = [
      { id: 1625097600, title: 'Stock 1234', tag: '標的', batchNo: 1625097600 },
      { id: 1627776000, title: 'Another post', tag: '標的', batchNo: 1627776000 },
    ] as IPostInfo[];

    const mockPriceInfo = [
      { date: '2021-07-01', open: 100, high: 110, low: 95, close: 105 },
      { date: '2021-07-02', open: 105, high: 115, low: 100, close: 110 },
    ];

    (getPriceInfoByDates as jest.Mock).mockResolvedValue({
      stockNo: '1234',
      processedData: [],
      historicalInfo: mockPriceInfo,
    });

    const result = await getPriceForPosts(mockPosts);

    expect(result).toHaveLength(1); // Only one post has a valid stock number
    expect(result[0].performance).toEqual({
      highestPrice: 115,
      priceDiff: 15,
      priceRate: 15,
    });
    expect(getPriceInfoByDates).toHaveBeenCalledTimes(1);
  });
});

describe('groupData', () => {
  it('should group posts correctly based on their date', () => {
    const today = new Date('2021-08-01');
    // jest.spyOn(global, 'Date').mockImplementation(() => today as any);

    const mockPosts = [
      { id: 1627776000, performance: {} }, // 2021-08-01, lastMonth
      { id: 1625097600, performance: {} }, // 2021-07-01, twoMonthsAgo
      { id: 1622505600, performance: {} }, // 2021-06-01, threeMonthsAgo
      { id: 1619827200, performance: {} }, // 2021-05-01, fourMonthsAgo
    ];

    const result = groupData(today, mockPosts as any);

    expect(result.lastMonth).toHaveLength(1);
    expect(result.twoMonthsAgo).toHaveLength(1);
    expect(result.threeMonthsAgo).toHaveLength(1);
    expect(result.fourMonthsAgo).toHaveLength(1);

    expect(result.lastMonth[0].id).toBe(1627776000);
    expect(result.twoMonthsAgo[0].id).toBe(1625097600);
    expect(result.threeMonthsAgo[0].id).toBe(1622505600);
    expect(result.fourMonthsAgo[0].id).toBe(1619827200);
  });
});
