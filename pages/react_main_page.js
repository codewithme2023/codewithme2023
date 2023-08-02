
class ReactMainPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://react.dev/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async searchValue(value){
      const boxXpath = `//*[@id="__next"]/div[3]/nav/div/div[2]`;
      const box = await this.page.waitForSelector(`xpath=${boxXpath}`);
      await box.click();
      
      const inputXpath = `//*[@id="docsearch-input"]`;
      const input = await this.page.waitForSelector(`xpath=${inputXpath}`);
      await input.fill(value);
      

      const inputValue = await this.page.evaluate((element) => element.value, input);
      expect(inputValue).toBe(value);

    }

    async countAndCompareListItems(expectedCount) {
      await this.page.waitForSelector('.DocSearch-Hit');

      const listItems = await this.page.$$('.DocSearch-Hit');
    
      const actualCount = listItems.length;
    
      expect(actualCount).toEqual(expectedCount);
    }

    async closeDialog(page) {
      const logoXpath = `/html/body/div[2]`;
      const closeButton = await this.page.waitForSelector(`xpath=${logoXpath}`);
      
      await closeButton.click();
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
  
  module.exports = ReactMainPage;
  