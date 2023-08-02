const { test } = require('@playwright/test');

const HerokuappMainPage = require('../pages/herokuapp_main_page.js')
const HerokuappDropdownPage = require('../pages/herokuapp_dropdown_page.js')
const HerokuappInputsPage = require('../pages/herokuapp_inputs_page.js')
const HerokuappAddRemovePage = require('../pages/herokuapp_add_remove_page.js')
const HerokuappLoginPage = require('../pages/herokuapp_login_page.js')

test('Herokuapp Test', async ({ page } ) => {
  test.setTimeout(120000);

  const herokuappMainPage = new HerokuappMainPage(page);
  const herokuappDropdownPage = new HerokuappDropdownPage(page);
  const herokuappInputsPage = new HerokuappInputsPage(page);
  const herokuappAddRemovePage = new HerokuappAddRemovePage(page);
  const herokuappLoginPage = new HerokuappLoginPage(page);

  await herokuappMainPage.navigate();
  await herokuappMainPage.clickLink("Dropdown");

  await herokuappDropdownPage.selectOptionFromDropDown("Option 1");
  await herokuappDropdownPage.selectOptionFromDropDown("Option 2");

  await herokuappMainPage.navigate();
  await herokuappMainPage.clickLink("Inputs");

  await herokuappInputsPage.insertNumber("15");
  await herokuappInputsPage.insertNumber("30");

  await herokuappMainPage.navigate();
  await herokuappMainPage.clickLink("Add/Remove Elements");

  await herokuappAddRemovePage.clickElementMultipleTimes(15);
  await herokuappAddRemovePage.deleteAllGeneratedElements();
  await herokuappAddRemovePage.expectElementsToBeRemoved();

  await herokuappMainPage.navigate();
  await herokuappMainPage.clickLink("Form Authentication");

  await herokuappLoginPage.enterEmail("test123@test.de");
  await herokuappLoginPage.enterPassword("loveyou");
  await herokuappLoginPage.clickLogin();
  await herokuappLoginPage.checkLoginMessage();

});
