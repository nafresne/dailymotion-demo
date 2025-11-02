import { VideoCard } from '@/components/videoCard';
import { Button } from '@/components/ui/button';
import type { VideosList } from '@/services/dailymotionApi';
import { Fragment } from 'react/jsx-runtime';

interface VideoGridProps {
  videosList: VideosList[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

export const VideoGrid = ({
  videosList,
  hasMore = false,
  onLoadMore,
  isLoading = false,
}: VideoGridProps) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videosList.map((page) => (
        <Fragment key={page.page}>
          {page.list.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Fragment>
      ))}
    </div>

    {hasMore && onLoadMore && (
      <div className="flex justify-center">
        <Button onClick={onLoadMore} disabled={isLoading} size="lg">
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      </div>
    )}
  </div>
);
