

class DemoqaMainPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://demoqa.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async testH5Elements(expectedTitles) {
      const h5Titles = await this.page.$$eval('.card-body h5', elements =>
        elements.map(element => element.textContent.trim())
      );
    
      expect(h5Titles).toEqual(expectedTitles);
    }

    async clickH5ElementByText(text) {
      const elements = await this.page.$$('.card-body h5');
      const h5Element = elements.find(async element => {
        const elementText = await element.evaluate(node => node.textContent.trim());
        return elementText === text;
      });
    
      if (h5Element) {
        await h5Element.click();
      } else {
        throw new Error(`Could not find <h5> element with text "${text}"`);
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
  
  module.exports = DemoqaMainPage;
  