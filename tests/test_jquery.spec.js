const { test } = require('@playwright/test');

const JqueryMainPage = require('../pages/jquery_main_page.js')
const JqueryDownloadPage = require('../pages/jquery_download_page.js');

test('Example Test', async ({ page } ) => {
  test.setTimeout(120000);

  const jqueryMainPage = new JqueryMainPage(page);
  const jqueryDownloadPage = new JqueryDownloadPage(page);

  await jqueryMainPage.navigate();

  await jqueryMainPage.testHeaderDropdowns([
    'Learning Center',
    'IRC/Chat',
    'Forums',
    'Stack Overflow',
    'Commercial Support',
  ]);

  await jqueryMainPage.testContributeDropdown([
    'CLA',
    'Style Guides',
    'Bug Triage',
    'Code',
    'Documentation',
    'Web Sites',
  ]);

  await jqueryMainPage.testResourcesSection([
    'jQuery Core API Documentation',
    'jQuery Learning Center',
    'jQuery Blog',
    'Contribute to jQuery',
    'About the jQuery Foundation',
    'Browse or Submit jQuery Bugs',
  ]);

  await jqueryMainPage.navigate();

  await jqueryMainPage.testABriefLookSection(['DOM Traversal and Manipulation', 'Event Handling', 'Ajax']);

  await jqueryMainPage.clickLink("Download")

  await jqueryDownloadPage.testDownloadLinkText('Download the compressed, production jQuery 3.7.0');
  await jqueryDownloadPage.testDownloadLinkText('Download the uncompressed, development jQuery 3.7.0');
  await jqueryDownloadPage.testDownloadLinkText('Download the map file for jQuery 3.7.0');
  await jqueryDownloadPage.testDownloadLinkText('Download the compressed, production jQuery 3.7.0 slim build');
  await jqueryDownloadPage.testDownloadLinkText('Download the uncompressed, development jQuery 3.7.0 slim build');
  await jqueryDownloadPage.testDownloadLinkText('Download the map file for the jQuery 3.7.0 slim build');
  await jqueryDownloadPage.testDownloadLinkText('jQuery 3.7.0 blog post with release notes');
  await jqueryDownloadPage.testDownloadLinkText('Download the compressed, production jQuery Migrate 1.4.1');

});
