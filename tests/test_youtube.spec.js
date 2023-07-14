const { test, expect } = require('@playwright/test');
const YoutubeMainPage = require('c:/repos/codewithme2023/pages/youtube_main_page.js');
const YoutubeVideoPage = require('../pages/youtube_video_page.js');
const YoutubeSearchPage = require('../pages/youtube_search_page.js');
const GoogleLoginPage = require('../pages/google_login_page.js');

test('Example Test', async ({ page }) => {
  const youtubeMainPage = new YoutubeMainPage(page);
  const youtubeVideoPage = new YoutubeVideoPage(page);
  const youtubeSearchPage = new YoutubeSearchPage(page);
  const googleLoginPage = new GoogleLoginPage(page);

  await youtubeMainPage.navigate();
  await youtubeMainPage.acceptAllCookies();
  const title = await youtubeMainPage.getPageTitle(page);
  await youtubeMainPage.checkTitle(title, "youtube");
  await youtubeMainPage.clickFirstVideo();
  debugger;
  await youtubeVideoPage.pauseYT();
  await youtubeVideoPage.scrollDownBy(500);
  await youtubeVideoPage.clickComment();
  await googleLoginPage.googleLogin();
  await youtubeVideoPage.writeComment("Ich habe kommentiert");
  await youtubeVideoPage.sleep(65000);

});
