# AQA Test Task

Simple UI test for the "AQA Test task" page built with [Playwright](https://playwright.dev/).

> **Target website:** [https://vite-react-alpha-lemon.vercel.app/](https://vite-react-alpha-lemon.vercel.app/)

## Requirements

- [Node.js](https://nodejs.org/) v18+ (ES Modules required)
- npm v9+

## Installation

```bash
npm install
npx playwright install chromium
```

## Configuration

Copy `.env.example` to `.env` and set your target URL:

```bash
cp .env.example .env
```

```env
BASE_URL=https://your-site.com
```

The `BASE_URL` is loaded automatically by `dotenv` and used as `baseURL` in the Playwright config, so tests can navigate with relative paths (e.g. `page.goto('/')`).

## Running Tests

```bash
npm test
```

## Project Structure

```
helpers/
  base.js          — shared Playwright fixtures (page setup)
  constants.js     — shared test data (TRACK_NAMES, EMPTY_PLAYLIST_TEXT)
  utils.js         — shared utility functions (parseDurationToSeconds)
tests/
  home.spec.js                                          — Home page suite
  search/search.spec.js                                 — Search functionality suite
  addTrack/addTrack.spec.js                             — Add track suite
  verifyTotalDuration/verifyTotalDuration.spec.js       — Total duration suite
  workWIthGroup/workWithGroup.spec.js                   — Work with group of tracks suite
```

## Test Coverage

### Main Tests

#### Search (`tests/search/search.spec.js`)

| Test                                                             | Description                                      |
| ---------------------------------------------------------------- | ------------------------------------------------ |
| Displays the song list                                           | Tracklist is visible and contains 5 items        |
| Filters songs matching the search query                          | Only matching track remains visible after typing |
| Displays no results message when search does not match any songs | "Not found" message appears for unmatched query  |

#### Add track (`tests/addTrack/addTrack.spec.js`)

| Test                                     | Description                                                |
| ---------------------------------------- | ---------------------------------------------------------- |
| Playlist section is not shown by default | "Your Playlist" heading is hidden on load                  |
| Adds a track to the playlist             | Clicking "+" adds the track and shows the playlist section |

#### Verify total duration (`tests/verifyTotalDuration/verifyTotalDuration.spec.js`)

| Test                                | Description                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| Add track and verify total duration | Adds first track and checks the duration counter matches the track's duration in seconds |

### For Fun

> These tests go beyond the original task requirements and were added for extra practice.

#### Home page (`tests/home.spec.js`)

| Test                                             | Description                                           |
| ------------------------------------------------ | ----------------------------------------------------- |
| Has correct page title                           | Checks the document `<title>` matches "AQA Test task" |
| Displays the playlist heading text               | "Create your own unique playlist" text is visible     |
| Displays the search input                        | Search text field is present                          |
| Displays the tracklist with songs                | All 5 tracks are visible in the list                  |
| Shows empty playlist with no duration by default | Playlist is empty and shows "No tracks on playlist"   |

#### Work with group of tracks (`tests/workWIthGroup/workWithGroup.spec.js`)

| Test                                          | Description                                                                                                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add multiple tracks and verify total duration | Selects multiple tracks via checkboxes, adds them with "Add N tracks", verifies all appear in playlist with correct total duration, then removes all and confirms playlist is cleared |

## Code Quality

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run lint`         | Check for ESLint errors          |
| `npm run lint:fix`     | Auto-fix ESLint errors           |
| `npm run format`       | Format code with Prettier        |
| `npm run format:check` | Check formatting without writing |

## Git Hooks

A pre-commit hook (via [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)) automatically runs ESLint and Prettier on staged files before every commit.
