
class YoutubeVideoPage{
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

    async pauseYT() {
        const pauseButtonXPath = '//button[@class="ytp-play-button ytp-button"]';
        const pauseButton = await this.page.waitForSelector(`xpath=${pauseButtonXPath}`);
        await pauseButton.click();
      }

    async

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


module.exports = YoutubeVideoPage;