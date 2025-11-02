import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/videoPlayer';
import type { Video } from '@/services/dailymotionApi';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useState, type ReactNode } from 'react';

interface VideoModalProps {
  video: Video;
  children: ReactNode;
}

export const VideoModal = ({ video, children }: VideoModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-4xl"
        aria-description={video.title}
        aria-describedby="dialog-title-desc"
      >
        <DialogTitle hidden={true}>{video.title}</DialogTitle>
        <DialogDescription hidden={true}>{video.title}</DialogDescription>
        <VideoPlayer
          playerId="xow6u"
          videoId={video.id}
          onPlayerEnd={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
