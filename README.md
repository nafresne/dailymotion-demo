# Dailymotion Demo

A modern video browsing application that integrates with the Dailymotion API to display and play videos from Dailymotion channels. Built with React 19, TypeScript, and Vite for a fast and responsive user experience.

## Features

- **Channel Selector** - Interactive UI to select and switch between Dailymotion channels
- **Channel Video Browser** - Browse videos from any Dailymotion channel via URL query parameters
- **Infinite Scroll** - Load more videos with pagination (40 videos per page)
- **Video Player Integration** - Embedded Dailymotion player with modal playback
- **Theme System** - Light/Dark/System theme modes with persistent storage
- **Responsive Design** - Adaptive grid layout (1-4 columns) optimized for all screen sizes
- **Error Handling** - User-friendly error states for invalid or missing channels
- **Developer Tools** - Built-in TanStack Query and Router DevTools for debugging
- **Comprehensive Testing** - Unit tests with Vitest and React Testing Library

## Tech Stack

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with strict mode
- **Vite** - Fast build tool with hot module replacement
- **TanStack Query** - Powerful data fetching and caching
- **TanStack Router** - Type-safe routing solution
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components built on Radix UI
- **Dailymotion Player SDK** - Official Dailymotion video player integration
- **Vitest** - Fast unit testing framework with coverage support
- **Testing Library** - React testing utilities for component testing

## Prerequisites

- Node.js (version 18 or higher recommended)
- pnpm package manager

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd dailymotion-demo

# Install dependencies
pnpm install
```

## Available Commands

| Command        | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `pnpm dev`     | Start the Vite development server with hot module replacement |
| `pnpm build`   | Run TypeScript compilation and build for production           |
| `pnpm preview` | Preview the production build locally                          |
| `pnpm lint`    | Run ESLint to check code quality and style                    |
| `pnpm test`    | Run unit tests with Vitest                                    |

## Usage

### Development Mode

```bash
pnpm dev
```

The application will start at `http://localhost:5173` (default Vite port).

### Browse a Channel

You can browse videos in two ways:

1. **Using the Channel Selector**: Click on the channel selector in the app header to choose a Dailymotion channel

2. **Using URL Parameters**: Navigate directly to a channel by adding a query parameter:

```
http://localhost:5173/?channel=username
```

Replace `username` with any valid Dailymotion channel username.

### Play Videos

Click on any video card to open the player modal. The video will play using the embedded Dailymotion player and automatically close when finished.

## Dependencies

### Core Dependencies

- **react** (^19.1.1) - JavaScript library for building user interfaces
- **react-dom** (^19.1.1) - React package for working with the DOM
- **@tanstack/react-query** (^5.90.6) - Data fetching and state management
- **@tanstack/react-router** (^1.134.9) - Type-safe routing for React
- **tailwindcss** (^4.1.16) - Utility-first CSS framework
- **@tailwindcss/vite** (^4.1.16) - Tailwind CSS Vite plugin

### Dailymotion Integration

The app integrates the **Dailymotion Player SDK** dynamically by loading the player script from:

```
https://geo.dailymotion.com/libs/player/{playerId}.js
```

The player is created using the `dailymotion.createPlayer()` API and supports:

- Video playback with full controls
- Event handling (e.g., VIDEO_END event)
- Responsive embedding in React components

### UI Components

- **@radix-ui/react-dialog** (^1.1.15) - Accessible dialog/modal primitives
- **@radix-ui/react-dropdown-menu** (^2.1.16) - Dropdown menu primitives
- **@radix-ui/react-slot** (^1.2.3) - Slot component for composition
- **lucide-react** (^0.552.0) - Icon library with React components
- **class-variance-authority** (^0.7.1) - Component variant management
- **clsx** (^2.1.1) - Utility for constructing className strings
- **tailwind-merge** (^3.3.1) - Merge Tailwind CSS classes without conflicts

### Developer Tools

- **@tanstack/react-query-devtools** (^5.90.2) - Query debugging interface
- **@tanstack/react-router-devtools** (^1.134.9) - Router debugging interface
- **eslint** (^9.36.0) - Linting utility for code quality
- **typescript** (~5.9.3) - TypeScript compiler
- **vite** (^7.1.7) - Build tool and development server
- **vitest** (^4.0.6) - Unit testing framework
- **@vitest/coverage-v8** (4.0.6) - Code coverage reporting
- **@testing-library/react** (^16.3.0) - React testing utilities
- **@testing-library/jest-dom** (^6.9.1) - Custom jest matchers for DOM
- **jsdom** (^27.1.0) - DOM implementation for Node.js

## Development

### Import Aliases

The project uses `@/` as an alias for the `./src/` directory:

```typescript
import { Button } from '@/components/ui/button';
```

### Theme System

The theme system uses React Context with localStorage persistence:

- Themes: `light`, `dark`, `system`
- Auto-detects OS-level dark mode preference
- Toggle via the mode switcher in the app header

### TypeScript Configuration

Multi-config setup for different environments:

- `tsconfig.json` - Root configuration with path mappings
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Build tooling settings

### Testing

The project includes comprehensive unit tests using Vitest and React Testing Library:

```bash
# Run tests in watch mode
pnpm test

# Run tests with coverage
pnpm test --coverage
```

Test files are co-located with their components:
- Component tests: [src/components/*.test.tsx](src/components/)
- Service tests: [src/services/*.test.ts](src/services/)

The test setup includes:
- DOM environment via jsdom
- Custom matchers from @testing-library/jest-dom
- Coverage reporting with v8
- React 19 testing utilities

## License

[Add your license here]

## Contributing

[Add contributing guidelines here]
