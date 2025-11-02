import { queryOptions } from '@tanstack/react-query';

import mockedDataPage1 from './mockedDataPage1.json';
import mockedDataPage2 from './mockedDataPage2.json';

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

export const videosQueryOptions = (channelId: string, page?: number) =>
  queryOptions({
    queryKey: ['channel', { channelId }, 'page', page || 1],
    queryFn: () => fetchVideo(channelId, page),
  });

export const fetchVideo = async (
  channelId: string,
  page?: number
): Promise<VideosList> => {
  if (!channelId) {
    throw new Error('Channel must be defined');
  }

  // https://api.dailymotion.com/user/lemondefr/videos?fields=id,title,thumbnail_url&limit=40

  return page === 1 ? mockedDataPage1 : mockedDataPage2;
};
