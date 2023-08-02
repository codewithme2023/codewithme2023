

class HerokuappLoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('http://the-internet.herokuapp.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async clickLink(value){
      const linkXpath = `//a[normalize-space()="${value}"]`;
      const link = await this.page.waitForSelector(`xpath=${linkXpath}`);
      await link.click();
    }

    async enterEmail(value){
      const inputXpath = `//input[@id="username"]`;
      const input = await this.page.waitForSelector(`xpath=${inputXpath}`);
      await input.fill(value);

      const inputValue = await this.page.evaluate((element) => element.value, input);
      expect(inputValue).toBe(value);
    }

    async enterPassword(value){
      const inputXpath = `//input[@id="password"]`;
      const input = await this.page.waitForSelector(`xpath=${inputXpath}`);
      await input.fill(value);

      const inputValue = await this.page.evaluate((element) => element.value, input);
      expect(inputValue).toBe(value);
    }

    async clickLogin(){
      const loginButtonXpath = `//*[@id="login"]/button`;
      const loginButton = await this.page.waitForSelector(`xpath=${loginButtonXpath}`);
      await loginButton.click();
    }
  
    async checkLoginMessage() {
      const flashMessageXpath = '//*[@id="flash"]';
      const flashMessageElement = await this.page.waitForSelector(`xpath=${flashMessageXpath}`);
    
      const innerHTML = await this.page.evaluate((element) => element.innerHTML, flashMessageElement);
      const expectedText = "Your username is invalid!";
      
      expect(innerHTML).toContain(expectedText);
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
  
  module.exports = HerokuappLoginPage;
  