# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite project using shadcn/ui components and Tailwind CSS v4. The project includes a theme system with light/dark/system mode support.

## Build Commands

- **Development**: `npm run dev` - Starts Vite dev server with HMR
- **Build**: `npm run build` - Runs TypeScript compilation (`tsc -b`) followed by Vite build
- **Lint**: `npm run lint` - Runs ESLint across the codebase
- **Preview**: `npm run preview` - Preview production build locally

## Architecture

### Theme System

The application uses a React Context-based theme system:

- **ThemeProvider** ([src/components/themeProvider.tsx](src/components/themeProvider.tsx)): Context provider managing theme state (dark/light/system) with localStorage persistence
- **ModeToggle** ([src/components/modeToggle.tsx](src/components/modeToggle.tsx)): UI component for switching themes using a dropdown menu
- Theme is applied by adding/removing CSS classes (`dark`, `light`) on the document root element
- System theme respects OS-level `prefers-color-scheme` media query

### Component Structure

- **UI Components** (`src/components/ui/`): shadcn/ui components (Button, DropdownMenu, etc.) built on Radix UI primitives
- **Utility Function** ([src/lib/utils.ts](src/lib/utils.ts)): `cn()` helper for merging Tailwind classes using `clsx` and `tailwind-merge`

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
- `tsconfig.app.json`: Application-specific settings
- `tsconfig.node.json`: Node/build tooling settings
