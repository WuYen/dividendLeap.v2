import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { delay } from './delay';

export const runPuppeteer = async (): Promise<void> => {
  let browser: Browser | null = null;

  try {
    puppeteer.use(StealthPlugin());

    browser = await puppeteer.launch({
      headless: true, // Headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for Heroku
    });

    const page: Page = await browser.newPage();
    console.log('Launching Puppeteer and navigating to PTT...');

    // Set a realistic User-Agent to bypass detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    );

    // Navigate to the target page
    await page.goto('https://www.ptt.cc/bbs/Stock/index.html', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('Page loaded, checking for Cloudflare challenge...');

    // Fallback: Check for a Cloudflare challenge page or wait manually
    const isChallengePage = await page.evaluate(() => {
      return document.body.textContent?.includes('Verifying you are human');
    });
    if (isChallengePage) {
      console.log('Cloudflare challenge detected, waiting for verification...');
      await delay(10000); // 等待 10 秒
    } else {
      console.log('No Cloudflare challenge detected, proceeding...');
    }

    // Wait for page content: wait for a specific element (e.g., .title selector)
    await page.waitForSelector('.title', { timeout: 10000 });
    console.log('PTT content loaded, retrieving page content...');

    const content: string = await page.content();
    console.log('Page content retrieved successfully.');
    console.log(content);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
};
