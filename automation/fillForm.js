// automation/fillForm.js
const puppeteer = require('puppeteer');

async function fillForm(user) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://target-website.com/form');

    // Fill in text fields
    await page.type('#first-name', user.firstName);
    await page.type('#last-name', user.lastName);
    await page.type('#dob', user.dob.toString()); // Convert date to string
    await page.type('#nationality', user.nationality);
    await page.type('#address', user.address);

    // Upload document
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click('#upload-button'), // Click to open file chooser
    ]);
    await fileChooser.accept([user.documentPath]);

    // Submit the form
    await page.click('#submit-button');
    await page.waitForNavigation();

    console.log('Form filled successfully!');
  } catch (error) {
    console.error('Automation Error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = fillForm;
