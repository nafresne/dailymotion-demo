import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
}

export interface VideosList {
  page: number;
  limit: number;
  explicit: boolean;
  has_more: boolean;
  list: Video[];
}

export const videosQueryOptions = (channelId: string, page: number) =>
  queryOptions({
    queryKey: ['channel', { channelId }, 'videos', page],
    queryFn: () => fetchVideo(channelId, page),
  });

export const infiniteVideosQueryOptions = (channelId: string) =>
  infiniteQueryOptions({
    queryKey: ['channel', { channelId: channelId }, 'videos'],
    queryFn: ({ pageParam = 1 }) => fetchVideo(channelId, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.has_more ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

export const fetchVideo = async (
  channelId: string,
  page: number
): Promise<VideosList> => {
  if (!channelId) {
    throw new Error('Channel must be defined');
  }

  const url = `https://api.dailymotion.com/user/${channelId}/videos?fields=id,title,thumbnail_url&limit=40&page=${page}`;
  const response = await fetch(url);

  return response.json();
};
