import stockPriceService from '../service/stockPriceService';

jest.mock('../service/stockPriceService', () => ({
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
