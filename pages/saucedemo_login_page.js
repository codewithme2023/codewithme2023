

class SaucedemoLoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async loginToSauceDemo(username, password) {
      try {
        await this.page.waitForSelector('#user-name');
        await this.page.waitForSelector('#password');
    
        await this.page.type('#user-name', username);
        await this.page.type('#password', password);
    
        await this.page.click('#login-button');
    
        await this.page.waitForSelector('.inventory_list');
    
        
      } catch (error) {

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
  
  module.exports = SaucedemoLoginPage;
  