const { test, expect } = require('@playwright/test');

test.describe('Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('has correct page title', async ({ page }) => {
        await expect(page).toHaveTitle(/AQA Test task/i);
    });

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
        await expect(page.getByText('Summer Breeze')).toBeVisible();
        // Verify that non-matching songs are not visible
        await expect(page.getByText('Autumn Leaves')).not.toBeVisible();
        await expect(page.getByText('Winter Winds')).not.toBeVisible();
        await expect(page.getByText('Spring Dance')).not.toBeVisible();
        await expect(page.getByText('Rainy Mood')).not.toBeVisible();
    });

    test('displays no results message when search does not match any songs', async ({ page }) => {
        const searchInput = page.getByRole('textbox', { name: /search/i });
        await searchInput.pressSequentially('NonExistingSong');

        await expect(page.getByText('Not found')).toBeVisible();
    });
});
