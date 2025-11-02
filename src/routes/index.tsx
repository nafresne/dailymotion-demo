import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { videosQueryOptions } from '@/services/dailymotionApi';

type IndexSearch = {
  channel: string;
};

export const Route = createFileRoute('/')({
  component: Index,
  errorComponent: ({ error }) => {
    return <div>{error.message}</div>;
  },
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
  const videosQuery = useSuspenseQuery(videosQueryOptions(channel));
  const videos = videosQuery.data;

  return (
    <div className="p-2">
      <h3>{channel}!</h3>
      <ul className="list-disc pl-4">
        {videos.list.map((video) => (
          <li key={video.id} className="whitespace-nowrap">
            <div>
              {video.id} - {video.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
