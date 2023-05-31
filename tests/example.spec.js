const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to a website
  await page.goto('https://example.com');

  // Perform actions on the page
  await page.fill('input[name="q"]', 'Playwright');
  await page.click('input[type="submit"]');

  // Wait for the search results to load
  await page.waitForSelector('#search');

  // Perform assertions
  const searchResults = await page.$eval('#search', (element) => element.textContent);
  console.log('Search Results:', searchResults);

  // Close the browser
  await browser.close();
})();