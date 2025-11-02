import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { videosQueryOptions, fetchVideo } from '@/services/dailymotionApi';
import { VideoGrid } from '@/components/VideoGrid';
import { NotFoundChannel } from '@/components/notFoundChannel';

type IndexSearch = {
  channel: string;
};

export const Route = createFileRoute('/')({
  component: Index,
  errorComponent: NotFoundChannel,
  loaderDeps: ({ search: { channel } }) => ({ channel }),
  loader: ({ context: { queryClient }, deps: { channel } }) => {
    return queryClient.ensureQueryData(videosQueryOptions(channel));
  },
  validateSearch: (search: Record<string, unknown>): IndexSearch => {
    return {
      channel: search.channel as string,
    };
  },
});

function Index() {
  const { channel } = Route.useSearch();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['channel', { channelId: channel }, 'videos'],
      queryFn: ({ pageParam = 1 }) => fetchVideo(channel, pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.has_more ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  return (
    <div className="p-2">
      <VideoGrid
        videosList={data.pages}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
        isLoading={isFetchingNextPage}
      />
    </div>
  );
}
