// Import the modules
import { getNewPosts } from './newPttStockInfo'; // Update with the correct path to your module
import * as requestCore from '../utility/requestCore'; // Adjust the path as needed
import * as PostInfo from '../model/PostInfo';

// Mock the requestCore module
jest.mock('../utility/requestCore');

// Mock the PostInfo module
jest.mock('../model/PostInfo');

describe('getNewPosts', () => {
  it('should return null if request fails', async () => {
    // Mock the getHTML function to simulate failure
    const mockGetHTML = jest.spyOn(requestCore, 'getHTML').mockRejectedValueOnce(new Error('Failed to fetch'));

    const result = await getNewPosts();

    expect(result).toBeNull();
    expect(mockGetHTML).toHaveBeenCalled();

    // Restore the original implementation of getHTML
    mockGetHTML.mockRestore();
  });

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
