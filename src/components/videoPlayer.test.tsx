import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { VideoPlayer } from './videoPlayer';

const mockPlayer = {
  on: vi.fn(),
};

const mockCreatePlayer = vi.fn().mockResolvedValue(mockPlayer);

const mockDailymotionSDK = {
  createPlayer: mockCreatePlayer,
  events: {
    VIDEO_END: 'video_end',
  },
  onScriptLoaded: async () => {},
};

describe('VideoPlayer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete window.dailymotion;
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a div with correct id', () => {
    const { container } = render(
      <VideoPlayer playerId="xow6u" videoId="x8abc123" onPlayerEnd={vi.fn()} />
    );

    const playerDiv = container.querySelector('#xow6u-x8abc123');
    expect(playerDiv).toBeInTheDocument();
  });

  it('should inject script tag when window.dailymotion is undefined', () => {
    const { container } = render(
      <VideoPlayer playerId="xow6u" videoId="x8abc123" onPlayerEnd={vi.fn()} />
    );

    const playerDiv = container.querySelector('#xow6u-x8abc123');
    const script = playerDiv?.querySelector('script');
    expect(script).toBeInTheDocument();
    expect(script).toHaveAttribute(
      'src',
      'https://geo.dailymotion.com/libs/player/xow6u.js'
    );
    expect(script?.async).toBe(true);
  });

  it('should not inject script tag when window.dailymotion already exists', async () => {
    window.dailymotion = mockDailymotionSDK;

    const { container } = render(
      <VideoPlayer playerId="xow6u" videoId="x8abc123" onPlayerEnd={vi.fn()} />
    );

    await waitFor(() => {
      const playerDiv = container.querySelector('#xow6u-x8abc123');
      const script = playerDiv?.querySelector('script');
      expect(script).not.toBeInTheDocument();
    });
  });

  it('should call createPlayer when dailymotion SDK is available', async () => {
    window.dailymotion = mockDailymotionSDK;
    const onPlayerEnd = vi.fn();

    render(
      <VideoPlayer
        playerId="xow6u"
        videoId="x8abc123"
        onPlayerEnd={onPlayerEnd}
      />
    );

    // Assert
    await waitFor(() => {
      expect(mockCreatePlayer).toHaveBeenCalledWith('xow6u-x8abc123', {
        video: 'x8abc123',
      });
    });
  });

  it('should register VIDEO_END event listener', async () => {
    window.dailymotion = mockDailymotionSDK;
    const onPlayerEnd = vi.fn();

    render(
      <VideoPlayer
        playerId="xow6u"
        videoId="x8abc123"
        onPlayerEnd={onPlayerEnd}
      />
    );

    await waitFor(() => {
      expect(mockPlayer.on).toHaveBeenCalledWith('video_end', onPlayerEnd);
    });
  });

  it('should set window.dailymotion.onScriptLoaded callback when SDK not loaded', () => {
    render(
      <VideoPlayer playerId="xow6u" videoId="x8abc123" onPlayerEnd={vi.fn()} />
    );

    expect(window.dailymotion).toBeDefined();
    expect(window.dailymotion?.onScriptLoaded).toBeTypeOf('function');
  });

  it('should call createPlayer when onScriptLoaded is invoked', async () => {
    const onPlayerEnd = vi.fn();
    render(
      <VideoPlayer
        playerId="xow6u"
        videoId="x8abc123"
        onPlayerEnd={onPlayerEnd}
      />
    );

    const onScriptLoaded = window.dailymotion?.onScriptLoaded;
    expect(onScriptLoaded).toBeTypeOf('function');

    window.dailymotion = mockDailymotionSDK;

    // @ts-expect-error onScriptLoaded can be undefined
    await onScriptLoaded();

    expect(mockCreatePlayer).toHaveBeenCalledWith('xow6u-x8abc123', {
      video: 'x8abc123',
    });
  });

  it('should not create player if createPlayer method is not available', async () => {
    window.dailymotion = undefined;

    render(
      <VideoPlayer playerId="xow6u" videoId="x8abc123" onPlayerEnd={vi.fn()} />
    );

    await waitFor(() => {
      expect(mockCreatePlayer).not.toHaveBeenCalled();
    });
  });

  it('should generate unique targetId for each player instance', () => {
    const { container: container1 } = render(
      <VideoPlayer playerId="player1" videoId="video1" onPlayerEnd={vi.fn()} />
    );
    const { container: container2 } = render(
      <VideoPlayer playerId="player2" videoId="video2" onPlayerEnd={vi.fn()} />
    );

    expect(container1.querySelector('#player1-video1')).toBeInTheDocument();
    expect(container2.querySelector('#player2-video2')).toBeInTheDocument();
  });

  it('should only load once due to useRef guard', async () => {
    window.dailymotion = mockDailymotionSDK;

    const { rerender } = render(
      <VideoPlayer playerId="xow6u" videoId="x8abc123" onPlayerEnd={vi.fn()} />
    );

    await waitFor(() => {
      expect(mockCreatePlayer).toHaveBeenCalledTimes(1);
    });

    rerender(
      <VideoPlayer playerId="xow6u" videoId="x8abc123" onPlayerEnd={vi.fn()} />
    );

    expect(mockCreatePlayer).toHaveBeenCalledTimes(1);
  });
});
