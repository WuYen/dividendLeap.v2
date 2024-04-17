import * as service from '../service/pttStockAuthor';
import * as StockBoardService from '../service/pttStockInfo';
import cheerio from 'cheerio';
import { IPostInfo } from '../model/PostInfo';
import fugleService, { HistoricalDataInfo } from '../service/fugleService';
import { PriceInfoResponse, getHighestPoint, processRecentPost } from '../service/pttStockAuthor';

jest.mock('../utility/requestCore', () => ({
  getHTML: jest.fn(),
}));

jest.mock('../service/fugleService', () => ({
  getStockPriceByDates: jest.fn(),
}));

const mockIndexHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>author:WADE0616 - Stock - 批踢踢實業坊</title>

    <link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-common.css" />
    <link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-base.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-custom.css" />
    <link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/pushstream.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="//images.ptt.cc/bbs/v2.27/bbs-print.css" media="print" />
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
            <a class="btn" href="/bbs/Stock/index.html">&lsaquo; 看板</a>
            <a class="btn" href="/man/Stock/index.html">精華區</a>
          </div>
          <div class="btn-group btn-group-paging">
            <a class="btn wide" href="/bbs/Stock/search?page=6&amp;q=author%3AWADE0616">最舊</a>
            <a class="btn wide" href="/bbs/Stock/search?page=2&amp;q=author%3AWADE0616">&lsaquo; 上頁</a>
            <a class="btn wide disabled">下頁 &rsaquo;</a>
            <a class="btn wide" href="/bbs/Stock/search?page=1&amp;q=author%3AWADE0616">最新</a>
          </div>
        </div>
      </div>

      <div class="r-list-container action-bar-margin bbs-screen">
        <div class="search-bar">
          <form type="get" action="search" id="search-bar">
            <input class="query" type="text" name="q" value="author:WADE0616" placeholder="搜尋文章&#x22ef;" />
          </form>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">51</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1708926619.A.370.html">Re: [標的] 3450聯鈞 光通多</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;3450%E8%81%AF%E9%88%9E&#43;%E5%85%89%E9%80%9A%E5%A4%9A"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">2/26</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">62</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1708494416.A.203.html">[標的] 3450聯鈞 光通多</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;3450%E8%81%AF%E9%88%9E&#43;%E5%85%89%E9%80%9A%E5%A4%9A"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">2/21</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f1">爆</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1706854985.A.CDD.html">[標的] 6789采鈺</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;6789%E9%87%87%E9%88%BA"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">2/02</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">28</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1702444174.A.6D8.html">[情報] 大宇資11月營收3.34億元年增74.68% 1—11</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;%E5%A4%A7%E5%AE%87%E8%B3%8711%E6%9C%88%E7%87%9F%E6%94%B63.34%E5%84%84%E5%85%83%E5%B9%B4%E5%A2%9E74.68%25&#43;1%E2%80%9411"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">12/13</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"></div>
          <div class="title">
            <a href="/bbs/Stock/M.1702317000.A.465.html">[情報] 巨虹11月營收2.07億元年增32.81%</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;%E5%B7%A8%E8%99%B911%E6%9C%88%E7%87%9F%E6%94%B62.07%E5%84%84%E5%85%83%E5%B9%B4%E5%A2%9E32.81%25"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">12/12</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">28</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1701943885.A.A09.html">[情報] 合機 112年11月營收7.75億、年增146.05%</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;%E5%90%88%E6%A9%9F&#43;112%E5%B9%B411%E6%9C%88%E7%87%9F%E6%94%B67.75%E5%84%84%E3%80%81%E5%B9%B4%E5%A2%9E146.05%25"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">12/07</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">18</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1701843357.A.CBB.html">[新聞] 十銓11月營收20.54 億元(YOY250%)</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E5%8D%81%E9%8A%9311%E6%9C%88%E7%87%9F%E6%94%B620.54&#43;%E5%84%84%E5%85%83%28YOY250%25%29"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">12/06</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">13</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1701569661.A.549.html">[新聞] 保瑞12/19轉上市，明年營收續揚也拚整併</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E4%BF%9D%E7%91%9E12%2F19%E8%BD%89%E4%B8%8A%E5%B8%82%EF%BC%8C%E6%98%8E%E5%B9%B4%E7%87%9F%E6%94%B6%E7%BA%8C%E6%8F%9A%E4%B9%9F%E6%8B%9A%E6%95%B4%E4%BD%B5"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">12/03</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">8</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1699376512.A.266.html">[新聞] 雙鴻財報／第3季每股賺5.71元 創單季獲利</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E9%9B%99%E9%B4%BB%E8%B2%A1%E5%A0%B1%EF%BC%8F%E7%AC%AC3%E5%AD%A3%E6%AF%8F%E8%82%A1%E8%B3%BA5.71%E5%85%83&#43;%E5%89%B5%E5%96%AE%E5%AD%A3%E7%8D%B2%E5%88%A9"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">11/08</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">5</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1698224046.A.998.html">[新聞] 精測第3季財報每股純益0.33元 累計今年前</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E7%B2%BE%E6%B8%AC%E7%AC%AC3%E5%AD%A3%E8%B2%A1%E5%A0%B1%E6%AF%8F%E8%82%A1%E7%B4%94%E7%9B%8A0.33%E5%85%83&#43;%E7%B4%AF%E8%A8%88%E4%BB%8A%E5%B9%B4%E5%89%8D"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">10/25</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">66</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1695810630.A.248.html">[標的] 3036文曄</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;3036%E6%96%87%E6%9B%84"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">9/27</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">20</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1695293620.A.F77.html">[新聞] 《電通股》近期飆股 文曄8月每股盈餘0.77</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E3%80%8A%E9%9B%BB%E9%80%9A%E8%82%A1%E3%80%8B%E8%BF%91%E6%9C%9F%E9%A3%86%E8%82%A1&#43;%E6%96%87%E6%9B%848%E6%9C%88%E6%AF%8F%E8%82%A1%E7%9B%88%E9%A4%980.77"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">9/21</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">23</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1692271695.A.71A.html">[新聞] 保瑞上調全年營收、毛利率預估，新併美藥</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E4%BF%9D%E7%91%9E%E4%B8%8A%E8%AA%BF%E5%85%A8%E5%B9%B4%E7%87%9F%E6%94%B6%E3%80%81%E6%AF%9B%E5%88%A9%E7%8E%87%E9%A0%90%E4%BC%B0%EF%BC%8C%E6%96%B0%E4%BD%B5%E7%BE%8E%E8%97%A5"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">8/17</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">9</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1692253039.A.DCD.html">Re: [新聞] 宜鼎AI落地佈局有成；宜蘭二廠Q3完工</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E5%AE%9C%E9%BC%8EAI%E8%90%BD%E5%9C%B0%E4%BD%88%E5%B1%80%E6%9C%89%E6%88%90%EF%BC%9B%E5%AE%9C%E8%98%AD%E4%BA%8C%E5%BB%A0Q3%E5%AE%8C%E5%B7%A5"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">8/17</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">34</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1692002449.A.2F8.html">[新聞] 保瑞財報／上半年獲利年增3倍、EPS 22.54</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E4%BF%9D%E7%91%9E%E8%B2%A1%E5%A0%B1%EF%BC%8F%E4%B8%8A%E5%8D%8A%E5%B9%B4%E7%8D%B2%E5%88%A9%E5%B9%B4%E5%A2%9E3%E5%80%8D%E3%80%81EPS&#43;22.54"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">8/14</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">53</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1691327482.A.186.html">[標的] 6472 保瑞 除權多 長投賺爛</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;6472&#43;%E4%BF%9D%E7%91%9E&#43;%E9%99%A4%E6%AC%8A%E5%A4%9A&#43;%E9%95%B7%E6%8A%95%E8%B3%BA%E7%88%9B"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">8/06</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">1</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1688995809.A.E28.html">[情報] 勤美 112年6月營收28.29億、年增148.39%</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;%E5%8B%A4%E7%BE%8E&#43;112%E5%B9%B46%E6%9C%88%E7%87%9F%E6%94%B628.29%E5%84%84%E3%80%81%E5%B9%B4%E5%A2%9E148.39%25"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">7/10</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">31</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1688452709.A.7B4.html">[標的] 3163 波若威 被刪文多</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;3163&#43;%E6%B3%A2%E8%8B%A5%E5%A8%81&#43;%E8%A2%AB%E5%88%AA%E6%96%87%E5%A4%9A"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">7/04</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">3</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1686288187.A.7F6.html">[新聞] 營收：聿新科(4161)5月營收6946萬元，月</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E7%87%9F%E6%94%B6%EF%BC%9A%E8%81%BF%E6%96%B0%E7%A7%91%284161%295%E6%9C%88%E7%87%9F%E6%94%B66946%E8%90%AC%E5%85%83%EF%BC%8C%E6%9C%88"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">6/09</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">10</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1686207527.A.A1A.html">[新聞] 茂順訂單能見度高 5月營收改寫歷史次高、</a>
          </div>
          <div class="meta">
            <div class="author">WADE0616</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E8%8C%82%E9%A0%86%E8%A8%82%E5%96%AE%E8%83%BD%E8%A6%8B%E5%BA%A6%E9%AB%98&#43;5%E6%9C%88%E7%87%9F%E6%94%B6%E6%94%B9%E5%AF%AB%E6%AD%B7%E5%8F%B2%E6%AC%A1%E9%AB%98%E3%80%81"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AWADE0616">搜尋看板內 WADE0616 的文章</a></div>
              </div>
            </div>
            <div class="date">6/08</div>
            <div class="mark"></div>
          </div>
        </div>
      </div>
    </div>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DZ6Y3BY9GW"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', 'G-DZ6Y3BY9GW');
    </script>
    <script>
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        (i[r] =
          i[r] ||
          function () {
            (i[r].q = i[r].q || []).push(arguments);
          }),
          (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

      ga('create', 'UA-32365737-1', {
        cookieDomain: 'ptt.cc',
        legacyCookieDomain: 'ptt.cc',
      });
      ga('send', 'pageview');
    </script>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="//images.ptt.cc/bbs/v2.27/bbs.js"></script>

    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js/v84a3a4012de94ce1a686ba8c167c359c1696973893317"
      integrity="sha512-euoFGowhlaLqXsPWQ48qSkBSCFs3DPRyiwVu3FjR96cMPx+Fr+gpWRhIafcHwqwCqWS42RZhIudOvEI+Ckf6MA=="
      data-cf-beacon='{"rayId":"866b8c84fdc12b78","r":1,"version":"2024.3.0","token":"515615eb5fab4c9b91a11e9bf529e6cf"}'
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;

describe('test get author unit', () => {
  it('should get html', async () => {
    const getHTMLMock = jest.requireMock('../utility/requestCore').getHTML;
    const htmlContent = cheerio.load(mockIndexHtml, {
      decodeEntities: false,
    });
    getHTMLMock.mockResolvedValue(htmlContent);

    // fetch from web site
    const author = 'WADE0616';
    const url = `https://www.ptt.cc/bbs/Stock/search?q=author%3A${author}`;

    await service.getHtmlSource(author);

    expect(getHTMLMock).toHaveBeenCalledWith(url);
  });

  it('parse [標的] from html', async () => {
    const htmlContent = cheerio.load(mockIndexHtml, {
      decodeEntities: false,
    });
    var targetPosts = await StockBoardService.parsePosts(htmlContent, 0);
    expect(targetPosts.length).toEqual(20);
  });

  it('get correct [標的] from posts', async () => {
    const htmlContent = cheerio.load(mockIndexHtml, {
      decodeEntities: false,
    });
    const rawPosts = await StockBoardService.parsePosts(htmlContent, 0);
    const targetPosts = await service.getTargetPosts(rawPosts);
    const expectPosts: String[] = [
      '3450聯鈞 光通多',
      '6789采鈺',
      '3036文曄',
      '6472 保瑞 除權多 長投賺爛',
      '3163 波若威 被刪文多',
    ];
    expect(targetPosts.length).toEqual(5);
    expect(targetPosts.map((post) => post.title)).toEqual(expect.arrayContaining(expectPosts));
  });

  it('Figure out stockNo from title', async () => {
    const rawPosts: IPostInfo[] = [
      {
        tag: '標的',
        title: '3450聯鈞 光通多',
        href: '/bbs/Stock/M.1708494416.A.203.html',
        author: 'WADE0616',
        date: '2/21',
        id: 1708494416,
        batchNo: 0,
      },
      {
        tag: '標的',
        title: '6789采鈺',
        href: '/bbs/Stock/M.1706854985.A.CDD.html',
        author: 'WADE0616',
        date: '2/02',
        id: 1706854985,
        batchNo: 0,
      },
      {
        tag: '標的',
        title: '3036文曄',
        href: '/bbs/Stock/M.1695810630.A.248.html',
        author: 'WADE0616',
        date: '9/27',
        id: 1695810630,
        batchNo: 0,
      },
      {
        tag: '標的',
        title: '6472 保瑞 除權多 長投賺爛',
        href: '/bbs/Stock/M.1691327482.A.186.html',
        author: 'WADE0616',
        date: '8/06',
        id: 1691327482,
        batchNo: 0,
      },
      {
        tag: '標的',
        title: '3163 波若威 被刪文多',
        href: '/bbs/Stock/M.1688452709.A.7B4.html',
        author: 'WADE0616',
        date: '7/04',
        id: 1688452709,
        batchNo: 0,
      },
    ];
    const expectStockNo: String[] = ['3450', '6789', '3036', '6472', '3163'];
    const actualStockNo = rawPosts.map((post) => service.getStockNoFromTitle(post));

    expect(actualStockNo).toHaveLength(expectStockNo.length);
    actualStockNo.forEach((stockNo) => {
      expect(expectStockNo).toContain(stockNo);
    });
  });

  describe('Get 目標日, 目標隔天, 兩週, 四週, 六週, 八週', () => {
    it('Happy case', async () => {
      let timestamp: number = 1688452709;
      let closeDays: String[] = [];
      let expectDays = ['20230704', '20230705', '20230718', '20230801', '20230815', '20230829'];
      let resultDays = service.getTargetDates(timestamp, closeDays);
      expect(resultDays).toEqual(expectDays);
    });

    it('某幾天遇到 closeDay', async () => {
      let timestamp = 1688452709;
      let closeDays = ['20230705', '20230801'];
      let expectDays = ['20230704', '20230706', '20230718', '20230802', '20230815', '20230829'];
      let resultDays = service.getTargetDates(timestamp, closeDays);
      expect(resultDays).toEqual(expectDays);
      expect(resultDays.length).toEqual(expectDays.length);
    });

    it('起始日期是週末', async () => {
      let timestamp = 1688787716; // 20230708 Sat.
      let closeDays = ['20230705', '20230801'];
      let expectDays = ['20230710', '20230711', '20230724', '20230807', '20230821', '20230904'];
      let resultDays = service.getTargetDates(timestamp, closeDays);
      expect(resultDays).toEqual(expectDays);
      expect(resultDays.length).toEqual(expectDays.length);
    });

    it('起始日期是週末&第一個weekday放假', async () => {
      let timestamp = 1688787716; // 20230708 Sat.
      let closeDays = ['20230710', '20230801'];
      let expectDays = ['20230711', '20230712', '20230725', '20230808', '20230822', '20230905'];
      let resultDays = service.getTargetDates(timestamp, closeDays);
      expect(resultDays).toEqual(expectDays);
      expect(resultDays.length).toEqual(expectDays.length);
    });
  });

  describe('測試 getPriceInfo', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('測試呼叫fugle api with given input', async () => {
      const stockNo: string = '3163';
      await service.getPriceInfoByDates(stockNo, '20230704', '20230829');
      expect(fugleService.getStockPriceByDates).toHaveBeenCalledWith(stockNo, '20230704', '20230829');
    });

    it('測試選出資料&漲幅百分比', async () => {
      const getStockPriceByDatesMock = jest.requireMock('../service/fugleService').getStockPriceByDates;
      getStockPriceByDatesMock.mockResolvedValue({
        symbol: '3163',
        type: 'EQUITY',
        exchange: 'TPEx',
        market: 'OTC',
        timeframe: 'D',
        data: [
          {
            date: '2023-08-29',
            open: 94.2,
            high: 96.8,
            low: 93.8,
            close: 94,
            volume: 13563045,
          },
          {
            date: '2023-08-28',
            open: 96.6,
            high: 97.5,
            low: 93,
            close: 93.2,
            volume: 14013633,
          },
          {
            date: '2023-08-15',
            open: 88.9,
            high: 93.7,
            low: 87.2,
            close: 92.4,
            volume: 27913219,
          },
          {
            date: '2023-08-01',
            open: 100.5,
            high: 108,
            low: 89.6,
            close: 92.4,
            volume: 55049400,
          },
          {
            date: '2023-07-18',
            open: 82.7,
            high: 86.5,
            low: 74,
            close: 74.5,
            volume: 31469421,
          },
          {
            date: '2023-07-05',
            open: 68.7,
            high: 74,
            low: 68.4,
            close: 72.6,
            volume: 30398613,
          },
          {
            date: '2023-07-04',
            open: 61.7,
            high: 67.7,
            low: 61.6,
            close: 67.7,
            volume: 16286475,
          },
        ],
      });
      const result = await service.getPriceInfoByDates('3163', '20230704', '20230829');
      expect(result?.processedData.length).toEqual(1);
      const highest = result?.processedData[0];
      expect(highest?.diff).toEqual(26.3);
    });
  });
  // Test case
  test('Get highest point', async () => {
    // Mock data
    const testData: HistoricalDataInfo[] = [
      { date: '2022-01-01', open: 100, high: 120, low: 90, close: 110, volume: 10000, turnover: 100000, change: 0 },
      { date: '2022-01-02', open: 110, high: 130, low: 100, close: 120, volume: 12000, turnover: 120000, change: 0 },
      { date: '2022-01-03', open: 120, high: 140, low: 110, close: 130, volume: 14000, turnover: 140000, change: 0 },
    ];

    const highestPoint = await getHighestPoint(testData);
    expect(highestPoint).toEqual(testData[2]); // The third data point has the highest 'high' value
  });

  describe('get date range', () => {
    it('target date is in the future', () => {
      const timestamp = 1637140800; // 2021年11月17日
      const today = new Date('2021-12-25');
      const result = service.getDateRangeBaseOnPostedDate(new Date(timestamp * 1000), today);
      expect(result).toEqual(['20211117', '20211225']);
    });

    it('target date is in the past', () => {
      const timestamp = 1637140800; // 2021年11月17日
      const today = new Date('2022-10-01');
      const result = service.getDateRangeBaseOnPostedDate(new Date(timestamp * 1000), today);
      expect(result).toEqual(['20211117', '20220317']); // Adjust expected values based on your implementation
    });

    it('近一周post, 發文日往前抓一週', () => {
      const timestamp = 1633046400; // 2021年10月01日
      const today = new Date('2021-10-01');
      const result = service.getDateRangeBaseOnPostedDate(new Date(timestamp * 1000), today);
      expect(result).toEqual(['20210924', '20211001']); // Adjust expected values based on your implementation
    });
  });

  describe('processRecentPost function', () => {
    const historicalInfo = [
      { date: '2024-03-11', open: 100, high: 105, low: 98, close: 102, volume: 10000, turnover: 5000, change: 2 },
      { date: '2024-03-12', open: 102, high: 108, low: 100, close: 105, volume: 12000, turnover: 6000, change: 3 },
      { date: '2024-03-13', open: 105, high: 110, low: 103, close: 107, volume: 15000, turnover: 7000, change: 2 },
      { date: '2024-03-14', open: 107, high: 112, low: 105, close: 110, volume: 18000, turnover: 8000, change: 3 },
      { date: '2024-03-15', open: 110, high: 115, low: 108, close: 112, volume: 20000, turnover: 9000, change: 2 },
      { date: '2024-03-18', open: 110, high: 115, low: 108, close: 113, volume: 20000, turnover: 9000, change: 2 },
    ];

    let info: PriceInfoResponse;

    beforeEach(() => {
      info = {
        stockNo: '',
        historicalInfo: [...historicalInfo], // Make a copy to avoid modifying the original data
        processedData: [],
      };
    });

    it('should process recent post correctly for 2024-03-16', () => {
      processRecentPost(new Date('2024-03-16'), info);
      expect(info.processedData.length).toBe(1);
      expect(info.historicalInfo[0].date).toBe('2024-03-15');
      expect(info.processedData[0].date).toBe('2024-03-18');
      expect(info.processedData[0].price).toBe(113);
    });

    it('should process recent post correctly for 2024-03-17', () => {
      processRecentPost(new Date('2024-03-17'), info);
      expect(info.processedData.length).toBe(1);
      expect(info.historicalInfo[0].date).toBe('2024-03-18');
      expect(info.processedData[0].date).toBe('2024-03-18');
      expect(info.processedData[0].price).toBe(113);
    });

    it('should process recent post correctly for 2024-03-18', () => {
      processRecentPost(new Date('2024-03-18'), info);
      expect(info.processedData.length).toBe(1);
      expect(info.historicalInfo[0].date).toBe('2024-03-18');
      expect(info.processedData[0].date).toBe('2024-03-18');
      expect(info.processedData[0].price).toBe(113);
    });
  });
});
