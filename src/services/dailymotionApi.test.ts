import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchVideo, type VideosList } from './dailymotionApi';

const mockVideosList: VideosList = {
  page: 1,
  limit: 40,
  explicit: false,
  has_more: true,
  list: [],
};

describe('fetchVideo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call the API with the correct URL when channelId and page are provided', async () => {
    // Arrange
    const channelId = 'lemondefr';
    const page = 2;
    const expectedUrl = `https://api.dailymotion.com/user/${channelId}/videos?fields=id,title,thumbnail_url&limit=40&page=${page}`;

    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockVideosList),
    });
    vi.stubGlobal('fetch', mockFetch);

    // Act
    const response = await fetchVideo(channelId, page);

    // Assert
    expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
    expect(response).toBe(mockVideosList);
  });

  it('should throw an error when fetch fails', async () => {
    // Arrange
    const networkError = new Error('Network error');
    const mockFetch = vi.fn().mockRejectedValue(networkError);
    vi.stubGlobal('fetch', mockFetch);

    // Act & Assert
    await expect(fetchVideo('lemondefr', 1)).rejects.toThrow('Network error');
  });

  it('should throw an error when channelId is not defined', async () => {
    // Act & Assert
    await expect(fetchVideo('', 1)).rejects.toThrow('Channel must be defined');
    // @ts-expect-error disabled for testing
    await expect(fetchVideo(undefined, 1)).rejects.toThrow(
      'Channel must be defined'
    );
    // @ts-expect-error disabled for testing
    await expect(fetchVideo(null, 1)).rejects.toThrow(
      'Channel must be defined'
    );
  });
});
