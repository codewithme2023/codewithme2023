
class GoogleLoginPage{
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

    async googleLogin(emailText){
        const emailInputXPath = "//input";
        await this.page.waitForSelector(`xpath=${emailInputXPath}`);
        const emailInput = await this.page.$(`xpath=${emailInputXPath}`);
        await emailInput.click();
        await emailInput.type(emailText);
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


module.exports = GoogleLoginPage;