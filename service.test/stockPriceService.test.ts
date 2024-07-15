import stockPriceService, { isCacheExpired } from '../service/stockPriceService';

jest.mock('../service/stockPriceService', () => ({
  ...jest.requireActual('../service/stockPriceService'),
  getStockPriceByDates: jest.fn(),
}));

describe('test fugle service', () => {
  it('get price by date ranges', async () => {
    const stockNo: string = '3163';
    const result = await stockPriceService.getStockPriceByDates(stockNo, '20230704', '20230829');
    expect(stockPriceService.getStockPriceByDates).toHaveBeenCalledWith(stockNo, '20230704', '20230829');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe('isCacheExpired', () => {
  // 辅助函数：创建特定时间的 Date 对象
  const createDate = (hour: number, minute: number = 0) => {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  };

  test('现在14点前，缓存14点前创建 => 有效', () => {
    const now = createDate(13, 59);
    const createdAt = createDate(13, 58);
    expect(isCacheExpired(now, createdAt)).toBe(false);
  });

  test('现在14点后，缓存14点前创建 => 失效', () => {
    const now = createDate(14, 1);
    const createdAt = createDate(13, 59);
    expect(isCacheExpired(now, createdAt)).toBe(true);
  });

  test('现在14点后，缓存14点后创建 => 有效', () => {
    const now = createDate(15);
    const createdAt = createDate(14, 1);
    expect(isCacheExpired(now, createdAt)).toBe(false);
  });

  test('缓存昨天创建，现在14点前 => 有效', () => {
    const now = createDate(13, 59);
    const createdAt = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 昨天同一时间
    expect(isCacheExpired(now, createdAt)).toBe(false);
  });

  test('缓存昨天创建，现在14点后 => 失效', () => {
    const now = createDate(14, 1);
    const createdAt = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 昨天同一时间
    expect(isCacheExpired(now, createdAt)).toBe(true);
  });
});

// describe('test call new fugle service', () => {
//   it('get price by date ranges', async () => {
//     const stockNo: string = '3163';
//     const result = await stockPriceService.getStockPriceIntraday(stockNo);
//     expect(result).not.toBeNull();
//   });
//   afterEach(() => {
//     jest.resetAllMocks();
//   });
// });
