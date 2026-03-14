import { expect, test } from '../../helpers/base.js';
import { EMPTY_PLAYLIST_TEXT, TRACK_NAMES } from '../../helpers/constants.js';
import { parseDurationToSeconds } from '../../helpers/utils.js';

const TRACK_NAMES_TO_ADD = [TRACK_NAMES[0], TRACK_NAMES[2], TRACK_NAMES[4]]; // 'Summer Breeze', 'Winter Winds', 'Rainy Mood'

test.describe('Work with group of tracks', () => {
    test('Add multiple tracks and verify total duration', async ({ page }) => {
        const trackList = page.locator('#tracklist');
        await expect(trackList).toBeVisible();

        const trackNamesCheckboxes = TRACK_NAMES_TO_ADD.map((name) =>
            trackList.getByText(name).locator('../..').getByRole('checkbox'),
        );

        expect(trackNamesCheckboxes.length).toBe(TRACK_NAMES_TO_ADD.length);

        for (const checkbox of trackNamesCheckboxes) {
            await expect(checkbox).toBeVisible();
            await checkbox.check();
        }

        // Click the "Add selected" button
        const addButtonLocator = new RegExp(`Add ${trackNamesCheckboxes.length} tracks`, 'i');
        const addSelectedButton = page.getByRole('button', { name: addButtonLocator });
        await expect(addSelectedButton).toBeVisible();
        await addSelectedButton.click();

        // Check that all selected tracks are added to the playlist
        const playList = page.locator('#playlist');
        await expect(playList).toBeVisible();

        for (const trackName of TRACK_NAMES_TO_ADD) {
            await expect(playList.getByText(trackName)).toBeVisible();
        }

        let totalDurationInSeconds = 0;
        const multiTrackDurationLocators = await playList.getByText(/\d+:\d+/).all();
        for (const trackDurationLocator of multiTrackDurationLocators) {
            const trackDurationText = await trackDurationLocator.textContent();
            totalDurationInSeconds += parseDurationToSeconds(trackDurationText);
        }

        // Check that the total duration is updated correctly
        const playlistDuration = page.locator('#playlist-duration');
        await expect(playlistDuration).toBeVisible();
        await expect(playlistDuration).toHaveText(totalDurationInSeconds.toString());

        // Select all tracks in the playlist
        const playlistTrackCheckboxes = await playList.getByRole('checkbox').all();
        for (const checkbox of playlistTrackCheckboxes) {
            await expect(checkbox).toBeVisible();
            await checkbox.check();
        }

        // Click the "Remove tracks" button
        const yourPlaylistTracksCount = await playList.locator('>div>div').count();
        const removeButtonLocator = new RegExp(`Remove ${yourPlaylistTracksCount} tracks`, 'i');
        const removeSelectedButton = page.getByRole('button', { name: removeButtonLocator });
        await expect(removeSelectedButton).toBeVisible();
        await removeSelectedButton.click();

        // Verify that the playlist is empty and total duration is reset
        await expect(playList).not.toBeVisible();
        await expect(playlistDuration).toHaveText(EMPTY_PLAYLIST_TEXT);
    });
});
