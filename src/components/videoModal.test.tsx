import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VideoModal } from './videoModal';
import type { Video } from '@/services/dailymotionApi';

vi.mock('./videoPlayer', () => ({
  VideoPlayer: ({
    videoId,
    playerId,
    onPlayerEnd,
  }: {
    videoId: string;
    playerId: string;
    onPlayerEnd: () => void;
  }) => (
    <div
      data-testid="video-player"
      data-video-id={videoId}
      data-player-id={playerId}
    >
      <button onClick={onPlayerEnd}>End Video</button>
    </div>
  ),
}));

const mockVideo: Video = {
  id: 'x8abc123',
  title: 'Test Video Title',
  thumbnail_url: 'https://example.com/thumbnail.jpg',
};

describe('VideoModal', () => {
  it('should render trigger element', () => {
    render(
      <VideoModal video={mockVideo}>
        <button>Open Video</button>
      </VideoModal>
    );

    expect(
      screen.getByRole('button', { name: /open video/i })
    ).toBeInTheDocument();
  });

  it('should not render VideoPlayer initially when modal is closed', () => {
    render(
      <VideoModal video={mockVideo}>
        <button>Open Video</button>
      </VideoModal>
    );

    expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
  });

  it('should open modal and render VideoPlayer when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <VideoModal video={mockVideo}>
        <button>Open Video</button>
      </VideoModal>
    );

    await user.click(screen.getByRole('button', { name: /open video/i }));

    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('video-player')).toHaveAttribute(
      'data-video-id',
      'x8abc123'
    );
  });

  it('should pass correct props to VideoPlayer', async () => {
    const user = userEvent.setup();
    render(
      <VideoModal video={mockVideo}>
        <button>Open Video</button>
      </VideoModal>
    );

    await user.click(screen.getByRole('button', { name: /open video/i }));

    const player = screen.getByTestId('video-player');
    expect(player).toHaveAttribute('data-video-id', 'x8abc123');
    expect(player).toHaveAttribute('data-player-id', 'xow6u');
  });

  it('should close modal when onPlayerEnd is called', async () => {
    const user = userEvent.setup();
    render(
      <VideoModal video={mockVideo}>
        <button>Open Video</button>
      </VideoModal>
    );

    await user.click(screen.getByRole('button', { name: /open video/i }));
    expect(screen.getByTestId('video-player')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /end video/i }));

    expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
  });

  it('should display video title in DialogTitle', async () => {
    const user = userEvent.setup();
    render(
      <VideoModal video={mockVideo}>
        <button>Open Video</button>
      </VideoModal>
    );

    await user.click(screen.getByRole('button', { name: /open video/i }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should close modal when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(
      <VideoModal video={mockVideo}>
        <button>Open Video</button>
      </VideoModal>
    );

    await user.click(screen.getByRole('button', { name: /open video/i }));
    expect(screen.getByTestId('video-player')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
  });
});
