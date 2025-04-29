import { NotifyContentGenerator, ContentType } from '../../service/business/notifyContentGenerator.v2';
import { IAuthor } from '../../model/Author';
import { IPostInfo } from '../../model/PostInfo';
import geminiAIService from '../../service/geminiAIService';
import stockPriceService from '../../service/stockPriceService';
import { FugleDataset } from '../../utility/fugleTypes';
import { FugleAPIBuilder } from '../../utility/fugleCaller';
import { fetchPostDetail } from '../../service/pttStockPostService';

jest.mock('../../service/geminiAIService', () => ({
  generateWithTunedModel: jest.fn(),
}));

jest.mock('../../service/stockPriceService', () => ({
  getStockPriceIntraday: jest.fn(),
  getStockPriceByDates: jest.fn(),
}));

jest.mock('../../service/pttStockPostService', () => ({
  fetchPostDetail: jest.fn(),
}));

jest.mock('../../utility/fugleCaller', () => ({
  FugleAPIBuilder: jest.fn().mockImplementation((dataset) => {
    return {
      setParam: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue(getMockResponse(dataset)),
    };
  }),
}));

// Helper function to mock response based on FugleDataset type
function getMockResponse(dataset: FugleDataset) {
  switch (dataset) {
    case FugleDataset.StockIntradayTicker:
      return { symbol: '2330', ticker: [{ price: 150, volume: 100 }] };
    case FugleDataset.StockIntradayQuote:
      return { symbol: '2330', price: 150, open: 148, high: 152, low: 147, close: 150, volume: 1000 };
    case FugleDataset.StockHistorical:
      return { symbol: '2330', candles: [{ date: '2023-01-01', open: 145, high: 150, close: 149 }] };
    default:
      throw new Error('Unsupported dataset');
  }
}

describe('NotifyContentGenerator', () => {
  const post: IPostInfo = {
    tag: '標的',
    title: '1 台積電2330漲停！散戶嗨翻：護盤有功',
    href: 'stock/M.1672225269.A.102',
    author: 'pttTestAuthor',
    date: '2023-10-04 23:54:09',
    batchNo: 12345,
    id: 123456,
  };

  const author: IAuthor = {
    name: 'pttTestAuthor',
    likes: 100,
    dislikes: 50,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate basic content', async () => {
    const generator = new NotifyContentGenerator(post, author);
    const result = await generator.getContent(ContentType.Basic);

    expect(result.content).toContain('台積電');
    expect(result.content).toContain('作者: pttTestAuthor');
    expect(result.contentType).toBe(ContentType.Basic);
  });

  it('should generate telegram content with stock info', async () => {
    // Set up the mock for the stock price
    (stockPriceService.getStockPriceIntraday as jest.Mock).mockResolvedValueOnce({
      lastPrice: 150,
      lastUpdated: 1730882379,
    });
    (geminiAIService.generateWithTunedModel as jest.Mock).mockResolvedValueOnce('台積電漲停 lol lol');

    (fetchPostDetail as jest.Mock).mockResolvedValueOnce('台積電漲停 yeeeee');

    const generator = new NotifyContentGenerator(post, author);
    const result = await generator.getContent(ContentType.Telegram);

    expect(result.content).toContain('台積電漲停');
    expect(result.options?.reply_markup?.inline_keyboard).toBeDefined();
    expect(result.contentType).toBe(ContentType.Telegram);
  });

  // it('should handle premium content generation with summary', async () => {
  //   // Mock geminiAIService response for post summary
  //   (geminiAIService.generateWithTunedModel as jest.Mock).mockResolvedValueOnce('This is a post summary.');

  //   const generator = new NotifyContentGenerator(post, author);
  //   const result = await generator.getContent(ContentType.Premium);

  //   expect(result.content).toContain('This is a post summary.');
  //   expect(result.contentType).toBe(ContentType.Premium);
  // });

  // it('should fetch and cache stock content only once per generator instance', async () => {
  //   const generator = new NotifyContentGenerator(post, author);

  //   // First call should trigger the stock data fetch
  //   await generator.getContent(ContentType.Standard);
  //   expect(FugleAPIBuilder).toHaveBeenCalledTimes(1);

  //   // Second call with the same generator should use cached data
  //   await generator.getContent(ContentType.Telegram);
  //   expect(FugleAPIBuilder).toHaveBeenCalledTimes(1); // Should still be 1, no additional calls
  // });
});
