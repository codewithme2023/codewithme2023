const { test } = require('@playwright/test');

const DemoqaMainPage = require('../pages/demoqa_main_page.js');
const DemoqaElementsPage = require('../pages/demoqa_elements_page.js');

test('Demoqa Test', async ({ page } ) => {
  test.setTimeout(120000);

  const demoqaMainPage = new DemoqaMainPage(page);
  const demoqaElementsPage = new DemoqaElementsPage(page);

  await demoqaMainPage.navigate();

  await demoqaMainPage.testH5Elements([
    "Elements",
    "Forms",
    "Alerts, Frame & Windows",
    "Widgets",
    "Interactions",
    "Book Store Application",
  ]);

  await demoqaMainPage.clickH5ElementByText("Elements");
  await demoqaElementsPage.clickH5ElementByText("Text Box");
  await demoqaElementsPage.fillForm();
  await demoqaElementsPage.clickH5ElementByText("Radio Button");
  await demoqaElementsPage.testRadioSelection("Yes");
  await demoqaElementsPage.testRadioSelection("Impressive");

});
