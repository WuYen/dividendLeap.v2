import { fetchNewPosts } from '../service/pttStockPostService'; // Replace with the correct path to your file
import cheerio from 'cheerio';

const mockIndex6965Html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>看板 Stock 文章列表 - 批踢踢實業坊</title>

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
            <a class="btn selected" href="/bbs/Stock/index.html">看板</a>
            <a class="btn" href="/man/Stock/index.html">精華區</a>
          </div>
          <div class="btn-group btn-group-paging">
            <a class="btn wide" href="/bbs/Stock/index1.html">最舊</a>
            <a class="btn wide" href="/bbs/Stock/index6964.html">&lsaquo; 上頁</a>
            <a class="btn wide" href="/bbs/Stock/index6966.html">下頁 &rsaquo;</a>
            <a class="btn wide" href="/bbs/Stock/index.html">最新</a>
          </div>
        </div>
      </div>

      <div class="r-list-container action-bar-margin bbs-screen">
        <div class="search-bar">
          <form type="get" action="search" id="search-bar">
            <input class="query" type="text" name="q" value="" placeholder="搜尋文章&#x22ef;" />
          </form>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">25</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709207019.A.650.html">[情報] 2324仁寶112年EPS:1.76股利:1.2 3/29除息</a>
          </div>
          <div class="meta">
            <div class="author">q1a1</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;2324%E4%BB%81%E5%AF%B6112%E5%B9%B4EPS%3A1.76%E8%82%A1%E5%88%A9%3A1.2&#43;3%2F29%E9%99%A4%E6%81%AF"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aq1a1">搜尋看板內 q1a1 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">25</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709208041.A.516.html">[標的] 2548華固 請線仙分析後勢</a>
          </div>
          <div class="meta">
            <div class="author">darkstar07</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;2548%E8%8F%AF%E5%9B%BA&#43;%E8%AB%8B%E7%B7%9A%E4%BB%99%E5%88%86%E6%9E%90%E5%BE%8C%E5%8B%A2"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3Adarkstar07">搜尋看板內 darkstar07 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">81</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709208620.A.8A6.html">[標的] 3605宏致-連接器族群多</a>
          </div>
          <div class="meta">
            <div class="author">Scorpio777</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;3605%E5%AE%8F%E8%87%B4-%E9%80%A3%E6%8E%A5%E5%99%A8%E6%97%8F%E7%BE%A4%E5%A4%9A"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3AScorpio777">搜尋看板內 Scorpio777 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">16</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709208835.A.E44.html">[新聞] 焦點股》大同：量爆增3.74萬張 噴漲觸及5</a>
          </div>
          <div class="meta">
            <div class="author">anti87</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E7%84%A6%E9%BB%9E%E8%82%A1%E3%80%8B%E5%A4%A7%E5%90%8C%EF%BC%9A%E9%87%8F%E7%88%86%E5%A2%9E3.74%E8%90%AC%E5%BC%B5&#43;%E5%99%B4%E6%BC%B2%E8%A7%B8%E5%8F%8A5"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aanti87">搜尋看板內 anti87 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">13</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709209022.A.13F.html">[請益] 請問損益績效要怎麼算</a>
          </div>
          <div class="meta">
            <div class="author">ak010034</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E8%AB%8B%E7%9B%8A%5D&#43;%E8%AB%8B%E5%95%8F%E6%90%8D%E7%9B%8A%E7%B8%BE%E6%95%88%E8%A6%81%E6%80%8E%E9%BA%BC%E7%AE%97"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aak010034">搜尋看板內 ak010034 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">10</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709210371.A.A54.html">[新聞] 新光金拍板以每股22.5元參與新光人壽70</a>
          </div>
          <div class="meta">
            <div class="author">lask</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E6%96%B0%E5%85%89%E9%87%91%E6%8B%8D%E6%9D%BF%E4%BB%A5%E6%AF%8F%E8%82%A122.5%E5%85%83%E5%8F%83%E8%88%87%E6%96%B0%E5%85%89%E4%BA%BA%E5%A3%BD70"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Alask">搜尋看板內 lask 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">69</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709210624.A.1A1.html">[心得] 2024年1-2月月報，賠爛了</a>
          </div>
          <div class="meta">
            <div class="author">ted6219</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E5%BF%83%E5%BE%97%5D&#43;2024%E5%B9%B41-2%E6%9C%88%E6%9C%88%E5%A0%B1%EF%BC%8C%E8%B3%A0%E7%88%9B%E4%BA%86"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Ated6219">搜尋看板內 ted6219 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">28</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709210685.A.D43.html">[新聞] 雲豹能源攜手泰國SSP集團 開發陸域風場</a>
          </div>
          <div class="meta">
            <div class="author">anti87</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E9%9B%B2%E8%B1%B9%E8%83%BD%E6%BA%90%E6%94%9C%E6%89%8B%E6%B3%B0%E5%9C%8BSSP%E9%9B%86%E5%9C%98&#43;%E9%96%8B%E7%99%BC%E9%99%B8%E5%9F%9F%E9%A2%A8%E5%A0%B4"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aanti87">搜尋看板內 anti87 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"></div>
          <div class="title">(本文已被刪除) [pqpqpqpq]</div>
          <div class="meta">
            <div class="author">-</div>
            <div class="article-menu"></div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">11</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709212187.A.C2E.html">[標的] 1815.TW 富喬 步步高多 </a>
          </div>
          <div class="meta">
            <div class="author">alphish</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;1815.TW&#43;%E5%AF%8C%E5%96%AC&#43;%E6%AD%A5%E6%AD%A5%E9%AB%98%E5%A4%9A&#43;"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aalphish">搜尋看板內 alphish 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">6</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709212300.A.B86.html">[情報] 3583 辛耘 股利及除息基準日</a>
          </div>
          <div class="meta">
            <div class="author">BlueBird5566</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;3583&#43;%E8%BE%9B%E8%80%98&#43;%E8%82%A1%E5%88%A9%E5%8F%8A%E9%99%A4%E6%81%AF%E5%9F%BA%E6%BA%96%E6%97%A5"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3ABlueBird5566">搜尋看板內 BlueBird5566 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">22</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709212457.A.4FD.html">Re: [新聞] 來滋烤鴨收攤 王品：汰弱留強 維持最佳經營配置</a>
          </div>
          <div class="meta">
            <div class="author">geniustu</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E4%BE%86%E6%BB%8B%E7%83%A4%E9%B4%A8%E6%94%B6%E6%94%A4&#43;%E7%8E%8B%E5%93%81%EF%BC%9A%E6%B1%B0%E5%BC%B1%E7%95%99%E5%BC%B7&#43;%E7%B6%AD%E6%8C%81%E6%9C%80%E4%BD%B3%E7%B6%93%E7%87%9F%E9%85%8D%E7%BD%AE"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Ageniustu">搜尋看板內 geniustu 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">45</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709213014.A.534.html">[情報] 2308 台達電 eps:12.86 股利:6.43</a>
          </div>
          <div class="meta">
            <div class="author">BlueBird5566</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;2308&#43;%E5%8F%B0%E9%81%94%E9%9B%BB&#43;eps%3A12.86&#43;%E8%82%A1%E5%88%A9%3A6.43"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3ABlueBird5566">搜尋看板內 BlueBird5566 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">39</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709213335.A.3D2.html">[請益] 布林通道操作</a>
          </div>
          <div class="meta">
            <div class="author">OxfordGOD</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E8%AB%8B%E7%9B%8A%5D&#43;%E5%B8%83%E6%9E%97%E9%80%9A%E9%81%93%E6%93%8D%E4%BD%9C"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AOxfordGOD">搜尋看板內 OxfordGOD 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">21</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709213433.A.29A.html">[情報] 3034 聯詠 112年EPS:38.32</a>
          </div>
          <div class="meta">
            <div class="author">BlueBird5566</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;3034&#43;%E8%81%AF%E8%A9%A0&#43;112%E5%B9%B4EPS%3A38.32"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3ABlueBird5566">搜尋看板內 BlueBird5566 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">5</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709214404.A.782.html">[情報] 6231 系微配股2.5+2 私募可轉債 買大樓</a>
          </div>
          <div class="meta">
            <div class="author">swgun</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;6231&#43;%E7%B3%BB%E5%BE%AE%E9%85%8D%E8%82%A12.5%2B2&#43;%E7%A7%81%E5%8B%9F%E5%8F%AF%E8%BD%89%E5%82%B5&#43;%E8%B2%B7%E5%A4%A7%E6%A8%93"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aswgun">搜尋看板內 swgun 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">25</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709214423.A.C3E.html">[情報] 113年02月29日信用交易統計</a>
          </div>
          <div class="meta">
            <div class="author">steward135</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;113%E5%B9%B402%E6%9C%8829%E6%97%A5%E4%BF%A1%E7%94%A8%E4%BA%A4%E6%98%93%E7%B5%B1%E8%A8%88"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3Asteward135">搜尋看板內 steward135 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">45</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709214763.A.1DF.html">[新聞] 金控股利讚 將迎補漲行情</a>
          </div>
          <div class="meta">
            <div class="author">humbler</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E9%87%91%E6%8E%A7%E8%82%A1%E5%88%A9%E8%AE%9A&#43;%E5%B0%87%E8%BF%8E%E8%A3%9C%E6%BC%B2%E8%A1%8C%E6%83%85"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Ahumbler">搜尋看板內 humbler 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">40</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709215147.A.B16.html">[新聞] 美1月PCE年升2.4% 符合預期</a>
          </div>
          <div class="meta">
            <div class="author">humbler</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E7%BE%8E1%E6%9C%88PCE%E5%B9%B4%E5%8D%872.4%25&#43;%E7%AC%A6%E5%90%88%E9%A0%90%E6%9C%9F"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Ahumbler">搜尋看板內 humbler 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">41</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709216280.A.1B1.html">Re: [標的] 2330 台積電只要拉回就是好的買點!</a>
          </div>
          <div class="meta">
            <div class="author">drwashing</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%A8%99%E7%9A%84%5D&#43;2330&#43;%E5%8F%B0%E7%A9%8D%E9%9B%BB%E5%8F%AA%E8%A6%81%E6%8B%89%E5%9B%9E%E5%B0%B1%E6%98%AF%E5%A5%BD%E7%9A%84%E8%B2%B7%E9%BB%9E%21"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Adrwashing">搜尋看板內 drwashing 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
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
      data-cf-beacon='{"rayId":"85da930bec063521","r":1,"version":"2024.2.1","token":"515615eb5fab4c9b91a11e9bf529e6cf"}'
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;

const mockIndexHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>看板 Stock 文章列表 - 批踢踢實業坊</title>

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
            <input class="query" type="text" name="q" value="" placeholder="搜尋文章&#x22ef;" />
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
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E5%8F%B0%E7%81%A31%E6%9C%88%E5%A4%96%E9%8A%B7%E9%99%B8%E6%B8%AF%E8%A8%82%E5%96%AE%E8%B7%B3%E5%A2%9E28%25&#43;%E9%87%91%E9%A1%8D106.4%E5%84%84"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3Apeter080808">搜尋看板內 peter080808 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
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
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E8%AB%8B%E7%9B%8A%5D&#43;%E9%97%9C%E6%96%BC%E5%A4%A7%E9%87%8F%E6%9C%AA%E5%AF%A6%E7%8F%BE%E6%90%8D%E7%9B%8A"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Acgagod">搜尋看板內 cgagod 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
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
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;2888&#43;%E6%96%B0%E5%85%89%E9%87%91112%E5%B9%B4EPS%3A-0.48"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aqazsedcft">搜尋看板內 qazsedcft 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
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
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;3413&#43;%E4%BA%AC%E9%BC%8E&#43;%E8%82%A1%E5%88%A9%EF%BC%9A12"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aadidas32">搜尋看板內 adidas32 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
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
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E5%85%AC%E5%91%8A%5D&#43;%E8%82%A1%E7%A5%A8%E6%9D%BF%E6%9D%BF%E8%A6%8F&#43;v4.4&#43;%282024%2F02%2F15&#43;%E4%BF%AE%E6%AD%A3%29"
                    >搜尋同標題文章</a
                  >
                </div>

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
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E5%85%AC%E5%91%8A%5D&#43;%E6%9D%BF%E8%A6%8F%E4%BF%AE%E6%AD%A3"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Alaptic">搜尋看板內 laptic 的文章</a></div>
              </div>
            </div>
            <div class="date">2/15</div>
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
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E9%96%92%E8%81%8A%5D&#43;2024%2F02%2F29&#43;%E7%9B%A4%E5%BE%8C%E9%96%92%E8%81%8A"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3Avendan5566">搜尋看板內 vendan5566 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
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
      data-cf-beacon='{"rayId":"85d1eb03a82d6889","r":1,"version":"2024.2.1","token":"515615eb5fab4c9b91a11e9bf529e6cf"}'
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;

