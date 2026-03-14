import { expect, test } from '../../helpers/base.js';
import { TRACK_NAMES } from '../../helpers/constants.js';

const TRACK_NAME = TRACK_NAMES[1]; // 'Autumn Leaves'

test.describe('Add track', () => {
    test('playlist section is not shown by default', async ({ page }) => {
        await expect(page.getByText('Your Playlist')).not.toBeVisible();
    });

    test('adds a track to the playlist', async ({ page }) => {
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
