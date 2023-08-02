const puppeteer = require('puppeteer');

class TestResultAnalyzer {
  constructor(reportFilePath) {
    this.reportFilePath = reportFilePath;
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
      const fileUrl = `file://${this.reportFilePath}`;
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000); // Adjust the waiting time based on your page's loading requirements
      const pageContent = await page.mainFrame();
      return pageContent;
    } catch (error) {
      throw new Error('Error loading the HTML report in the browser.');
    }
  }
}

module.exports = TestResultAnalyzer;
