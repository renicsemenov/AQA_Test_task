const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

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
    await expect(tracklist.getByText('Summer Breeze')).toBeVisible();
    await expect(tracklist.getByText('Autumn Leaves')).toBeVisible();
    await expect(tracklist.getByText('Winter Winds')).toBeVisible();
    await expect(tracklist.getByText('Spring Dance')).toBeVisible();
    await expect(tracklist.getByText('Rainy Mood')).toBeVisible();
  });

  test('shows empty playlist with no duration by default', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /total playlist tracks duration/i }),
    ).toBeVisible();
    await expect(page.locator('#playlist-duration')).toHaveText('No tracks on playlist');
  });
});
