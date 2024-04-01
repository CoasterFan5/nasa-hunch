import { expect, test } from '@playwright/test';

test('index page has expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'NASA Hunch' })).toBeVisible();
});
