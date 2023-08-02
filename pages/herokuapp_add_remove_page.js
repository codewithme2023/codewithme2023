

class HerokuappAddRemovePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('http://the-internet.herokuapp.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async clickLink(value){
      const linkXpath = `//a[normalize-space()="${value}"]`;
      const link = await this.page.waitForSelector(`xpath=${linkXpath}`);
      await link.click();
    }

    async clickElementMultipleTimes(times) {
      const linkXpath = `//*[@id="content"]/div/button`;
      for (let i = 0; i < times; i++) {
        const link = await this.page.waitForSelector(`xpath=${linkXpath}`);
        await link.click();
      }
    }

    async deleteAllGeneratedElements() {
      const elementsXpath = `//*[@id="elements"]/button`;
      const elements = await this.page.$$(elementsXpath); // Use page.$$ to get multiple elements
      for (const element of elements) {
        await element.click();
      }
    }    

    async expectElementsToBeRemoved() {
      const afterRemovalElementsXpath = `//*[@id="elements"]/button`;
      expect(this.page.locator(`xpath=${afterRemovalElementsXpath}`)).toHaveCount(0)
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
  
  module.exports = HerokuappAddRemovePage;
  