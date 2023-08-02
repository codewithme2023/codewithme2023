

class HerokuappInputsPage {
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

    async insertNumber(value){
      const inputXpath = `//*[@id="content"]/div/div/div/input`;
      const input = await this.page.waitForSelector(`xpath=${inputXpath}`);
      await input.fill(value);

      const inputValue = await this.page.evaluate((element) => element.value, input);
      expect(inputValue).toBe(value);

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
  
  module.exports = HerokuappInputsPage;
  