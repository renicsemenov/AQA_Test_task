import { test, expect } from '../helpers/base.js';
import { TRACK_NAMES, EMPTY_PLAYLIST_TEXT } from '../helpers/constants.js';

test.describe('Home page', () => {
    test('has correct page title', async ({ page }) => {
        await expect(page).toHaveTitle(/AQA Test task/i);
    });

    test('displays the playlist heading text', async ({ page }) => {
        await expect(page.getByText('Create your own unique playlist')).toBeVisible();
    });

    test('displays the search input', async ({ page }) => {
        await expect(page.getByRole('textbox', { name: /search/i })).toBeVisible();
    });

    test('displays the tracklist with songs', async ({ page }) => {
        const tracklist = page.locator('#tracklist');
        await expect(tracklist).toBeVisible();
        for (const name of TRACK_NAMES) {
            await expect(tracklist.getByText(name)).toBeVisible();
        }
    });

    test('shows empty playlist with no duration by default', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /total playlist tracks duration/i }),
        ).toBeVisible();
        await expect(page.locator('#playlist-duration')).toHaveText(EMPTY_PLAYLIST_TEXT);
    });
});
