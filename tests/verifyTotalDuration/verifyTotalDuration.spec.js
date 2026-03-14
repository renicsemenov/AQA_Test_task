import { test, expect } from '../../helpers/base.js';
import { parseDurationToSeconds } from '../../helpers/utils.js';

test.describe('Verify total duration', () => {
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
        const totalSeconds = parseDurationToSeconds(trackDuration);

        // Verify that the total duration is updated correctly
        const playlistDuration = page.locator('#playlist-duration');
        await expect(playlistDuration).toBeVisible();
        await expect(playlistDuration).toHaveText(totalSeconds.toString());
    });
});
