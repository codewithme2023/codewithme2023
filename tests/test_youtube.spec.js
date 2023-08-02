const { test } = require('@playwright/test');

const YoutubeMainPage = require('../pages/youtube_main_page.js');
const YoutubeVideoPage = require('../pages/youtube_video_page.js');
const YoutubeSearchPage = require('../pages/youtube_search_page.js');

test('Example Test', async ({ page }) => {
  test.setTimeout(120000);
  const youtubeMainPage = new YoutubeMainPage(page);
  const youtubeVideoPage = new YoutubeVideoPage(page);
  const youtubeSearchPage = new YoutubeSearchPage(page);

  await youtubeMainPage.navigate();
  await youtubeMainPage.acceptAllCookies();
  const title = await youtubeMainPage.getPageTitle(page);
  await youtubeMainPage.checkTitle(title, "youtube");
  await youtubeMainPage.searchForVideo("Playwright");
  await youtubeSearchPage.clickFirstVideo();
  await youtubeVideoPage.pauseYT();
  await youtubeVideoPage.scrollDownBy(500);
  await youtubeVideoPage.sortCommentsAfterNew();
  await youtubeVideoPage.clickLike();
  await youtubeVideoPage.sleep(5000)

});
