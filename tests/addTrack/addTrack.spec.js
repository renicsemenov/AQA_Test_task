const { test, expect } = require('@playwright/test');

const TRACK_NAME = 'Autumn Leaves';

test.describe('Add track', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('You Playlist is absent by default', async ({ page }) => {
        await expect(page.getByText('Your Playlist')).not.toBeVisible();
    });

    test('Total duration should have test - No tracks on playlist', async ({ page }) => {
        const playlistDuration = page.locator('#playlist-duration');
        await expect(playlistDuration).toBeVisible();
        await expect(playlistDuration).toHaveText('No tracks on playlist');
    });

    test('add track', async ({ page }) => {
        const trackList = page.locator('#tracklist');
        await expect(trackList).toBeVisible();

        const trackListAddButton = trackList
            .getByText(TRACK_NAME)
            .locator('../..')
            .getByRole('button', { name: '+' });
        await expect(trackListAddButton).toBeVisible();
        await trackListAddButton.click();

        await expect(page.getByText('Your Playlist')).toBeVisible();
        const playList = page.locator('#playlist');
        await expect(playList).toBeVisible();

        await expect(playList.getByText(TRACK_NAME)).toBeVisible();
    });
});
