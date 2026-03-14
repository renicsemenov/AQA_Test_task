const { test, expect } = require('@playwright/test');

test.describe('Verify total duration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Add track and verify total duration', async ({ page }) => {
        const addTrackButton = page
            .locator('#tracklist')
            .getByRole('button', { name: '+' })
            .first();
        await expect(addTrackButton).toBeVisible();
        await addTrackButton.click();

        //Find and convert time to seconds
        const playList = page.locator('#playlist');
        await expect(playList).toBeVisible();
        const trackDurationText = playList.locator('>div>div>div:nth-child(3)');
        const trackDuration = await trackDurationText.textContent();
        const [minutes, seconds] = trackDuration.split(':').map(Number);
        const totalSeconds = minutes * 60 + seconds;

        // Verify that the total duration is updated correctly
        const playlistDuration = page.locator('#playlist-duration');
        await expect(playlistDuration).toBeVisible();
        await expect(playlistDuration).toHaveText(totalSeconds.toString());
    });
});
