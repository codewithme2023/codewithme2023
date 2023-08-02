

class JqueryMainPage {
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

    async clickLink(value) {
      const linkXpath = `//a[normalize-space()="${value}"]`;
      const link = await this.page.waitForSelector(`xpath=${linkXpath}`);
      await link.click();
    }

    async testHeaderDropdowns(expectedSupportLinks) {
      await this.page.click('a[href="https://jquery.org/support/"]');

      const supportLinks = await this.page.$$eval('li.dropdown ul li a', (links) =>
        links.map((link) => link.textContent.trim())
      );
    
      arraysHaveSameMembers(supportLinks, expectedSupportLinks);
    }

    async testContributeDropdown(expectedContributeLinks) {
      await this.page.click('a[href="https://contribute.jquery.org/"]');
    
      const contributeLinks = await this.page.$$eval('li.dropdown ul li a', (links) =>
        links.map((link) => link.textContent.trim())
      );
    
      arraysHaveSameMembers(contributeLinks, expectedContributeLinks);
    }

    async testResourcesSection(expectedResourceLinks) {
      const resourceLinks = await this.page.$$eval('.resources ul li a', (links) =>
        links.map((link) => link.textContent.trim())
      );
    
      arraysHaveSameMembers(resourceLinks, expectedResourceLinks);
    }

    async testABriefLookSection(expectedBriefLookItems) {
      await this.page.waitForSelector('#home-content');
    
      const briefLookItems = await this.page.$$eval('#home-content h3', (headings) =>
        headings.map((heading) => heading.textContent.trim())
      );
    
      arraysHaveSameMembers(briefLookItems, expectedBriefLookItems);
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
  
  module.exports = JqueryMainPage;
  