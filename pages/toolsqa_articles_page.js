

class ToolsqaArticlesPage {
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

    async testArticleTitles(expectedTitles) {
      const articleTitles = await this.page.$$eval('.article__title', elements =>
        elements.map(element => element.textContent.trim())
      );
    
      expect(articleTitles).toEqual(expectedTitles);
    }

    async clickPagination(pageNumberOrLastFirst) {
      if (typeof pageNumberOrLastFirst === 'number') {
        const selector = `.pagination__controls li:nth-child(${pageNumberOrLastFirst + 1}) a`;
        await this.page.click(selector);
      } else if (pageNumberOrLastFirst.toLowerCase() === 'first') {
        const selector = '.pagination__controls li:first-child a';
        await this.page.click(selector);
      } else if (pageNumberOrLastFirst.toLowerCase() === 'last') {
        const selector = '.pagination__controls li:last-child a';
        await this.page.click(selector);
      } else {
        throw new Error('Invalid parameter. Provide either a page number or "First"/"Last".');
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
  
  module.exports = ToolsqaArticlesPage;
  