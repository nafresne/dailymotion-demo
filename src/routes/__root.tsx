import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "@/components/themeProvider";
import { ModeToggle } from "@/components/modeToggle";
import type { QueryClient } from "@tanstack/react-query";
import { NotFound } from "@/components/notFound";

const RootLayout = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ModeToggle />
    <div className="p-2 flex gap-2">
      <Link
        to="/"
        className="[&.active]:font-bold"
        search={{ channel: "lemondefr" }}
      >
        Home
      </Link>{" "}
    </div>
    <hr />

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
