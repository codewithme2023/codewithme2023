const { test } = require('@playwright/test');

const TodomvcMainPage = require('../pages/todomvc_main_page.js')

test('Todomvc Test', async ({ page } ) => {
  test.setTimeout(120000);

  const todomvcMainPage = new TodomvcMainPage(page);

  await todomvcMainPage.navigate();
  await todomvcMainPage.createTodoEntry("Test 1");
  await todomvcMainPage.createTodoEntry("Test 2");
  await todomvcMainPage.createTodoEntry("Test 3");

  await todomvcMainPage.checkTodoEntryFinished("Test 1");
  await todomvcMainPage.checkTodoEntryFinished("Test 2");
  await todomvcMainPage.checkTodoEntryFinished("Test 3");

  await todomvcMainPage.clickFilter("Active");
  await todomvcMainPage.checkNumberOfListEntries(0);
  
  await todomvcMainPage.clickFilter("Completed");
  await todomvcMainPage.checkNumberOfListEntries(3);

});