const mockIndex6564Html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>看板 Stock 文章列表 - 批踢踢實業坊</title>

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
            <a class="btn selected" href="/bbs/Stock/index.html">看板</a>
            <a class="btn" href="/man/Stock/index.html">精華區</a>
          </div>
          <div class="btn-group btn-group-paging">
            <a class="btn wide" href="/bbs/Stock/index1.html">最舊</a>
            <a class="btn wide" href="/bbs/Stock/index6963.html">&lsaquo; 上頁</a>
            <a class="btn wide" href="/bbs/Stock/index6965.html">下頁 &rsaquo;</a>
            <a class="btn wide" href="/bbs/Stock/index.html">最新</a>
          </div>
        </div>
      </div>

      <div class="r-list-container action-bar-margin bbs-screen">
        <div class="search-bar">
          <form type="get" action="search" id="search-bar">
            <input class="query" type="text" name="q" value="" placeholder="搜尋文章&#x22ef;" />
          </form>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">16</span></div>
          <div class="title">(已被laptic刪除) &lt;JerryHu&gt; 1-4-2 4-2-1</div>
          <div class="meta">
            <div class="author">-</div>
            <div class="article-menu"></div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">19</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709190964.A.2F6.html">[情報] 113/02/29 櫃買法人及個股買賣超</a>
          </div>
          <div class="meta">
            <div class="author">q8977452</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;113%2F02%2F29&#43;%E6%AB%83%E8%B2%B7%E6%B3%95%E4%BA%BA%E5%8F%8A%E5%80%8B%E8%82%A1%E8%B2%B7%E8%B3%A3%E8%B6%85"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aq8977452">搜尋看板內 q8977452 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">26</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709190970.A.735.html">[情報] 8046 南電 112年EPS 9 股利 5.5</a>
          </div>
          <div class="meta">
            <div class="author">q1a1</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;8046&#43;%E5%8D%97%E9%9B%BB&#43;112%E5%B9%B4EPS&#43;9&#43;%E8%82%A1%E5%88%A9&#43;5.5"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aq1a1">搜尋看板內 q1a1 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">1</span></div>
          <div class="title">(已被laptic刪除) &lt;inkow&gt; 4-2-1</div>
          <div class="meta">
            <div class="author">-</div>
            <div class="article-menu"></div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f2">6</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709192735.A.425.html">Re: [心得] 債券etf借人後，債息變成要繳稅！！</a>
          </div>
          <div class="meta">
            <div class="author">motekaya</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E5%BF%83%E5%BE%97%5D&#43;%E5%82%B5%E5%88%B8etf%E5%80%9F%E4%BA%BA%E5%BE%8C%EF%BC%8C%E5%82%B5%E6%81%AF%E8%AE%8A%E6%88%90%E8%A6%81%E7%B9%B3%E7%A8%85%EF%BC%81%EF%BC%81"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Amotekaya">搜尋看板內 motekaya 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">46</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709194048.A.01B.html">[情報] 0229 上市外資買賣超排行</a>
          </div>
          <div class="meta">
            <div class="author">paidzou</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;0229&#43;%E4%B8%8A%E5%B8%82%E5%A4%96%E8%B3%87%E8%B2%B7%E8%B3%A3%E8%B6%85%E6%8E%92%E8%A1%8C"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Apaidzou">搜尋看板內 paidzou 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">69</span></div>
          <div class="title">(已被rayccccc刪除) &lt;troy30408&gt; 1-2-5</div>
          <div class="meta">
            <div class="author">-</div>
            <div class="article-menu"></div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">23</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709195474.A.6C4.html">[請益] 請教持股檢驗</a>
          </div>
          <div class="meta">
            <div class="author">tai0916</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E8%AB%8B%E7%9B%8A%5D&#43;%E8%AB%8B%E6%95%99%E6%8C%81%E8%82%A1%E6%AA%A2%E9%A9%97"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Atai0916">搜尋看板內 tai0916 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">35</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709197449.A.EC2.html">[情報] 8478 東哥遊艇 112年度EPS 23.66 股利12</a>
          </div>
          <div class="meta">
            <div class="author">qazsedcft</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;8478&#43;%E6%9D%B1%E5%93%A5%E9%81%8A%E8%89%87&#43;112%E5%B9%B4%E5%BA%A6EPS&#43;23.66&#43;%E8%82%A1%E5%88%A912"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aqazsedcft">搜尋看板內 qazsedcft 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">11</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709197830.A.7FD.html">Re: [心得] 債券etf借人後，債息變成要繳稅！！</a>
          </div>
          <div class="meta">
            <div class="author">yayaha</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E5%BF%83%E5%BE%97%5D&#43;%E5%82%B5%E5%88%B8etf%E5%80%9F%E4%BA%BA%E5%BE%8C%EF%BC%8C%E5%82%B5%E6%81%AF%E8%AE%8A%E6%88%90%E8%A6%81%E7%B9%B3%E7%A8%85%EF%BC%81%EF%BC%81"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Ayayaha">搜尋看板內 yayaha 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">29</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709198484.A.D43.html">[新聞] 台版主動式ETF要來了？國內投信業者擔</a>
          </div>
          <div class="meta">
            <div class="author">qazsedcft</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E5%8F%B0%E7%89%88%E4%B8%BB%E5%8B%95%E5%BC%8FETF%E8%A6%81%E4%BE%86%E4%BA%86%EF%BC%9F%E5%9C%8B%E5%85%A7%E6%8A%95%E4%BF%A1%E6%A5%AD%E8%80%85%E6%93%94"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aqazsedcft">搜尋看板內 qazsedcft 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">21</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709198975.A.FC4.html">[情報] 台塑化董事會決議股利分派</a>
          </div>
          <div class="meta">
            <div class="author">ilovecat5566</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;%E5%8F%B0%E5%A1%91%E5%8C%96%E8%91%A3%E4%BA%8B%E6%9C%83%E6%B1%BA%E8%AD%B0%E8%82%A1%E5%88%A9%E5%88%86%E6%B4%BE"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3Ailovecat5566">搜尋看板內 ilovecat5566 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">10</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709199510.A.F91.html">Re: [情報] 6023 元大期貨 現金股利 5</a>
          </div>
          <div class="meta">
            <div class="author">d2623</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;6023&#43;%E5%85%83%E5%A4%A7%E6%9C%9F%E8%B2%A8&#43;%E7%8F%BE%E9%87%91%E8%82%A1%E5%88%A9&#43;5"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Ad2623">搜尋看板內 d2623 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f1">爆</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709199572.A.715.html">[請益] 關於大量未實現損益</a>
          </div>
          <div class="meta">
            <div class="author">ascii1204</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E8%AB%8B%E7%9B%8A%5D&#43;%E9%97%9C%E6%96%BC%E5%A4%A7%E9%87%8F%E6%9C%AA%E5%AF%A6%E7%8F%BE%E6%90%8D%E7%9B%8A"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aascii1204">搜尋看板內 ascii1204 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">39</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709200879.A.B19.html">[情報] 2327 國巨 112年EPS 41.8 股利 20+2</a>
          </div>
          <div class="meta">
            <div class="author">q1a1</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;2327&#43;%E5%9C%8B%E5%B7%A8&#43;112%E5%B9%B4EPS&#43;41.8&#43;%E8%82%A1%E5%88%A9&#43;20%2B2"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aq1a1">搜尋看板內 q1a1 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">16</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709201215.A.007.html">[新聞] 半導體》同欣電擬配息2.4元 今年毛利率</a>
          </div>
          <div class="meta">
            <div class="author">cmuse</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E5%8D%8A%E5%B0%8E%E9%AB%94%E3%80%8B%E5%90%8C%E6%AC%A3%E9%9B%BB%E6%93%AC%E9%85%8D%E6%81%AF2.4%E5%85%83&#43;%E4%BB%8A%E5%B9%B4%E6%AF%9B%E5%88%A9%E7%8E%87"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Acmuse">搜尋看板內 cmuse 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">19</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709202268.A.F3A.html">[情報] 113/02/29 八大公股銀行買賣超排行</a>
          </div>
          <div class="meta">
            <div class="author">q1a1</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%83%85%E5%A0%B1%5D&#43;113%2F02%2F29&#43;%E5%85%AB%E5%A4%A7%E5%85%AC%E8%82%A1%E9%8A%80%E8%A1%8C%E8%B2%B7%E8%B3%A3%E8%B6%85%E6%8E%92%E8%A1%8C"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aq1a1">搜尋看板內 q1a1 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">44</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709204382.A.93B.html">[新聞] 來滋烤鴨收攤 王品：汰弱留強 維持最佳經營配置</a>
          </div>
          <div class="meta">
            <div class="author">addy7533967</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E4%BE%86%E6%BB%8B%E7%83%A4%E9%B4%A8%E6%94%B6%E6%94%A4&#43;%E7%8E%8B%E5%93%81%EF%BC%9A%E6%B1%B0%E5%BC%B1%E7%95%99%E5%BC%B7&#43;%E7%B6%AD%E6%8C%81%E6%9C%80%E4%BD%B3%E7%B6%93%E7%87%9F%E9%85%8D%E7%BD%AE"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item">
                  <a href="/bbs/Stock/search?q=author%3Aaddy7533967">搜尋看板內 addy7533967 的文章</a>
                </div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">23</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709204477.A.427.html">Re: [新聞] 輝達H100晶片紓壓了 訂單大戶開始轉</a>
          </div>
          <div class="meta">
            <div class="author">w180112</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E6%96%B0%E8%81%9E%5D&#43;%E8%BC%9D%E9%81%94H100%E6%99%B6%E7%89%87%E7%B4%93%E5%A3%93%E4%BA%86&#43;%E8%A8%82%E5%96%AE%E5%A4%A7%E6%88%B6%E9%96%8B%E5%A7%8B%E8%BD%89"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3Aw180112">搜尋看板內 w180112 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="r-ent">
          <div class="nrec"><span class="hl f3">26</span></div>
          <div class="title">
            <a href="/bbs/Stock/M.1709204511.A.D5F.html">[請益] 持股健檢</a>
          </div>
          <div class="meta">
            <div class="author">Muchwl</div>
            <div class="article-menu">
              <div class="trigger">&#x22ef;</div>
              <div class="dropdown">
                <div class="item">
                  <a
                    href="/bbs/Stock/search?q=thread%3A%5B%E8%AB%8B%E7%9B%8A%5D&#43;%E6%8C%81%E8%82%A1%E5%81%A5%E6%AA%A2"
                    >搜尋同標題文章</a
                  >
                </div>

                <div class="item"><a href="/bbs/Stock/search?q=author%3AMuchwl">搜尋看板內 Muchwl 的文章</a></div>
              </div>
            </div>
            <div class="date">2/29</div>
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
      data-cf-beacon='{"rayId":"85de45c61fd9af9a","r":1,"version":"2024.2.4","token":"515615eb5fab4c9b91a11e9bf529e6cf"}'
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;

