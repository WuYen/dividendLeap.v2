import service, { parsePostTest } from './pttStockInfo'; // Replace with the correct path to your file
import { IPostInfo } from '../model/PostInfo';
import cheerio from 'cheerio';

const mockHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    

<meta name="viewport" content="width=device-width, initial-scale=1">

<title>看板 Stock 文章列表 - 批踢踢實業坊</title>

<link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-common.css">
<link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-base.css" media="screen">
<link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-custom.css">
<link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/pushstream.css" media="screen">
<link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-print.css" media="print">




  </head>
    <body>
    
<div id="topbar-container">
  <div id="topbar" class="bbs-content">
    <a id="logo" href="/bbs/">批踢踢實業坊</a>
    <span>&rsaquo;</span>
    <a class="board" href="/bbs/Stock/index.html"><span class="board-label">看板 </span>Stock</a>
    <a class="right small" href="/about.html">關於我們</a>
    <a class="right small" href="/contact.html">聯絡資訊</a>
  </div>
</div>

<div id="main-container">
  <div id="action-bar-container">
    <div class="action-bar">
      <div class="btn-group btn-group-dir">
        <a class="btn selected" href="/bbs/Stock/index.html">看板</a>
        <a class="btn" href="/man/Stock/index.html">精華區</a>
      </div>
      <div class="btn-group btn-group-paging">
        <a class="btn wide" href="/bbs/Stock/index1.html">最舊</a>
        <a class="btn wide" href="/bbs/Stock/index6965.html">&lsaquo; 上頁</a>
        <a class="btn wide disabled">下頁 &rsaquo;</a>
        <a class="btn wide" href="/bbs/Stock/index.html">最新</a>
      </div>
    </div>
  </div>

  <div class="r-list-container action-bar-margin bbs-screen">
    <div class="search-bar">
      <form type="get" action="search" id="search-bar">
        <input class="query" type="text" name="q" value="" placeholder="搜尋文章&#x22ef;">
      </form>
    </div>

    
    
            
        
        
    <div class="r-ent">
      <div class="nrec"><span class="hl f3">12</span></div>
      <div class="title">
      
        <a href="/bbs/Stock/M.1709218755.A.02E.html">[新聞] Fake Title HIHI</a>
      
      </div>
      <div class="meta">
        <div class="author">peter080808</div>
        <div class="article-menu">
          
          <div class="trigger">&#x22ef;</div>
          <div class="dropdown">
            <div class="item"><a href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E5%8F%B0%E7%81%A31%E6%9C%88%E5%A4%96%E9%8A%B7%E9%99%B8%E6%B8%AF%E8%A8%82%E5%96%AE%E8%B7%B3%E5%A2%9E28%25&#43;%E9%87%91%E9%A1%8D106.4%E5%84%84">搜尋同標題文章</a></div>
            
            <div class="item"><a href="/bbs/Stock/search?q=author%3Apeter080808">搜尋看板內 peter080808 的文章</a></div>
            
          </div>
          
        </div>
        <div class="date"> 2/29</div>
        <div class="mark"></div>
      </div>
    </div>

    
            
        
        
    <div class="r-ent">
      <div class="nrec"><span class="hl f2">3</span></div>
      <div class="title">
      
        <a href="/bbs/Stock/M.1709218876.A.B93.html">Re: [請益] 關於大量未實現損益</a>
      
      </div>
      <div class="meta">
        <div class="author">cgagod</div>
        <div class="article-menu">
          
          <div class="trigger">&#x22ef;</div>
          <div class="dropdown">
            <div class="item"><a href="/bbs/Stock/search?q=thread%3A%5B%E8%AB%8B%E7%9B%8A%5D&#43;%E9%97%9C%E6%96%BC%E5%A4%A7%E9%87%8F%E6%9C%AA%E5%AF%A6%E7%8F%BE%E6%90%8D%E7%9B%8A">搜尋同標題文章</a></div>
            
            <div class="item"><a href="/bbs/Stock/search?q=author%3Acgagod">搜尋看板內 cgagod 的文章</a></div>
            
          </div>
          
        </div>
        <div class="date"> 2/29</div>
        <div class="mark"></div>
      </div>
    </div>

    
            
        
        
    <div class="r-ent">
      <div class="nrec"><span class="hl f3">21</span></div>
      <div class="title">
      
        <a href="/bbs/Stock/M.1709219116.A.A75.html">[情報] 2888 新光金112年EPS:-0.48</a>
      
      </div>
      <div class="meta">
        <div class="author">qazsedcft</div>
        <div class="article-menu">
          
          <div class="trigger">&#x22ef;</div>
          <div class="dropdown">
            <div class="item"><a href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;2888&#43;%E6%96%B0%E5%85%89%E9%87%91112%E5%B9%B4EPS%3A-0.48">搜尋同標題文章</a></div>
            
            <div class="item"><a href="/bbs/Stock/search?q=author%3Aqazsedcft">搜尋看板內 qazsedcft 的文章</a></div>
            
          </div>
          
        </div>
        <div class="date"> 2/29</div>
        <div class="mark"></div>
      </div>
    </div>

    
            
        
        
    <div class="r-ent">
      <div class="nrec"><span class="hl f2">3</span></div>
      <div class="title">
      
        <a href="/bbs/Stock/M.1709219216.A.243.html">[情報] 3413 京鼎 股利：12</a>
      
      </div>
      <div class="meta">
        <div class="author">adidas32</div>
        <div class="article-menu">
          
          <div class="trigger">&#x22ef;</div>
          <div class="dropdown">
            <div class="item"><a href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;3413&#43;%E4%BA%AC%E9%BC%8E&#43;%E8%82%A1%E5%88%A9%EF%BC%9A12">搜尋同標題文章</a></div>
            
            <div class="item"><a href="/bbs/Stock/search?q=author%3Aadidas32">搜尋看板內 adidas32 的文章</a></div>
            
          </div>
          
        </div>
        <div class="date"> 2/29</div>
        <div class="mark"></div>
      </div>
    </div>

    
        
        <div class="r-list-sep"></div>
            
                
        
        
    <div class="r-ent">
      <div class="nrec"></div>
      <div class="title">
      
        <a href="/bbs/Stock/M.1667716869.A.C66.html">[公告] 股票板板規 v4.4 (2024/02/15 修正)</a>
      
      </div>
      <div class="meta">
        <div class="author">laptic</div>
        <div class="article-menu">
          
          <div class="trigger">&#x22ef;</div>
          <div class="dropdown">
            <div class="item"><a href="/bbs/Stock/search?q=thread%3A%5B%E5%85%AC%E5%91%8A%5D&#43;%E8%82%A1%E7%A5%A8%E6%9D%BF%E6%9D%BF%E8%A6%8F&#43;v4.4&#43;%282024%2F02%2F15&#43;%E4%BF%AE%E6%AD%A3%29">搜尋同標題文章</a></div>
            
            <div class="item"><a href="/bbs/Stock/search?q=author%3Alaptic">搜尋看板內 laptic 的文章</a></div>
            
          </div>
          
        </div>
        <div class="date">11/06</div>
        <div class="mark">!</div>
      </div>
    </div>

            
                
        
        
    <div class="r-ent">
      <div class="nrec"></div>
      <div class="title">
      
        <a href="/bbs/Stock/M.1707982684.A.D43.html">[公告] 板規修正</a>
      
      </div>
      <div class="meta">
        <div class="author">laptic</div>
        <div class="article-menu">
          
          <div class="trigger">&#x22ef;</div>
          <div class="dropdown">
            <div class="item"><a href="/bbs/Stock/search?q=thread%3A%5B%E5%85%AC%E5%91%8A%5D&#43;%E6%9D%BF%E8%A6%8F%E4%BF%AE%E6%AD%A3">搜尋同標題文章</a></div>
            
            <div class="item"><a href="/bbs/Stock/search?q=author%3Alaptic">搜尋看板內 laptic 的文章</a></div>
            
          </div>
          
        </div>
        <div class="date"> 2/15</div>
        <div class="mark">!</div>
      </div>
    </div>

            
                
        
        
    <div class="r-ent">
      <div class="nrec"><span class="hl f1">爆</span></div>
      <div class="title">
      
        <a href="/bbs/Stock/M.1709186402.A.B86.html">[閒聊] 2024/02/29 盤後閒聊</a>
      
      </div>
      <div class="meta">
        <div class="author">vendan5566</div>
        <div class="article-menu">
          
          <div class="trigger">&#x22ef;</div>
          <div class="dropdown">
            <div class="item"><a href="/bbs/Stock/search?q=thread%3A%5B%E9%96%92%E8%81%8A%5D&#43;2024%2F02%2F29&#43;%E7%9B%A4%E5%BE%8C%E9%96%92%E8%81%8A">搜尋同標題文章</a></div>
            
            <div class="item"><a href="/bbs/Stock/search?q=author%3Avendan5566">搜尋看板內 vendan5566 的文章</a></div>
            
          </div>
          
        </div>
        <div class="date"> 2/29</div>
        <div class="mark"></div>
      </div>
    </div>

            
        
  </div>

    
