import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { infiniteVideosQueryOptions } from '@/services/dailymotionApi';
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
    return queryClient.ensureInfiniteQueryData(infiniteVideosQueryOptions(channel));
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
    useSuspenseInfiniteQuery(infiniteVideosQueryOptions(channel));

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
