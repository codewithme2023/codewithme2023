const { test } = require('@playwright/test');

const ToolsqaMainPage = require('../pages/toolsqa_main_page.js');
const ToolsqaArticlesPage = require('../pages/toolsqa_articles_page.js');

test('Toolsqa Test', async ({ page } ) => {
  test.setTimeout(120000);

  const toolsqaMainPage = new ToolsqaMainPage(page);
  const toolsqaArticlesPage = new ToolsqaArticlesPage(page);

  await toolsqaMainPage.navigate();

  await toolsqaMainPage.testNavbarLinks(['Home', 'Selenium Training', 'Demo Site', 'About']);
  await toolsqaMainPage.testCategoryNames([
    'testRigor',
    'Katalon',
    'ISTQB',
    'Scrum',
    'Git',
    'Protractor',
    'Selenium',
    'Rest Assured',
    'Postman',
    'Cucumber',
  ]);

  await toolsqaMainPage.clickLatestArticlesLink();
  await toolsqaArticlesPage.testArticleTitles([
    'Enhancing Test Automation with testRigor Integrations',
    'How to test file upload functionality using testRigor?',
    'testRigor Tutorial',
    'Automated Mobile Testing in testRigor',
    'How to handle web tables using testRigor?',
    'Reusable Rules in testRigor',
    'Test Case Recorder in testRigor using Chrome Extension',
    'Global Variables & Data Sets',
    'Fix A Failed Test Case',
    'Introduction to TestSigma',
    'Stale Element Reference Exception',
    'State Transition Testing',
  ]);
  await toolsqaArticlesPage.clickPagination(3);
  await toolsqaArticlesPage.testArticleTitles([
    "What is Fault Tolerance in Test Automation?",
    "Getting started with Rest Assured",
    "What is REST?",
    "Jenkins Backup Plugin",
    "Experience Based Testing",
    "Online Tools for Web Developers",
    "",
    "",
    "What is Usability Testing?",
    "Dynamic Testing",
    "Software Development Life Cycle",
    "Integration Testing in Software Testing",
  ]);
  await toolsqaArticlesPage.clickPagination('First');
  await toolsqaArticlesPage.testArticleTitles([
    'Enhancing Test Automation with testRigor Integrations',
    'How to test file upload functionality using testRigor?',
    'testRigor Tutorial',
    'Automated Mobile Testing in testRigor',
    'How to handle web tables using testRigor?',
    'Reusable Rules in testRigor',
    'Test Case Recorder in testRigor using Chrome Extension',
    'Global Variables & Data Sets',
    'Fix A Failed Test Case',
    'Introduction to TestSigma',
    'Stale Element Reference Exception',
    'State Transition Testing',
  ]);
  await toolsqaArticlesPage.clickPagination('Last');
  await toolsqaArticlesPage.testArticleTitles([
    "What is TestNG?",
    "Install TestNG In Eclipse & IntelliJ",
    "TestNG Test Suite",
    "TestNG Annotations - Benefits, Hierarchy & TestNG Case Priorities",
    "TestNG - Dependent Tests",
    "TestNG Reports",
    "TestNG Parameters",
    "TestNG DataProviders",
    "TestNG Test Case Priority And Sequence",
    "TestNG Groups"
  ]);

});
