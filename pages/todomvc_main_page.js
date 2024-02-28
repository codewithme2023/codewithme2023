

class TodomvcMainPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://todomvc.com/examples/javascript-es5/dist/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async createTodoEntry(todoText) {
      const newTodoInput = await this.page.waitForSelector('.new-todo');
    
      await newTodoInput.type(todoText);
      await newTodoInput.press('Enter');
    
      await this.page.waitForSelector('.todo-list li', { text: todoText });
    
      const todoList = await this.page.waitForSelector('.todo-list');
      expect(await todoList.textContent()).toContain(todoText);
    }

    async checkTodoEntryFinished(todoText) {
      const entryXpath = `//label[contains(., "${todoText}")]/preceding-sibling::input[@class="toggle"]`;
      await this.page.waitForSelector(`xpath=${entryXpath}`);
      const entry = await this.page.$(`xpath=${entryXpath}`);

      await entry.click();

      const checkedEntryXpath = `//label[contains(., "${todoText}")]/ancestor::li`;
      await this.page.waitForSelector(`xpath=${checkedEntryXpath}`);
      const checkedEntry = await this.page.$(`xpath=${checkedEntryXpath}`);
    
      expect(checkedEntry).toBeTruthy();
    }

    async clickFilter(filterName) {
      const filterLink = await this.page.waitForSelector(`.filters a[href="#/${filterName.toLowerCase()}"]`);
      await filterLink.click();
    }
    
    async checkNumberOfListEntries(expectedCount) {
      const listItems = await this.page.$$('.todo-list li');
      const actualCount = listItems.length;
    
      expect(actualCount).toBe(expectedCount);
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
  
  module.exports = TodomvcMainPage;
  