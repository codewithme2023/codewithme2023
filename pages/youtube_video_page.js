
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

    async scrollDownBy(value) {
        await this.page.evaluate(() => {
            window.scrollBy(0, value);
        });
    } 
    
    async clickComment() {
        const commentAreaXpath = '//*[@id="simplebox-placeholder"]'; 
        const commentArea = await this.page.waitForSelector(`xpath=${commentAreaXpath}`);
        await commentArea.click();
    }

    async writeComment(commentText) {
        const commentAreaXpath = '//*[@id="simplebox-placeholder"]'; 
        const commentArea = await this.page.waitForSelector(`xpath=${commentAreaXpath}`);
        await commentArea.click();
        const commentInputXPath = "//*[@id='header']//input";
        await this.page.waitForSelector(`xpath=${commentInputXPath}`);
        const commentInput = await this.page.$(`xpath=${commentInputXPath}`);
        await commentInput.click();
        await commentInput.type(commentText);
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