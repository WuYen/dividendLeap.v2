// Import the modules
import { getNewPosts, parseId, fastFindNewPosts } from './newPttStockInfo'; // Update with the correct path to your module
import * as requestCore from '../utility/requestCore'; // Adjust the path as needed
import * as PostInfo from '../model/PostInfo';
import { IPostInfo } from '../model/PostInfo';

// Mock the requestCore module
jest.mock('../utility/requestCore');

// Mock the PostInfo module
jest.mock('../model/PostInfo');

describe('getNewPosts', () => {
  // it('should return null if request fails', async () => {
  //   // Mock the getHTML function to simulate failure
  //   const mockGetHTML = jest.spyOn(requestCore, 'getHTML').mockRejectedValueOnce(new Error('Failed to fetch'));
  //   const result = await getNewPosts();
  //   expect(result).toBeNull();
  //   expect(mockGetHTML).toHaveBeenCalled();
  //   // Restore the original implementation of getHTML
  //   mockGetHTML.mockRestore();
  // });
  // it('should return an array of PostInfo if request succeeds', async () => {
  //   // Mock the getHTML function to simulate success
  //   const mockGetHTML = jest.spyOn(requestCore, 'getHTML').mockResolvedValueOnce('<html>Mocked HTML</html>');
  //   // Mock the PostInfo module to return mock data
  //   const mockPostInfo: PostInfo.IPostInfo[] = [{ id: 1, title: 'Mocked Post' }];
  //   jest.spyOn(PostInfo, 'default').mockReturnValue(mockPostInfo);
  //   const result = await getNewPosts();
  //   expect(result).toEqual(mockPostInfo);
  //   expect(mockGetHTML).toHaveBeenCalled();
  //   // Restore the original implementations
  //   mockGetHTML.mockRestore();
  //   jest.restoreAllMocks(); // Restore all mocks in the PostInfo module
  // });
});

describe('test utility', () => {
  it('shouild get id', async () => {
    var result = parseId('https://www.ptt.cc/bbs/Stock/M.1709040700.A.47E.html');
    expect(typeof result).toBe('number');
    expect(result).toEqual(1709040700);

    result = parseId('/bbs/Stock/M.1709040700.A.47E.html');
    expect(typeof result).toBe('number');
    expect(result).toEqual(1709040700);
  });
});

describe('fastFindNewArticles', () => {
  it('should find new articles', () => {
    // Sample input for onlineArticles
    const onlineArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 2,
        id: 1,
      },
      {
        tag: 'Technology',
        title: 'Article 2',
        href: '/article/2',
        author: 'Jane Smith',
        date: '2022-01-02',
        batchNo: 2,
        id: 2,
      },
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ];

    // Sample input for savedArticles
    const savedArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 1,
        id: 1,
      },
      {
        tag: 'Technology',
        title: 'Article 2',
        href: '/article/2',
        author: 'Jane Smith',
        date: '2022-01-02',
        batchNo: 1,
        id: 2,
      },
    ];

    // Call the function with sample input
    const newArticles = fastFindNewPosts(onlineArticles, savedArticles);

    // Assert the result
    expect(newArticles).toEqual([
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ]);
  });

  it('handle delete articles', () => {
    // Sample input for onlineArticles
    const onlineArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 2,
        id: 1,
      },
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ];

    // Sample input for savedArticles
    const savedArticles: IPostInfo[] = [
      {
        tag: 'News',
        title: 'Article 1',
        href: '/article/1',
        author: 'John Doe',
        date: '2022-01-01',
        batchNo: 1,
        id: 1,
      },
      {
        tag: 'Technology',
        title: 'Article 2',
        href: '/article/2',
        author: 'Jane Smith',
        date: '2022-01-02',
        batchNo: 1,
        id: 2,
      },
    ];

    // Call the function with sample input
    const newArticles = fastFindNewPosts(onlineArticles, savedArticles);

    // Assert the result
    expect(newArticles).toEqual([
      {
        tag: 'Sports',
        title: 'Article 3',
        href: '/article/3',
        author: 'Bob Johnson',
        date: '2022-01-03',
        batchNo: 2,
        id: 3,
      },
    ]);
  });
});
