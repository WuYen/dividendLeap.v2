import { GoogleGenerativeAI, RequestOptions } from '@google/generative-ai';
import config from '../utility/config';
import fs from 'fs/promises';

const genAI = new GoogleGenerativeAI(config.GEMINI_KEY);

export async function generateWithText(prompt: string): Promise<string> {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export async function generateWithTunedModel(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const parts = [
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短盡量在一百次到三百字之間\\n文章內容如下\\n\\n作者agogo1202 (阿GOGOGO)看板Stock標題[標的] 6197 佳必琪 多時間Sun May 12 18:14:25 2024\\n標的：\\n 6197 佳必琪\\n\\n分類：多/空/討論/心得\\n 多\\n\\n分析/正文：\\n【基本面】：公司三月法說宣布有望打入GB200供應鏈\\n以及佳必琪本來就是美超微概念股\\n重點Q1 EPS 1.94\\n個人推估 Q2 EPS 2.1以上應該問題不大\\n(只要營收維持在5~6億)\\n公司法說有說下半年營收優於上半年~\\n營收比重約是4:6\\n假設H1 EPS預估4元\\n則2024 EPS有機會挑戰10元\\nAI概念股(GB200概念股)本益比可給20~25倍\\n\\n【籌碼面】：\\n投信約140附近進場布局\\n1000張大戶約47%\\n30張以下散戶約28%\\n對我來說算健康的大戶散戶比例\\n\\n【技術面】：\\nMACD即將翻紅\\n月線禮拜一扣167\\n禮拜二扣150.5\\n最慢禮拜二只要股價不大跌\\n往上攻擊月線就會翻揚\\n\\n\\n進退場機制：\\n(非長期投資者，必須有停損機制。討論、心得類免填)\\n進場點：150以下進場\\n\\n停損點：進場價-5%\\n(不要在那邊講什麼以前買過50佳必琪之類的話...)\\n買50停損也是-5% 買147停損也是-5%\\n目前指數是在20600附近 不能再拿15600的股價來對比...\\n禮拜一月線應該在147附近\\n買在150以下停損設5%\\n應該不容易觸碰到停損\\n\\n\\n停利點\\n保守者可突破180(創短線新高)\\n185左右就先賣一趟\\n此處獲利約+25% (風險報酬比也有1:5)\\n\\n個人認為是有機會漲到20倍本益比\\n也就是200左右!!\\n\\n\\n補充：目前市場資金都跑去傳產~\\n電子股確實比較缺乏人氣\\n不過我本來就不愛湊熱鬧XD\\n星期一開盤可先觀察\\n資金是否持續停留在航運、金融或營建股\\n或是漲台積中小跌倒\\n但5/21輝達公布財報\\n6月初電腦展大咖又要來台灣\\n小弟認為下半年AI還是會有機會再漲一波!!\\n\\n個人最慢星期二會進場(到時候再PO對帳單上來)\\n\\n\\n\\n\\n--',
    },
    {
      text: 'output: [標的] 6197 佳必琪 多\n分類：多\n進退場機制如下:\n進場: 150以下進場\n停利:\n* 突破180(創短線新高)時,保守者可在185左右先賣一趟,獲利約+25%(風險報酬比1:5)\n* 作者認為有機會漲到20倍本益比,約200左右\n停損: 進場價-5%\n\n重點摘要:\n作者看好6197佳必琪,理由包括:公司法說宣布有望打入GB200供應鏈,且為美超微概念股;預估2024年EPS有機會挑戰10元,給予AI概念股20-25倍本益比評價。技術面上,MACD即將翻紅,月線有機會往上攻擊。籌碼面上,投信、大戶和散戶比例算健康。作者認為下半年AI還會有一波漲勢,最慢下週二會進場,並將公布對帳單。不過作者也提及,目前市場資金較集中在傳產等族群,電子股缺乏人氣,需觀察資金流向。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短盡量在一百次到三百字之間\\n文章內容如下\\n\\n作者id44kimo (擁抱吧(B))看板Stock標題[標的] 1513 中興電 多時間Wed Apr 10 11:01:08 2024\\n\\n標的：1513 中興電\\n(例 2330.TW 台積電)\\n\\n分類：多\\n(請選擇並刪除無關分類)\\n\\n分析/正文：\\n\\n真要寫其實亞力也不錯\\n\\n不過我不太喜歡在去追已經發動的股\\n\\n重電就這四家\\n\\n唯一沒動的就中興電 傳說中的跟跌不跟漲\\n\\n最近有篇新聞蠻有意思的\\n\\n中興電外銷美國的首批變壓器訂單金額約1900萬美元，\\n\\n交期受限台灣產能滿載，需要18個月，\\n\\n估計要到明年中後才能交貨。\\n\\n又距雲豹案已經快一年了\\n\\n也就是各家大戶大概又可以寫報告看能不能進場\\n\\n已目前看下來~長期是好的\\n\\n再加上華城要破千~總會有個震盪期 外溢資金也是往其他三家走\\n\\n既然亞力都動了~中興電應該也不遠啦\\n\\n\\n進退場機制：\\n(非長期投資者，必須有停損機制。討論、心得類免填)\\n\\n180上下都還能進場\\n\\n退場我看這幾年應該不太需要退了= =|\\n\\n看到華城那樣根本跟燈塔一樣了\\n\\n--\\n\\n我也在思考~為甚大人要壓中興電\\n\\n這樣壓的意義在哪 但也可能是故意在壓',
    },
    {
      text: 'output: [標的] 8940新天地 財報噴噴 多\n分類：多\n進退場機制如下:\n進場：明天開盤\n停利：波段45-60\n停損：60MA\n\n重點摘要:\n天地 (8940) 公布Q1財報，單季EPS達1.15元，創2021年來新高。毛利率維持在55%的歷史高位，盈益率創新高達22%。Q1獲利主要來自本業，業外僅佔0.45%。今日股價跌停是因四月營收不佳，但此情況在過去10年中有8年發生，原因是傳統觀念中四月忌婚嫁。今日跌停由元大-西屯分點買進335張，顯示主力吃貨。目前股價30.5元已低於主力成本。新天地股本僅6.8億，大戶持股比例66%。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者m4vu0 (m4vu0)看板Stock標題[標的] 2489 瑞軒 無敵多時間Wed May 29 19:04:08 2024\\n-------------------------------------------------------------------------\\n1.發標的文未充實內文，多空理由不充實者，板規1-1-5或4-4處份\\n2.進退場機制若非長期投資，請輸入停損價，否則依板規1-1-6處份\\n3.請依格式輸入內容，未依格式者板規1-1-2砍文處份。\\n\\n標題請使用以下格式：股號.市場碼+股名+分類 (市場碼：TW US HK CN JP KR...)\\n ex [標的] 2330.TW 台積電 長期不停損多\\n ex [標的] TSLA.US 特斯拉 馬斯克火星多\\n---------------------按ctrl+y 可刪除以上內容。----------------------------\\n\\n標的：2489瑞軒\\n\\n分類：多/空/討論/心得\\n無敵多\\n\\n分析/正文：\\n\\n基本面：第一季 0.77。本益比很低\\n技術面：多年大底 帶量突破\\n消息面：AI 機器人\\n\\n\\n進退場機制：\\n(非長期投資者，必須有停損機制。討論、心得類免填)\\n進場：明天開盤\\n停損：5%\\n停利：50%\\n\\n--',
    },
    {
      text: 'output: [標的] 2489 瑞軒 無敵多\n分類：多\n進退場機制如下:\n進場：明天開盤\n停利：50%\n停損：5%\n\n重點摘要:\n瑞軒 (2489) 基本面良好，第一季EPS為0.77，本益比很低。技術面上，多年大底已帶量突破。消息面上，公司涉及AI與機器人領域。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者leo15824 (小志)看板Stock標題[標的] 8147正凌 輝達Spectrum-X概念多時間Wed May 29 09:14:21 2024\\n1. 標的：8147正凌\\n\\n2. 分類：多\\n\\n3. 分析/正文：\\n\\n3-1\\n\\n繼上次NV創辦人黃仁勳來台演講講台後方出現SOLOMON Logo後2359所羅門兩個月大漲超過\\n3倍，週日黃仁勳提早抵台準備電腦展前的固樁(圖1)，這次他於6/2週日晚上在台大的演\\n講，會帶動哪些股票波段大漲 ? 我想每個人都很想知道，從上週5/22輝達盤後財報公布\\n後黃仁勳先生拋出的「Spectrum-X」(圖2)，這是目前看起來是最具未來爆發潛力的，Spe\\nctrum-X是專為生成式AI打造的超高速網路平台，目前提供輝達Spectrum-X平台的公司包\\n括戴爾、聯想、慧與及美超微，黃仁勳更直言未來的乙太網路產品路線圖令人振奮，我想\\nSpectrum-X能查到的新聞真的不多，多數台灣媒體會提到PCB層數會從16-20層跳到48層，\\n金像電、博智最受惠，又或者提到矽光子、網通族群直接受惠，但研究矽光子族群後看到\\n多數已經大漲一段而網通股也很容易只是買到題材而沒真正實質受惠，我反而覺得直接縮\\n小方向到Nvidia供應鏈裡面最快速，以上四家大廠加入這個平台肯定都是為了跟著Nvidia\\n，與其找一堆可能吃到這個平台的網通、PCB族群不如找鐵定會跟著Nvidia一起共好的標\\n的\\n\\n3-2\\n\\n2019年Nvidia用69億美金併購一家從事網路架構技術的公司Mellanox(圖3)，此併購目前\\n看來就是為了因應現在AI資料中心準備起飛的高速運算，Nvidia強調Spectrum-X對於整體\\nAI效能與電力使用效益改善的幅度可達到1.6倍，8147正淩最大股東為3023信邦持股8.95%\\n，正淩光通訊產品大約占營收46.5%，目前第一大客戶就是輝達(NVIDIA)旗下的高速網路\\n技術領導者Mellanox，現階段出貨給Mellanox連接器主要為200G，400G小量出貨，800G則\\n是還在開案中，等同正淩光通訊產品間接打入輝達(NVIDIA)，且未來隨著交換器規格、技\\n術提升還會挹注營收成長好一段時間，正淩第二大客戶則是白牌大廠2345智邦，智邦接到\\n美國半導體大廠HABANA AI伺服器散熱訂單， Habana AI加速器晶片GAUDI 2中連接器也是\\n由正淩供應，預估今年正淩光通訊產品可以成長30%以上，其他亞馬遜無人機及倉儲運送\\n機、光模塊散熱雖營收不大但都是新的營收成長來源，不論是光通訊或AI晶片散熱新產品\\n未來挾著AI發展都是逐步向上墊高，8147正淩未來營運展望來看對比股價，評估下來還有\\n很大的向上突破空間\\n\\n3-3\\n\\n8147正淩目前股本僅3.6億，扣除大股東持股賣出須申報，等同在外流通股數才2.5萬張左\\n右相對稀少，可轉債正淩二的2億餘額也早就轉換到僅剩下380萬(圖4)，等同CB不會再造\\n成股票轉換賣壓，券商籌碼來看最近買超的券商分點幾乎是前一波高點出場漂亮的老手，\\n桃園一代、汐止公司附近這幾個分點最近買超600多張(圖5)，光通訊產業的成長性搭配在\\n外流通股數稀少，關鍵是卡到大客戶Mellanox就是輝達併購來發展高速傳輸的公司，看起\\n來股價很有波段大漲的契機\\n\\n4. 進退場機制\\n\\n昨天漲停附近已經先布局主要部位(圖6)，今早開盤123元再加碼一些，停損設定15%出場\\n，停利則關注籌碼面幾個券商分點動作及盤面光通訊題材面強弱\\n\\nhttps://i.imgur.com/kDjRkcf.jpeg\\n\\nhttps://i.imgur.com/3brYXdf.jpeg\\n\\nhttps://i.imgur.com/eOVv9Z7.jpeg\\n\\nhttps://i.imgur.com/LuT3ZBG.jpeg\\n\\nhttps://i.imgur.com/uo4TXd4.jpeg\\n\\nhttps://i.imgur.com/bIrTP4h.jpeg\\n\\n--',
    },
    {
      text: 'output: [標的] 8147正凌 輝達Spectrum-X概念多\n分類：多\n進退場機制如下:\n進場：昨天漲停附近已先布局，今早開盤123元再加碼一些\n停利：關注籌碼面幾個券商分點動作及盤面光通訊題材面強弱\n停損：15%\n\n重點摘要:\n因輝達的Spectrum-X概念股而被看好。Nvidia併購的Mellanox主要從事高速網路技術，正凌為其主要供應商，出貨200G和400G連接器，800G產品仍在開發。正凌光通訊產品占營收46.5%，預計今年成長30%以上。第一大客戶為輝達，第二大客戶為智邦，供應Habana AI伺服器散熱器。正凌股本僅3.6億，流通股數少，籌碼集中。評估下來還有\n很大的向上突破空間。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者leo15824 (小志)看板Stock標題[標的] 3312弘憶股 台版CoreWeave概念多時間Tue Jun 11 09:09:50 2024\\n1. 標的：3312弘憶股\\n\\n2. 分類：多\\n\\n3. 分析/正文：\\n\\n3-1\\n這次黃仁勳演講帶動一大片供應商股價資金進駐，很多人可能沒注意到他左後方出現的Lo\\ngo GMI(圖1)，這家公司正是3312弘憶股所合作的公司，GMI Cloud加入輝達雲服務供應商\\n計畫後更是成為首家台灣NVIDIA認證的夥伴(圖2)，究竟GMI Cloud未來有什麼爆發力呢?\\n首先我們看到今年2/23弘憶股重訊宣布將取得50台美超微(Supermicro)伺服器(圖3)(後面\\n追加5台變成55台)，這些伺服器將搭載輝達H100晶片，事實上目前弘憶股也擁有900張H10\\n0算力租借\\n\\n3-2\\n為什麼算力非常重要呢? 由於算力投資成本昂貴，許多企業在訓練AI模型或做研究時，會\\n選擇租賃雲端算力，先來談一下國外輝達所投資的一家算力租借公司CoreWeave，這家公\\n司短短5個月內估值從70億美元成長至190億美元翻了170%，國外向 CoreWeave 租用 Nvid\\nia A100 40GB的費用為每小時 2.39 美元， Azure 以相同 GPU 的租金每小時為 3.4 美\\n元， Google Cloud 每小時要 3.67 美元，甚至連微軟都跟 CoreWeave 合作，而台灣來\\n看正崴（2392）5/27宣示，將向華碩（2357）採購千張H100顯示卡，打造全台最大AI算力\\n中心，可見算力租借絕對是未來幾年最新趨勢，也因為進入門檻高因此最早進入者將得天\\n下\\n\\n3-3\\n弘憶股除了最早投入也是首家拿下NV認證外，背後還有富爸爸瑞昱集團奧援，拉開第一大\\n股東名單德捷投資(股)-葉佳紋持有5.3萬張(32.46%)就是瑞昱創辦人，再來德佳投資(股)\\n持有1.3萬張(8.29%)就是瑞昱相關集團的3652精聯、2414精技董事，其他大股東持股也佔\\n了近10%，也就代表弘憶股持股有接近50%落在內部人手中，股本16.26億元來看扣除以上\\n所提的內部人那麼在外流通僅剩下8萬張左右，如果搭上未來算力租借長多題材我想籌碼\\n將呈現越漲越稀少狀況(籌碼被鎖住)，也難怪今年初剛重訊宣布採購美超微伺服器，股價\\n短短一個月就飆漲了近一倍，預估Q3開始算力租賃慢慢化為獲利股價向上想像空間大，最\\n後提一下GMI弘憶股董事長德捷投資（葉佳紋）與GMI Cloud創辦人葉威廷登記人的佳雲投\\n資都登記在同一個地址，看起來雖然彼此僅是合作夥伴，但如果有父子關係未來由宏憶股\\n採購伺服器、晶片租賃給GMI Cloud 提供客戶技術服務，這個合作關係應該是長長久久沒\\n問題\\n\\n3-4\\n儘管目前GMI Cloud 客戶仍以美國為主，但近期GMI Cloud宣布是方、昕奇、三方合作搶\\n進亞太 AI 雲算力(圖4)，是方背後除了代表電信龍頭中華電信資金，也是台灣最大的國\\n際級中立資料中心運營商，這項合作就代表未來弘憶股將挾帶著NV認證商將算力租借推到\\n台灣所有需要AI訓練相關的企業，這些台灣的企業不僅在台灣需要用到海外據點也同步需\\n要弘憶股出借算力，GMI Cloud可以獲得最新的DGX和HGX H100 GPU系統，為客戶提供高性\\n能計算和AI訓練的一站式解決方案，預估下半年弘憶股將因為算力出租營收每月增加近1\\n億元，後續Q3還會採購更多美超微伺服器搭載輝達最強晶片，弘憶股將持續發債10憶來採\\n購伺服器、晶片以擴展算力出租這塊錢景市場，這項事業體因為進入門檻高且競爭少將使\\n弘憶股成為台灣第一算力包租公，大啖AI算力爆發的時機財，如果依照法人估算算力中心\\n出租大約1.5-2年可以將成本回收(圖5)，1年半後算力租賃就變成弘憶股一項低成本穩定\\n收入的金雞母\\n\\n4. 進退場機制\\n\\n這檔股票目前處置5分盤要到6/20，處置階段買進張數單筆僅能9張最多3筆否則要預收扣\\n款，因此欲買進過多較為受限，今天開盤附近個人已經進場一部分，後面幾天只要有拉回\\n就來分批補貨，停損抓第一根跳空漲停59.2元跌破，停利不設限想來放個大波段，有興趣\\n的投資人可以聽聽看以下這集podcast 專訪GMI Cloud創辦人葉威廷，聽下來是蠻有想法\\n也知道自己在做什麼的CEO\\nhttps://reurl.cc/QRGbkM\\n\\n\\nhttps://i.imgur.com/WN0wbkZ.jpeg\\n\\nhttps://i.imgur.com/kQW5mTm.jpeg\\n\\nhttps://i.imgur.com/yjE79Zt.jpeg\\n\\nhttps://i.imgur.com/5TtWdB9.jpeg\\n\\nhttps://i.imgur.com/0X3M9B9.jpeg\\n\\n--',
    },
    {
      text: 'output: [標的] 3312弘憶股 台版CoreWeave概念多\n分類：多\n進退場機制如下:\n進場：今天開盤附近已經進場一部分，後面幾天只要有拉回就分批補貨\n停利：不設限，目標為大波段\n停損：第一根跳空漲停59.2元跌破\n\n重點摘要:\n作者看好3312弘憶股,主要是因為其合作夥伴GMI Cloud成為NVIDIA在台首家認證夥伴,有望分享AI算力租賃大餅。弘憶股已取得55台搭載NVIDIA H100晶片的美超微伺服器,具備900張算力可出租。算力租賃市場前景遠大,國外類似公司CoreWeave短期內估值大漲。弘憶股大股東為資金實力雄厚的瑞昱集團,股本只有16億多,內部人持股近50%,外部流通量有限。GMI Cloud已與台灣大廠合作拓展亞太市場。估計下半年弘憶股每月可增加近1億營收。弘憶股處於算力租賃熱潮的最佳時機點,加上高門檻優勢,被視為"台版CoreWeave"潛力股。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者agogo1202 (阿GOGOGO)看板Stock標題[標的] 8054 安國 爭議何其多時間Sat Jun 15 17:08:22 2024\\n\\n標的：\\n 8054 安國\\n\\n分類：多\\n\\n\\n分析/正文：\\n\\n基本面：\\n來ptt分享神棍集團\\n應該會有不少質疑聲XD\\n\\n不過有看到一些跡象\\n覺得安國近期應該要發動了\\nhttps://imgur.com/5g9cNNE\\nhttps://imgur.com/GxitMpa\\n\\n安國去年12月營收\\n應該星河半導體10月中~12月底營收一次灌入\\n去年12月營收會然是3億多\\n但是自結EPS不如預期\\n個人腦補是因為匯損及打銷呆帳等\\n\\n而五月董事會安國有加碼星河半導體股權\\n目前持股應該接近90%\\n\\n所以2.38億個人認為有機會是損益兩平\\n甚至小賺\\n\\n而IP股 NRE通常3.6.9.12月是入帳高峰\\n個人認為安國六月營收就有機會虧轉盈\\n\\n而網路謠傳安國有吃到日韓大訂單\\n無從查證所以小弟特別去查了一下安國的合約負債\\nhttps://imgur.com/gFV7MEY\\n的確發現安國Q1合約負債大增!\\n\\n籌碼面\\n近三週1000張大戶持股比例連續增加\\nhttps://imgur.com/z8wA1t1\\n近五日收集派發顯示籌碼集中度變高\\n\\n\\n技術面\\n安國去年底曾經漲過一次5倍漲幅\\n不過目前月線161.5 季線155.5\\n20週均線也在160左右\\n技術面支撐不遠\\n月K漲三個月後也休息了四個月\\nhttps://imgur.com/SdMYGV8\\n週線也呈現三角收斂\\n\\n進退場機制：\\n\\n\\n神棍七月也會併入乾瞻科技及日本IP公司\\n六月底個人覺得是神棍集團\\n再次發動的時機點\\n\\n另外芯鼎處置到18號\\n星期二也確實有可能再次發動\\n\\n神棍集團當沖多87%都開盤拉高尾盤收最低\\n綜合以上星期一13:15後進場\\n希望能買在160~165附近\\n(有靠近季線155.5更好)\\n~~買進後會補對帳單~~\\n\\n停損點設買進價格-6%\\n停利點設買進價格+30%\\n\\n風險報酬比約1:5\\n\\n\\n題外話:\\n有人站內信問我佳必琪\\n目標價是否有調整\\n星期一開高接近200我會賣一半\\n\\n另外一半依照公司股東會說法\\n接單到明年以及投信近期還是持續買進\\n剩下一半我就放著看看有沒有機會挑戰250~300\\n\\n\\n\\n--',
    },
    {
      text: 'output: [標的] 8054 安國 爭議何其多\n分類：多\n進退場機制如下:\n進場：160~165附近，靠近季線155.5更好\n停利：買進價格+30%\n停損：買進價格-6%\n\n重點摘要:\n作者認為安國近期將發動，理由包括：\n* 安國去年12月營收受星河半導體影響，自結EPS不如預期，可能因匯損及打銷呆帳。\n* 今年5月董事會加碼星河半導體股權，目前持股接近90%，估計星河半導體的損益接近平衡甚至小賺。\n* 安國IP股的NRE收入通常在3、6、9、12月有高峰，預估6月營收有機會虧轉盈。\n* 安國Q1合約負債大增，顯示可能接獲日韓大訂單。\n* 籌碼面顯示1000張大戶持股比例連續增加，近五日收集派發顯示籌碼集中度變高。\n* 技術面上，安國去年底曾漲過5倍，目前月線、季線及20週均線支撐不遠。\n\n作者看好安國在6月底神棍集團再次發動的時機點，預計會當沖，買在開盤拉高尾盤收最低時。\n另外，作者也提及了佳必琪，表示目標價已調整，星期一開高接近200會賣一半，另一半則放著看能否挑戰250~300。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者kobekid (Granger神了)看板Stock標題[標的] 4571 鈞興ky 機器人future多時間Wed Jun  5 20:08:27 2024\\n\\n標的：4571 鈞興ky\\n分類：多\\n分析/正文：\\n1.鈞興ky主要是做齒輪，有打入歐美電動手工具市場，目前切入機器人齒輪，目前已出貨給\\n全球四大機器人家族安川和kuka，安川是輝達的合作夥伴，前四月eps\\n3.21,且鈞興ky可以生產素有機器人心臟之稱諧波降速器，目前生產幾百套給中國，由於諧\\n波降速器市占還是日本最高，鈞興ky可以生產諧波降速器這不簡單，且生產機器人齒輪會比\\n生產其他產品毛利率為高，從其他機器人概念股來看算是本益比最低的一檔股票，且今年業\\n績也不錯\\n\\n\\n\\n\\n進退場機制：長期投資\\n\\n----\\nSent from BePTT on my Samsung SM-A5460\\n\\n--',
    },
    {
      text: 'output: [標的] 4571 鈞興ky 機器人future多\n分類：多\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 無\n\n重點摘要:\n作者看好4571 鈞興ky，原因是其主要業務為齒輪製造，已打入歐美電動手工具市場，並切入機器人齒輪領域，供貨給安川和kuka等全球四大機器人家族。安川是輝達的合作夥伴。鈞興ky可以生產素有機器人心臟之稱的諧波降速器，目前已生產幾百套給中國。由於諧波降速器市場主要由日本廠商主導，鈞興ky能生產此產品具有優勢，且機器人齒輪的毛利率高於其他產品。作者認為鈞興ky是機器人概念股中本益比最低的一檔，且今年業績也不錯。因此，作者將長期持有鈞興ky股票。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者kace111512 (SeeSawFRee)看板Stock標題[標的] 6117.TW 迎廣上修目標價時間Wed May 22 10:06:53 2024\\n標的：6117.TW 迎廣\\n(例 2330.TW 台積電)\\n\\n分類：多\\n(請選擇並刪除無關分類)\\n\\n分析/正文：\\n\\n恭喜持有迎廣的人，今天又再次漲停\\n\\n有關注我的人都知道\\n迎廣是我持續看好的股票\\n\\n我已經低調再低調了，偶爾文章內稍微提一下，而這次不會再假突破了吧？\\n這次一定破114.5 大家說好不好？\\n\\n\\nhttps://i.imgur.com/bWpAF6e.jpeg\\nQ1 財報都已經出來了 EPS 1.15\\n可惜毛利率沒有較上一季高，不然股價肯定不是這樣子\\n\\n但Q1的毛利率其實還是開得不錯\\n往年Q1毛利幾乎是整年度的低標\\n\\n而近幾年來 Q2 > Q1，有望毛利率再度突破30，那更會是一大利多，勤誠的毛利率都趕不\\n上。\\n\\n搭配去年法說會24Q2底預期（期望），伺服器佔比將達到5成以上。\\n\\n法說會其實就已經預告Q2 肯定會比Q1好了。\\n\\n而5月底法說會將再度開示，有高機率是樂觀行情\\n\\n另外，新聞法人預估整年度EPS 5元，照預估的話目前本益比 20，目標達到25 以上。\\n（看起來 5 不難？）\\n\\n第一、比價勤誠近四季本益比25，曾達到30以上\\n\\n第二、比價股價相近又有題材的晟銘電，一直玩你追我跑的遊戲\\n看來迎廣還是跑贏了\\n\\n除非整個機殼類股死亡，不然這波行情，迎廣將持續推升股價\\n\\n前幾天CB定價已經出來，\\n集一身利多龍珠，破114.5（突破行情）就是第七顆龍珠了。\\n\\n\\nhttps://i.imgur.com/F6ya61u.jpeg\\n\\n\\n進退場機制：\\n停利 133～135 （獲利將近22.81%）\\n停損 95.3 （損失可能達到13.54%）\\n(非長期投資者，必須有停損機制。討論、心得類免填)\\n\\n--\\n貼到當沖單\\n笑死 真派 看來你買很多\\n\\n當沖不影響持股 兩件事是分開的\\n重回日均線 晟銘電還是滿勇的\\n短波段目標上看97.9～\\n但，別太貪心，預估獲利有機會來到20%～30%\\n\\n我想之前標的提到的，應該算有達標吧，差那一點點檔位不影響整體獲利太多。\\n5分k被出貨出爛\\n我是真忘了NV 財報這件事，結果沒等財報公佈。我手上是沒賣 只是可惜被我賣飛的朋友',
    },
    {
      text: 'output: [標的] 6117.TW 迎廣上修目標價\n分類：多\n進退場機制如下:\n進場:  無\n停利: 133~135\n停損: 95.3\n\n重點摘要:\n作者看好6117迎廣，預期股價將突破114.5。作者認為迎廣Q1財報表現不錯，毛利率維持在不錯水準，並預期Q2毛利率將超越Q1，達30%以上。迎廣去年法說會表示Q2伺服器佔比將達5成以上，今年5月法說會預期也將釋放樂觀訊息。法人預估迎廣全年EPS 5元，本益比20，目標價可達25以上。作者也將迎廣與勤誠、晟銘電進行比價，認為迎廣在機殼類股中具有優勢。作者認為迎廣已經集一身利多，突破114.5後，將持續推升股價。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者eyespot (追求內心的自在)看板Stock標題[標的] 1799 易威時間Mon May 20 09:58:48 2024\\n標的：1799 易威\\n\\n分類：多\\n\\n分析/正文：\\n1. 基本面\\n 根據 https://news.cnyes.com/news/id/5360367\\n - 治療慢性心臟衰竭 HH-001沙庫巴曲纈沙坦鈉片取得中國獨家專賣權，今年3/15開賣。\\n - 這藥2022年銷售額28億人民幣(120億台幣)，若以過去的經驗，單一學名藥約占20%\\n   計算，預估營收為24億台幣。\\n - 其他藥物的營收，以2023年2.7億估算。加上HH-001，預估未來易威營收可達26.7億。\\n - 若以易威過去的毛利60%計算，毛利為16億台幣；扣除今年營業費用算4億，淨利為\\n   12億，稅後淨利為9.6億。\\n - 易威股本為12億，EPS為8元。\\n - 同業美時、保瑞本益比約為25倍。因此推估易威合理股價為200元，目前還有1.5倍\\n   的空間。\\n\\n2. 籌碼面\\n - 之前打入全額交割，今天5/20恢復一般交易，開始會有法人的買盤進入。\\n - 持股1000張以上之大股東>70%，10張以下散戶<5%，籌碼非常穩定。\\n\\n3. 經營面\\n - 華威入主及易威轉型學名藥到今年剛好滿10年，交出漂亮成績單有其特殊意義。\\n - 林董事長為創投大前輩，親自至中國孫公司督軍任總經理，表示易威非常重視此\\n   藥物之銷售。\\n\\n進退場機制：\\n20-21已進場，到達合理股價200後，分批賣出。\\n\\n--',
    },
    {
      text: 'output: [標的] 1799 易威\n分類：多\n進退場機制如下:\n進場: 20-21元已進場\n停利: 到達合理股價200元後，分批賣出\n停損: 無\n\n重點摘要:\n作者看好1799 易威，理由包括:\n* 易威取得中國獨家專賣權，銷售治療慢性心臟衰竭藥物HH-001沙庫巴曲纈沙坦鈉片，預估今年營收可達26.7億台幣，EPS為8元。\n* 同業美時、保瑞本益比約為25倍，因此推估易威合理股價為200元，目前還有1.5倍的空間。\n* 易威籌碼穩定，大股東持股比例高達70%，散戶持股比例低於5%。\n* 華威入主及易威轉型學名藥到今年剛好滿10年，公司重視此藥物銷售，林董事長親自至中國孫公司督軍任總經理。\n\n作者已在20-21元進場，目標價為200元，到達後將分批賣出。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者ninia178178 (贏到粥)看板Stock標題[標的] 雷笛克光學5230-融卷認輸多時間Thu May  9 13:12:38 2024\\n-------------------------------------------------------------------------\\n\\n\\n標的：雷笛克光學5230\\n(例 2330.TW 台積電)\\n\\n分類：多\\n(請選擇並刪除無關分類)\\n\\n分析/正文：\\n基本面：營收成長，但eps偏低。\\n技術面：月k大底起漲，短線回檔整理中。\\n消息面：疑似水冷散熱題材（未求證）\\n籌碼面：資劵比100％？看起來是大咖放空，但昨天有認輸一些。\\n\\n進退場機制：\\n\\n風險高，但報酬也可能高。個人已有獲利一波，目前正慢慢低接\\n\\n進場：\\n33.5-34.5\\n\\n獲利出場：50\\n\\n停損出場：32\\n\\n\\n對帳單：\\nhttps://i.imgur.com/pftTMl4.jpeg\\n\\n--',
    },
    {
      text: 'output: [標的] 雷笛克光學5230-融卷認輸多\n分類：多\n進退場機制如下:\n進場: 33.5-34.5\n停利: 50\n停損: 32\n\n重點摘要:\n作者看好5230 雷笛克光學，理由包括:\n* 基本面: 營收成長，但EPS偏低。\n* 技術面: 月K大底起漲，短線回檔整理中。\n* 消息面: 疑似水冷散熱題材 (未求證)。\n* 籌碼面: 資券比100%，疑似大咖放空，但昨天有認輸一些。\n\n作者認為雷笛克光學風險高，但報酬也可能高。作者已有獲利一波，目前正慢慢低接。\n作者提供對帳單佐證。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者gary60419 (小股民投機)看板Stock標題[標的] 2467志聖   出奇制勝多時間Wed Apr 17 16:31:27 2024\\n標的：2467志聖\\n分類：多\\n分析/正文：\\n這支是台積電概念股\\n今年以來只要是gg概念股，幾乎都會噴一大段\\n\\nhttps://i.imgur.com/rBnMKkf.jpg\\n依據新聞，毛利和營收均有成長空間\\n毛利增加，外資會被吸引入場拉抬\\n距離發布第一季財報的期限剩一個月\\n仍有很大的遐想空間\\n\\nhttps://i.imgur.com/jjlPkZi.jpg\\n再來是k線圖\\n1.這支前面做ㄌ一個m頭，然後又拉回做平台，可見4個假頭，以我的精驗，後面都有一ㄍ波\\n段\\n2.昨天加權殺，它像沒事一樣\\n\\n我判斷，加權這樣殺，還會拉上區間頂震盪\\n所以個股還是有獲利空間ㄉ\\n\\n\\n進退場機制：\\n至少抱1個月不停損\\n如順利上去，加權頂考慮停利\\n\\n----\\nSent from BePTT on my Samsung SM-S9180\\n\\n--\\n本來要補人權圖\\n但無法上傳@@\\n不鼓勵當沖\\n跌50%我退出股市\\n不預設高點\\n哭了，利多出盡\\n當然是沒有\\n不說了\\n那個操作我自己看了都覺得羞恥\\nptt的大家都好厲害\\n我只能吃小小的魚尾＞＜\\n\\n補人權\\n搞不好你吃的是魚頭\\n是的 文留著給各位看笑話\\n真的要問我嗎..\\n我覺得波動太低了\\n要壓大才能賺到滿意的金額\\n不好做\\n該不會真的有人跑來沖吧？ ...千萬不要ㄟ\\n樓上猛喔\\n好像沒啥利多，明天想烙幹了qq\\n早盤已閃 保本要緊',
    },
    {
      text: 'output: [標的] 2467志聖   出奇制勝多\n分類：多\n進退場機制如下:\n進場: 無\n停利: 加權指數到達區間頂考慮停利\n停損: 至少抱1個月不停損\n\n重點摘要:\n作者看好2467志聖，認為它是台積電概念股，今年以來台積電概念股都有不錯的漲幅。\n作者認為志聖的毛利率和營收都有成長空間，第一季財報即將發布，還有很大的想像空間。\n從技術面來看，志聖股價走勢呈M頭，之後又拉回做平台，作者認為這代表之後可能有一波段漲勢。\n作者認為即使加權指數下跌，志聖還是有獲利空間，建議至少持有1個月，加權指數到達區間頂時再考慮停利。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者bota (llll)看板Stock標題[標的] (多)6732昇佳電子時間Thu Jun 20 18:18:30 2024\\n\\n標的：6732, 昇佳電子\\n\\n分類：多\\n\\n分析/正文：\\n\\n  (1)6月13-14日連續拉兩根之後, 已經量縮整理四天(且是在上源強勢整理)\\n  (2)所有均線之上\\n\\n   預估頂多明天在整理一天, 下禮拜就會爆噴\\n\\n   先看前高 424\\n\\n進退場機制：下禮拜五如果賠錢就出場\\n\\n--\\n  第一次跟哲哲看法一樣,... 開薰\\n   這種股票飆起來會很可怕,.. 50%, 100%都有可能',
    },
    {
      text: 'output: [標的] (多)6732昇佳電子\n分類：多\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 下禮拜五如果賠錢就出場\n\n重點摘要:\n作者認為6732昇佳電子股價在6月13-14日連續拉升後，目前已量縮整理四天，預估明天再整理一天，下週就會爆發，目標為前高424元。作者認為此類股票飆漲速度很快，有50%、100%的漲幅可能性。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者ayau (snow ball)看板Stock標題[標的] 5530 龍巖 地藏王+土地公(資產大幅低估)時間Thu Jun 20 14:06:07 2024\\n-------------------------------------------------------------------------\\n標的：\\n 5530 龍巖\\n\\n分類：多\\n\\n分析/正文：\\n\\n龍巖 是資產被大幅低估的土地公\\n\\n不動產與已售出合約的潛在增值利益實現後，每股淨值為159元(目前帳面僅58元)，而\\nEPS目前每年因會計分類方式而低估2元， 27年南港商辦完工後，租金將帶動龍巖EPS\\n再增 1.3元。\\n\\n    另外今年光之丘(高雄內門)塔墓即將完工，開始貢獻獲利，獲利有機會跳升(17~19年\\n時，當時塔墓完工後，這三年的營運淨利合計增了30億左右)\\n\\n1.龍巖本業每年穩定成長，賺3~4元，且過去五年，因股票債券等投資有成，帳面每\\n股淨值以每年5~6元速度增長:\\n    因為龍巖轉投資的國內外債券、股票，會計處理上，大部分被分類在”透過其他綜合\\n損益按公允價值衡量”，因此這幾年賺進的大筆獲利，都沒有進入損益表，而是以綜合損\\n益方式進入淨值。這部分在過去五年就有46億的金融投資獲利，若計入損益表，每年大約\\n可以貢獻2元EPS。(因會計原則而被低估的獲利)\\n    主要的持股，包括台積電1061張 、廣達1020張，另外google、微軟、波克夏都各有\\n約價值8億台幣持股。也持續受惠牛市行情。\\n\\n2.資產負債表上的商業投資不動產，以及土地資產，其真實市價遠高於帳面價值\\n，加計南港商辦的開發利益，整體約270億元，可貢獻每股淨值64.2元。以下主要的三\\n  大項不動產:\\n\\n   A.南港車站商辦大樓:\\n     目前正在興建中，預估2026~2027年完工，緊鄰南港捷運站2號出口(距離約20公尺)的\\n20樓商辦(總建坪達到1.6萬坪)。若參考附近的A級商辦建案世界明珠，實價已逼近200\\n萬/坪。  預估龍巖此商辦完工後市價約120萬*1.6萬坪=216億元。而目前帳面成本為土地\\n(1700坪)成本21.6億+工程款45億，若以市價出售，將有150億元的增值利益\\n。而若是之後整棟出租，以南港車站A級商辦目前租金行情每坪2500元/月來算，一年將帶\\n來5.4億元租金收入，每年EPS可以穩定增加約1.3元。\\n\\n   B.台北市信義區犁和段土地2490坪:\\n\\n取得甚早期，每坪帳上成本37.67萬元，帳列成本9.38億，市值保守估計有74.7億(每坪300萬)，保守估潛在利益65.32億。且因為土地面積夠大，很容\\n易可以複製龍巖南港商辦模式，進行自地自建，開發利益可能進一步拉到100~150億。\\n\\n\\n   C.台北市敦北大樓(3571坪),大亞大樓(2724坪)，高雄民眾大樓(3050坪)，三棟商辦\\n，合計帳面價值35億元，市值保守估計80億元。潛在增值利益55億。\\n\\n綜合以上的不動產，在商業不動產與土地方面，估計有150+65+55=270億元潛在利益。達每股\\n64.2元。\\n\\n\\n\\n\\n\\n龍巖會計帳上合約負債(預收之生前契約與塔墓收入) ，預收款高達418億元，實現後\\n可貢獻每股淨值36元:\\n\\n    本業殯葬業的價值方面，因為龍巖帳上有很大的合約負債(預收款)，418億元，這部分等\\n於是已經銷售簽約，並取得預收款項的待實現合約。本質上等於放在口袋的錢，等到客戶\\n真正使用禮儀服務或者蓋好塔墓並選好塔位時，才會入損益表，若以龍巖近七年的平均\\nOPM 37%來看，其實可以視為有154億元的營業利益，還沒放進損益表， 但已經在資產中\\n做投資貢獻。這部分相當於貢獻每股淨值36元。\\n\\n\\n\\n人口高齡化趨勢，殯葬的需求持續成長:\\n    根據國發會研究，台灣人口高齡化比例(>65歲)從2018年的14.6%(336萬人)，25年\\n20.8%(460萬人)，成長到2039年30.1%(690萬人)，幾乎呈現翻倍，未來十五年台灣將增加\\n接近230萬的老齡人口，龍巖本業能夠吃到的商機，將持續隨人口老化而成長。\\n\\n    龍巖在生前契約市占率接近80%，具備獨霸地位。\\n這主要受惠於龍巖的規模、品牌、財務健全、國內殯葬業的唯一上市櫃公司，管理制度透\\n明，得到消費者信賴。在生前契約市場上，完全稱霸國內市場。\\n\\n另外今年光之丘(高雄內門)塔墓即將完工，開始實現已售塔墓的銷售獲利(這部分毛利\\n80~90%，預計25年開始獲利有機會跳升(17~19年時，當時主要的塔墓完工後，該三年龍巖\\n的營運淨利合計增了30億左右)\\n\\n\\n\\n進退場機制：\\n\\n考量目前價位仍低，顯著低於其潛在淨值。  EPS方面也有向上成長空間\\n認為可長期投資，等待其不動產投資價值逐漸完全實現。\\n\\n\\n--\\n龍巖 確實也因為需要積極投資開發不動產，所以這兩年才沒有配息\\n股價也一直壓抑在低檔\\n但獲利跟淨值也是越來越高，想要處分也不是沒機會呀\\n其實等到完工後就有很多可能性出來了，2020以前也都有高配息率過\\n而且他股價才5字頭，相對於潛在增值目前的折價幅度也是超級大的\\n又不向大同是本業很差 虧損 只有土地有價值公司，龍巖本業每年都有在賺錢\\n\\n去看一下南港2101\\n最近漲多兇，南港也是只有土地資產，本業很差，目前股價是帳面淨值5倍',
    },
    {
      text: 'output: [標的] 5530 龍巖 地藏王+土地公(資產大幅低估)\n分類：討論\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 無\n\n重點摘要:\n作者認為5530 龍巖的資產被大幅低估，理由包括:\n* 龍巖帳面每股淨值僅58元，但作者計算其不動產與合約潛在增值利益後，每股淨值應為159元。\n* 龍巖每年EPS因會計分類方式而被低估2元，待南港商辦完工後，租金收入將再貢獻1.3元EPS。\n* 龍巖轉投資的股票債券，大部分被分類在”透過其他綜合損益按公允價值衡量”，導致過去5年獲利46億元未計入損益表，每年約低估2元EPS。\n* 龍巖擁有許多不動產，市值遠高於帳面價值，估計潛在利益約270億元，每股貢獻64.2元。\n* 龍巖合約負債高達418億元，實現後可貢獻每股淨值36元。\n* 隨著台灣人口高齡化趨勢，龍巖殯葬需求持續成長，且其生前契約市占率接近80%，具備獨霸地位。\n* 龍巖今年完工的光之丘塔墓，將開始貢獻獲利，預計25年開始獲利有機會跳升。\n\n作者認為龍巖股價低於潛在淨值，且EPS有向上成長空間，可長期投資，等待不動產投資價值逐漸實現。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者THE7088 (88)看板Stock標題[標的]  2368TW 金像電時間Wed Jun 19 23:58:20 2024\\n標的：2368.TW 金像電\\n\\n分類：討論\\n\\n正文：\\n\\n剛剛小弟在同學會看到有人貼大摩前幾天報告\\n報告內把金像電列為GB200供應鏈了\\n內容也一起提到男子店\\n\\n想請教大家\\n1.真的有出這份報告嗎\\n2.如是，那這樣解讀成已經通過認證是可以的嗎？\\n\\n附圖（抱歉找不到來源直接截原圖）\\nhttps://i.imgur.com/9phjEGv.jpeg\\nhttps://i.imgur.com/aqnwdjz.jpeg\\n\\n\\n-',
    },
    {
      text: 'output: [標的] 2368TW 金像電\n\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 無\n\n重點摘要:\n作者在同學會看到有人分享大摩的報告，報告內將金像電列為GB200供應鏈，並同時提到男子店。作者想確認這份報告是否存在，以及是否能解讀為金像電已通過GB200認證',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者annhe1027 (安赫)看板Stock標題[標的] 4533.TW 協易機械 / 股東會心得時間Wed Jun 19 17:58:02 2024\\n\\n\\n標的：4533.TW 協易機械 股東會心得\\n\\n正文：\\n\\n20240615早上六點多，我就驅車前往桃園參加協易機的股東大會。到了會場附近，也碰到剛到的菲比，我們便一同上樓前往會場報到。\\n\\n\\n抵達會場後，迎面而來的是翠華副總微笑著向我們點頭致意。現場也看到一些股東正在會場審閱資料。會議前，我也有跟股務吳先生打招呼，而後李副總也親自過來與我交換名片，互相認識一下。他也了解到我有一些問題想要發問，很客氣地表示我的問題有點多，會後可找時間再聊一下。\\n\\n接著會議開始後，就照著會議流程進行。臨時動議時，有一位股東拿著厚厚的資料，詢問了一些碳排放的問題，感覺是有備而來。相關問題由董事長請李副總來回應。之後在公告新的董事後，整個股東會迅速結束。\\n\\n會後，李副總趕緊過來詢問我是否要發問?然後也帶著我們跟董事長打招呼。董事長郭雅慧當天穿著典雅大方，見到本人後更顯優雅氣質，不愧是工具機界最美的董事長。趁著與兩位主管會談的機會，我問了幾個問題，包含短期擁有一萬三千張股票的股東是否對公司營運有產生影響，還有我告知兩位主管我幫協易機取名叫印和闐 (IN HOLD 甜)\\n的來由。去年我跟一群朋友說協易機是間好公司，只要記得\\"印和闐\\"(買進、HOLD住，接著股價\\"慧\\"讓你心裡甜滋滋)，如今確實股價也讓股民有甜在心的感覺。兩位主管聽了也很開心，並表示未來只要我們持續持有\\"印和闐\\"，相信業績的成長會讓大家更滿意。後來董事長會後還有其他會議先行離席，李副總則邀請我們到旁邊的VIP會議室繼續會談。\\n\\n以下是與李副總訪談的紀錄:\\n\\n問1:目前電動車市場內憂嚴重，協易機目前配置上有做什麼避險規劃?\\n李副總:「最近提到的中國電動車問題確實波及全球。其實協易機在前一兩年就已經看到此趨勢，並做好因應措施。原本60%是汽車零組件客戶，我們已將汽車類客戶比重降至 50%以下，並提高具高附加價值的家電產業占比。另有10%項目發展新興產業，如航太、醫療器械等。」\\n李副總舉例:「像達文西手術機具，若用普通研磨可能要耗費數小時才能製成所需尺寸，但我們的AI伺服沖床技術只需0。5秒就能沖壓成型。至於空中巴士專案，更是花了相當多心力通過認證，才能打入其供應鏈。」還有一些高級的家電，如義大利高級咖啡機、德國MIELE精品家電，或者是法國的一些知名品牌，可以在百貨公司的精品家電區找到其芳蹤。\\n\\n問2:大家都說你們有AI，但主要應用還是AI伺服馬達沖床設備，這類技術是否已是產業龍頭?協易如何保持優勢?\\n李副總:「在傳統機械的表現上，德國與日本確實是業界龍頭。但經過多年努力，我們已經大幅縮小了技術差距，而且協易握有最重要的伺服核心技術，甚至超越德國與日本，這使得我們在很多新型態的沖壓，包括AI相關產品應用上，都占有優勢。另外，公司與國內外研究機構均有密切交流，協易專案很多都是國家級專案。國外研究單位也看好我們，願意合作，因此我們目前技術處於領先地位並持續擴大護城池領先範圍。」\\n\\n\\n問3: 協易的財務報表上去年還有看到一些業務收入，這是否會影響到協易專注在本業上?\\n李副總:在業外收入上，早期協易也做了一些多角化的投資，但是會分散資源，經過近幾年的收斂與聚焦，已經頗有成效，未來則會聚焦在具有未來趨勢的核心事業。\\n\\n\\n問4:關於一堆投顧老師說的美超微可能會用私募或者其他方式入股協易，甚至協易會自己接單AI伺服機殼的生意?\\n李副總:許多業界的AI機殼公司，也是協易的客戶。伺服器廠(如美超微)會下單給他們，這些Tier 1、Tier 2的廠商就會跟我們合作開發新的沖壓機台，他們有訂單有需求，那協易自然也會接到訂單。所以與併購、入股協易的謠傳無關。\\n\\n\\n訪談中，李副總告知我們兩個是他股東會多年來唯二看到最認真的股東，覺得我對協易公司的認識與了解應該花了不少時間，也很感謝我跟朋友們每天都會高喊\\"印和闐 印和闐 印和闐\\"，相信我們只要持續持有\\"印和闐\\"，未來\\"印和闐\\"的表現也會讓你 IN HOLD 甜。\\n\\n\\n4533.TW 協易機械由於有些訪談的內容也不方便說太多，印和闐目前正在執行的一些專案目前只能做還不能講，不過今年的法說會李副總會公佈未來協易趨勢的運作方向，相信讓大家會看到不一樣的印和闐。\\n\\n\\n\\n最後，郭雅慧董事長請我幫忙宣達不要再叫她\\"黑手鐵娘子\\"了，不要再叫她\\"黑手鐵娘子\\"，不要再叫她\\"黑手鐵娘子\\"，很重要，所以要講三次。\\n\\n協易現在都已經是做到高階精密工具機了，如AI伺服沖床、ˋ智能減碳生產線…，請幫忙換一個好聽的稱呼。\\n\\n我想未來可以用 \\"台灣工具機界最美的董事長-郭雅慧\\" ，來稱呼協易的掌舵者應該也不過分吧。\\n\\n\\n\\n\\n\\n\\n--\\nSent from nPTT on my iPhone 12\\n\\n--',
    },
    {
      text: 'output: [標的] 4533.TW 協易機械 / 股東會心得\n分類：討論\n\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 無\n\n重點摘要:\n作者參加了協易機械的股東大會，並與李副總進行了訪談。訪談中，李副總表示協易機械已做好因應中國電動車市場的風險，並將汽車客戶比重降至50%以下，提升家電、航太、醫療器械等高附加價值產業的占比。同時，協易機械在AI伺服沖床技術上已超越德國和日本，並保持領先地位。李副總還說明了協易機械的財務狀況，以及與美超微合作的狀況，澄清了市場的傳言。作者最後呼籲大家不要再稱呼協易機械董事長郭雅慧為「黑手鐵娘子」，並建議使用「台灣工具機界最美的董事長-郭雅慧」來稱呼她。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者richer23 ()看板Stock標題[標的] 3231緯創 還有救嗎?時間Wed Jun 19 16:57:49 2024\\n\\n標的：\\n3231緯創\\n\\n分類：多/空/討論/心得\\n\\n討論\\n\\n分析/正文：\\n首先先感謝法人今天不殺之恩\\n\\n自從單子都被鴻海搶光的消息出來後\\n\\n緯創整個月被賣到流湯\\n\\n完全是一隻死魚\\n\\n別人暴漲它跌 別人跌它更跌\\n\\n現在手上套了一堆\\n\\n目前股價在相對低檔 怕砍阿呆股\\n\\n但是短期也想不到漲的理由\\n\\n這裡該繼續等嗎\\n\\n還是趕快反手做別家\\n\\n\\n--',
    },
    {
      text: 'output: [標的] 3231緯創 還有救嗎?\n分類：討論\n\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 無\n\n重點摘要:\n作者對3231緯創的現況感到困惑，因為自從單子被鴻海搶光的消息傳出後，緯創股價就持續下跌，被作者形容為一隻死魚。目前股價處於低檔，作者擔心賣出會變成阿呆股，但短期內也看不到漲的理由。作者因此在文章中詢問其他股民意見，是否應該繼續持有等待反彈，還是換股操作。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者afflic (afflic)看板Stock標題[標的] 2317.TW 鴻海長線比價多時間Wed Jun 19 16:51:21 2024\\n\\n標的：\\n2317.TW 鴻海\\n\\n分類：\\n多\\n\\n分析/正文：\\n\\n今天廣達一根帶量長紅\\n\\n收盤突破300差點漲停板\\n\\n而鴻海則是持續站穩200\\n\\n今天各家媒體的最熱門話題就是\\n\\n是該追剛突破但300塊的廣達\\n\\n還是追已經翻倍但是才200塊的鴻海\\n\\n短線來說，以技術分析來看，廣達帶量突破壓力可能漲勢會比較兇狠（但是會漲到哪? 合不合理? 不知道）\\n\\n但長線來說，以獲利基本面來看的話：\\n\\nhttps://news.cnyes.com/news/id/5559362\\n廣達預計明年EPS賺16塊\\n\\nhttps://news.cnyes.com/news/id/5604852\\n鴻海預計明年EPS賺14塊\\n\\n廣達明年只賺16塊都可以上300了\\n\\n那鴻海豈不至少應該要有個250?\\n\\n進退場機制：\\n200拉回不破、大盤沒有明顯回檔\\n則不需要停損\\n\\n--',
    },
    {
      text: 'output: [標的] 2317.TW 鴻海長線比價多\n分類：多\n\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 200拉回不破、大盤沒有明顯回檔，則不需要停損\n\n重點摘要:\n作者看好2317 鴻海的長線發展，並以廣達進行比價。作者認為，儘管廣達今日突破300元，但以獲利基本面來看，鴻海的潛力更大。根據新聞報導，廣達預計明年EPS 16元，而鴻海預計明年EPS 14元。作者認為鴻海的股價應至少有250元的空間。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者aqua0914 ()看板Stock標題[標的] 想將00878部分轉換成00919時間Wed Jun 19 11:43:04 2024\\n標的：\\n00878、00919\\n分類：討論\\n分析/正文：\\n\\n想問各位878的投資人，會想搭配一點00919嗎?\\n\\n五月初公布878本季配息0.51\\n已經是過往的新高了\\n那時就有在考慮領到配息後，直接獲利了結\\n畢竟長抱多年了，成長的幅度說實話是有點緩慢\\n這一兩年科技浪潮又比較大\\n雖說這檔的好處是穩定\\n\\n但00919在配息和報酬顯得更積極一點\\n尤其是兩檔相比下來\\n919好像都更略勝一籌，這次配息公布年化10%\\n(878 配息0.51是9%)\\n除了成分股比較多半導體產業外\\n殖利率也更好一些\\n878這一季殖利率，用收盤價23.51來看\\n殖利率2.17%\\n919一樣用昨天收盤26.7\\n殖利率2.62%\\n\\n00878屬於比較平穩的一點，慢慢領息，不溫不火的\\n覺得可以挪一些資金到00919\\n相對就是一個比較保守和一個比較活躍的配置\\n\\n會覺得挪一部分錢到00919就好\\n還是應該要將資金全部轉移過去呢?\\n\\n--',
    },
    {
      text: 'output: [標的] 00878、00919\n\n分類：討論\n\n進退場機制如下:\n進場: 無\n停利: 無\n停損: 無\n\n重點摘要:\n作者想了解投資00878的意見，是否應該搭配一點00919。\n作者認為00878配息穩定，但成長緩慢，00919配息和報酬更積極，殖利率也更好，成分股多半是半導體產業。\n作者猶豫是否要將部分00878資金轉換到00919，或完全轉移到00919，形成保守和活躍的資產配置。',
    },
    {
      text: 'input: 幫我分析文章\\n首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\\n如果文章中沒特別說明則該項顯示無\\n接著列出原文重點摘要盡量簡短\\n文章內容如下\\n\\n作者yeechiplay (yee)看板Stock標題[標的] 4912 聯德控股-KY 切入輝達 GB200 多時間Tue Jun 18 22:33:15 2024\\n標的：4912.TW 聯德控股-KY\\n分析/正文：\\n這間和 3308 的聯德不同 但之前也有過 4912 的利多然後 3308 漲停 XD\\nhttps://money.udn.com/money/story/5612/8036584\\n目前已經通過認證開始出貨 GB200 伺服器水冷散熱模組\\n今年 1 月的時候就有新聞提到 3 月全球前四大雲端服務商（CSP）業者中的二\\n家陸續要到聯德查廠，(GOOGLE、META、AMAZON、Microsoft，都是原本就合\\n作的伺服器客戶)，能這麼快通過驗證應該是因為以前就透過日本古河電氣交貨\\n給 CSP 業者，所以 CSP 業者對聯德不陌生，加上聯德和很多 AI 伺服器組裝廠\\n已經合作很久了\\n＊日商古河電氣是奇鋐的最大股東\\n\\n這幾年也避免工廠過度集中\\n把許多新廠分散到美國、墨西哥、馬來西亞、台灣\\n\\n從機殼=>滑軌=>機櫃=>散熱\\n一條龍都有自己的產品線所以能更彈性去調整組合和價格\\n\\n\\n還有一間子公司叫關鍵禾芯科技\\n主要有醫療檢測、指紋驅動、AI 智能、SG 收發、77GHz 雷達、碳化矽這幾類\\n晶片設計的 IP\\n研發設計的方向和聯德集團本身現有的產業互補性很高\\n特別的是創辦人之一是以前奇鋐的副總經理\\n聯德控股、古河電氣、奇鋐，人員流動和商業關係看來滿密切的\\n\\nhttps://m.cnyes.com/news/id/5603688\\n今天股東會宣布通過上限 560 萬股的私募案，募資 6~7 億\\n這次募資主要是併購與 AI 伺服器相關廠商\\n用金額去換算大股東的私募價格在 107~125 和目前股價差不多\\n還有今年 10 月 CB 到期的轉換價是 153.3\\n公司這幾年發展重心 iPhone 沖壓件 => 車用 => 伺服器\\n一直有與時在調整產業的比重和汰換更新\\n整體的毛利也隨著轉型從 2 字頭往 3 字頭邁進中\\n營收方面今年到 5 月以前累積年增為 39.87%\\n每個月都有滿大幅度的年增率\\n\\n\\n5 日/10 日/月/季線 都在 125 左右 目前價格和這一季買進的人成本差不多\\n今天開高走低可能是當沖客+前波壓力\\n不過先消化賣壓清洗籌碼也不算壞事\\n有出量代表隨時有機會去突破這 3~4 個月的箱型區間\\n\\n\\n月線來看位階還很低\\n今年 EPS 估 8 元↑\\n明年 EPS 估 10 元↑\\n本益比大約 10 倍初已經算便宜\\n現在加上輝達供應鏈等市場發酵會更有想像空間\\n這檔放在自選股觀察滿長時間了\\n一直覺得 EPS 和題材都不輸南俊國際有比價的機會只是市場還沒發現\\n昨天台積電 ADR 大漲怕只拉台積電\\n觀察到中午看到賣不下去，委買一直有單在承接的時候進場\\n\\n\\n進退場機制：\\n已進場,持續加碼 140 以下隨便買\\n短線： 160~180\\n長線：切入輝達供應鏈 過史高 264\\n停損：收盤破 107\\n-----\\nSent from JPTT on my iPhone\\n\\n--',
    },
    {
      text: 'output: [標的] 4912.TW 聯德控股-KY 切入輝達 GB200 多\n\n分類：多\n\n進退場機制如下:\n進場: 已進場，持續加碼 140 以下隨便買\n停利:\n* 短線: 160~180\n* 長線: 切入輝達供應鏈 過史高 264\n停損: 收盤破 107\n\n重點摘要:\n作者看好4912.TW 聯德控股-KY，理由包括：\n* 聯德控股已通過認證，開始出貨GB200伺服器水冷散熱模組。\n* 聯德控股與多家AI伺服器組裝廠合作多年，並與奇鋐、古河電氣關係密切。\n* 聯德控股從機殼到散熱，一條龍都有自己的產品線，可以彈性調整組合和價格。\n* 聯德控股子公司關鍵禾芯科技設計晶片IP，與聯德控股本身產業互補性高。\n* 聯德控股股東會通過私募案，募資6~7億元，用於併購與AI伺服器相關廠商。\n* 聯德控股近年發展重心從iPhone沖壓件轉向車用、伺服器，毛利率持續上升，營收年增率也持續高。\n* 聯德控股月線位階低，EPS估值高，本益比偏低，有想像空間。\n* 作者已進場，預計持續加碼，目標價為160~180元，長線目標為264元，停損點為107元。\n\n作者認為聯德控股的發展潛力不輸南俊國際，且尚未被市場發現，有比價的機會。',
    },
    {
      text: 'input: 作者ninia178178 (贏到粥)看板Stock標題[標的] 6743安普新-盤整出飆股-多時間Tue Aug 27 11:59:34 2024\\n-------------------------------------------------------------------------\\n\\n標的：6743安普新\\n(例 2330.TW 台積電)\\n\\n分類：多\\n(請選擇並刪除無關分類)\\n\\n分析/正文：\\n基本面：營收創新高，第2季轉虧為盈，算是成長型\\n技術面：長期來看低位階，昨天一根長紅表態，macd剛轉正。\\n籌碼面：普通，沒啥追蹤。\\n\\n主要是以基本面和技術面進場。先買再追蹤，採分批加碼。\\n值得一提的是上次大量高點2023/06（70-80）不知道炒啥？業績也遠不如今，現在若能順\\n利發動，要過80應該不難，題材就由主力想吧\\n\\n進退場機制：\\n\\n進場：62-64分批\\n停利：短線：80。/。長線：未定\\n停損：60以下，三日沒站回\\n\\n\\n\\n\\n--',
    },
    {
      text: 'output: [標的] 6743安普新-盤整出飆股-多\n分類：多\n進退場機制如下:\n進場: 62-64分批\n停利:\n* 短線: 80\n* 長線: 未定\n停損: 60以下，三日沒站回\n\n重點摘要:\n作者看好6743安普新，理由包括：\n* 基本面：營收創新高，第二季轉虧為盈，算是成長型。\n* 技術面：長期來看低位階，昨天一根長紅表態，MACD剛轉正。\n* 作者以基本面和技術面進場，採用分批加碼策略。\n* 作者認為上次安普新股價在2023/06炒到70-80元，當時業績遠不如現在，如果這次能順利發動，要過80元應該不難。\n\n作者已經進場，目標價為80元，停損點為60元以下，三日未站回。',
    },
    { text: 'input: ' + prompt },
    { text: 'output: ' },
  ];

  const result = await model.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
  });
  return result.response.text();

  // const model = genAI.getGenerativeModel({
  //   model: 'tunedModels/post-analysis-ke2s5bp01kc2',
  // });

  // const generationConfig = {
  //   temperature: 0.9,
  //   topP: 1,
  //   topK: 0,
  //   maxOutputTokens: 8192,
  //   responseMimeType: 'text/plain',
  // };

  // const parts = [{ text: `input: ${prompt}` }, { text: 'output: ' }];

  // const result = await model.generateContent(prompt);
  // // await model.generateContent({
  // //   contents: [{ role: 'user', parts }],
  // //   generationConfig,
  // //   // safetySettings: Adjust safety settings
  // //   // See https://ai.google.dev/gemini-api/docs/safety-settings
  // // });
  // return result.response.text();
}

export async function generateWithImage(filePath: string): Promise<string | null> {
  try {
    // Read image file
    const imageFile = await fs.readFile(filePath);
    const imageBase64 = imageFile.toString('base64');

    const promptConfig = [
      { text: 'Can you tell me about this image whats happening there?' },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64,
        },
      },
    ];

    const geminiModel = genAI.getGenerativeModel({
      model: 'gemini-pro-vision',
    });

    const result = await geminiModel.generateContent({
      contents: [{ role: 'user', parts: promptConfig }],
    });
    const response = await result.response;
    console.log(response.text());
    return response.text();
  } catch (error) {
    console.log(' response error', error);
    return null;
  }
}

export default { generateWithTunedModel, generateWithText };
