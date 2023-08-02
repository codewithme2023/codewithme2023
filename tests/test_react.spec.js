const { test } = require('@playwright/test');

const ReactMainPage = require('../pages/react_main_page.js');

test('React Test', async ({ page } ) => {
  test.setTimeout(120000);

  const reactMainPage = new ReactMainPage(page);

  await reactMainPage.navigate();

  await reactMainPage.searchValue("Timo");
  await reactMainPage.countAndCompareListItems(5);
  await reactMainPage.sleep(5000);
  await reactMainPage.closeDialog();

});
