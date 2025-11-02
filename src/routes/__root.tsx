import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ThemeProvider } from '@/components/themeProvider';
import type { QueryClient } from '@tanstack/react-query';
import { NotFound } from '@/components/notFound';
import { AppHeader } from '@/components/appHeader';

const RootLayout = () => (
  <ThemeProvider defaultTheme="dark">
    <AppHeader />

    <Outlet />

    <TanStackRouterDevtools />
    <ReactQueryDevtools />
  </ThemeProvider>
);

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
  notFoundComponent: NotFound,
});
