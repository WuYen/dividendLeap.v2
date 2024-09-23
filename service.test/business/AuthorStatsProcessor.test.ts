import { AuthorStatsProcessor, authorStatsProcessorInstance } from '../../service/business/AuthorStatsProcessor';
import { getPostsWithInDays } from '../../service/pttStockPostService';
import { processHistoricalInfo } from '../../service/historicalService';
import { AuthorModel } from '../../model/Author';
import { AuthorStatsModel } from '../../model/AuthorStats';
import Queue from 'better-queue';
import { IPostInfo } from '../../model/PostInfo';

// Mock dependencies
jest.mock('../../service/pttStockPostService');
jest.mock('../../service/historicalService');
jest.mock('../../model/Author');
jest.mock('../../model/AuthorStats');
jest.mock('better-queue');

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
      ];
      (getPostsWithInDays as jest.Mock).mockResolvedValue(mockPosts);

      // Mock valid post filter
      const isValidStockPost = jest.fn().mockReturnValue(true);

      // Mock the processing job in the queue
      (Queue.prototype.push as jest.Mock).mockImplementation((job) => {
        processHistoricalInfo(job, new Date(), false).then(() => {
          processor['queue'].emit('task_finish', 1, {
            author: job.author,
            stockNo: '2330',
            historicalInfo: [{ type: 'highest', diffPercent: 15 }],
            processedData: [{ type: 'highest', diffPercent: 15 }],
            title: job.title,
            href: job.href,
            id: job.id,
          });
        });
      });

      // Mock AuthorModel and AuthorStatsModel operations
      const mockAuthors = [{ name: 'Author1', _id: 'author1_id' }];
      (AuthorModel.find as jest.Mock).mockResolvedValue(mockAuthors);
      (AuthorStatsModel.bulkWrite as jest.Mock).mockResolvedValue({
        modifiedCount: 1,
        upsertedCount: 0,
      });

      const message = await processor.newProcessAndUpdateAuthorStats(30);

      //expect(message).toEqual('Queued 3 posts from 1 authors');
      expect(getPostsWithInDays).toHaveBeenCalledWith(30, '標的');
      expect(Queue.prototype.push).toHaveBeenCalledTimes(3);
      expect(AuthorModel.find).toHaveBeenCalled();
      expect(AuthorStatsModel.bulkWrite).toHaveBeenCalled();
    });

    it('should return error when getPostsWithInDays throws an error', async () => {
      (getPostsWithInDays as jest.Mock).mockRejectedValue(new Error('Error fetching posts'));

      await expect(processor.newProcessAndUpdateAuthorStats(20)).rejects.toThrow('Error fetching posts');
      expect(processor['isProcessing']).toBe(false);
    });
  });
});
