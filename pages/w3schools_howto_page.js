const { expect } = require("@playwright/test");

class W3schoolsHowtoPage {
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

    async openSliderPage(value){
      const numberXPath = `(//a[text()='${value}'])[1]`;
      await this.page.waitForSelector(`xpath=${numberXPath}`);
      const number = await this.page.$(`xpath=${numberXPath}`);
      await number.click();
    }

    async closeSlider(){
      const slider1XPath = `(//div[@class='slider'])[1]`;
      const slider2XPath = `(//div[@class='slider'])[2]`;
      await this.page.waitForSelector(`xpath=${slider1XPath}`);
      await this.page.waitForSelector(`xpath=${slider2XPath}`);
      const slider1 = await this.page.$(`xpath=${slider1XPath}`);
      const slider2 = await this.page.$(`xpath=${slider2XPath}`);
      await slider1.click();
      await slider2.click();
    }

    async closeSliderRound(){
      const slider1XPath = `(//div[@class='slider round'])[1]`;
      const slider2XPath = `(//div[@class='slider round'])[2]`;
      await this.page.waitForSelector(`xpath=${slider1XPath}`);
      await this.page.waitForSelector(`xpath=${slider2XPath}`);
      const slider1 = await this.page.$(`xpath=${slider1XPath}`);
      const slider2 = await this.page.$(`xpath=${slider2XPath}`);
      await slider1.click();
      await slider2.click();
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

    async clickButton(value) {
      const pythonQuizButtonXpath = `//a[normalize-space()="${value}"]`;
      const pythonQuizButton = await this.page.waitForSelector(`xpath=${pythonQuizButtonXpath}`);
      await pythonQuizButton.click();
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
  
  module.exports = W3schoolsHowtoPage;
  