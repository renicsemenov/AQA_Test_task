import { expect, test } from '../../helpers/base.js';
import { TRACK_NAMES } from '../../helpers/constants.js';

const TRACK_NAME = TRACK_NAMES[0]; // 'Summer Breeze'

test.describe('Search', () => {
    test('displays the song list', async ({ page }) => {
        const trackList = page.locator('#tracklist');
        await expect(trackList).toBeVisible();
        await expect(trackList.locator('>div>div')).toHaveCount(5);
    });

    test('filters songs matching the search query', async ({ page }) => {
        const searchInput = page.getByRole('textbox', { name: /search/i });
        await expect(searchInput).toBeVisible();

        // Search by partial track name
        const inputTrackName = TRACK_NAME.slice(0, 6);
        await searchInput.pressSequentially(inputTrackName);
        const expectedTrackName = new RegExp(inputTrackName, 'i');
        await expect(searchInput).toHaveValue(expectedTrackName);

        // Verify that the matching song is visible
        await expect(page.getByText(TRACK_NAME)).toBeVisible();
        // Verify that non-matching songs are not visible
        for (const name of TRACK_NAMES.filter((trackName) => trackName !== TRACK_NAME)) {
            await expect(page.getByText(name)).not.toBeVisible();
        }
    });

    test('displays no results message when search does not match any songs', async ({ page }) => {
        const searchInput = page.getByRole('textbox', { name: /search/i });
        await searchInput.pressSequentially('NonExistingSong');

        await expect(page.getByText('Not found')).toBeVisible();
    });
});
