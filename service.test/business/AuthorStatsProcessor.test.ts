import { AuthorStatsProcessor, processRankingAndSaveToDB } from '../../service/business/AuthorStatsProcessor';
import { getPostsWithInDays } from '../../service/pttStockPostService';
import { isValidStockPost } from '../../utility/stockPostHelper';
import { DiffType, PostHistoricalResponse, processHistoricalInfo } from '../../service/historicalService';
import { AuthorModel } from '../../model/Author';
import { AuthorStatsModel } from '../../model/AuthorStats';
import { IPostInfo } from '../../model/PostInfo';

// Mock dependencies
jest.mock('../../service/pttStockPostService');
jest.mock('../../service/historicalService');
jest.mock('../../utility/stockPostHelper');
jest.mock('../../model/Author');
jest.mock('../../model/AuthorStats');
jest.setTimeout(10000);

describe('AuthorStatsProcessor', () => {
  let processor: AuthorStatsProcessor;

  beforeEach(() => {
    processor = new AuthorStatsProcessor();
    jest.clearAllMocks();
  });

  describe('newProcessAndUpdateAuthorStats', () => {
    it('should queue posts and start processing', async () => {
      // Mock the data returned from getPostsWithInDays
      const mockPosts: IPostInfo[] = [
        {
          title: 'Test Post 1',
          author: 'Author1',
          id: 123,
          href: '/test/123',
          date: '2/21',
          batchNo: 0,
          tag: '標的',
        },
        {
          title: 'Test Post 2',
          author: 'Author1',
          id: 124,
          href: '/test/124',
          date: '2/21',
          batchNo: 0,
          tag: '標的',
        },
        {
          title: 'Test Post 3',
          author: 'Author1',
          id: 125,
          href: '/test/125',
          date: '2/21',
          batchNo: 0,
          tag: '標的',
        },
        {
          title: 'Test Post 4',
          author: 'Author1',
          id: 126,
          href: '/test/126',
          date: '2/21',
          batchNo: 0,
          tag: '標的',
        },
      ];
      (getPostsWithInDays as jest.Mock).mockResolvedValue(mockPosts);

      // Mock valid post filter
      (isValidStockPost as jest.Mock).mockReturnValue(true);

      (processHistoricalInfo as jest.Mock).mockReturnValue({
        author: 'Author1',
        stockNo: '2330',
        historicalInfo: [{ type: DiffType.HIGHEST, diffPercent: 16 }],
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 16 }],
        title: 'title',
        href: 'href',
        id: '',
      });

      const mockAuthors = [{ name: 'Author1', _id: 'author1_id' }];
      jest.spyOn(AuthorModel, 'find').mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockAuthors),
        }),
      } as any); // Cast as any to avoid type errors
      (AuthorStatsModel.bulkWrite as jest.Mock).mockResolvedValue({
        modifiedCount: 1,
        upsertedCount: 0,
      });

      const message = await processor.processAndUpdateAuthorStats(30);
      await new Promise((resolve) => setTimeout(resolve, 8000));
      expect(message).toEqual('Queued 4 posts from 1 authors');
      expect(getPostsWithInDays).toHaveBeenCalledWith(30, '標的');
      expect(processHistoricalInfo).toHaveBeenCalledTimes(4);
      expect(AuthorModel.find).toHaveBeenCalled();
      expect(AuthorStatsModel.bulkWrite).toHaveBeenCalled();
    });

    it('should return error when getPostsWithInDays throws an error', async () => {
      (getPostsWithInDays as jest.Mock).mockRejectedValue(new Error('Error fetching posts'));

      await expect(processor.processAndUpdateAuthorStats(20)).rejects.toThrow('Error fetching posts');
      expect(processor['isProcessing']).toBe(false);
    });
  });
});

