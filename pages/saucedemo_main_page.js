

class SaucedemoMainPage {
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

    async openSidebar() {
      await this.page.waitForSelector('#react-burger-menu-btn');
      await this.page.click('#react-burger-menu-btn');
      await this.page.waitForTimeout(500); // Adjust the timeout as needed (in milliseconds)
    }
    
    async logoutFromSauceDemo() {
      await this.openSidebar();
      await this.page.waitForSelector('#logout_sidebar_link');
      await this.page.click('#logout_sidebar_link');
      await this.page.waitForSelector('#login_button_container');
    }

    async testHeaderNames(expectedHeaderTitles){
      await this.page.waitForSelector('.inventory_item_name');
      const headerElements = await this.page.$$('.inventory_item_name');
      const actualHeaderTitles = await Promise.all(
        headerElements.map(element => this.page.evaluate(el => el.textContent, element))
      );

      expect(actualHeaderTitles).toEqual(expectedHeaderTitles);
    }

    async testPrices(expectedPrices) {
      const priceElements = await this.page.$$('.inventory_item_price');
      const actualPrices = await Promise.all(
        priceElements.map(element => this.page.evaluate(el => el.textContent, element))
      );
    
      expect(actualPrices).toEqual(expectedPrices);
    }

    async clickAllAddToCartButtonsAndCheckText() {
      var addToCartButtons = await this.page.$$('.btn_inventory');
      
      for (const button of addToCartButtons) {
        await button.click();
      }

      addToCartButtons = await this.page.$$('.btn_inventory');
      
      const buttonTexts = await Promise.all(
        addToCartButtons.map(button => this.page.evaluate(el => el.textContent, button))
      );
      
      expect(buttonTexts).toEqual(Array(addToCartButtons.length).fill('Remove'));
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
  
  module.exports = SaucedemoMainPage;
  