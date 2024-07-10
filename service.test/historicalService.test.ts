import { IPostInfo } from '../model/PostInfo';
import stockPriceService, { HistoricalDataInfo } from '../service/stockPriceService';
import {
  processHistoricalInfo,
  getDateRangeBaseOnPostedDate,
  PostHistoricalResponse,
  DiffType,
  getHighestPointInfo,
  getLatestPointInfo,
  getBasePointInfo,
} from '../service/historicalService';

jest.mock('../utility/requestCore', () => ({
  getHTML: jest.fn(),
}));

jest.mock('../service/stockPriceService', () => ({
  getStockPriceByDates: jest.fn(),
}));

describe('測試 processHistoricalInfo non recent post', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('測試呼叫fugle api 基於發文日 四個月內股價資訊', async () => {
    const stockNo: string = '3163';
    const mockPost = { id: 1688428800, title: 'Stock 3163', tag: '標的', batchNo: 1625097600 } as IPostInfo;
    await processHistoricalInfo(mockPost);
    expect(stockPriceService.getStockPriceByDates).toHaveBeenCalledWith(stockNo, '20230704', '20231104');
  });

  it('基準/高點/最新 都有資料', async () => {
    const getStockPriceByDatesMock = jest.requireMock('../service/stockPriceService').getStockPriceByDates;
    getStockPriceByDatesMock.mockResolvedValue({
      symbol: '3163',
      type: 'EQUITY',
      exchange: 'TPEx',
      market: 'OTC',
      timeframe: 'D',
      data: [
        {
          date: '2023-08-29',
          open: 94.2,
          high: 96.8,
          low: 93.8,
          close: 94,
          volume: 13563045,
        },
        {
          date: '2023-08-28',
          open: 96.6,
          high: 97.5,
          low: 93,
          close: 93.2,
          volume: 14013633,
        },
        {
          date: '2023-08-15',
          open: 88.9,
          high: 93.7,
          low: 87.2,
          close: 92.4,
          volume: 27913219,
        },
        {
          date: '2023-08-01',
          open: 100.5,
          high: 108,
          low: 89.6,
          close: 92.4,
          volume: 55049400,
        },
        {
          date: '2023-07-18',
          open: 82.7,
          high: 86.5,
          low: 74,
          close: 74.5,
          volume: 31469421,
        },
        {
          date: '2023-07-05',
          open: 68.7,
          high: 74,
          low: 68.4,
          close: 72.6,
          volume: 30398613,
        },
        {
          date: '2023-07-04',
          open: 61.7,
          high: 67.7,
          low: 61.6,
          close: 67.7,
          volume: 16286475,
        },
      ],
    });
    const mockPost = { id: 1688428800, title: 'Stock 3163', tag: '標的', batchNo: 1625097600 } as IPostInfo;
    const result: PostHistoricalResponse = await processHistoricalInfo(mockPost);
    expect(result.stockNo).toEqual('3163');
    expect(result.historicalInfo.length).toBeGreaterThan(0);
    expect(result.processedData.length).toEqual(3);

    const base = result.processedData.find((x) => x.type === DiffType.BASE);
    expect(base).toBeDefined();
    const highest = result.processedData.find((x) => x.type === DiffType.HIGHEST);
    expect(highest).toBeDefined();
    const latest = result.processedData.find((x) => x.type === DiffType.LATEST);
    expect(latest).toBeDefined();
  });
});

