
class YoutubeSearchPage{
    constructor(page){
        this.page = page;
    }

    async getPageTitle(page) {
        return await page.title();
    }

    async checkTitle(title, value){
        if (title.includes(value)) {
            console.log('Title contains "' + value + '"');
          } else {
            console.log('Title does not contain "' + value + '"');
          }
    }

    async clickFirstVideo() {

        await this.page.waitForTimeout(2000);
  
        const firstVideoXPath = '//*[@id="contents"]/ytd-video-renderer[1]';
        await this.page.waitForSelector(`xpath=${firstVideoXPath}`);
        const firstVideo = await this.page.$(`xpath=${firstVideoXPath}`);
        await firstVideo.click();

      }

    async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async clickElementByText(page, text) {
    await page.click(`text=${text}`);
    }

    async typeText(page, selector, text) {
        await page.fill(selector, text);
    }

}


module.exports = YoutubeSearchPage;