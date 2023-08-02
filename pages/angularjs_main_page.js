

class AngularjsMainPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://angularjs.org/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async clickOnTabAndCheckActive(value){
      const tabXPath = `//a[text()="${value}"]`;
      await this.page.waitForSelector(`xpath=${tabXPath}`);
      const tab = await this.page.$(`xpath=${tabXPath}`);
      const parentTabElement = await tab.evaluateHandle((element) => element.parentElement);

      await tab.click();

      const isActive = await parentTabElement.evaluate((element) =>
        element.classList.contains('active')
      );
  
      expect(isActive == true);
    }

    async clickInputByText(spanText) {
      const spanXPath = `//label//span[contains(text(), "${spanText}")]`;
      await this.page.waitForSelector(`xpath=${spanXPath}`);
      const spanElement = await this.page.$(`xpath=${spanXPath}`);
      const parentLabelElement = await spanElement.evaluateHandle((element) => element.parentElement);
      const inputElement = await parentLabelElement.$('input[type="checkbox"]');
      await inputElement.click();
    }

    async clickArchiveButton() {
      const archiveButtonSelector = 'a[ng-click="todoList.archive()"]';
      await this.page.waitForSelector(archiveButtonSelector);
      const archiveButton = await this.page.$(archiveButtonSelector);
      await archiveButton.click();
    }

    async addNewEntry(text) {
      const inputSelector = 'input[ng-model="todoList.todoText"]';
      await this.page.waitForSelector(inputSelector);
      await this.page.type(inputSelector, text);
      
      const addButtonSelector = 'input[type="submit"].btn-primary';
      await this.page.waitForSelector(addButtonSelector);
      const addButton = await this.page.$(addButtonSelector);
      await addButton.click();
    }

    async countListEntriesAndExpect(count) {
      const listSelector = 'ul.unstyled';
      await this.page.waitForSelector(listSelector);
      const list = await this.page.$(listSelector);
      const entries = await list.$$eval('li', liElements => liElements.length);
      expect(entries == count);
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
  
  module.exports = AngularjsMainPage;
  