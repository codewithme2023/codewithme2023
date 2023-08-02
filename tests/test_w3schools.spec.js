const { test } = require('@playwright/test');

const W3schoolsMainPage = require('../pages/w3schools_main_page.js')
const W3schoolsJavascriptPage = require('../pages/w3schools_javascript_page.js')
const W3schoolsPythonPage = require('../pages/w3schools_python_page.js')
const W3schoolsHowtoPage = require('../pages/w3schools_howto_page.js')

test('W3schools Test', async ({ page } ) => {
  test.setTimeout(120000);

  const w3schoolsMainPage = new W3schoolsMainPage(page);
  const w3schoolsJavascriptPage = new W3schoolsJavascriptPage(page);
  const w3schoolsPythonPage = new W3schoolsPythonPage(page);
  const w3schoolsHowtoPage = new W3schoolsHowtoPage(page);

  await w3schoolsMainPage.navigate();
  await w3schoolsMainPage.acceptAllCookies();
  await w3schoolsMainPage.clickTutorial("JAVASCRIPT");
  await w3schoolsJavascriptPage.scrollDownBy(1000);
  await w3schoolsJavascriptPage.clickTutorial("JS Variables");
  await w3schoolsJavascriptPage.checkHeaderExistence("When to Use var, let, or const?");
  await w3schoolsJavascriptPage.checkHeaderExistence("Just Like Algebra");
  await w3schoolsJavascriptPage.checkHeaderExistence("JavaScript Identifiers");
  await w3schoolsJavascriptPage.checkHeaderExistence("The Assignment Operator");
  await w3schoolsJavascriptPage.checkHeaderExistence("JavaScript Data Types");
  await w3schoolsJavascriptPage.checkHeaderExistence("Declaring a JavaScript Variable");
  await w3schoolsJavascriptPage.checkHeaderExistence("One Statement, Many Variables");

  await w3schoolsJavascriptPage.clickTutorial("PYTHON");
  await w3schoolsPythonPage.checkHeaderExistence()
  await w3schoolsPythonPage.checkHeaderExistence("Learning by Examples");
  await w3schoolsPythonPage.checkHeaderExistence("Python File Handling");
  await w3schoolsPythonPage.checkHeaderExistence("Python Database Handling");
  await w3schoolsPythonPage.clickButton("Python Quiz");
  await w3schoolsPythonPage.clickButton("Start the Python Quiz ❯");
  await w3schoolsPythonPage.clickTutorial("HOW TO");
  await w3schoolsHowtoPage.openSliderPage(3);
  await w3schoolsHowtoPage.closeSlider();

});
