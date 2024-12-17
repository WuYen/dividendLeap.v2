import cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import * as parse5 from 'parse5';
import * as iconv from 'iconv-lite';

import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { delay } from './delay';

async function getHTML(url: string, option: any = {}): Promise<cheerio.Root> {
  const { data, ...rest }: AxiosResponse = await axios.get(url, option);
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
}

async function getHTMLWithPuppeteer(url: string, option: any = {}): Promise<cheerio.Root> {
  let browser: Browser | null = null;

  try {
    puppeteer.use(StealthPlugin());
    // Launch Puppeteer in headless mode
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Useful for containerized environments
    });

    const page: Page = await browser.newPage();

    // Set a realistic User-Agent to bypass detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    );

    // Navigate to the target URL
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log(`Navigated to ${url}, checking for Cloudflare challenge...`);

    // Check for Cloudflare challenge
    const isChallengePage = await page.evaluate(() => {
      return document.body.textContent?.includes('Verifying you are human');
    });

    if (isChallengePage) {
      console.log('Cloudflare challenge detected, waiting for verification...');
      await delay(10000); // 等待 10 秒
    } else {
      console.log('No Cloudflare challenge detected, proceeding...');
    }

    // Wait for page content to fully load or specific element to appear
    await page.waitForSelector('body', { timeout: 10000 });

    // Extract the HTML content of the page
    const html: string = await page.content();
    console.log('HTML content retrieved successfully.');

    // Load the HTML content into Cheerio for parsing
    return cheerio.load(html, {
      decodeEntities: false,
    });
  } catch (error) {
    console.error('Error occurred while fetching HTML with Puppeteer:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}

async function postHTML(url: string, payload: any): Promise<cheerio.Root> {
  const { data }: AxiosResponse = await axios.post(url, payload);
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
}

interface Big5Option {
  responseType: 'arraybuffer';
  transformResponse: [(data: ArrayBuffer) => string];
}

export const big5Option: Big5Option = {
  responseType: 'arraybuffer',
  transformResponse: [
    function (data: ArrayBuffer): string {
      return iconv.decode(Buffer.from(data), 'big5');
    },
  ],
};

export { getHTML, postHTML, getHTMLWithPuppeteer };
