const { expect } = require("@playwright/test");


class JqueryDownloadPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://jquery.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async testDownloadLinkText(expectedText) {
      const divContentSelector = 'div#content';
      await this.page.waitForSelector(divContentSelector);
    
      const links = await this.page.$$(divContentSelector + ' a');
    
      for (const link of links) {
        const actualText = await link.textContent();
        const testResult = actualText.trim() === expectedText;
        expect(testResult);
      }
    }  

    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    async takeScreenshot(fileName) {
      await this.page.screenshot({ path: fileName });
      console.log(`Screenshot saved as ${fileName}`);
    }
  
    async clickElementByText(text) {
      await this.page.click(`text=${text}`);
    }
  
    async typeText(selector, text) {
      await this.page.fill(selector, text);
    }
  }

  function arraysHaveSameMembers(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
  
    for (const item of arr1) {
      if (!arr2.includes(item)) return false;
    }
  
    return true;
  }
  
  module.exports = JqueryDownloadPage;
  