const puppeteer = require('puppeteer');
const path = require('path');

class TestResultAnalyzer {
  constructor(reportFileName) {
    this.reportFilePath = path.resolve(__dirname, '../playwright-report', reportFileName);
  }

  async getTestResults() {
    // ... (existing getTestResults() implementation)
  }

  async getFailedTestsCount() {
    const pageContent = await this.getReportPageContent();
    const failedTestsCountElement = await pageContent.$x('(//*[@class="d-inline counter"])[3]');
    if (failedTestsCountElement.length === 0) {
      console.log("No matched element for failedTestsCount");
      return 0;
    }
    const failedTestsCount = parseInt(await pageContent.evaluate(element => element.textContent, failedTestsCountElement[0]));
    return failedTestsCount;
  }

  async getPassedTestsCount() {
    const pageContent = await this.getReportPageContent();
    const passedTestsCountElement = await pageContent.$x('(//*[@class="d-inline counter"])[2]');
    if (passedTestsCountElement.length === 0) {
      console.log("No matched element for passedTestsCount");
      return 0;
    }
    const passedTestsCount = parseInt(await pageContent.evaluate(element => element.textContent, passedTestsCountElement[0]));
    return passedTestsCount;
  }

  async getReportPageContent() {
    try {
      const browser = await puppeteer.launch({ headless: "new" }); // Use headless: "new" option
      const page = await browser.newPage();
      const fileUrl = `file:///${this.reportFilePath.replace(/\\/g, '/')}`;
      const navigationPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded' }); // Wait for navigation to complete
      await page.goto(fileUrl);
      await navigationPromise; // Wait for the navigation event to complete
      await page.waitForTimeout(2000); // Adjust the waiting time based on your page's loading requirements
      const pageContent = await page.mainFrame();
      return pageContent;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TestResultAnalyzer;
