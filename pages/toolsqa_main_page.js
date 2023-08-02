

class ToolsqaMainPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://www.toolsqa.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async clickLatestArticlesLink() {
      await this.page.click('a[href="/articles"]');
    }

    async testNavbarLinks(expectedLinks) {
      const navbarLinks = await this.page.$$eval('.navbar__links li', elements =>
        elements.map(element => element.textContent.trim())
      );
    
      expect(navbarLinks).toEqual(expectedLinks);
    }

    async testCategoryNames(expectedCategories) {
      const categoryElements = await this.page.$$('.category__name');
      const actualCategories = await Promise.all(
        categoryElements.map(element => this.page.evaluate(el => el.textContent, element))
      );
    
      expect(actualCategories).toEqual(expectedCategories);
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
  
  module.exports = ToolsqaMainPage;
  