import { test, expect } from '../../helpers/base.js';
import { TRACK_NAMES } from '../../helpers/constants.js';

test.describe('Search', () => {
    test('displays the song list', async ({ page }) => {
        const trackList = page.locator('#tracklist');
        await expect(trackList).toBeVisible();
        await expect(trackList.locator('>div>div')).toHaveCount(5);
    });

    test('filters songs matching the search query', async ({ page }) => {
        const searchInput = page.getByRole('textbox', { name: /search/i });
        await expect(searchInput).toBeVisible();
        await searchInput.pressSequentially('Summer');

        await expect(searchInput).toHaveValue(/Summer/i);

        // Verify that the matching song is visible
        await expect(page.getByText(TRACK_NAMES[0])).toBeVisible();
        // Verify that non-matching songs are not visible
        for (const name of TRACK_NAMES.slice(1)) {
            await expect(page.getByText(name)).not.toBeVisible();
        }
    });

    test('displays no results message when search does not match any songs', async ({ page }) => {
        const searchInput = page.getByRole('textbox', { name: /search/i });
        await searchInput.pressSequentially('NonExistingSong');

        await expect(page.getByText('Not found')).toBeVisible();
    });
});
