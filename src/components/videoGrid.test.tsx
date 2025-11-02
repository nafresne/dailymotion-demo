import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VideoGrid } from './videoGrid';
import type { VideosList } from '@/services/dailymotionApi';

const mockVideosList: VideosList[] = [
  {
    page: 1,
    limit: 40,
    explicit: false,
    has_more: true,
    list: [
      {
        id: 'video1',
        title: 'Video 1',
        thumbnail_url: 'https://example.com/thumb1.jpg',
      },
      {
        id: 'video2',
        title: 'Video 2',
        thumbnail_url: 'https://example.com/thumb2.jpg',
      },
    ],
  },
  {
    page: 2,
    limit: 40,
    explicit: false,
    has_more: false,
    list: [
      {
        id: 'video3',
        title: 'Video 3',
        thumbnail_url: 'https://example.com/thumb3.jpg',
      },
    ],
  },
];

describe('VideoGrid', () => {
  it('should render all videos from all pages', () => {
    render(<VideoGrid videosList={mockVideosList} />);

    expect(screen.getByText('Video 1')).toBeInTheDocument();
    expect(screen.getByText('Video 2')).toBeInTheDocument();
    expect(screen.getByText('Video 3')).toBeInTheDocument();
  });

  it('should not render load more button when hasMore is false', () => {
    render(<VideoGrid videosList={mockVideosList} hasMore={false} />);

    expect(
      screen.queryByRole('button', { name: /load more/i })
    ).not.toBeInTheDocument();
  });

  it('should render load more button when hasMore is true and onLoadMore is provided', () => {
    const onLoadMore = vi.fn();

    render(
      <VideoGrid
        videosList={mockVideosList}
        hasMore={true}
        onLoadMore={onLoadMore}
      />
    );

    expect(
      screen.getByRole('button', { name: /load more/i })
    ).toBeInTheDocument();
  });

  it('should not render load more button when hasMore is true but onLoadMore is not provided', () => {
    render(<VideoGrid videosList={mockVideosList} hasMore={true} />);

    expect(
      screen.queryByRole('button', { name: /load more/i })
    ).not.toBeInTheDocument();
  });

  it('should call onLoadMore when load more button is clicked', async () => {
    const user = userEvent.setup();
    const onLoadMore = vi.fn();
    render(
      <VideoGrid
        videosList={mockVideosList}
        hasMore={true}
        onLoadMore={onLoadMore}
      />
    );

    await user.click(screen.getByRole('button', { name: /load more/i }));

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should disable load more button when isLoading is true', () => {
    const onLoadMore = vi.fn();

    render(
      <VideoGrid
        videosList={mockVideosList}
        hasMore={true}
        onLoadMore={onLoadMore}
        isLoading={true}
      />
    );

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
  });

  it('should display "Loading..." text when isLoading is true', () => {
    const onLoadMore = vi.fn();

    render(
      <VideoGrid
        videosList={mockVideosList}
        hasMore={true}
        onLoadMore={onLoadMore}
        isLoading={true}
      />
    );

    expect(
      screen.getByRole('button', { name: /loading/i })
    ).toBeInTheDocument();
  });

  it('should display "Load more" text when isLoading is false', () => {
    const onLoadMore = vi.fn();

    render(
      <VideoGrid
        videosList={mockVideosList}
        hasMore={true}
        onLoadMore={onLoadMore}
        isLoading={false}
      />
    );

    // Assert
    expect(
      screen.getByRole('button', { name: /load more/i })
    ).toBeInTheDocument();
  });

  it('should render empty grid when videosList is empty', () => {
    const { container } = render(<VideoGrid videosList={[]} />);

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(0);
  });
});
