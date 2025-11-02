# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 + TypeScript + Vite project using shadcn/ui components and Tailwind CSS v4. The application is a Dailymotion video browser that integrates with the Dailymotion API to display and play videos from channels. It includes a theme system with light/dark/system mode support, comprehensive testing with Vitest, and uses TanStack Query for data fetching and TanStack Router for type-safe routing.

## Package Manager

This project uses **pnpm** (version 10). Always use `pnpm` instead of npm or yarn. Dependencies are locked with `pnpm-lock.yaml`.

## Build Commands

- **Development**: `pnpm dev` - Starts Vite dev server with HMR at `http://localhost:5173`
- **Build**: `pnpm build` - Runs TypeScript compilation (`tsc -b`) followed by Vite build
- **Lint**: `pnpm lint` - Runs ESLint across the codebase
- **Preview**: `pnpm preview` - Preview production build locally
- **Test**: `pnpm test` - Runs unit tests with Vitest in watch mode
- **Test Coverage**: `pnpm test --coverage` - Runs tests with coverage report (v8)
- **Install**: `pnpm install --frozen-lockfile` - Install dependencies (use `--frozen-lockfile` in CI)

## Architecture

### Theme System

The application uses a React Context-based theme system:

- **ThemeProvider** ([src/components/themeProvider.tsx](src/components/themeProvider.tsx)): Context provider managing theme state (dark/light/system) with localStorage persistence
- **ModeToggle** ([src/components/modeToggle.tsx](src/components/modeToggle.tsx)): UI component for switching themes using a dropdown menu
- Theme is applied by adding/removing CSS classes (`dark`, `light`) on the document root element
- System theme respects OS-level `prefers-color-scheme` media query

### Application Components

- **UI Components** (`src/components/ui/`): shadcn/ui components (Button, DropdownMenu, Dialog, etc.) built on Radix UI primitives
- **VideoGrid** ([src/components/videoGrid.tsx](src/components/videoGrid.tsx)): Main component displaying videos in a responsive grid with infinite scroll
- **VideoCard** ([src/components/videoCard.tsx](src/components/videoCard.tsx)): Individual video card component showing thumbnail, title, and metadata
- **VideoModal** ([src/components/videoModal.tsx](src/components/videoModal.tsx)): Modal dialog for video playback
- **VideoPlayer** ([src/components/videoPlayer.tsx](src/components/videoPlayer.tsx)): Embedded Dailymotion player component
- **ChannelSelector** ([src/components/channelSelector.tsx](src/components/channelSelector.tsx)): UI component for selecting Dailymotion channels
- **AppHeader** ([src/components/appHeader.tsx](src/components/appHeader.tsx)): Application header with channel selector and theme toggle
- **Utility Function** ([src/lib/utils.ts](src/lib/utils.ts)): `cn()` helper for merging Tailwind classes using `clsx` and `tailwind-merge`

### Data Fetching

- **Dailymotion API Service** ([src/services/dailymotionApi.ts](src/services/dailymotionApi.ts)): API integration for fetching channel videos
- Uses TanStack Query for data fetching, caching, and pagination
- Infinite scroll implementation with automatic loading of next pages (40 videos per page)

### Import Aliases

The project uses `@/` as an alias for `./src/` directory. This is configured in both [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json).

Example: `import { Button } from "@/components/ui/button"`

### Styling

- Uses Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin)
- Dark mode implemented via class strategy (`.dark` class on root element)
- Component variants managed with `class-variance-authority`

## TypeScript Configuration

The project uses a multi-config TypeScript setup:
- [tsconfig.json](tsconfig.json): Root config with path mappings
- [tsconfig.app.json](tsconfig.app.json): Application-specific settings
- [tsconfig.node.json](tsconfig.node.json): Node/build tooling settings

## Testing

The project uses Vitest for unit testing with the following configuration:

- **Test Framework**: Vitest with React Testing Library
- **Test Environment**: jsdom for DOM simulation
- **Coverage**: v8 coverage provider
- **Test Files**: Co-located with components (`*.test.tsx` and `*.test.ts`)
- **Configuration**: [vitest.config.ts](vitest.config.ts)

### Writing Tests

- Component tests should use `@testing-library/react` utilities
- Use `@testing-library/jest-dom` matchers for assertions
- Mock external dependencies (Dailymotion player, API calls)
- Test files are located next to the components they test

### Running Tests

```bash
# Run tests in watch mode (default)
pnpm test

# Run tests with coverage
pnpm test --coverage

# Run tests in CI mode (no watch)
pnpm test --run
```

### Test Configuration

- Tests use `globals: true` - `describe`, `it`, `expect` are available globally
- Setup file automatically loads `@testing-library/jest-dom/vitest` matchers
- Import alias `@/` is configured for imports in test files

## Routing

The application uses TanStack Router with file-based routing:

- **Route files**: [src/routes/](src/routes/) directory
  - `__root.tsx` - Root layout with QueryClientProvider and ThemeProvider
  - `index.tsx` - Main page displaying the VideoGrid component
- **Auto-generated routes**: TanStack Router plugin generates route tree automatically
- **Channel parameter**: Passed via URL query string `?channel=username`
- **DevTools**: Router and Query DevTools available in development mode (toggle with keyboard shortcuts)

### Router Configuration

- Plugin: `@tanstack/router-plugin/vite` with `autoCodeSplitting: true`
- Type-safe route definitions with automatic code splitting
- Search params are validated and typed per route

## Deployment

- **Base path**: `/dailymotion-demo/` (configured in [vite.config.ts:9](vite.config.ts))
- **GitHub Pages**: Automated deployment via GitHub Actions on push to `main`
- **Build output**: `./dist` directory
- **CI Pipeline**: Runs lint, build, and tests on all PRs and main branch pushes

## Environment Requirements

- **Node.js**: 24.2.0 (as specified in CI/CD workflows)
- **pnpm**: 10.x
- **Browser support**: Modern browsers with ES2020+ support
