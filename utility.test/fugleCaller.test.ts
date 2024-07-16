import { FugleAPIBuilder } from '../utility/fugleCaller';
import { FugleDataset } from '../utility/fugleTypes';
import axios from 'axios';

// 模擬 config 模塊
jest.mock('../utility/config', () => ({
  FUGLE_API_KEY: 'test-api-key',
}));

// 模擬 axios
jest.mock('axios');

describe('FugleAPIBuilder', () => {
  beforeEach(() => {
    // 在每個測試之前重置所有的 mock
    jest.clearAllMocks();
  });

  it('should correctly build URL for StockHistorical dataset', async () => {
    const builder = new FugleAPIBuilder(FugleDataset.StockHistorical);
    builder.setParam({
      symbol: '2330',
      from: '2023-01-01',
      to: '2023-01-31',
      fields: ['open', 'close'],
    });

    const expectedUrl =
      'https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/2330?fields=open,close&from=2023-01-01&to=2023-01-31';

    // 模擬 axios.get 的返回值
    (axios.get as jest.Mock).mockResolvedValue({
      data: { someData: 'test data' },
    });

    await builder.get();

    // 驗證 axios.get 被正確調用
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, {
      headers: {
        'X-API-KEY': 'test-api-key',
      },
    });
  });

  it('should correctly build URL for StockIntradayQuote dataset', async () => {
    const builder = new FugleAPIBuilder(FugleDataset.StockIntradayQuote);
    builder.setParam({
      symbol: '2330',
    });

    const expectedUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/intraday/quote/2330';

    // 模擬 axios.get 的返回值
    (axios.get as jest.Mock).mockResolvedValue({
      data: { someData: 'test data' },
    });

    await builder.get();

    // 驗證 axios.get 被正確調用
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, {
      headers: {
        'X-API-KEY': 'test-api-key',
      },
    });
  });

  it('should return correct URL when calling getURL()', () => {
    const builder = new FugleAPIBuilder(FugleDataset.StockHistorical);
    builder.setParam({
      symbol: '2330',
      from: '2023-01-01',
      to: '2023-01-31',
      fields: ['open', 'close'],
    });

    const expectedUrl =
      'https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/2330?fields=open,close&from=2023-01-01&to=2023-01-31';
    expect(builder.getURL()).toBe(expectedUrl);
  });
});
