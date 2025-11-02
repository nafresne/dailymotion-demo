import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoCard } from './videoCard';
import type { Video } from '@/services/dailymotionApi';

vi.mock('./videoModal', () => ({
  VideoModal: ({
    video,
    children,
  }: {
    video: Video;
    children: React.ReactNode;
  }) => (
    <div data-testid="video-modal" data-video-id={video.id}>
      {children}
    </div>
  ),
}));

const mockVideo: Video = {
  id: 'x8abc123',
  title: 'Test Video Title',
  thumbnail_url: 'https://example.com/thumbnail.jpg',
};

describe('VideoCard', () => {
  it('should render video title', () => {
    render(<VideoCard video={mockVideo} />);

    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
  });

  it('should render video thumbnail with correct src', () => {
    render(<VideoCard video={mockVideo} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/thumbnail.jpg');
  });

  it('should render video thumbnail with correct alt text', () => {
    render(<VideoCard video={mockVideo} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Test Video Title');
  });

  it('should wrap content in VideoModal', () => {
    const { container } = render(<VideoCard video={mockVideo} />);

    // Assert
    const modal = container.querySelector('[data-testid="video-modal"]');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('data-video-id', 'x8abc123');
  });
});
