// @ts-check
global.expect = require('@playwright/test').expect;

const { defineConfig, devices } = require('@playwright/test');

const isCI = !!process.env.CI;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests', 
  fullyParallel: true, 
  forbidOnly: isCI, 
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [['html', 'list']],
  
  use: {
    headless : isCI,
    screenshot : "on",
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },   
  ],
});

