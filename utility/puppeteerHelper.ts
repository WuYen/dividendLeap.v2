import puppeteer, { Browser, Page } from 'puppeteer';

export const runPuppeteer = async (): Promise<void> => {
  let browser: Browser | null = null;

  try {
    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for Heroku
    });

    const page: Page = await browser.newPage();
    console.log('goto ptt');
    // Navigate to the page
    await page.goto('https://www.ptt.cc/bbs/Stock/index.html');

    // Log the page content
    const content: string = await page.content();
    console.log('retrieve ptt content');
    console.log(content);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Close the browser to avoid resource leaks
    if (browser) {
      await browser.close();
    }
  }
};