// Mock the utility function
jest.mock('../utility/requestCore', () => ({
  getHTMLWithPuppeteer: jest.fn(),
}));

describe('test fetchNewPosts', () => {
  beforeEach(() => {
    // Clear the mock before each test
    jest.requireMock('../utility/requestCore').getHTMLWithPuppeteer.mockClear();
  });

  it('should stop at index page', async () => {
    const getHTMLMock = jest.requireMock('../utility/requestCore').getHTMLWithPuppeteer;
    const htmlContent = cheerio.load(mockIndexHtml, {
      decodeEntities: false,
    });
    getHTMLMock.mockResolvedValue(htmlContent);

    const mockIdSet = new Set<number>();
    mockIdSet.add(1709219116);

    const result = await fetchNewPosts('https://www.ptt.cc', 123, mockIdSet);

    // Assertions for function calls and parameters
    expect(result.length).toEqual(1);
    expect(getHTMLMock).toHaveBeenCalledWith(`https://www.ptt.cc/bbs/Stock/index.html`);
    expect(getHTMLMock).toHaveBeenCalledTimes(1);
  });

  it('should stop when reach stop count', async () => {
    const getHTMLWithPuppeteer = jest.requireMock('../utility/requestCore').getHTMLWithPuppeteer;
    getHTMLWithPuppeteer.mockImplementation(async (url: string) => {
      if (url === 'https://www.ptt.cc/bbs/Stock/index.html') {
        return cheerio.load(mockIndexHtml, { decodeEntities: false });
      } else if (url === 'https://www.ptt.cc/bbs/Stock/index6965.html') {
        return cheerio.load(mockIndex6965Html, { decodeEntities: false });
      } else if (url === 'https://www.ptt.cc/bbs/Stock/index6964.html') {
        return cheerio.load(mockIndex6564Html, { decodeEntities: false });
      } else {
        return null;
      }
    });

    const mockIdSet = new Set<number>();
    const result = await fetchNewPosts('https://www.ptt.cc', 123, mockIdSet);

    console.log(getHTMLWithPuppeteer.mock.calls);
    expect(getHTMLWithPuppeteer).toHaveBeenCalledWith(`https://www.ptt.cc/bbs/Stock/index.html`);
    expect(getHTMLWithPuppeteer).toHaveBeenCalledWith(`https://www.ptt.cc/bbs/Stock/index6965.html`);
    expect(getHTMLWithPuppeteer).toHaveBeenCalledWith(`https://www.ptt.cc/bbs/Stock/index6964.html`);
    expect(getHTMLWithPuppeteer).toHaveBeenCalledTimes(3);
  });

  it('should go to previouse page and stop', async () => {
    const getHTMLMock = jest.requireMock('../utility/requestCore').getHTMLWithPuppeteer;

    getHTMLMock.mockImplementation(async (url: string) => {
      if (url === 'https://www.ptt.cc/bbs/Stock/index.html') {
        return cheerio.load(mockIndexHtml, { decodeEntities: false });
      } else if (url === 'https://www.ptt.cc/bbs/Stock/index6965.html') {
        //有一筆刪除的文章
        return cheerio.load(mockIndex6965Html, { decodeEntities: false });
      } else {
        return null;
      }
    });

    const mockIdSet = new Set<number>();
    mockIdSet.add(1709208620);

    const result = await fetchNewPosts('https://www.ptt.cc', 123, mockIdSet);
    expect(result.find((x) => x.id == 1709208620)).toBeFalsy();
    expect(result.find((x) => x.id == 1709208041)).toBeFalsy();
    expect(result.find((x) => x.id == 1709207019)).toBeFalsy();
    expect(result.length).toEqual(20);
    expect(getHTMLMock).toHaveBeenCalledWith(`https://www.ptt.cc/bbs/Stock/index.html`);
    expect(getHTMLMock).toHaveBeenCalledWith(`https://www.ptt.cc/bbs/Stock/index6965.html`);
    expect(getHTMLMock).toHaveBeenCalledTimes(2);

    const sortedArray = [...result.map((x) => x.id)].sort((a, b) => b - a);
    const resultIds = result.map((x) => x.id); //should be desc order
    expect(resultIds).toEqual(sortedArray);
  });
});
