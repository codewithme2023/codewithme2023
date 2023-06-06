const { test, expect } = require('@playwright/test');

test('Example Test', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://example.com');

  // Get the page title
  const title = await page.title();
  console.log('Page title:', title);

  // Assert that the title contains a specific string
  await expect(title).toContain('Example');
});
