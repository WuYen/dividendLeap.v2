import { getHTML } from '../utility/requestCore';

async function parse() {
  var $ = await getHTML('https://www.ptt.cc/bbs/Stock/index.html');
  $('.r-ent .title a').each((index, element) => {
    const title = $(element).text();
    const link = $(element).attr('href');

    console.log(`Title: ${title}`);
    console.log(`Link: ${link}`);
    console.log('------------------');
    getPageLink($);
  });
}

function getPageLink($: cheerio.Root) {
  const link = $('a.btn.wide').attr('href');

  // Extract page number from the link using regular expression
  const match = link && link.match(/index(\d+)\.html/);
  const pageNumber = match ? match[1] : null;

  console.log(`Page Number: ${pageNumber}`);
}

parse();
