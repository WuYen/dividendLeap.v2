import fugleService from '../service/fugleService';

jest.mock('../service/fugleService', () => ({
  getStockPriceByDates: jest.fn(),
}));

describe('test fugle service', () => {
  it('get price by date ranges', async () => {
    const stockNo: string = '3163';
    const result = await fugleService.getStockPriceByDates(stockNo, '20230704', '20230829');
    expect(fugleService.getStockPriceByDates).toHaveBeenCalledWith(stockNo, '20230704', '20230829');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
});
