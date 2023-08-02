

class HerokuappMainPage {
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
  
  module.exports = HerokuappMainPage;
  