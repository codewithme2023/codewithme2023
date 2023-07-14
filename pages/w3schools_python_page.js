class W3schoolsJavascriptPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://www.w3schools.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      if (title.includes(value)) {
        console.log('Title contains "' + value + '"');
      } else {
        console.log('Title does not contain "' + value + '"');
      }
    }

    async scrollDownBy(pixel) {
      await this.page.waitForTimeout(2000);

      await this.page.evaluate((scrollPixel) => {
        window.scrollBy(0, scrollPixel);
      }, pixel);
    }

    async clickTutorial(language) {
      const tutorialXpath = `//a[normalize-space()="${language}"]`;
      const tutorial = await this.page.waitForSelector(`xpath=${tutorialXpath}`);
      await tutorial.click();
    }
    
    async checkHeaderExistence(header) {
      await this.page.locator(`//h2[normalize-space()="${header}"]`).isVisible();
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
  
  module.exports = W3schoolsJavascriptPage;
  