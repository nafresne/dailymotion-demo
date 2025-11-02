import { ModeToggle } from '@/components/modeToggle';

export const AppHeader = () => (
  <header className="border-b">
    <div className="w-full px-4 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dailymotion Demo</h1>
      <ModeToggle />
    </div>
  </header>
);
