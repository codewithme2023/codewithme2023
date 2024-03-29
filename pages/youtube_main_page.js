

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
      const titleContainsValue = title.includes(value);
      expect(titleContainsValue);
    }

    async searchForVideo(value){
      await this.page.waitForTimeout(2000);

      const searchInputXPath = "(//*[@id='search'])[3]";
      await this.page.waitForSelector(`xpath=${searchInputXPath}`);
      const searchInput = await this.page.$(`xpath=${searchInputXPath}`);
      
      const searchButtonXpath = "//*[@id='search-icon-legacy']";
      await this.page.waitForSelector(`xpath=${searchButtonXpath}`);
      const searchButton = await this.page.$(`xpath=${searchButtonXpath}`);

      await this.page.waitForTimeout(2000);

      await searchInput.click();
      await searchInput.type(value);
      await searchButton.click();
  }

    async clickFirstVideo() {

      await this.page.waitForTimeout(2000);

      const firstVideoXPath = '//*[@id="dismissible"]/ytd-thumbnail';
      await this.page.waitForSelector(`xpath=${firstVideoXPath}`);
      const firstVideo = await this.page.$(`xpath=${firstVideoXPath}`);

      const secondVideoXPath = '(//*[@id="dismissible"]/ytd-thumbnail)[2]';
      await this.page.waitForSelector(`xpath=${secondVideoXPath}`);
      const secondVideo = await this.page.$(`xpath=${secondVideoXPath}`);

      const firstVideoTextXPath = '//*[@id="video-title"]';
      await this.page.waitForSelector(`xpath=${firstVideoTextXPath}`);
      const firstVideoText = await this.page.$(`xpath=${firstVideoTextXPath}`);

      await this.page.waitForTimeout(2000);

      const videoText = await firstVideoText.evaluate(element => element.textContent);
      console.log(videoText)
      if (videoText.includes("lofi")) {
        await secondVideo.click();
      } else {
        await firstVideo.click();
      }
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
  