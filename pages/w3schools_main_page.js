class W3schoolsMainPage {
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

    async acceptAllCookies() {
      const acceptButtonXPath = '//*[@id="accept-choices"]';
      await this.page.waitForSelector(`xpath=${acceptButtonXPath}`);
      const acceptButton = await this.page.$(`xpath=${acceptButtonXPath}`);
      await acceptButton.click();
    }

    async clickTutorial(language) {
      const tutorialXpath = `//a[normalize-space()="${language}"]`;
      const tutorial = await this.page.waitForSelector(`xpath=${tutorialXpath}`);
      await tutorial.click();
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
  
  module.exports = W3schoolsMainPage;
  