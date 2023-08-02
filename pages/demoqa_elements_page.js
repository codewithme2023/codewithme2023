

class DemoqaElementsPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://demoqa.com/');
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async checkTitle(title, value) {
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async fillForm(){
      await this.page.type('#userName', 'John Doe');
      await this.page.type('#userEmail', 'john.doe@example.com');
      await this.page.type('#currentAddress', '123 Main St');
      await this.page.type('#permanentAddress', '456 Park Ave');
    
      await this.page.focus('#permanentAddress');
      await this.page.keyboard.press('Enter');
    }

    async clickH5ElementByText(text) {
      await this.page.click(`span:has-text("${text}")`);
    }

    async testRadioSelection(selectedOption) {
      const labelSelector = `//label[text()='${selectedOption}']`;

      await this.page.waitForSelector(`xpath=${labelSelector}`);
      const labelElementHandle = await this.page.$(`xpath=${labelSelector}`);

      await labelElementHandle.click();

      const resultSelector = '.mt-3 .text-success';
      await this.page.waitForSelector(resultSelector);

      const actualResult = await this.page.$eval(resultSelector, (el) => el.textContent.trim());
      expect(actualResult).toEqual(selectedOption);
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
  
  module.exports = DemoqaElementsPage;
  