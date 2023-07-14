
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

      async scrollDownBy(pixel) {
        await this.page.waitForTimeout(5000);

        await this.page.evaluate((scrollPixel) => {
          window.scrollBy(0, scrollPixel);
        }, pixel);
      }
    
    async sortCommentsAfterNew() {
        const sortButtonXpath = '(//*[@id="label"])[3]'; 
        const sortButton = await this.page.waitForSelector(`xpath=${sortButtonXpath}`);
        await sortButton.click();

        const newButtonXpath = '(//*[@id="menu"]/a)[2]';
        const newButton = await this.page.waitForSelector(`xpath=${newButtonXpath}`);
        await newButton.click();
    }

    async clickLike(){
        const sortButtonXpath = '(//*[@id="segmented-like-button"]/ytd-toggle-button-renderer/yt-button-shape/button/yt-touch-feedback-shape/div)[1]'; 
        const sortButton = await this.page.waitForSelector(`xpath=${sortButtonXpath}`);
        await sortButton.click();
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


module.exports = YoutubeVideoPage;