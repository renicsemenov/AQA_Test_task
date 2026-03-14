# AQA Test Task

Simple UI test for the "AQA Test task" page built with [Playwright](https://playwright.dev/).

## Requirements

- [Node.js](https://nodejs.org/) v18+
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

## Test Coverage

Tests are located in the `tests/` directory. Current suite (`home.spec.js`):

| Test                                             | Description                                           |
| ------------------------------------------------ | ----------------------------------------------------- |
| Has correct page title                           | Checks the document `<title>` matches "AQA Test task" |
| Displays the playlist heading text               | "Create your own unique playlist" text is visible     |
| Displays the search input                        | Search text field is present                          |
| Displays the tracklist with songs                | All 5 tracks are visible in the list                  |
| Shows empty playlist with no duration by default | Playlist is empty and shows "No tracks on playlist"   |

## Code Quality

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run lint`         | Check for ESLint errors          |
| `npm run lint:fix`     | Auto-fix ESLint errors           |
| `npm run format`       | Format code with Prettier        |
| `npm run format:check` | Check formatting without writing |

## Git Hooks

A pre-commit hook (via [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)) automatically runs ESLint and Prettier on staged files before every commit.
