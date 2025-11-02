import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { Video } from '@/services/dailymotionApi';
import { VideoModal } from '@/components/videoModal';

export const VideoCard = ({ video }: { video: Video }) => (
  <VideoModal video={video}>
    <Card className="relative aspect-video cursor-pointer">
      <img
        src={video.thumbnail_url}
        alt={video.title}
        className="absolute inset-0 h-full w-full object-contain"
      />

      <CardHeader className="h-full flex items-start">
        <CardTitle className="text-white drop-shadow-lg">
          <span className="absolute inset-0 -inset-x-2 -inset-y-1 bg-black/60 rounded -z-10" />
          {video.title}
        </CardTitle>
      </CardHeader>
    </Card>
  </VideoModal>
);