</div>

    



<script async src="https://www.googletagmanager.com/gtag/js?id=G-DZ6Y3BY9GW"></script>
<script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-DZ6Y3BY9GW');
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-32365737-1', {
    cookieDomain: 'ptt.cc',
    legacyCookieDomain: 'ptt.cc'
  });
  ga('send', 'pageview');
</script>


    
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="//images.ptt.cc/bbs/v2.27/bbs.js"></script>

    <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v84a3a4012de94ce1a686ba8c167c359c1696973893317" integrity="sha512-euoFGowhlaLqXsPWQ48qSkBSCFs3DPRyiwVu3FjR96cMPx+Fr+gpWRhIafcHwqwCqWS42RZhIudOvEI+Ckf6MA==" data-cf-beacon='{"rayId":"85d1eb03a82d6889","r":1,"version":"2024.2.1","token":"515615eb5fab4c9b91a11e9bf529e6cf"}' crossorigin="anonymous"></script>
</body>
</html>
`;

// describe('getNewPosts', () => {
//   it('should fetch and process new posts', async () => {
//     // Mock implementations for utility functions
//     const getHTMLMock = jest.requireMock('../utility/requestCore').getHTML;
//     // const retrieveLastBatchPostsMock = jest.requireMock('./your-utils').retrieveLastBatchPosts;
//     // const parsePostsMock = jest.requireMock('./your-utils').parsePosts;
//     // const getPreviousPageIndexMock = jest.requireMock('./your-utils').getPreviousPageIndex;

//     // // Mock implementations for database-related functions
//     // const insertManyMock = jest.requireMock('./your-post-info-module').PostInfo.PostInfoModel.insertMany;
//     // const findOneAndUpdateMock = jest.requireMock('./your-post-info-module').PostInfo.LastRecordModel.findOneAndUpdate;

//     // // Set up mock return values or behaviors
//     // retrieveLastBatchPostsMock.mockResolvedValue([{ id: 1 }, { id: 2 }]);
//     getHTMLMock.mockResolvedValue(
//       cheerio.load(mockHtml, {
//         decodeEntities: false,
//       })
//     );
//     // parsePostsMock.mockReturnValue(/* your mock response for parsePosts */);
//     // insertManyMock.mockResolvedValue(/* your mock response for insertMany */);
//     // findOneAndUpdateMock.mockResolvedValue(/* your mock response for findOneAndUpdate */);

//     // Call the function

//     const result = await parsePostTest();

//     // // Assertions based on the expected behavior
//     // expect(result).toEqual(/* your expected result */);
//     const domain = 'https://www.ptt.cc';
//     // Assertions for function calls and parameters
//     //expect(retrieveLastBatchPostsMock).toHaveBeenCalled();
//     expect(getHTMLMock).toHaveBeenCalledWith(`${domain}/bbs/Stock/index.html`);
//     // expect(parsePostsMock).toHaveBeenCalledWith(/* your expected parameters */);
//     // expect(insertManyMock).toHaveBeenCalledWith(/* your expected parameters */);
//     // expect(findOneAndUpdateMock).toHaveBeenCalledWith(/* your expected parameters */);
//   });
// });

// Mock the utility function
jest.mock('../utility/requestCore', () => ({
  getHTML: jest.fn(),
}));

describe('parsePostTest', () => {
  it('should parse posts', async () => {
    // Mock implementation for getHTML
    const getHTMLMock = jest.requireMock('../utility/requestCore').getHTML;
    getHTMLMock.mockResolvedValue(
      cheerio.load(mockHtml, {
        decodeEntities: false,
      })
    );

    // Call the function
    const result = await parsePostTest();

    // // Assertions based on the expected behavior
    // expect(result).toEqual(/* your expected result */);

    // Assertions for function calls and parameters
    const domain = 'https://www.ptt.cc';
    expect(getHTMLMock).toHaveBeenCalledWith(`${domain}/bbs/Stock/index.html`);
  });
});
