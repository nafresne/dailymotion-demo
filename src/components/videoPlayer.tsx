import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  playerId: string;
  videoId: string;
  onPlayerEnd: () => void;
}

const createPlayer = async ({
  targetId,
  videoId,
  onPlayerEnd,
}: {
  targetId: string;
  videoId: string;
  onPlayerEnd: () => void;
}) => {
  if (!dailymotion.createPlayer) {
    return;
  }

  const player = await dailymotion.createPlayer(targetId, {
    video: videoId,
  });

  player.on(dailymotion.events.VIDEO_END, onPlayerEnd);
};

export const VideoPlayer = ({
  playerId,
  videoId,
  onPlayerEnd,
}: VideoPlayerProps) => {
  const loaded = useRef(false);
  const targetId = `${playerId}-${videoId}`;

  useEffect(() => {
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps#effect-on-mount
    if (loaded.current) {
      return;
    }

    loaded.current = true;
    const script = document.createElement('script');

    if (window.dailymotion === undefined) {
      script.src = `https://geo.dailymotion.com/libs/player/${playerId}.js`;
      script.async = true;

      document.getElementById(targetId)?.appendChild(script);

      window.dailymotion = {
        onScriptLoaded: () =>
          createPlayer({
            targetId,
            videoId,
            onPlayerEnd,
          }),
      };
    } else {
      createPlayer({
        targetId,
        videoId,
        onPlayerEnd,
      });
    }
  }, [onPlayerEnd, playerId, targetId, videoId]);

  return <div id={targetId}></div>;
};