describe('基準/高點/最新 計算', () => {
  // Test case
  it('正常找到最高點', async () => {
    // Mock data
    const testData: HistoricalDataInfo[] = [
      { date: '20220101', open: 100, high: 120, low: 90, close: 110, volume: 10000, turnover: 100000, change: 0 },
      { date: '20220102', open: 110, high: 130, low: 100, close: 120, volume: 12000, turnover: 120000, change: 0 },
      { date: '20220103', open: 120, high: 140, low: 110, close: 130, volume: 14000, turnover: 140000, change: 0 },
    ];

    const highestPoint = await getHighestPointInfo(testData, 110);
    expect(highestPoint.price).toEqual(130);
    expect(highestPoint.diff).toEqual(20);
    expect(highestPoint.type).toEqual(DiffType.HIGHEST);
  });

  it('發文過後股價一路下跌', async () => {
    // Mock data
    const testData: HistoricalDataInfo[] = [
      { date: '20220101', open: 100, high: 120, low: 90, close: 130, volume: 10000, turnover: 100000, change: 0 },
      { date: '20220102', open: 110, high: 130, low: 100, close: 120, volume: 12000, turnover: 120000, change: 0 },
      { date: '20220103', open: 120, high: 140, low: 110, close: 110, volume: 14000, turnover: 140000, change: 0 },
    ];

    const highestPoint = await getHighestPointInfo(testData, 130);
    expect(highestPoint.price).toEqual(130);
    expect(highestPoint.diff).toEqual(0);
    expect(highestPoint.type).toEqual(DiffType.HIGHEST);
  });

  it('找到最新', async () => {
    // Mock data
    const testData: HistoricalDataInfo[] = [
      { date: '20220101', open: 100, high: 120, low: 90, close: 130, volume: 10000, turnover: 100000, change: 0 },
      { date: '20220102', open: 110, high: 130, low: 100, close: 120, volume: 12000, turnover: 120000, change: 0 },
      { date: '20220103', open: 120, high: 140, low: 110, close: 110, volume: 14000, turnover: 140000, change: 0 },
    ];

    const latest = await getLatestPointInfo(testData, 130);
    expect(latest.price).toEqual(110);
    expect(latest.diff).toEqual(-20);
    expect(latest.date).toEqual('20220103');
    expect(latest.type).toEqual(DiffType.LATEST);
  });

  it('找到基準', async () => {
    // Mock data
    const testData: HistoricalDataInfo[] = [
      { date: '20230701', open: 100, high: 120, low: 90, close: 130, volume: 10000, turnover: 100000, change: 0 },
      { date: '20230702', open: 110, high: 130, low: 100, close: 120, volume: 12000, turnover: 120000, change: 0 },
      { date: '20230703', open: 120, high: 140, low: 110, close: 110, volume: 14000, turnover: 140000, change: 0 },
    ];
    const postDate = new Date('2023-07-01');

    const base = await getBasePointInfo(testData, postDate, false);
    expect(base.date).toEqual('20230701');
    expect(base.type).toEqual(DiffType.BASE);
  });

  it('找到基準-最近一個交易日', async () => {
    // Mock data
    const testData: HistoricalDataInfo[] = [
      { date: '20230701', open: 100, high: 120, low: 90, close: 130, volume: 10000, turnover: 100000, change: 0 },
      { date: '20230702', open: 110, high: 130, low: 100, close: 120, volume: 12000, turnover: 120000, change: 0 },
      { date: '20230703', open: 120, high: 140, low: 110, close: 110, volume: 14000, turnover: 140000, change: 0 },
    ];
    const postDate = new Date('2023-07-04');

    const base = await getBasePointInfo(testData, postDate, true);
    expect(base.date).toEqual('20230703');
    expect(base.type).toEqual(DiffType.BASE);
  });
});

describe('get date range recent post and non-recent post', () => {
  it('target date is in the future, end date 抓今天', () => {
    const timestamp = 1637140800; // 2021年11月17日
    const today = new Date('2021-12-25');
    const result = getDateRangeBaseOnPostedDate(new Date(timestamp * 1000), today);
    expect(result).toEqual(['20211117', '20211225']);
  });

  it('target date is in the past, end date 抓發文日後四個月', () => {
    const timestamp = 1637140800; // 2021年11月17日
    const today = new Date('2022-10-01');
    const result = getDateRangeBaseOnPostedDate(new Date(timestamp * 1000), today);
    expect(result).toEqual(['20211117', '20220317']); // Adjust expected values based on your implementation
  });

  it('近一周post, 發文日往前抓一週(避免週末沒資料)', () => {
    const timestamp = 1633046400; // 2021年10月01日
    const today = new Date('2021-10-01');
    const result = getDateRangeBaseOnPostedDate(new Date(timestamp * 1000), today);
    expect(result).toEqual(['20210924', '20211001']); // Adjust expected values based on your implementation
  });
});
