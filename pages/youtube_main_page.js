class YoutubeMainPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://youtube.com');
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

    async clickFirstVideo() {
      const firstVideoXPath = '//*[@id="dismissible"]/ytd-thumbnail';
      await this.page.waitForSelector(`xpath=${firstVideoXPath}`);
      await this.page.waitForTimeout(2000);
      const firstVideo = await this.page.$(`xpath=${firstVideoXPath}`);
      await firstVideo.click();
    }

    async acceptAllCookies() {
      const acceptButtonXPath = '//*[@id="content"]/div[2]/div[6]/div[1]/ytd-button-renderer[2]/yt-button-shape/button/yt-touch-feedback-shape/div/div[2]';
      await this.page.waitForSelector(`xpath=${acceptButtonXPath}`);
      const acceptButton = await this.page.$(`xpath=${acceptButtonXPath}`);
      await acceptButton.click();
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
  
  module.exports = YoutubeMainPage;
  