describe('processRankingAndSaveToDB', () => {
  let postData: PostHistoricalResponse[];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock post data
    postData = [
      {
        author: 'Author1',
        title: 'Test Post 1',
        href: '/test1',
        id: 1234567890,
        stockNo: 'string',
        historicalInfo: [],
        tag: '',
        date: '',
        batchNo: 0,
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 20, date: '', diff: 0, price: 0 }],
      },
      {
        author: 'Author1',
        title: 'Test Post 2',
        href: '/test2',
        id: 1234567891,
        stockNo: 'string',
        historicalInfo: [],
        tag: '',
        date: '',
        batchNo: 0,
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 30, date: '', diff: 0, price: 0 }],
      },
      {
        author: 'Author1',
        title: 'Test Post 3',
        href: '/test3',
        id: 1234567892,
        stockNo: 'string',
        historicalInfo: [],
        tag: '',
        date: '',
        batchNo: 0,
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 25, date: '', diff: 0, price: 0 }],
      },
      {
        author: 'Author2',
        title: 'Test Post 4',
        href: '/test4',
        id: 1234567893,
        stockNo: 'string',
        historicalInfo: [],
        tag: '',
        date: '',
        batchNo: 0,
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 10, date: '', diff: 0, price: 0 }],
      },
      {
        author: 'Author2',
        title: 'Test Post 5',
        href: '/test5',
        id: 1234567894,
        stockNo: 'string',
        historicalInfo: [],
        tag: '',
        date: '',
        batchNo: 0,
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 30, date: '', diff: 0, price: 0 }],
      },
      {
        author: 'Author2',
        title: 'Test Post 6',
        href: '/test6',
        id: 1234567895,
        stockNo: 'string',
        historicalInfo: [],
        tag: '',
        date: '',
        batchNo: 0,
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 30, date: '', diff: 0, price: 0 }],
      },
      {
        author: 'Author3',
        title: 'Test Post 7',
        href: '/test7',
        id: 1234567896,
        stockNo: 'string',
        historicalInfo: [],
        tag: '',
        date: '',
        batchNo: 0,
        processedData: [{ type: DiffType.HIGHEST, diffPercent: 5, date: '', diff: 0, price: 0 }],
      },
    ];
  });

  it('should process and save ranking data to the database', async () => {
    // Arrange: Mocking database results
    const mockAuthors = [{ name: 'Author1', _id: 'author1_id' }];
    (AuthorModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockAuthors),
      }),
    });

    // Mock insertMany to simulate inserting new authors
    (AuthorModel.insertMany as jest.Mock).mockResolvedValue([{ name: 'Author2', _id: 'author2_id' }]);

    // Mock bulkWrite to capture what gets written to the database
    const bulkWriteMock = jest.fn();
    (AuthorStatsModel.bulkWrite as jest.Mock).mockImplementation(bulkWriteMock);
    bulkWriteMock.mockResolvedValue({
      modifiedCount: 2, // 2 条记录被修改
      upsertedCount: 1, // 1 条新记录被插入
    });

    // Act: Call the function with the mock post data
    await processRankingAndSaveToDB(postData);

    // Assert: Ensure the correct database methods were called
    expect(AuthorModel.find).toHaveBeenCalled();
    expect(AuthorModel.insertMany).toHaveBeenCalledWith([{ name: 'Author2' }]);
    expect(bulkWriteMock).toHaveBeenCalled();
  });

  it('should handle cases where there are no new records to update or insert', async () => {
    // Arrange: Mocking database results with an existing author
    const mockAuthors = [
      { name: 'Author1', _id: 'author1_id' },
      { name: 'Author2', _id: 'author2_id' },
    ];
    (AuthorModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockAuthors),
      }),
    });

    // Mock bulkWrite to capture what gets written to the database
    const bulkWriteMock = jest.fn();
    (AuthorStatsModel.bulkWrite as jest.Mock).mockImplementation(bulkWriteMock);
    bulkWriteMock.mockResolvedValue({
      modifiedCount: 2, // 2 条记录被修改
      upsertedCount: 1, // 1 条新记录被插入
    });

    // Act: Call the function with no new authors or updates
    await processRankingAndSaveToDB(postData);

    // Assert: No new authors should be inserted
    expect(AuthorModel.insertMany).not.toHaveBeenCalled();

    // Assert: Check bulkWrite call for updates
    expect(bulkWriteMock).toHaveBeenCalled();
  });

  it('should log an error if there is an issue processing the data', async () => {
    // Arrange: Mock an error in AuthorModel.find()
    (AuthorModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Database Error')),
      }),
    });

    // Spy on console.error to check if error is logged
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Act & Assert: Call the function and expect it to throw
    await expect(processRankingAndSaveToDB(postData)).rejects.toThrow('Database Error');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error in processRankingAndSaveToDB:', expect.any(Error));

    // Cleanup
    consoleErrorSpy.mockRestore();
  });
});
