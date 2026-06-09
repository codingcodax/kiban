import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Kiban/);
});

test('page should load correctly', async ({ page }) => {
	await page.goto('/');

	// Check if some content is present
	const body = await page.locator('body');
	await expect(body).toBeVisible();
});
