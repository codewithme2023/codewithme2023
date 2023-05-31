const { test, expect } = require('@playwright/test');

test('Example Test', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://example.com');

  // Perform actions on the page
  await page.fill('input[name="q"]', 'Playwright');
  await page.click('input[type="submit"]');

  // Wait for the search results to load
  await page.waitForSelector('#search');

  // Perform assertions
  const searchResults = await page.$eval('#search', (element) => element.textContent);
  expect(searchResults).toContain('Playwright');
});