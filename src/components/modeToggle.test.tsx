import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeToggle } from './modeToggle';

const mockSetTheme = vi.fn();

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}));

describe('ModeToggle', () => {
  it('should render toggle button', () => {
    render(<ModeToggle />);

    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('should render Sun and Moon icons', () => {
    const { container } = render(<ModeToggle />);

    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(2);
  });

  it('should open dropdown menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));

    expect(screen.getByRole('menuitem', { name: /^light$/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /^dark$/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /^system$/i })).toBeInTheDocument();
  });

  it('should call setTheme with "light" when Light is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    await user.click(screen.getByRole('menuitem', { name: /^light$/i }));

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should call setTheme with "dark" when Dark is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    await user.click(screen.getByRole('menuitem', { name: /^dark$/i }));

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should call setTheme with "system" when System is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    await user.click(screen.getByRole('menuitem', { name: /^system$/i }));

    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  it('should have accessible label for screen readers', () => {
    render(<ModeToggle />);

    const srOnlyText = screen.getByText(/toggle theme/i);
    expect(srOnlyText).toHaveClass('sr-only');
  });
});
