import { getHTML } from '../utility/requestCore';

interface PostInfo {
  tag: string | null;
  title: string;
  href: string | null;
  author: string | null;
  date: string | null;
}
const domain = 'https://www.ptt.cc';

async function handler() {
  //TODO: figure out what is last process record then stop
  var page = '';
  var continueFlag = true;
  var posts: PostInfo[] = [];
  var stopCount = 3;
  var currentCount = 0;
  while (continueFlag && currentCount < stopCount) {
    currentCount++;
    var url = `${domain}/bbs/Stock/index${page || ''}.html`;
    console.log(`process url ${url}`);
    var $ = await getHTML(url);
    var posts = parsePosts($);
    posts.concat(posts);
    page = getPreviousPageIndex($);
    if (page == '6933') {
      continueFlag = false;
    }
  }

  // Filter posts where tag is equal to '標的'
  const filteredPosts = posts.filter((post) => post.tag === '標的');

  // Iterate through filteredPosts and log each post to the console
  filteredPosts.forEach((post, index) => {
    console.log(`Post ${index + 1}:`);
    console.log(`Date: ${post.date}`);
    console.log(`Tag: ${post.tag}`);
    console.log(`Title: ${post.title}`);
    console.log(`Href: ${domain}/${post.href}`);
    console.log(`Author: ${post.author}`);
    console.log('------------------');
  });
}

function parsePosts($: cheerio.Root): PostInfo[] {
  const posts: PostInfo[] = [];

  $('div.r-ent').each((index, element) => {
    const titleElement = $(element).find('div.title a');
    const tag = titleElement.text().match(/\[(.*?)\]/)?.[1] || null;
    const title = titleElement
      .text()
      .replace(/\[.*?\]/, '')
      .trim();
    const href = titleElement.attr('href') || null;
    const author = $(element).find('div.author').text() || null;
    const date = $(element).find('div.date').text().trim() || null;

    const postInfo: PostInfo = {
      tag,
      title,
      href,
      author,
      date,
    };

    posts.push(postInfo);
  });

  return posts;
}

function getPreviousPageIndex($: cheerio.Root): string {
  //const link = $('a.btn.wide').attr('href');
  const link = $('a.btn.wide')
    .filter((_, element) => $(element).text().includes('上頁'))
    .attr('href');
  // Extract page number from the link using regular expression
  const match = link && link.match(/index(\d+)\.html/);
  const index = match ? match[1] : null;

  return index as string;
}

handler();
