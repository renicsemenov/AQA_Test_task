import { test as base, expect } from '@playwright/test';

const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },
});

export { test, expect };
