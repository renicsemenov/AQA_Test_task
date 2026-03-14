import { test as base, expect as baseExpect } from '@playwright/test';

const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },
});

const expect = baseExpect;

export { expect, test };
