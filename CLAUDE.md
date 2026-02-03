# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Base44 React application - an interactive narrative game built with React, Vite, and the Base44 SDK. The app simulates a social media/messaging experience where players interact with characters through a feed and chat interface over multiple in-game days.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint          # Check for issues (quiet mode)
npm run lint:fix      # Auto-fix issues

# Type checking
npm run typecheck
```

## Environment Setup

Create `.env.local` file with:
```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
```

## Architecture

### Base44 SDK Integration

The app uses the Base44 SDK (`@base44/sdk`) for backend communication and authentication:

- **Base44 Client** (`src/api/base44Client.js`): Creates authenticated client instance using app parameters from environment variables
- **App Parameters** (`src/lib/app-params.js`): Manages app configuration from URL params, localStorage, and environment variables. Handles `app_id`, `access_token`, `from_url`, and `app_base_url`
- **Auth Context** (`src/lib/AuthContext.jsx`): Provides authentication state and handles app public settings, user auth checks, login redirects, and error states (auth_required, user_not_registered)

### Page & Routing System

Pages are registered in `src/pages.config.js` with a `PAGES` object mapping page names to components. The `mainPage` property defines which page loads at root path. App.jsx creates routes automatically for all pages registered in this config.

**To add a new page:**
1. Create component in `src/pages/`
2. Import and add to `PAGES` object in `pages.config.js`
3. Optionally update `mainPage` to change default route

### Game Architecture

The main game logic is centralized in `src/components/game/GameContainer.jsx` (800+ lines). This component manages:

- **Game State**: Days (1-3), game lifecycle (intro → gameplay → ending), tab switching (feed/chat)
- **Character System**: 3 characters (mom, boyfriend, bestie) with anxiety levels, deceased states, pending deaths
- **Chat System**: Message history, pending responses, typing indicators, unread counts, player-initiated actions
- **Day Progression**: Automatically transitions between days when all characters complete their final message sequences
- **Feed System**: Progressive post unlocking based on chat choices and unlock conditions
- **Sound Management**: Ambient music, message sounds, notifications (managed via SoundManager component)

**Key game data:**
- `src/components/game/gameData.jsx`: Character definitions, game configuration
- `src/components/game/GameContentContext.jsx`: Provides `feedPosts` and `chatData` to all game components

**Game flow:**
1. IntroModal → User starts game
2. DayTransition (Day 1) → Shows day title
3. Game loop: Characters send messages, player responds via options, anxiety levels change, feed posts unlock
4. When all 3 characters complete final messages for a day, advance to next day
5. After Day 3, show OfflineModal → EndingScreen

### UI Components

Built with shadcn/ui (Radix UI primitives + Tailwind). Components are in `src/components/ui/` and use the utility class pattern with class-variance-authority and tailwind-merge.

## State Management

- **React Query**: Used for server state via `@tanstack/react-query` (configured in `src/lib/query-client.js`)
- **React Context**: AuthContext for authentication, GameContentContext for game data
- **Local State**: Complex game state managed in GameContainer with useState and useCallback

## Styling

- **Tailwind CSS**: Configured with custom colors and animations in `tailwind.config.js`
- **CRT Effect**: Custom overlay component for retro terminal aesthetic
- **Theme**: Amber/gold color scheme (#ce923a) on dark background (#0d0d0d)

## Important Patterns

**Character Message Flow:**
1. Character sends message with options
2. Player selects option (triggers anxiety change, feed post unlock)
3. Character shows typing indicator
4. Character sends reaction (if defined)
5. Next message triggered by `nextMessageId` (if defined)
6. Final messages trigger day completion after 5-second delay

**Day Completion Logic:**
- Uses `finalCompletionCountRef` to track completed characters
- Auto-completes deceased or empty characters
- When count reaches 3, triggers day transition or game end

**Authentication Flow:**
1. App loads → Check app public settings (determines if auth required)
2. If token exists → Verify user auth via `base44.auth.me()`
3. Handle errors: auth_required (redirect to login), user_not_registered (show error screen)
4. Render main app only after auth checks complete
