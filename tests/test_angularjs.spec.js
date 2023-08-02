const { test } = require('@playwright/test');

const AngularjsMainPage = require('../pages/angularjs_main_page.js')

test('Example Test', async ({ page } ) => {
  test.setTimeout(120000);

  const angularjsMainPage = new AngularjsMainPage(page);

  await angularjsMainPage.navigate();
  await angularjsMainPage.clickOnTabAndCheckActive("todo.js");
  await angularjsMainPage.clickOnTabAndCheckActive("todo.css");
  await angularjsMainPage.clickOnTabAndCheckActive("index.html");

  await angularjsMainPage.clickInputByText('learn AngularJS');
  await angularjsMainPage.clickInputByText('build an AngularJS app');

  await angularjsMainPage.addNewEntry('Learn Playwright');
  await angularjsMainPage.addNewEntry('Write Tests');

  await angularjsMainPage.clickInputByText('Learn Playwright');
  await angularjsMainPage.clickInputByText('Write Tests');

  await angularjsMainPage.countListEntriesAndExpect(4);
  await angularjsMainPage.clickArchiveButton();
  await angularjsMainPage.countListEntriesAndExpect(0);

});
