import cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import * as parse5 from 'parse5';
import * as iconv from 'iconv-lite';

async function getHTML(url: string, option: any = {}): Promise<cheerio.Root> {
  const { data, ...rest }: AxiosResponse = await axios.get(url, option);
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
}

async function getPTTHTML(url: string, option: any = {}): Promise<cheerio.Root> {
  //const { data, ...rest }: AxiosResponse = await axios.get(url, option);
  const { data, ...rest }: AxiosResponse = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.1 Safari/537.36',
      Cookie: 'cf_clearance=YOUR_CF_CLEARANCE_COOKIE_HERE; over18=1',
    },
  });
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
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

export { getHTML, postHTML, getPTTHTML };
