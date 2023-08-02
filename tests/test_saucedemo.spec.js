const { test } = require('@playwright/test');

const SaucedemoMainPage = require('../pages/saucedemo_main_page.js');
const SaucedemoLoginPage = require('../pages/saucedemo_login_page.js')

test('Saucedemo Test', async ({ page } ) => {
  test.setTimeout(120000);

  const saucedemoMainPage = new SaucedemoMainPage(page);
  const saucedemoLoginPage = new SaucedemoLoginPage(page);

  await saucedemoMainPage.navigate();

  await saucedemoLoginPage.loginToSauceDemo("standard_user", "secret_sauce");
  await saucedemoMainPage.logoutFromSauceDemo();

  await saucedemoLoginPage.loginToSauceDemo("problem_user", "secret_sauce");
  await saucedemoMainPage.logoutFromSauceDemo();

  await saucedemoLoginPage.loginToSauceDemo("performance_glitch_user", "secret_sauce");
  await saucedemoMainPage.logoutFromSauceDemo();

  await saucedemoLoginPage.loginToSauceDemo("standard_user", "secret_sauce");

  await saucedemoMainPage.testHeaderNames([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ]);

  await saucedemoMainPage.testPrices(['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99']);
  await saucedemoMainPage.clickAllAddToCartButtonsAndCheckText();

});
