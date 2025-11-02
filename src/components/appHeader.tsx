import { ModeToggle } from '@/components/modeToggle';
import { ChannelSelector } from '@/components/channelSelector';
import { useLocation } from '@tanstack/react-router';

export const AppHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="border-b">
      <div className="w-full px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dailymotion Demo</h1>
        <div className="flex items-center gap-4">
          {isHomePage && <ChannelSelector />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
