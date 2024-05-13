interface StockInfo {
  category: string;
  stockNo: string;
  name: string;
}

var data: StockInfo[] = [
  {
    category: 'ETF',
    stockNo: '0050',
    name: '元大台灣50',
  },
  {
    category: 'ETF',
    stockNo: '0051',
    name: '元大中型100',
  },
  {
    category: 'ETF',
    stockNo: '0052',
    name: '富邦科技',
  },
  {
    category: 'ETF',
    stockNo: '0053',
    name: '元大電子',
  },
  {
    category: 'ETF',
    stockNo: '0054',
    name: '元大台商50',
  },
  {
    category: 'ETF',
    stockNo: '0055',
    name: '元大MSCI金融',
  },
  {
    category: 'ETF',
    stockNo: '0056',
    name: '元大高股息',
  },
  {
    category: 'ETF',
    stockNo: '0057',
    name: '富邦摩台',
  },
  {
    category: 'ETF',
    stockNo: '0058',
    name: '富邦發達',
  },
  {
    category: 'ETF',
    stockNo: '0059',
    name: '富邦金融',
  },
  {
    category: 'ETF',
    stockNo: '0060',
    name: '新台灣',
  },
  {
    category: 'ETF',
    stockNo: '0061',
    name: '元大寶滬深',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '006201',
    name: '元大富櫃50',
  },
  {
    category: 'ETF',
    stockNo: '006203',
    name: '元大MSCI台灣',
  },
  {
    category: 'ETF',
    stockNo: '006204',
    name: '永豐臺灣加權',
  },
  {
    category: 'ETF',
    stockNo: '006205',
    name: '富邦上証',
  },
  {
    category: 'ETF',
    stockNo: '006206',
    name: '元大上證50',
  },
  {
    category: 'ETF',
    stockNo: '006207',
    name: '復華滬深',
  },
  {
    category: 'ETF',
    stockNo: '006208',
    name: '富邦台50',
  },
  {
    category: 'ETF',
    stockNo: '00625K',
    name: '富邦上証+R',
  },
  {
    category: 'ETF',
    stockNo: '00631L',
    name: '元大台灣50正2',
  },
  {
    category: 'ETF',
    stockNo: '00632R',
    name: '元大台灣50反1',
  },
  {
    category: 'ETF',
    stockNo: '00633L',
    name: '富邦上証正2',
  },
  {
    category: 'ETF',
    stockNo: '00634R',
    name: '富邦上証反1',
  },
  {
    category: 'ETF',
    stockNo: '00635U',
    name: '期元大S&P黃金',
  },
  {
    category: 'ETF',
    stockNo: '00636',
    name: '國泰中國A50',
  },
  {
    category: 'ETF',
    stockNo: '00636K',
    name: '國泰中國A50+U',
  },
  {
    category: 'ETF',
    stockNo: '00637L',
    name: '元大滬深300正2',
  },
  {
    category: 'ETF',
    stockNo: '00638R',
    name: '元大滬深300反1',
  },
  {
    category: 'ETF',
    stockNo: '00639',
    name: '富邦深100',
  },
  {
    category: 'ETF',
    stockNo: '00640L',
    name: '富邦日本正2',
  },
  {
    category: 'ETF',
    stockNo: '00641R',
    name: '富邦日本反1',
  },
  {
    category: 'ETF',
    stockNo: '00642U',
    name: '期元大S&P石油',
  },
  {
    category: 'ETF',
    stockNo: '00643',
    name: '群益深証中小',
  },
  {
    category: 'ETF',
    stockNo: '00643K',
    name: '群益深証中小+R',
  },
  {
    category: 'ETF',
    stockNo: '00645',
    name: '富邦日本',
  },
  {
    category: 'ETF',
    stockNo: '00646',
    name: '元大S&P500',
  },
  {
    category: 'ETF',
    stockNo: '00647L',
    name: '元大S&P500正2',
  },
  {
    category: 'ETF',
    stockNo: '00648R',
    name: '元大S&P500反1',
  },
  {
    category: 'ETF',
    stockNo: '00649',
    name: 'FH香港',
  },
  {
    category: 'ETF',
    stockNo: '00650L',
    name: '復華香港正2',
  },
  {
    category: 'ETF',
    stockNo: '00651R',
    name: '復華香港反1',
  },
  {
    category: 'ETF',
    stockNo: '00652',
    name: '富邦印度',
  },
  {
    category: 'ETF',
    stockNo: '00653L',
    name: '富邦印度正2',
  },
  {
    category: 'ETF',
    stockNo: '00654R',
    name: '富邦印度反1',
  },
  {
    category: 'ETF',
    stockNo: '00655L',
    name: '國泰中國A50正2',
  },
  {
    category: 'ETF',
    stockNo: '00656R',
    name: '國泰中國A50反1',
  },
  {
    category: 'ETF',
    stockNo: '00657',
    name: '國泰日經225',
  },
  {
    category: 'ETF',
    stockNo: '00657K',
    name: '國泰日經225+U',
  },
  {
    category: 'ETF',
    stockNo: '00658L',
    name: '國泰日本正2',
  },
  {
    category: 'ETF',
    stockNo: '00659R',
    name: '國泰日本反1',
  },
  {
    category: 'ETF',
    stockNo: '00660',
    name: '元大歐洲50',
  },
  {
    category: 'ETF',
    stockNo: '00661',
    name: '元大日經225',
  },
  {
    category: 'ETF',
    stockNo: '00662',
    name: '富邦NASDAQ',
  },
  {
    category: 'ETF',
    stockNo: '00663L',
    name: '國泰臺灣加權正2',
  },
  {
    category: 'ETF',
    stockNo: '00664R',
    name: '國泰臺灣加權反1',
  },
  {
    category: 'ETF',
    stockNo: '00665L',
    name: '富邦恒生國企正2',
  },
  {
    category: 'ETF',
    stockNo: '00666R',
    name: '富邦恒生國企反1',
  },
  {
    category: 'ETF',
    stockNo: '00667',
    name: '元大韓國',
  },
  {
    category: 'ETF',
    stockNo: '00668',
    name: '國泰美國道瓊',
  },
  {
    category: 'ETF',
    stockNo: '00668K',
    name: '國泰美國道瓊+U',
  },
  {
    category: 'ETF',
    stockNo: '00669R',
    name: '國泰美國道瓊反1',
  },
  {
    category: 'ETF',
    stockNo: '00670L',
    name: '富邦NASDAQ正2',
  },
  {
    category: 'ETF',
    stockNo: '00671R',
    name: '富邦NASDAQ反1',
  },
  {
    category: 'ETF',
    stockNo: '00672L',
    name: '元大S&P原油正2',
  },
  {
    category: 'ETF',
    stockNo: '00673R',
    name: '期元大S&P原油反1',
  },
  {
    category: 'ETF',
    stockNo: '00674R',
    name: '期元大S&P黃金反1',
  },
  {
    category: 'ETF',
    stockNo: '00675L',
    name: '富邦臺灣加權正2',
  },
  {
    category: 'ETF',
    stockNo: '00676R',
    name: '富邦臺灣加權反1',
  },
  {
    category: 'ETF',
    stockNo: '00677U',
    name: '期富邦VIX',
  },
  {
    category: 'ETF',
    stockNo: '00678',
    name: '群益那斯達克生技',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00679B',
    name: '元大美債20年',
  },
  {
    category: 'ETF',
    stockNo: '00680L',
    name: '元大美債20正2',
  },
  {
    category: 'ETF',
    stockNo: '00681R',
    name: '元大美債20反1',
  },
  {
    category: 'ETF',
    stockNo: '00682U',
    name: '期元大美元指數',
  },
  {
    category: 'ETF',
    stockNo: '00683L',
    name: '期元大美元指正2',
  },
  {
    category: 'ETF',
    stockNo: '00684R',
    name: '期元大美元指反1',
  },
  {
    category: 'ETF',
    stockNo: '00685L',
    name: '群益臺灣加權正2',
  },
  {
    category: 'ETF',
    stockNo: '00686R',
    name: '群益臺灣加權反1',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00687B',
    name: '國泰20年美債',
  },
  {
    category: 'ETF',
    stockNo: '00688L',
    name: '國泰20年美債正2',
  },
  {
    category: 'ETF',
    stockNo: '00689R',
    name: '國泰20年美債反1',
  },
  {
    category: 'ETF',
    stockNo: '00690',
    name: '兆豐藍籌30',
  },
  {
    category: 'ETF',
    stockNo: '00691R',
    name: '兆豐藍籌30反1',
  },
  {
    category: 'ETF',
    stockNo: '00692',
    name: '富邦公司治理',
  },
  {
    category: 'ETF',
    stockNo: '00693U',
    name: '期街口S&P黃豆',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00694B',
    name: '富邦美債1-3',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00695B',
    name: '富邦美債7-10',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00696B',
    name: '富邦美債20年',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00697B',
    name: '元大美債7-10',
  },
  {
    category: 'ETF',
    stockNo: '00698L',
    name: '元大美債7-10正2',
  },
  {
    category: 'ETF',
    stockNo: '00699R',
    name: '元大美債7-10反1',
  },
  {
    category: 'ETF',
    stockNo: '00700',
    name: '富邦恒生國企',
  },
  {
    category: 'ETF',
    stockNo: '00701',
    name: '國泰股利精選30',
  },
  {
    category: 'ETF',
    stockNo: '00702',
    name: '國泰標普低波高息',
  },
  {
    category: 'ETF',
    stockNo: '00703',
    name: '台新MSCI中國',
  },
  {
    category: 'ETF',
    stockNo: '00704L',
    name: '台新MSCI台灣正2',
  },
  {
    category: 'ETF',
    stockNo: '00705R',
    name: '台新MSCI台灣反1',
  },
  {
    category: 'ETF',
    stockNo: '00706L',
    name: '期元大S&P日圓正2',
  },
  {
    category: 'ETF',
    stockNo: '00707R',
    name: '期元大S&P日圓反1',
  },
  {
    category: 'ETF',
    stockNo: '00708L',
    name: '期元大S&P黃金正2',
  },
  {
    category: 'ETF',
    stockNo: '00709',
    name: '富邦歐洲',
  },
  {
    category: 'ETF',
    stockNo: '00710B',
    name: '復華彭博非投等債',
  },
  {
    category: 'ETF',
    stockNo: '00711B',
    name: '復華彭博新興債',
  },
  {
    category: 'ETF',
    stockNo: '00712',
    name: '復華富時不動產',
  },
  {
    category: 'ETF',
    stockNo: '00713',
    name: '元大台灣高息低波',
  },
  {
    category: 'ETF',
    stockNo: '00714',
    name: '群益道瓊美國地產',
  },
  {
    category: 'ETF',
    stockNo: '00715L',
    name: '期街口布蘭特正2',
  },
  {
    category: 'ETF',
    stockNo: '00716R',
    name: '華頓S&P布蘭特反1',
  },
  {
    category: 'ETF',
    stockNo: '00717',
    name: '富邦美國特別股',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00718B',
    name: '富邦中國政策債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00719B',
    name: '元大美債1-3',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00720B',
    name: '元大投資級公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00721B',
    name: '元大中國債3-5',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00722B',
    name: '群益投資級電信債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00723B',
    name: '群益投資級科技債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00724B',
    name: '群益投資級金融債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00725B',
    name: '國泰投資級公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00726B',
    name: '國泰5Y+新興債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00727B',
    name: '國泰1-5Y非投等債',
  },
  {
    category: 'ETF',
    stockNo: '00728',
    name: '第一金工業30',
  },
  {
    category: 'ETF',
    stockNo: '00729R',
    name: '第一金工業30反1',
  },
  {
    category: 'ETF',
    stockNo: '00730',
    name: '富邦臺灣優質高息',
  },
  {
    category: 'ETF',
    stockNo: '00731',
    name: '復華富時高息低波',
  },
  {
    category: 'ETF',
    stockNo: '00732',
    name: '國泰RMB短期報酬',
  },
  {
    category: 'ETF',
    stockNo: '00733',
    name: '富邦臺灣中小',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00734B',
    name: '台新JPM新興債',
  },
  {
    category: 'ETF',
    stockNo: '00735',
    name: '國泰臺韓科技',
  },
  {
    category: 'ETF',
    stockNo: '00736',
    name: '國泰新興市場',
  },
  {
    category: 'ETF',
    stockNo: '00737',
    name: '國泰AI+Robo',
  },
  {
    category: 'ETF',
    stockNo: '00738U',
    name: '期元大道瓊白銀',
  },
  {
    category: 'ETF',
    stockNo: '00739',
    name: '元大MSCI A股',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00740B',
    name: '富邦全球投等債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00741B',
    name: '富邦全球非投等債',
  },
  {
    category: 'ETF',
    stockNo: '00742',
    name: '新光內需收益',
  },
  {
    category: 'ETF',
    stockNo: '00743',
    name: '國泰中國A150',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00744B',
    name: '國泰中國政金債5+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00745B',
    name: '富邦中政債0-1',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00746B',
    name: '富邦A級公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00747B',
    name: 'FH中國政策債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00748B',
    name: '凱基中國債3-10',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00749B',
    name: '凱基新興債10+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00750B',
    name: '凱基科技債10+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00751B',
    name: '元大AAA至A公司債',
  },
  {
    category: 'ETF',
    stockNo: '00752',
    name: '中信中國50',
  },
  {
    category: 'ETF',
    stockNo: '00753L',
    name: '中信中國50正2',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00754B',
    name: '群益AAA-AA公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00755B',
    name: '群益投資級公用債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00756B',
    name: '群益投等新興公債',
  },
  {
    category: 'ETF',
    stockNo: '00757',
    name: '統一FANG+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00758B',
    name: '復華能源債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00759B',
    name: '復華製藥債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00760B',
    name: '復華新興企業債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00761B',
    name: '國泰A級公司債',
  },
  {
    category: 'ETF',
    stockNo: '00762',
    name: '元大全球AI',
  },
  {
    category: 'ETF',
    stockNo: '00763U',
    name: '期街口道瓊銅',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00764B',
    name: '群益25年美債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00765B',
    name: '群益中國政金債',
  },
  {
    category: 'ETF',
    stockNo: '00766L',
    name: '台新MSCI中國正2',
  },
  {
    category: 'ETF',
    stockNo: '00767',
    name: 'FH美國金融股',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00768B',
    name: '復華20年美債',
  },
  {
    category: 'ETF',
    stockNo: '00770',
    name: '國泰北美科技',
  },
  {
    category: 'ETF',
    stockNo: '00771',
    name: '元大US高息特別股',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00772B',
    name: '中信高評級公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00773B',
    name: '中信優先金融債',
  },
  {
    category: 'ETF',
    stockNo: '00774B',
    name: '新光中國政金綠債',
  },
  {
    category: 'ETF',
    stockNo: '00774C',
    name: '新光中政金綠債+R',
  },
  {
    category: 'ETF',
    stockNo: '00775B',
    name: '新光投等債15+',
  },
  {
    category: 'ETF',
    stockNo: '00776',
    name: '新光ICE美國權值',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00777B',
    name: '凱基AAA至A公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00778B',
    name: '凱基金融債20+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00779B',
    name: '凱基美債25+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00780B',
    name: '國泰A級金融債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00781B',
    name: '國泰A級科技債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00782B',
    name: '國泰A級公用債',
  },
  {
    category: 'ETF',
    stockNo: '00783',
    name: '富邦中証500',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00784B',
    name: '富邦中國投等債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00785B',
    name: '富邦金融投等債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00786B',
    name: '元大10年IG銀行債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00787B',
    name: '元大10年IG醫療債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00788B',
    name: '元大10年IG電能債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00789B',
    name: '復華公司債A3',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00790B',
    name: '復華次順位金融債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00791B',
    name: '復華信用債1-5',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00792B',
    name: '群益A級公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00793B',
    name: '群益AAA-A醫療債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00794B',
    name: '群益7+中國政金債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00795B',
    name: '中信美國公債20年',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00796B',
    name: '中信中國債7-10',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00798B',
    name: '國泰中企A級債7+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00799B',
    name: '國泰A級醫療債',
  },
  {
    category: 'ETF',
    stockNo: '0080',
    name: '恒中國',
  },
  {
    category: 'ETF',
    stockNo: '0081',
    name: '恒香港',
  },
  {
    category: 'ETF',
    stockNo: '008201',
    name: 'BP上證50',
  },
  {
    category: 'ETF',
    stockNo: '00830',
    name: '國泰費城半導體',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00831B',
    name: '新光美債1-3',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00832B',
    name: '新光美債20+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00833B',
    name: '第一金美債20+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00834B',
    name: '第一金金融債10+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00835B',
    name: '第一金科技債10+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00836B',
    name: '永豐10年A公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00837B',
    name: '永豐15年金融債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00838B',
    name: '永豐7-10年中國債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00839B',
    name: '凱基醫療保健債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00840B',
    name: '凱基IG精選15+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00841B',
    name: '凱基AAA-AA公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00842B',
    name: '台新美元銀行債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00843B',
    name: '台新中國政策債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00844B',
    name: '新光15年IG金融債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00845B',
    name: '富邦新興投等債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00846B',
    name: '富邦歐洲銀行債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00847B',
    name: '中信美國市政債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00848B',
    name: '中信新興亞洲債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00849B',
    name: '中信EM主權債0-5',
  },
  {
    category: 'ETF',
    stockNo: '00850',
    name: '元大臺灣ESG永續',
  },
  {
    category: 'ETF',
    stockNo: '00851',
    name: '台新全球AI',
  },
  {
    category: 'ETF',
    stockNo: '00852L',
    name: '國泰美國道瓊正2',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00853B',
    name: '統一美債10年Aa-A',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00854B',
    name: '富邦全球保險債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00855B',
    name: '富邦全球能源債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00856B',
    name: '永豐1-3年美公債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00857B',
    name: '永豐20年美公債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00858',
    name: '永豐美國500大',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00859B',
    name: '群益0-1年美債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00860B',
    name: '群益1-5Y投資級債',
  },
  {
    category: 'ETF',
    stockNo: '00861',
    name: '元大全球未來通訊',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00862B',
    name: '中信投資級公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00863B',
    name: '中信全球電信債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00864B',
    name: '中信美國公債0-1',
  },
  {
    category: 'ETF',
    stockNo: '00865B',
    name: '國泰US短期公債',
  },
  {
    category: 'ETF',
    stockNo: '00866',
    name: '新光Shiller CAPE',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00867B',
    name: '新光A-BBB電信債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00868B',
    name: 'FT1-3年美公債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00869B',
    name: 'FT10-25年公司債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00870B',
    name: '元大15年EM主權債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00871B',
    name: '元大中國政金債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00872B',
    name: '凱基美債1-3',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00873B',
    name: '凱基新興債1-5',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00874B',
    name: '凱基BBB公司債15+',
  },
  {
    category: 'ETF',
    stockNo: '00875',
    name: '國泰網路資安',
  },
  {
    category: 'ETF',
    stockNo: '00876',
    name: '元大全球5G',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00877',
    name: '復華中國5G',
  },
  {
    category: 'ETF',
    stockNo: '00878',
    name: '國泰永續高股息',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00879B',
    name: '第一金美債0-1',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00880B',
    name: '第一金電信債15+',
  },
  {
    category: 'ETF',
    stockNo: '00881',
    name: '國泰台灣5G+',
  },
  {
    category: 'ETF',
    stockNo: '00882',
    name: '中信中國高股息',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00883B',
    name: '中信ESG投資級債',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00884B',
    name: '中信低碳新興債',
  },
  {
    category: 'ETF',
    stockNo: '00885',
    name: '富邦越南',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00886',
    name: '永豐美國科技',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00887',
    name: '永豐中國科技50大',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00888',
    name: '永豐台灣ESG',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00889B',
    name: '凱基ESG新興債15+',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00890B',
    name: '凱基ESG BBB債15+',
  },
  {
    category: 'ETF',
    stockNo: '00891',
    name: '中信關鍵半導體',
  },
  {
    category: 'ETF',
    stockNo: '00892',
    name: '富邦台灣半導體',
  },
  {
    category: 'ETF',
    stockNo: '00893',
    name: '國泰智能電動車',
  },
  {
    category: 'ETF',
    stockNo: '00894',
    name: '中信小資高價30',
  },
  {
    category: 'ETF',
    stockNo: '00895',
    name: '富邦未來車',
  },
  {
    category: 'ETF',
    stockNo: '00896',
    name: '中信綠能及電動車',
  },
  {
    category: 'ETF',
    stockNo: '00897',
    name: '富邦基因免疫生技',
  },
  {
    category: 'ETF',
    stockNo: '00898',
    name: '國泰基因免疫革命',
  },
  {
    category: 'ETF',
    stockNo: '00899',
    name: 'FT潔淨能源',
  },
  {
    category: 'ETF',
    stockNo: '00900',
    name: '富邦特選高股息30',
  },
  {
    category: 'ETF',
    stockNo: '00901',
    name: '永豐智能車供應鏈',
  },
  {
    category: 'ETF',
    stockNo: '00902',
    name: '中信電池及儲能',
  },
  {
    category: 'ETF',
    stockNo: '00903',
    name: '富邦元宇宙',
  },
  {
    category: 'ETF',
    stockNo: '00904',
    name: '新光臺灣半導體30',
  },
  {
    category: 'ETF',
    stockNo: '00905',
    name: 'FT臺灣Smart',
  },
  {
    category: 'ETF',
    stockNo: '00906',
    name: '大華元宇宙科技50',
  },
  {
    category: 'ETF',
    stockNo: '00907',
    name: '永豐優息存股',
  },
  {
    category: 'ETF',
    stockNo: '00908',
    name: '富邦入息REITs+',
  },
  {
    category: 'ETF',
    stockNo: '00909',
    name: '國泰數位支付服務',
  },
  {
    category: 'ETF',
    stockNo: '00910',
    name: '第一金太空衛星',
  },
  {
    category: 'ETF',
    stockNo: '00911',
    name: '兆豐洲際半導體',
  },
  {
    category: 'ETF',
    stockNo: '00912',
    name: '中信臺灣智慧50',
  },
  {
    category: 'ETF',
    stockNo: '00913',
    name: '兆豐台灣晶圓製造',
  },
  {
    category: 'ETF',
    stockNo: '00915',
    name: '凱基優選高股息30',
  },
  {
    category: 'ETF',
    stockNo: '00916',
    name: '國泰全球品牌50',
  },
  {
    category: 'ETF',
    stockNo: '00917',
    name: '中信特選金融',
  },
  {
    category: 'ETF',
    stockNo: '00918',
    name: '大華優利高填息30',
  },
  {
    category: 'ETF',
    stockNo: '00919',
    name: '群益台灣精選高息',
  },
  {
    category: 'ETF',
    stockNo: '00920',
    name: '富邦ESG綠色電力',
  },
  {
    category: 'ETF',
    stockNo: '00921',
    name: '兆豐龍頭等權重',
  },
  {
    category: 'ETF',
    stockNo: '00922',
    name: '國泰台灣領袖50',
  },
  {
    category: 'ETF',
    stockNo: '00923',
    name: '群益台ESG低碳50',
  },
  {
    category: 'ETF',
    stockNo: '00924',
    name: '復華S&P500成長',
  },
  {
    category: 'ETF',
    stockNo: '00925',
    name: '新光標普電動車',
  },
  {
    category: 'ETF',
    stockNo: '00926',
    name: '凱基全球菁英55',
  },
  {
    category: 'ETF',
    stockNo: '00927',
    name: '群益半導體收益',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00928',
    name: '中信上櫃ESG 30',
  },
  {
    category: 'ETF',
    stockNo: '00929',
    name: '復華台灣科技優息',
  },
  {
    category: 'ETF',
    stockNo: '00930',
    name: '永豐ESG低碳高息',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00931B',
    name: '統一美債20年',
  },
  {
    category: 'ETF',
    stockNo: '00932',
    name: '兆豐永續高息等權',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00933B',
    name: '國泰10Y+金融債',
  },
  {
    category: 'ETF',
    stockNo: '00934',
    name: '中信成長高股息',
  },
  {
    category: 'ETF',
    stockNo: '00935',
    name: '野村臺灣新科技50',
  },
  {
    category: 'ETF',
    stockNo: '00936',
    name: '台新永續高息中小',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00937B',
    name: '群益ESG投等債20+',
  },
  {
    category: 'ETF',
    stockNo: '00939',
    name: '統一台灣高息動能',
  },
  {
    category: 'ETF',
    stockNo: '00940',
    name: '元大台灣價值高息',
  },
  {
    category: 'ETF',
    stockNo: '00941',
    name: '中信上游半導體',
  },
  {
    category: '上櫃指數股票型基金(ETF)',
    stockNo: '00942B',
    name: '台新美A公司債20+',
  },
  {
    category: 'ETF',
    stockNo: '00944',
    name: '野村趨勢動能高息',
  },
  {
    category: 'ETF',
    stockNo: '00945B',
    name: '凱基美國非投等債',
  },
  {
    category: 'ETF',
    stockNo: '00946',
    name: '群益科技高息成長',
  },
  {
    category: '受益證券',
    stockNo: '01001T',
    name: '土銀富邦R1',
  },
  {
    category: '受益證券',
    stockNo: '01002T',
    name: '土銀國泰R1',
  },
  {
    category: '受益證券',
    stockNo: '01003T',
    name: '兆豐新光R1',
  },
  {
    category: '受益證券',
    stockNo: '01004T',
    name: '土銀富邦R2',
  },
  {
    category: '受益證券',
    stockNo: '01005T',
    name: '三鼎',
  },
  {
    category: '受益證券',
    stockNo: '01007T',
    name: '兆豐國泰R2',
  },
  {
    category: '受益證券',
    stockNo: '01008T',
    name: '駿馬R1',
  },
  {
    category: '受益證券',
    stockNo: '01009T',
    name: '王道圓滿R1',
  },
  {
    category: 'ETN',
    stockNo: '020000',
    name: '富邦特選蘋果N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020001',
    name: '富邦存股雙十N',
  },
  {
    category: 'ETN',
    stockNo: '020002',
    name: '元富新中國N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020003',
    name: '統一漲升股利150N',
  },
  {
    category: 'ETN',
    stockNo: '020004',
    name: '兆豐電菁英30N',
  },
  {
    category: 'ETN',
    stockNo: '020005',
    name: '永豐外資50N',
  },
  {
    category: 'ETN',
    stockNo: '020006',
    name: '永昌中小300N',
  },
  {
    category: 'ETN',
    stockNo: '020007',
    name: '凱基臺灣500N',
  },
  {
    category: 'ETN',
    stockNo: '020008',
    name: '元大特股高息N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020009',
    name: '群益A50綠碳N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020010',
    name: '永昌富櫃200N',
  },
  {
    category: 'ETN',
    stockNo: '020011',
    name: '統一微波高息20N',
  },
  {
    category: 'ETN',
    stockNo: '020012',
    name: '富邦行動通訊N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020013',
    name: '元富亞洲高股息N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020014',
    name: '元大富櫃200N',
  },
  {
    category: 'ETN',
    stockNo: '020015',
    name: '統一MSCI美低波N',
  },
  {
    category: 'ETN',
    stockNo: '020016',
    name: '統一MSCI美科技N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020017',
    name: '永豐富櫃200N',
  },
  {
    category: 'ETN',
    stockNo: '020018',
    name: '統一價值成長30N',
  },
  {
    category: 'ETN',
    stockNo: '020019',
    name: '統一特選台灣5GN',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '02001B',
    name: '統一美國政府債N',
  },
  {
    category: 'ETN',
    stockNo: '02001L',
    name: '富邦蘋果正二N',
  },
  {
    category: 'ETN',
    stockNo: '02001R',
    name: '富邦蘋果反一N',
  },
  {
    category: 'ETN',
    stockNo: '02001S',
    name: '策元大加權策略N',
  },
  {
    category: 'ETN',
    stockNo: '020020',
    name: '元大台股領航N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020021',
    name: '統一恒生科技N',
  },
  {
    category: 'ETN',
    stockNo: '020022',
    name: '元大電動車N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020023',
    name: '元大櫃買半導體N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020024',
    name: '兆豐富櫃200N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020025',
    name: '統一亞洲半導體N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020026',
    name: '兆豐上櫃ESG電菁N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020027',
    name: '元大上櫃ESG成長N',
  },
  {
    category: 'ETN',
    stockNo: '020028',
    name: '元大特選電動車N',
  },
  {
    category: 'ETN',
    stockNo: '020029',
    name: '元大ESG高股息N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '02002L',
    name: '兆豐富櫃200正二N',
  },
  {
    category: 'ETN',
    stockNo: '020030',
    name: '統一智慧電動車N',
  },
  {
    category: 'ETN',
    stockNo: '020031',
    name: '統一IC設計臺灣N',
  },
  {
    category: 'ETN',
    stockNo: '020032',
    name: '元大綠能N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020033',
    name: '統一恒生科期N',
  },
  {
    category: 'ETN',
    stockNo: '020034',
    name: '元大IC設計N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020035',
    name: '元大上櫃ESG高息N',
  },
  {
    category: 'ETN',
    stockNo: '020036',
    name: '元大金融配息N',
  },
  {
    category: 'ETN',
    stockNo: '020037',
    name: '元大金融高股息N',
  },
  {
    category: 'ETN',
    stockNo: '020038',
    name: '元大ESG配息N',
  },
  {
    category: 'ETN',
    stockNo: '020039',
    name: '元大加權N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '02003L',
    name: '永豐富櫃200正2N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020040',
    name: '元大上櫃ESG龍頭N',
  },
  {
    category: '指數投資證券(ETN)',
    stockNo: '020041',
    name: '兆豐半導體氣候N',
  },
  {
    category: '水泥工業',
    stockNo: '1101',
    name: '台泥',
  },
  {
    category: '水泥工業',
    stockNo: '1101B',
    name: '台泥乙特',
  },
  {
    category: '水泥工業',
    stockNo: '1102',
    name: '亞泥',
  },
  {
    category: '水泥工業',
    stockNo: '1103',
    name: '嘉泥',
  },
  {
    category: '水泥工業',
    stockNo: '1104',
    name: '環泥',
  },
  {
    category: '其他',
    stockNo: '1107',
    name: '建台',
  },
  {
    category: '水泥工業',
    stockNo: '1108',
    name: '幸福',
  },
  {
    category: '水泥工業',
    stockNo: '1109',
    name: '信大',
  },
  {
    category: '水泥工業',
    stockNo: '1110',
    name: '東泥',
  },
  {
    category: '食品工業',
    stockNo: '1201',
    name: '味全',
  },
  {
    category: '食品工業',
    stockNo: '1203',
    name: '味王',
  },
  {
    category: '食品工業',
    stockNo: '1210',
    name: '大成',
  },
  {
    category: '食品工業',
    stockNo: '1213',
    name: '大飲',
  },
  {
    category: '食品工業',
    stockNo: '1215',
    name: '卜蜂',
  },
  {
    category: '食品工業',
    stockNo: '1216',
    name: '統一',
  },
  {
    category: '食品工業',
    stockNo: '1217',
    name: '愛之味',
  },
  {
    category: '食品工業',
    stockNo: '1218',
    name: '泰山',
  },
  {
    category: '食品工業',
    stockNo: '1219',
    name: '福壽',
  },
  {
    category: '食品工業',
    stockNo: '1220',
    name: '台榮',
  },
  {
    category: '食品工業',
    stockNo: '1225',
    name: '福懋油',
  },
  {
    category: '食品工業',
    stockNo: '1227',
    name: '佳格',
  },
  {
    category: '食品工業',
    stockNo: '1229',
    name: '聯華',
  },
  {
    category: '電器電纜',
    stockNo: '1230',
    name: '聯成食',
  },
  {
    category: '食品工業',
    stockNo: '1231',
    name: '聯華食',
  },
  {
    category: '食品工業',
    stockNo: '1232',
    name: '大統益',
  },
  {
    category: '食品工業',
    stockNo: '1233',
    name: '天仁',
  },
  {
    category: '食品工業',
    stockNo: '1234',
    name: '黑松',
  },
  {
    category: '食品工業',
    stockNo: '1235',
    name: '興泰',
  },
  {
    category: '食品工業',
    stockNo: '1236',
    name: '宏亞',
  },
  {
    category: '農業科技業',
    stockNo: '1240',
    name: '茂生農經',
  },
  {
    category: '食品工業',
    stockNo: '1256',
    name: '鮮活果汁-KY',
  },
  {
    category: '食品工業',
    stockNo: '1258',
    name: '其祥-KY',
  },
  {
    category: '觀光事業',
    stockNo: '1259',
    name: '安心',
  },
  {
    category: '觀光餐旅',
    stockNo: '1259',
    name: '安心',
  },
  {
    category: '食品工業',
    stockNo: '1260',
    name: '富味鄉',
  },
  {
    category: '其他',
    stockNo: '1262',
    name: '綠悅-KY',
  },
  {
    category: '食品工業',
    stockNo: '1264',
    name: '德麥',
  },
  {
    category: '觀光事業',
    stockNo: '1268',
    name: '漢來美食',
  },
  {
    category: '觀光餐旅',
    stockNo: '1268',
    name: '漢來美食',
  },
  {
    category: '觀光餐旅',
    stockNo: '1269',
    name: '乾杯',
  },
  {
    category: '生技醫療業',
    stockNo: '1271',
    name: '晨暉生技',
  },
  {
    category: '食品工業',
    stockNo: '1293',
    name: '利統',
  },
  {
    category: '食品工業',
    stockNo: '1294',
    name: '漢田生技',
  },
  {
    category: '食品工業',
    stockNo: '1295',
    name: '生合',
  },
  {
    category: '塑膠工業',
    stockNo: '1301',
    name: '台塑',
  },
  {
    category: '塑膠工業',
    stockNo: '1303',
    name: '南亞',
  },
  {
    category: '塑膠工業',
    stockNo: '1304',
    name: '台聚',
  },
  {
    category: '塑膠工業',
    stockNo: '1305',
    name: '華夏',
  },
  {
    category: '塑膠工業',
    stockNo: '1307',
    name: '三芳',
  },
  {
    category: '塑膠工業',
    stockNo: '1308',
    name: '亞聚',
  },
  {
    category: '塑膠工業',
    stockNo: '1309',
    name: '台達化',
  },
  {
    category: '塑膠工業',
    stockNo: '1310',
    name: '台苯',
  },
  {
    category: '塑膠工業',
    stockNo: '1311',
    name: '福聚',
  },
  {
    category: '塑膠工業',
    stockNo: '1312',
    name: '國喬',
  },
  {
    category: '塑膠工業',
    stockNo: '1312A',
    name: '國喬特',
  },
  {
    category: '塑膠工業',
    stockNo: '1313',
    name: '聯成',
  },
  {
    category: '塑膠工業',
    stockNo: '1314',
    name: '中石化',
  },
  {
    category: '塑膠工業',
    stockNo: '1315',
    name: '達新',
  },
  {
    category: '建材營造',
    stockNo: '1316',
    name: '上曜',
  },
  {
    category: '汽車工業',
    stockNo: '1319',
    name: '東陽',
  },
  {
    category: '塑膠工業',
    stockNo: '1321',
    name: '大洋',
  },
  {
    category: '塑膠工業',
    stockNo: '1323',
    name: '永裕',
  },
  {
    category: '塑膠工業',
    stockNo: '1324',
    name: '地球',
  },
  {
    category: '塑膠工業',
    stockNo: '1325',
    name: '恆大',
  },
  {
    category: '塑膠工業',
    stockNo: '1326',
    name: '台化',
  },
  {
    category: '電子零組件業',
    stockNo: '1336',
    name: '台翰',
  },
  {
    category: '塑膠工業',
    stockNo: '1337',
    name: '再生-KY',
  },
  {
    category: '汽車工業',
    stockNo: '1338',
    name: '廣華-KY',
  },
  {
    category: '汽車工業',
    stockNo: '1339',
    name: '昭輝',
  },
  {
    category: '塑膠工業',
    stockNo: '1340',
    name: '勝悅-KY',
  },
  {
    category: '塑膠工業',
    stockNo: '1341',
    name: '富林-KY',
  },
  {
    category: '其他',
    stockNo: '1342',
    name: '八貫',
  },
  {
    category: '綠能環保',
    stockNo: '1343',
    name: '旭東環保',
  },
  {
    category: '紡織纖維',
    stockNo: '1402',
    name: '遠東新',
  },
  {
    category: '紡織纖維',
    stockNo: '1409',
    name: '新纖',
  },
  {
    category: '紡織纖維',
    stockNo: '1410',
    name: '南染',
  },
  {
    category: '紡織纖維',
    stockNo: '1413',
    name: '宏洲',
  },
  {
    category: '紡織纖維',
    stockNo: '1414',
    name: '東和',
  },
  {
    category: '其他',
    stockNo: '1416',
    name: '廣豐',
  },
  {
    category: '紡織纖維',
    stockNo: '1417',
    name: '嘉裕',
  },
  {
    category: '紡織纖維',
    stockNo: '1418',
    name: '東華',
  },
  {
    category: '紡織纖維',
    stockNo: '1419',
    name: '新紡',
  },
  {
    category: '紡織纖維',
    stockNo: '1423',
    name: '利華',
  },
  {
    category: '貿易百貨',
    stockNo: '1432',
    name: '大魯閣',
  },
  {
    category: '運動休閒',
    stockNo: '1432',
    name: '大魯閣',
  },
  {
    category: '紡織纖維',
    stockNo: '1434',
    name: '福懋',
  },
  {
    category: '其他',
    stockNo: '1435',
    name: '中福',
  },
  {
    category: '建材營造',
    stockNo: '1436',
    name: '華友聯',
  },
  {
    category: '其他',
    stockNo: '1437',
    name: '勤益控',
  },
  {
    category: '建材營造',
    stockNo: '1438',
    name: '三地開發',
  },
  {
    category: '建材營造',
    stockNo: '1439',
    name: '雋揚',
  },
  {
    category: '紡織纖維',
    stockNo: '1439',
    name: '雋揚',
  },
  {
    category: '紡織纖維',
    stockNo: '1440',
    name: '南紡',
  },
  {
    category: '紡織纖維',
    stockNo: '1441',
    name: '大東',
  },
  {
    category: '建材營造',
    stockNo: '1442',
    name: '名軒',
  },
  {
    category: '其他',
    stockNo: '1443',
    name: '立益物流',
  },
  {
    category: '紡織纖維',
    stockNo: '1443',
    name: '立益',
  },
  {
    category: '紡織纖維',
    stockNo: '1444',
    name: '力麗',
  },
  {
    category: '紡織纖維',
    stockNo: '1445',
    name: '大宇',
  },
  {
    category: '紡織纖維',
    stockNo: '1446',
    name: '宏和',
  },
  {
    category: '紡織纖維',
    stockNo: '1447',
    name: '力鵬',
  },
  {
    category: '紡織纖維',
    stockNo: '1449',
    name: '佳和',
  },
  {
    category: '紡織纖維',
    stockNo: '1451',
    name: '年興',
  },
  {
    category: '紡織纖維',
    stockNo: '1452',
    name: '宏益',
  },
  {
    category: '建材營造',
    stockNo: '1453',
    name: '大將',
  },
  {
    category: '紡織纖維',
    stockNo: '1453',
    name: '大將',
  },
  {
    category: '紡織纖維',
    stockNo: '1454',
    name: '台富',
  },
  {
    category: '紡織纖維',
    stockNo: '1455',
    name: '集盛',
  },
  {
    category: '建材營造',
    stockNo: '1456',
    name: '怡華',
  },
  {
    category: '紡織纖維',
    stockNo: '1456',
    name: '怡華',
  },
  {
    category: '紡織纖維',
    stockNo: '1457',
    name: '宜進',
  },
  {
    category: '紡織纖維',
    stockNo: '1459',
    name: '聯發',
  },
  {
    category: '紡織纖維',
    stockNo: '1460',
    name: '宏遠',
  },
  {
    category: '紡織纖維',
    stockNo: '1463',
    name: '強盛',
  },
  {
    category: '紡織纖維',
    stockNo: '1464',
    name: '得力',
  },
  {
    category: '紡織纖維',
    stockNo: '1465',
    name: '偉全',
  },
  {
    category: '紡織纖維',
    stockNo: '1466',
    name: '聚隆',
  },
  {
    category: '紡織纖維',
    stockNo: '1467',
    name: '南緯',
  },
  {
    category: '紡織纖維',
    stockNo: '1468',
    name: '昶和',
  },
  {
    category: '紡織纖維',
    stockNo: '1469',
    name: '理隆',
  },
  {
    category: '紡織纖維',
    stockNo: '1470',
    name: '大統新創',
  },
  {
    category: '電子工業',
    stockNo: '1471',
    name: '首利',
  },
  {
    category: '電子零組件業',
    stockNo: '1471',
    name: '首利',
  },
  {
    category: '建材營造',
    stockNo: '1472',
    name: '三洋實業',
  },
  {
    category: '紡織纖維',
    stockNo: '1472',
    name: '三洋實業',
  },
  {
    category: '紡織纖維',
    stockNo: '1473',
    name: '台南',
  },
  {
    category: '紡織纖維',
    stockNo: '1474',
    name: '弘裕',
  },
  {
    category: '紡織纖維',
    stockNo: '1475',
    name: '業旺',
  },
  {
    category: '紡織纖維',
    stockNo: '1476',
    name: '儒鴻',
  },
  {
    category: '紡織纖維',
    stockNo: '1477',
    name: '聚陽',
  },
  {
    category: '鋼鐵工業',
    stockNo: '1480',
    name: '東盟開發',
  },
  {
    category: '電機機械',
    stockNo: '1503',
    name: '士電',
  },
  {
    category: '電機機械',
    stockNo: '1504',
    name: '東元',
  },
  {
    category: '電機機械',
    stockNo: '1506',
    name: '正道',
  },
  {
    category: '電機機械',
    stockNo: '1507',
    name: '永大',
  },
  {
    category: '汽車工業',
    stockNo: '1512',
    name: '瑞利',
  },
  {
    category: '電機機械',
    stockNo: '1513',
    name: '中興電',
  },
  {
    category: '電機機械',
    stockNo: '1514',
    name: '亞力',
  },
  {
    category: '電機機械',
    stockNo: '1515',
    name: '力山',
  },
  {
    category: '其他',
    stockNo: '1516',
    name: '川飛',
  },
  {
    category: '電機機械',
    stockNo: '1517',
    name: '利奇',
  },
  {
    category: '電機機械',
    stockNo: '1519',
    name: '華城',
  },
  {
    category: '其他',
    stockNo: '1520',
    name: '復盛',
  },
  {
    category: '汽車工業',
    stockNo: '1521',
    name: '大億',
  },
  {
    category: '汽車工業',
    stockNo: '1522',
    name: '堤維西',
  },
  {
    category: '汽車工業',
    stockNo: '1522A',
    name: '堤維西甲特',
  },
  {
    category: '電機機械',
    stockNo: '1523',
    name: '開億',
  },
  {
    category: '汽車工業',
    stockNo: '1524',
    name: '耿鼎',
  },
  {
    category: '汽車工業',
    stockNo: '1525',
    name: '江申',
  },
  {
    category: '電機機械',
    stockNo: '1526',
    name: '日馳',
  },
  {
    category: '電機機械',
    stockNo: '1527',
    name: '鑽全',
  },
  {
    category: '電機機械',
    stockNo: '1528',
    name: '恩德',
  },
  {
    category: '電機機械',
    stockNo: '1529',
    name: '樂事綠能',
  },
  {
    category: '電機機械',
    stockNo: '1530',
    name: '亞崴',
  },
  {
    category: '電機機械',
    stockNo: '1531',
    name: '高林股',
  },
  {
    category: '電機機械',
    stockNo: '1532',
    name: '勤美',
  },
  {
    category: '汽車工業',
    stockNo: '1533',
    name: '車王電',
  },
  {
    category: '電機機械',
    stockNo: '1535',
    name: '中宇',
  },
  {
    category: '汽車工業',
    stockNo: '1536',
    name: '和大',
  },
  {
    category: '電機機械',
    stockNo: '1537',
    name: '廣隆',
  },
  {
    category: '電機機械',
    stockNo: '1538',
    name: '正峰',
  },
  {
    category: '電機機械',
    stockNo: '1539',
    name: '巨庭',
  },
  {
    category: '電機機械',
    stockNo: '1540',
    name: '喬福',
  },
  {
    category: '電機機械',
    stockNo: '1541',
    name: '錩泰',
  },
  {
    category: '電機機械',
    stockNo: '1558',
    name: '伸興',
  },
  {
    category: '電機機械',
    stockNo: '1560',
    name: '中砂',
  },
  {
    category: '汽車工業',
    stockNo: '1563',
    name: '巧新',
  },
  {
    category: '電機機械',
    stockNo: '1563',
    name: '巧新',
  },
  {
    category: '生技醫療業',
    stockNo: '1565',
    name: '精華',
  },
  {
    category: '汽車工業',
    stockNo: '1568',
    name: '倉佑',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '1569',
    name: '濱川',
  },
  {
    category: '電機機械',
    stockNo: '1570',
    name: '力肯',
  },
  {
    category: '電機機械',
    stockNo: '1580',
    name: '新麥',
  },
  {
    category: '電子工業',
    stockNo: '1582',
    name: '信錦',
  },
  {
    category: '電子零組件業',
    stockNo: '1582',
    name: '信錦',
  },
  {
    category: '電機機械',
    stockNo: '1583',
    name: '程泰',
  },
  {
    category: '其他',
    stockNo: '1584',
    name: '精剛',
  },
  {
    category: '電子零組件業',
    stockNo: '1585',
    name: '鎧鉅',
  },
  {
    category: '電機機械',
    stockNo: '1586',
    name: '和勤',
  },
  {
    category: '汽車工業',
    stockNo: '1587',
    name: '吉茂',
  },
  {
    category: '電機機械',
    stockNo: '1589',
    name: '永冠-KY',
  },
  {
    category: '電機機械',
    stockNo: '1590',
    name: '亞德客-KY',
  },
  {
    category: '電機機械',
    stockNo: '1591',
    name: '駿吉-KY',
  },
  {
    category: '汽車工業',
    stockNo: '1592',
    name: '英瑞-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '1593',
    name: '祺驊',
  },
  {
    category: '運動休閒類',
    stockNo: '1593',
    name: '祺驊',
  },
  {
    category: '電機機械',
    stockNo: '1594',
    name: '日高',
  },
  {
    category: '電子零組件業',
    stockNo: '1595',
    name: '川寶',
  },
  {
    category: '電機機械',
    stockNo: '1597',
    name: '直得',
  },
  {
    category: '化學生技醫療',
    stockNo: '1598',
    name: '岱宇',
  },
  {
    category: '生技醫療業',
    stockNo: '1598',
    name: '岱宇',
  },
  {
    category: '運動休閒',
    stockNo: '1598',
    name: '岱宇',
  },
  {
    category: '電機機械',
    stockNo: '1599',
    name: '宏佳騰',
  },
  {
    category: '電器電纜',
    stockNo: '1601',
    name: '台光',
  },
  {
    category: '電器電纜',
    stockNo: '1603',
    name: '華電',
  },
  {
    category: '電器電纜',
    stockNo: '1604',
    name: '聲寶',
  },
  {
    category: '電器電纜',
    stockNo: '1605',
    name: '華新',
  },
  {
    category: '電器電纜',
    stockNo: '1606',
    name: '歌林',
  },
  {
    category: '電器電纜',
    stockNo: '1608',
    name: '華榮',
  },
  {
    category: '電器電纜',
    stockNo: '1609',
    name: '大亞',
  },
  {
    category: '電器電纜',
    stockNo: '1611',
    name: '中電',
  },
  {
    category: '電器電纜',
    stockNo: '1612',
    name: '宏泰',
  },
  {
    category: '電器電纜',
    stockNo: '1613',
    name: '台一',
  },
  {
    category: '電器電纜',
    stockNo: '1614',
    name: '三洋電',
  },
  {
    category: '電器電纜',
    stockNo: '1615',
    name: '大山',
  },
  {
    category: '電器電纜',
    stockNo: '1616',
    name: '億泰',
  },
  {
    category: '電器電纜',
    stockNo: '1617',
    name: '榮星',
  },
  {
    category: '電器電纜',
    stockNo: '1618',
    name: '合機',
  },
  {
    category: '電器電纜',
    stockNo: '1626',
    name: '艾美特-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '1701',
    name: '中化',
  },
  {
    category: '生技醫療業',
    stockNo: '1701',
    name: '中化',
  },
  {
    category: '食品工業',
    stockNo: '1702',
    name: '南僑',
  },
  {
    category: '化學工業',
    stockNo: '1704',
    name: '榮化',
  },
  {
    category: '化學生技醫療',
    stockNo: '1704',
    name: '榮化',
  },
  {
    category: '化學生技醫療',
    stockNo: '1707',
    name: '葡萄王',
  },
  {
    category: '生技醫療業',
    stockNo: '1707',
    name: '葡萄王',
  },
  {
    category: '化學工業',
    stockNo: '1708',
    name: '東鹼',
  },
  {
    category: '化學生技醫療',
    stockNo: '1708',
    name: '東鹼',
  },
  {
    category: '化學工業',
    stockNo: '1709',
    name: '和益',
  },
  {
    category: '化學生技醫療',
    stockNo: '1709',
    name: '和益',
  },
  {
    category: '化學工業',
    stockNo: '1710',
    name: '東聯',
  },
  {
    category: '化學生技醫療',
    stockNo: '1710',
    name: '東聯',
  },
  {
    category: '化學工業',
    stockNo: '1711',
    name: '永光',
  },
  {
    category: '化學生技醫療',
    stockNo: '1711',
    name: '永光',
  },
  {
    category: '化學工業',
    stockNo: '1712',
    name: '興農',
  },
  {
    category: '化學生技醫療',
    stockNo: '1712',
    name: '興農',
  },
  {
    category: '化學工業',
    stockNo: '1713',
    name: '國化',
  },
  {
    category: '化學生技醫療',
    stockNo: '1713',
    name: '國化',
  },
  {
    category: '化學工業',
    stockNo: '1714',
    name: '和桐',
  },
  {
    category: '化學生技醫療',
    stockNo: '1714',
    name: '和桐',
  },
  {
    category: '塑膠工業',
    stockNo: '1715',
    name: '萬洲',
  },
  {
    category: '化學生技醫療',
    stockNo: '1716',
    name: '永信',
  },
  {
    category: '生技醫療業',
    stockNo: '1716',
    name: '永信',
  },
  {
    category: '化學工業',
    stockNo: '1717',
    name: '長興',
  },
  {
    category: '化學生技醫療',
    stockNo: '1717',
    name: '長興',
  },
  {
    category: '化學工業',
    stockNo: '1718',
    name: '中纖',
  },
  {
    category: '化學生技醫療',
    stockNo: '1718',
    name: '中纖',
  },
  {
    category: '化學生技醫療',
    stockNo: '1720',
    name: '生達',
  },
  {
    category: '生技醫療業',
    stockNo: '1720',
    name: '生達',
  },
  {
    category: '化學工業',
    stockNo: '1721',
    name: '三晃',
  },
  {
    category: '化學生技醫療',
    stockNo: '1721',
    name: '三晃',
  },
  {
    category: '化學工業',
    stockNo: '1722',
    name: '台肥',
  },
  {
    category: '化學生技醫療',
    stockNo: '1722',
    name: '台肥',
  },
  {
    category: '化學工業',
    stockNo: '1723',
    name: '中碳',
  },
  {
    category: '化學生技醫療',
    stockNo: '1723',
    name: '中碳',
  },
  {
    category: '化學工業',
    stockNo: '1724',
    name: '台硝',
  },
  {
    category: '化學生技醫療',
    stockNo: '1724',
    name: '台硝',
  },
  {
    category: '化學工業',
    stockNo: '1725',
    name: '元禎',
  },
  {
    category: '化學生技醫療',
    stockNo: '1725',
    name: '元禎',
  },
  {
    category: '化學工業',
    stockNo: '1726',
    name: '永記',
  },
  {
    category: '化學生技醫療',
    stockNo: '1726',
    name: '永記',
  },
  {
    category: '化學工業',
    stockNo: '1727',
    name: '中華化',
  },
  {
    category: '化學生技醫療',
    stockNo: '1727',
    name: '中華化',
  },
  {
    category: '化學生技醫療',
    stockNo: '1729',
    name: '必翔',
  },
  {
    category: '生技醫療業',
    stockNo: '1729',
    name: '必翔',
  },
  {
    category: '化學工業',
    stockNo: '1730',
    name: '花仙子',
  },
  {
    category: '化學生技醫療',
    stockNo: '1730',
    name: '花仙子',
  },
  {
    category: '化學生技醫療',
    stockNo: '1731',
    name: '美吾華',
  },
  {
    category: '生技醫療業',
    stockNo: '1731',
    name: '美吾華',
  },
  {
    category: '化學工業',
    stockNo: '1732',
    name: '毛寶',
  },
  {
    category: '化學生技醫療',
    stockNo: '1732',
    name: '毛寶',
  },
  {
    category: '化學生技醫療',
    stockNo: '1733',
    name: '五鼎',
  },
  {
    category: '生技醫療業',
    stockNo: '1733',
    name: '五鼎',
  },
  {
    category: '化學生技醫療',
    stockNo: '1734',
    name: '杏輝',
  },
  {
    category: '生技醫療業',
    stockNo: '1734',
    name: '杏輝',
  },
  {
    category: '化學工業',
    stockNo: '1735',
    name: '日勝化',
  },
  {
    category: '化學生技醫療',
    stockNo: '1735',
    name: '日勝化',
  },
  {
    category: '化學生技醫療',
    stockNo: '1736',
    name: '喬山',
  },
  {
    category: '生技醫療業',
    stockNo: '1736',
    name: '喬山',
  },
  {
    category: '運動休閒',
    stockNo: '1736',
    name: '喬山',
  },
  {
    category: '食品工業',
    stockNo: '1737',
    name: '臺鹽',
  },
  {
    category: '化學工業',
    stockNo: '1742',
    name: '台蠟',
  },
  {
    category: '化學生技醫療',
    stockNo: '1752',
    name: '南光',
  },
  {
    category: '生技醫療業',
    stockNo: '1752',
    name: '南光',
  },
  {
    category: '化學生技醫療',
    stockNo: '1760',
    name: '寶齡富錦',
  },
  {
    category: '生技醫療業',
    stockNo: '1760',
    name: '寶齡富錦',
  },
  {
    category: '化學生技醫療',
    stockNo: '1762',
    name: '中化生',
  },
  {
    category: '生技醫療業',
    stockNo: '1762',
    name: '中化生',
  },
  {
    category: '化學工業',
    stockNo: '1773',
    name: '勝一',
  },
  {
    category: '化學生技醫療',
    stockNo: '1773',
    name: '勝一',
  },
  {
    category: '化學工業',
    stockNo: '1776',
    name: '展宇',
  },
  {
    category: '化學生技醫療',
    stockNo: '1776',
    name: '展宇',
  },
  {
    category: '生技醫療業',
    stockNo: '1777',
    name: '生泰',
  },
  {
    category: '生技醫療業',
    stockNo: '1780',
    name: '立弘',
  },
  {
    category: '生技醫療業',
    stockNo: '1781',
    name: '合世',
  },
  {
    category: '化學生技醫療',
    stockNo: '1783',
    name: '和康生',
  },
  {
    category: '生技醫療業',
    stockNo: '1783',
    name: '和康生',
  },
  {
    category: '生技醫療業',
    stockNo: '1784',
    name: '訊聯',
  },
  {
    category: '其他電子類',
    stockNo: '1785',
    name: '光洋科',
  },
  {
    category: '化學生技醫療',
    stockNo: '1786',
    name: '科妍',
  },
  {
    category: '生技醫療業',
    stockNo: '1786',
    name: '科妍',
  },
  {
    category: '生技醫療業',
    stockNo: '1788',
    name: '杏昌',
  },
  {
    category: '化學生技醫療',
    stockNo: '1789',
    name: '神隆',
  },
  {
    category: '生技醫療業',
    stockNo: '1789',
    name: '神隆',
  },
  {
    category: '化學生技醫療',
    stockNo: '1795',
    name: '美時',
  },
  {
    category: '生技醫療業',
    stockNo: '1795',
    name: '美時',
  },
  {
    category: '食品工業',
    stockNo: '1796',
    name: '金穎生技',
  },
  {
    category: '生技醫療業',
    stockNo: '1799',
    name: '易威',
  },
  {
    category: '玻璃陶瓷',
    stockNo: '1802',
    name: '台玻',
  },
  {
    category: '建材營造',
    stockNo: '1805',
    name: '寶徠',
  },
  {
    category: '玻璃陶瓷',
    stockNo: '1806',
    name: '冠軍',
  },
  {
    category: '建材營造',
    stockNo: '1808',
    name: '潤隆',
  },
  {
    category: '玻璃陶瓷',
    stockNo: '1809',
    name: '中釉',
  },
  {
    category: '玻璃陶瓷',
    stockNo: '1810',
    name: '和成',
  },
  {
    category: '生技醫療業',
    stockNo: '1813',
    name: '寶利徠',
  },
  {
    category: '電子零組件業',
    stockNo: '1815',
    name: '富喬',
  },
  {
    category: '玻璃陶瓷',
    stockNo: '1817',
    name: '凱撒衛',
  },
  {
    category: '造紙工業',
    stockNo: '1902',
    name: '台紙',
  },
  {
    category: '造紙工業',
    stockNo: '1903',
    name: '士紙',
  },
  {
    category: '造紙工業',
    stockNo: '1904',
    name: '正隆',
  },
  {
    category: '造紙工業',
    stockNo: '1905',
    name: '華紙',
  },
  {
    category: '造紙工業',
    stockNo: '1906',
    name: '寶隆',
  },
  {
    category: '造紙工業',
    stockNo: '1907',
    name: '永豐餘',
  },
  {
    category: '造紙工業',
    stockNo: '1909',
    name: '榮成',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2002',
    name: '中鋼',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2002A',
    name: '中鋼特',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2006',
    name: '東和鋼鐵',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2007',
    name: '燁興',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2008',
    name: '高興昌',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2009',
    name: '第一銅',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2010',
    name: '春源',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2012',
    name: '春雨',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2013',
    name: '中鋼構',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2014',
    name: '中鴻',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2015',
    name: '豐興',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2017',
    name: '官田鋼',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2020',
    name: '美亞',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2022',
    name: '聚亨',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2023',
    name: '燁輝',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2024',
    name: '志聯',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2025',
    name: '千興',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2027',
    name: '大成鋼',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2028',
    name: '威致',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2029',
    name: '盛餘',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2030',
    name: '彰源',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2031',
    name: '新光鋼',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2032',
    name: '新鋼',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2033',
    name: '佳大',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2034',
    name: '允強',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2035',
    name: '唐榮',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2038',
    name: '海光',
  },
  {
    category: '電機機械',
    stockNo: '2049',
    name: '上銀',
  },
  {
    category: '電子工業',
    stockNo: '2059',
    name: '川湖',
  },
  {
    category: '電子零組件業',
    stockNo: '2059',
    name: '川湖',
  },
  {
    category: '電器電纜',
    stockNo: '2061',
    name: '風青',
  },
  {
    category: '其他',
    stockNo: '2062',
    name: '橋椿',
  },
  {
    category: '居家生活',
    stockNo: '2062',
    name: '橋椿',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2063',
    name: '世鎧',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2064',
    name: '晉椿',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2065',
    name: '世豐',
  },
  {
    category: '電機機械',
    stockNo: '2066',
    name: '世德',
  },
  {
    category: '電機機械',
    stockNo: '2067',
    name: '嘉鋼',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2069',
    name: '運錩',
  },
  {
    category: '電機機械',
    stockNo: '2070',
    name: '精湛',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2071',
    name: '震南鐵',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2072',
    name: '世紀風電',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2073',
    name: '雄順',
  },
  {
    category: '橡膠工業',
    stockNo: '2101',
    name: '南港',
  },
  {
    category: '橡膠工業',
    stockNo: '2102',
    name: '泰豐',
  },
  {
    category: '橡膠工業',
    stockNo: '2103',
    name: '台橡',
  },
  {
    category: '橡膠工業',
    stockNo: '2104',
    name: '國際中橡',
  },
  {
    category: '橡膠工業',
    stockNo: '2105',
    name: '正新',
  },
  {
    category: '橡膠工業',
    stockNo: '2106',
    name: '建大',
  },
  {
    category: '橡膠工業',
    stockNo: '2107',
    name: '厚生',
  },
  {
    category: '橡膠工業',
    stockNo: '2108',
    name: '南帝',
  },
  {
    category: '橡膠工業',
    stockNo: '2109',
    name: '華豐',
  },
  {
    category: '橡膠工業',
    stockNo: '2114',
    name: '鑫永銓',
  },
  {
    category: '汽車工業',
    stockNo: '2115',
    name: '六暉-KY',
  },
  {
    category: '汽車工業',
    stockNo: '2201',
    name: '裕隆',
  },
  {
    category: '汽車工業',
    stockNo: '2204',
    name: '中華',
  },
  {
    category: '汽車工業',
    stockNo: '2206',
    name: '三陽工業',
  },
  {
    category: '汽車工業',
    stockNo: '2207',
    name: '和泰車',
  },
  {
    category: '航運業',
    stockNo: '2208',
    name: '台船',
  },
  {
    category: '鋼鐵工業',
    stockNo: '2211',
    name: '長榮鋼',
  },
  {
    category: '其他',
    stockNo: '2221',
    name: '大甲',
  },
  {
    category: '汽車工業',
    stockNo: '2227',
    name: '裕日車',
  },
  {
    category: '汽車工業',
    stockNo: '2228',
    name: '劍麟',
  },
  {
    category: '電機機械',
    stockNo: '2230',
    name: '泰茂',
  },
  {
    category: '汽車工業',
    stockNo: '2231',
    name: '為升',
  },
  {
    category: '汽車工業',
    stockNo: '2233',
    name: '宇隆',
  },
  {
    category: '電機機械',
    stockNo: '2235',
    name: '謚源',
  },
  {
    category: '汽車工業',
    stockNo: '2236',
    name: '百達-KY',
  },
  {
    category: '電機機械',
    stockNo: '2237',
    name: '華德動能',
  },
  {
    category: '汽車工業',
    stockNo: '2239',
    name: '英利-KY',
  },
  {
    category: '汽車工業',
    stockNo: '2241',
    name: '艾姆勒',
  },
  {
    category: '電機機械',
    stockNo: '2241',
    name: '艾姆勒',
  },
  {
    category: '汽車工業',
    stockNo: '2243',
    name: '宏旭-KY',
  },
  {
    category: '電機機械',
    stockNo: '2245',
    name: '詠勝昌',
  },
  {
    category: '汽車工業',
    stockNo: '2247',
    name: '汎德永業',
  },
  {
    category: '電機機械',
    stockNo: '2248',
    name: '華勝-KY',
  },
  {
    category: '電機機械',
    stockNo: '2249',
    name: '湧盛',
  },
  {
    category: '汽車工業',
    stockNo: '2250',
    name: 'IKKA-KY',
  },
  {
    category: '其他電子業',
    stockNo: '2252',
    name: '為昇科',
  },
  {
    category: '創新版股票',
    stockNo: '2254',
    name: '巨鎧精密-創',
  },
  {
    category: '其他電子業',
    stockNo: '2255',
    name: '凱銳光電',
  },
  {
    category: '其他電子業',
    stockNo: '2256',
    name: '歐特明',
  },
  {
    category: '創新版股票',
    stockNo: '2258',
    name: '鴻華先進-創',
  },
  {
    category: '電子工業',
    stockNo: '2301',
    name: '光寶科',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2301',
    name: '光寶科',
  },
  {
    category: '半導體業',
    stockNo: '2302',
    name: '麗正',
  },
  {
    category: '電子工業',
    stockNo: '2302',
    name: '麗正',
  },
  {
    category: '半導體業',
    stockNo: '2303',
    name: '聯電',
  },
  {
    category: '電子工業',
    stockNo: '2303',
    name: '聯電',
  },
  {
    category: '電子工業',
    stockNo: '2305',
    name: '全友',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2305',
    name: '全友',
  },
  {
    category: '電子工業',
    stockNo: '2308',
    name: '台達電',
  },
  {
    category: '電子零組件業',
    stockNo: '2308',
    name: '台達電',
  },
  {
    category: '半導體業',
    stockNo: '2311',
    name: '日月光',
  },
  {
    category: '電子工業',
    stockNo: '2311',
    name: '日月光',
  },
  {
    category: '其他電子業',
    stockNo: '2312',
    name: '金寶',
  },
  {
    category: '電子工業',
    stockNo: '2312',
    name: '金寶',
  },
  {
    category: '電子工業',
    stockNo: '2313',
    name: '華通',
  },
  {
    category: '電子零組件業',
    stockNo: '2313',
    name: '華通',
  },
  {
    category: '通信網路業',
    stockNo: '2314',
    name: '台揚',
  },
  {
    category: '電子工業',
    stockNo: '2314',
    name: '台揚',
  },
  {
    category: '電子工業',
    stockNo: '2315',
    name: '神達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2315',
    name: '神達',
  },
  {
    category: '電子工業',
    stockNo: '2316',
    name: '楠梓電',
  },
  {
    category: '電子零組件業',
    stockNo: '2316',
    name: '楠梓電',
  },
  {
    category: '其他電子業',
    stockNo: '2317',
    name: '鴻海',
  },
  {
    category: '電子工業',
    stockNo: '2317',
    name: '鴻海',
  },
  {
    category: '通信網路業',
    stockNo: '2321',
    name: '東訊',
  },
  {
    category: '電子工業',
    stockNo: '2321',
    name: '東訊',
  },
  {
    category: '光電業',
    stockNo: '2323',
    name: '中環',
  },
  {
    category: '電子工業',
    stockNo: '2323',
    name: '中環',
  },
  {
    category: '電子工業',
    stockNo: '2324',
    name: '仁寶',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2324',
    name: '仁寶',
  },
  {
    category: '半導體業',
    stockNo: '2325',
    name: '矽品',
  },
  {
    category: '電子工業',
    stockNo: '2325',
    name: '矽品',
  },
  {
    category: '電子工業',
    stockNo: '2327',
    name: '國巨',
  },
  {
    category: '電子零組件業',
    stockNo: '2327',
    name: '國巨',
  },
  {
    category: '電子工業',
    stockNo: '2328',
    name: '廣宇',
  },
  {
    category: '電子零組件業',
    stockNo: '2328',
    name: '廣宇',
  },
  {
    category: '半導體業',
    stockNo: '2329',
    name: '華泰',
  },
  {
    category: '電子工業',
    stockNo: '2329',
    name: '華泰',
  },
  {
    category: '半導體業',
    stockNo: '2330',
    name: '台積電',
  },
  {
    category: '電子工業',
    stockNo: '2330',
    name: '台積電',
  },
  {
    category: '電子工業',
    stockNo: '2331',
    name: '精英',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2331',
    name: '精英',
  },
  {
    category: '通信網路業',
    stockNo: '2332',
    name: '友訊',
  },
  {
    category: '電子工業',
    stockNo: '2332',
    name: '友訊',
  },
  {
    category: '電子工業',
    stockNo: '2336',
    name: '致伸',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2336',
    name: '致伸',
  },
  {
    category: '半導體業',
    stockNo: '2337',
    name: '旺宏',
  },
  {
    category: '電子工業',
    stockNo: '2337',
    name: '旺宏',
  },
  {
    category: '半導體業',
    stockNo: '2338',
    name: '光罩',
  },
  {
    category: '電子工業',
    stockNo: '2338',
    name: '光罩',
  },
  {
    category: '光電業',
    stockNo: '2340',
    name: '台亞',
  },
  {
    category: '半導體業',
    stockNo: '2340',
    name: '台亞',
  },
  {
    category: '電子工業',
    stockNo: '2340',
    name: '台亞',
  },
  {
    category: '電子工業',
    stockNo: '2341',
    name: '英群',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2341',
    name: '英群',
  },
  {
    category: '半導體業',
    stockNo: '2342',
    name: '茂矽',
  },
  {
    category: '電子工業',
    stockNo: '2342',
    name: '茂矽',
  },
  {
    category: '半導體業',
    stockNo: '2344',
    name: '華邦電',
  },
  {
    category: '電子工業',
    stockNo: '2344',
    name: '華邦電',
  },
  {
    category: '通信網路業',
    stockNo: '2345',
    name: '智邦',
  },
  {
    category: '電子工業',
    stockNo: '2345',
    name: '智邦',
  },
  {
    category: '電子工業',
    stockNo: '2347',
    name: '聯強',
  },
  {
    category: '電子通路業',
    stockNo: '2347',
    name: '聯強',
  },
  {
    category: '其他',
    stockNo: '2348',
    name: '海悅',
  },
  {
    category: '其他',
    stockNo: '2348A',
    name: '海悅甲特',
  },
  {
    category: '光電業',
    stockNo: '2349',
    name: '錸德',
  },
  {
    category: '電子工業',
    stockNo: '2349',
    name: '錸德',
  },
  {
    category: '其他電子業',
    stockNo: '2350',
    name: '環電',
  },
  {
    category: '電子工業',
    stockNo: '2350',
    name: '環電',
  },
  {
    category: '半導體業',
    stockNo: '2351',
    name: '順德',
  },
  {
    category: '電子工業',
    stockNo: '2351',
    name: '順德',
  },
  {
    category: '電子工業',
    stockNo: '2352',
    name: '佳世達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2352',
    name: '佳世達',
  },
  {
    category: '電子工業',
    stockNo: '2353',
    name: '宏碁',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2353',
    name: '宏碁',
  },
  {
    category: '其他電子業',
    stockNo: '2354',
    name: '鴻準',
  },
  {
    category: '電子工業',
    stockNo: '2354',
    name: '鴻準',
  },
  {
    category: '電子工業',
    stockNo: '2355',
    name: '敬鵬',
  },
  {
    category: '電子零組件業',
    stockNo: '2355',
    name: '敬鵬',
  },
  {
    category: '電子工業',
    stockNo: '2356',
    name: '英業達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2356',
    name: '英業達',
  },
  {
    category: '電子工業',
    stockNo: '2357',
    name: '華碩',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2357',
    name: '華碩',
  },
  {
    category: '其他',
    stockNo: '2358',
    name: '廷鑫',
  },
  {
    category: '其他電子業',
    stockNo: '2359',
    name: '所羅門',
  },
  {
    category: '電子工業',
    stockNo: '2359',
    name: '所羅門',
  },
  {
    category: '其他電子業',
    stockNo: '2360',
    name: '致茂',
  },
  {
    category: '電子工業',
    stockNo: '2360',
    name: '致茂',
  },
  {
    category: '電子工業',
    stockNo: '2361',
    name: '鴻友',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2361',
    name: '鴻友',
  },
  {
    category: '電子工業',
    stockNo: '2362',
    name: '藍天',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2362',
    name: '藍天',
  },
  {
    category: '半導體業',
    stockNo: '2363',
    name: '矽統',
  },
  {
    category: '電子工業',
    stockNo: '2363',
    name: '矽統',
  },
  {
    category: '電子工業',
    stockNo: '2364',
    name: '倫飛',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2364',
    name: '倫飛',
  },
  {
    category: '電子工業',
    stockNo: '2365',
    name: '昆盈',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2365',
    name: '昆盈',
  },
  {
    category: '電子工業',
    stockNo: '2367',
    name: '燿華',
  },
  {
    category: '電子零組件業',
    stockNo: '2367',
    name: '燿華',
  },
  {
    category: '電子工業',
    stockNo: '2368',
    name: '金像電',
  },
  {
    category: '電子零組件業',
    stockNo: '2368',
    name: '金像電',
  },
  {
    category: '半導體業',
    stockNo: '2369',
    name: '菱生',
  },
  {
    category: '電子工業',
    stockNo: '2369',
    name: '菱生',
  },
  {
    category: '電機機械',
    stockNo: '2371',
    name: '大同',
  },
  {
    category: '其他電子業',
    stockNo: '2373',
    name: '震旦行',
  },
  {
    category: '電子工業',
    stockNo: '2373',
    name: '震旦行',
  },
  {
    category: '光電業',
    stockNo: '2374',
    name: '佳能',
  },
  {
    category: '電子工業',
    stockNo: '2374',
    name: '佳能',
  },
  {
    category: '電子工業',
    stockNo: '2375',
    name: '凱美',
  },
  {
    category: '電子零組件業',
    stockNo: '2375',
    name: '凱美',
  },
  {
    category: '電子工業',
    stockNo: '2376',
    name: '技嘉',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2376',
    name: '技嘉',
  },
  {
    category: '電子工業',
    stockNo: '2377',
    name: '微星',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2377',
    name: '微星',
  },
  {
    category: '半導體業',
    stockNo: '2379',
    name: '瑞昱',
  },
  {
    category: '電子工業',
    stockNo: '2379',
    name: '瑞昱',
  },
  {
    category: '電子工業',
    stockNo: '2380',
    name: '虹光',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2380',
    name: '虹光',
  },
  {
    category: '電子工業',
    stockNo: '2381',
    name: '華宇',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2381',
    name: '華宇',
  },
  {
    category: '電子工業',
    stockNo: '2382',
    name: '廣達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2382',
    name: '廣達',
  },
  {
    category: '電子工業',
    stockNo: '2383',
    name: '台光電',
  },
  {
    category: '電子零組件業',
    stockNo: '2383',
    name: '台光電',
  },
  {
    category: '光電業',
    stockNo: '2384',
    name: '勝華',
  },
  {
    category: '電子工業',
    stockNo: '2384',
    name: '勝華',
  },
  {
    category: '電子工業',
    stockNo: '2385',
    name: '群光',
  },
  {
    category: '電子零組件業',
    stockNo: '2385',
    name: '群光',
  },
  {
    category: '電子工業',
    stockNo: '2387',
    name: '精元',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2387',
    name: '精元',
  },
  {
    category: '半導體業',
    stockNo: '2388',
    name: '威盛',
  },
  {
    category: '電子工業',
    stockNo: '2388',
    name: '威盛',
  },
  {
    category: '其他電子業',
    stockNo: '2390',
    name: '云辰',
  },
  {
    category: '電子工業',
    stockNo: '2390',
    name: '云辰',
  },
  {
    category: '通信網路業',
    stockNo: '2391',
    name: '合勤',
  },
  {
    category: '電子工業',
    stockNo: '2391',
    name: '合勤',
  },
  {
    category: '電子工業',
    stockNo: '2392',
    name: '正崴',
  },
  {
    category: '電子零組件業',
    stockNo: '2392',
    name: '正崴',
  },
  {
    category: '光電業',
    stockNo: '2393',
    name: '億光',
  },
  {
    category: '電子工業',
    stockNo: '2393',
    name: '億光',
  },
  {
    category: '電子工業',
    stockNo: '2395',
    name: '研華',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2395',
    name: '研華',
  },
  {
    category: '光電業',
    stockNo: '2396',
    name: '精碟',
  },
  {
    category: '電子工業',
    stockNo: '2396',
    name: '精碟',
  },
  {
    category: '電子工業',
    stockNo: '2397',
    name: '友通',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2397',
    name: '友通',
  },
  {
    category: '電子工業',
    stockNo: '2399',
    name: '映泰',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2399',
    name: '映泰',
  },
  {
    category: '半導體業',
    stockNo: '2401',
    name: '凌陽',
  },
  {
    category: '電子工業',
    stockNo: '2401',
    name: '凌陽',
  },
  {
    category: '電子工業',
    stockNo: '2402',
    name: '毅嘉',
  },
  {
    category: '電子零組件業',
    stockNo: '2402',
    name: '毅嘉',
  },
  {
    category: '電子工業',
    stockNo: '2403',
    name: '友尚',
  },
  {
    category: '電子通路業',
    stockNo: '2403',
    name: '友尚',
  },
  {
    category: '其他電子業',
    stockNo: '2404',
    name: '漢唐',
  },
  {
    category: '電子工業',
    stockNo: '2404',
    name: '漢唐',
  },
  {
    category: '電子工業',
    stockNo: '2405',
    name: '輔信',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2405',
    name: '輔信',
  },
  {
    category: '光電業',
    stockNo: '2406',
    name: '國碩',
  },
  {
    category: '電子工業',
    stockNo: '2406',
    name: '國碩',
  },
  {
    category: '半導體業',
    stockNo: '2408',
    name: '南亞科',
  },
  {
    category: '電子工業',
    stockNo: '2408',
    name: '南亞科',
  },
  {
    category: '光電業',
    stockNo: '2409',
    name: '友達',
  },
  {
    category: '電子工業',
    stockNo: '2409',
    name: '友達',
  },
  {
    category: '其他電子業',
    stockNo: '2411',
    name: '飛瑞',
  },
  {
    category: '電子工業',
    stockNo: '2411',
    name: '飛瑞',
  },
  {
    category: '通信網路業',
    stockNo: '2412',
    name: '中華電',
  },
  {
    category: '電子工業',
    stockNo: '2412',
    name: '中華電',
  },
  {
    category: '電子工業',
    stockNo: '2413',
    name: '環科',
  },
  {
    category: '電子零組件業',
    stockNo: '2413',
    name: '環科',
  },
  {
    category: '電子工業',
    stockNo: '2414',
    name: '精技',
  },
  {
    category: '電子通路業',
    stockNo: '2414',
    name: '精技',
  },
  {
    category: '電子工業',
    stockNo: '2415',
    name: '錩新',
  },
  {
    category: '電子零組件業',
    stockNo: '2415',
    name: '錩新',
  },
  {
    category: '電子工業',
    stockNo: '2417',
    name: '圓剛',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2417',
    name: '圓剛',
  },
  {
    category: '電子工業',
    stockNo: '2418',
    name: '雅新',
  },
  {
    category: '通信網路業',
    stockNo: '2419',
    name: '仲琦',
  },
  {
    category: '電子工業',
    stockNo: '2419',
    name: '仲琦',
  },
  {
    category: '電子工業',
    stockNo: '2420',
    name: '新巨',
  },
  {
    category: '電子零組件業',
    stockNo: '2420',
    name: '新巨',
  },
  {
    category: '電子工業',
    stockNo: '2421',
    name: '建準',
  },
  {
    category: '電子零組件業',
    stockNo: '2421',
    name: '建準',
  },
  {
    category: '其他電子業',
    stockNo: '2423',
    name: '固緯',
  },
  {
    category: '電子工業',
    stockNo: '2423',
    name: '固緯',
  },
  {
    category: '通信網路業',
    stockNo: '2424',
    name: '隴華',
  },
  {
    category: '電子工業',
    stockNo: '2424',
    name: '隴華',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2424',
    name: '隴華',
  },
  {
    category: '電子工業',
    stockNo: '2425',
    name: '承啟',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2425',
    name: '承啟',
  },
  {
    category: '光電業',
    stockNo: '2426',
    name: '鼎元',
  },
  {
    category: '電子工業',
    stockNo: '2426',
    name: '鼎元',
  },
  {
    category: '資訊服務業',
    stockNo: '2427',
    name: '三商電',
  },
  {
    category: '電子工業',
    stockNo: '2427',
    name: '三商電',
  },
  {
    category: '電子工業',
    stockNo: '2428',
    name: '興勤',
  },
  {
    category: '電子零組件業',
    stockNo: '2428',
    name: '興勤',
  },
  {
    category: '光電業',
    stockNo: '2429',
    name: '銘旺科',
  },
  {
    category: '電子工業',
    stockNo: '2429',
    name: '銘旺科',
  },
  {
    category: '電子零組件業',
    stockNo: '2429',
    name: '銘旺科',
  },
  {
    category: '電子工業',
    stockNo: '2430',
    name: '燦坤',
  },
  {
    category: '電子通路業',
    stockNo: '2430',
    name: '燦坤',
  },
  {
    category: '電子工業',
    stockNo: '2431',
    name: '聯昌',
  },
  {
    category: '電子零組件業',
    stockNo: '2431',
    name: '聯昌',
  },
  {
    category: '創新版股票',
    stockNo: '2432',
    name: '倚天酷碁-創',
  },
  {
    category: '通信網路業',
    stockNo: '2432',
    name: '倚天',
  },
  {
    category: '電子工業',
    stockNo: '2432',
    name: '倚天',
  },
  {
    category: '其他電子業',
    stockNo: '2433',
    name: '互盛電',
  },
  {
    category: '電子工業',
    stockNo: '2433',
    name: '互盛電',
  },
  {
    category: '半導體業',
    stockNo: '2434',
    name: '統懋',
  },
  {
    category: '電子工業',
    stockNo: '2434',
    name: '統懋',
  },
  {
    category: '半導體業',
    stockNo: '2436',
    name: '偉詮電',
  },
  {
    category: '電子工業',
    stockNo: '2436',
    name: '偉詮電',
  },
  {
    category: '電子工業',
    stockNo: '2437',
    name: '旺詮',
  },
  {
    category: '電子零組件業',
    stockNo: '2437',
    name: '旺詮',
  },
  {
    category: '光電業',
    stockNo: '2438',
    name: '翔耀',
  },
  {
    category: '電子工業',
    stockNo: '2438',
    name: '翔耀',
  },
  {
    category: '通信網路業',
    stockNo: '2439',
    name: '美律',
  },
  {
    category: '電子工業',
    stockNo: '2439',
    name: '美律',
  },
  {
    category: '電子工業',
    stockNo: '2440',
    name: '太空梭',
  },
  {
    category: '電子零組件業',
    stockNo: '2440',
    name: '太空梭',
  },
  {
    category: '半導體業',
    stockNo: '2441',
    name: '超豐',
  },
  {
    category: '電子工業',
    stockNo: '2441',
    name: '超豐',
  },
  {
    category: '建材營造',
    stockNo: '2442',
    name: '新美齊',
  },
  {
    category: '電子工業',
    stockNo: '2442',
    name: '新美齊',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2442',
    name: '新美齊',
  },
  {
    category: '其他',
    stockNo: '2443',
    name: '昶虹',
  },
  {
    category: '通信網路業',
    stockNo: '2444',
    name: '兆勁',
  },
  {
    category: '電子工業',
    stockNo: '2444',
    name: '兆勁',
  },
  {
    category: '半導體業',
    stockNo: '2446',
    name: '全懋',
  },
  {
    category: '電子工業',
    stockNo: '2446',
    name: '全懋',
  },
  {
    category: '資訊服務業',
    stockNo: '2447',
    name: '鼎新',
  },
  {
    category: '電子工業',
    stockNo: '2447',
    name: '鼎新',
  },
  {
    category: '光電業',
    stockNo: '2448',
    name: '晶電',
  },
  {
    category: '電子工業',
    stockNo: '2448',
    name: '晶電',
  },
  {
    category: '半導體業',
    stockNo: '2449',
    name: '京元電子',
  },
  {
    category: '電子工業',
    stockNo: '2449',
    name: '京元電子',
  },
  {
    category: '通信網路業',
    stockNo: '2450',
    name: '神腦',
  },
  {
    category: '電子工業',
    stockNo: '2450',
    name: '神腦',
  },
  {
    category: '半導體業',
    stockNo: '2451',
    name: '創見',
  },
  {
    category: '電子工業',
    stockNo: '2451',
    name: '創見',
  },
  {
    category: '電子工業',
    stockNo: '2452',
    name: '乾坤',
  },
  {
    category: '電子零組件業',
    stockNo: '2452',
    name: '乾坤',
  },
  {
    category: '資訊服務業',
    stockNo: '2453',
    name: '凌群',
  },
  {
    category: '電子工業',
    stockNo: '2453',
    name: '凌群',
  },
  {
    category: '半導體業',
    stockNo: '2454',
    name: '聯發科',
  },
  {
    category: '電子工業',
    stockNo: '2454',
    name: '聯發科',
  },
  {
    category: '通信網路業',
    stockNo: '2455',
    name: '全新',
  },
  {
    category: '電子工業',
    stockNo: '2455',
    name: '全新',
  },
  {
    category: '電子工業',
    stockNo: '2456',
    name: '奇力新',
  },
  {
    category: '電子零組件業',
    stockNo: '2456',
    name: '奇力新',
  },
  {
    category: '電子工業',
    stockNo: '2457',
    name: '飛宏',
  },
  {
    category: '電子零組件業',
    stockNo: '2457',
    name: '飛宏',
  },
  {
    category: '半導體業',
    stockNo: '2458',
    name: '義隆',
  },
  {
    category: '電子工業',
    stockNo: '2458',
    name: '義隆',
  },
  {
    category: '其他電子業',
    stockNo: '2459',
    name: '敦吉',
  },
  {
    category: '電子工業',
    stockNo: '2459',
    name: '敦吉',
  },
  {
    category: '電子通路業',
    stockNo: '2459',
    name: '敦吉',
  },
  {
    category: '電子工業',
    stockNo: '2460',
    name: '建通',
  },
  {
    category: '電子零組件業',
    stockNo: '2460',
    name: '建通',
  },
  {
    category: '其他電子業',
    stockNo: '2461',
    name: '光群雷',
  },
  {
    category: '電子工業',
    stockNo: '2461',
    name: '光群雷',
  },
  {
    category: '電子工業',
    stockNo: '2462',
    name: '良得電',
  },
  {
    category: '電子零組件業',
    stockNo: '2462',
    name: '良得電',
  },
  {
    category: '電子工業',
    stockNo: '2463',
    name: '研揚',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2463',
    name: '研揚',
  },
  {
    category: '其他電子業',
    stockNo: '2464',
    name: '盟立',
  },
  {
    category: '電子工業',
    stockNo: '2464',
    name: '盟立',
  },
  {
    category: '電子工業',
    stockNo: '2465',
    name: '麗臺',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2465',
    name: '麗臺',
  },
  {
    category: '光電業',
    stockNo: '2466',
    name: '冠西電',
  },
  {
    category: '電子工業',
    stockNo: '2466',
    name: '冠西電',
  },
  {
    category: '電子工業',
    stockNo: '2467',
    name: '志聖',
  },
  {
    category: '電子零組件業',
    stockNo: '2467',
    name: '志聖',
  },
  {
    category: '資訊服務業',
    stockNo: '2468',
    name: '華經',
  },
  {
    category: '電子工業',
    stockNo: '2468',
    name: '華經',
  },
  {
    category: '電子工業',
    stockNo: '2469',
    name: '力信',
  },
  {
    category: '電子零組件業',
    stockNo: '2469',
    name: '力信',
  },
  {
    category: '資訊服務業',
    stockNo: '2471',
    name: '資通',
  },
  {
    category: '電子工業',
    stockNo: '2471',
    name: '資通',
  },
  {
    category: '電子工業',
    stockNo: '2472',
    name: '立隆電',
  },
  {
    category: '電子零組件業',
    stockNo: '2472',
    name: '立隆電',
  },
  {
    category: '半導體業',
    stockNo: '2473',
    name: '思源',
  },
  {
    category: '電子工業',
    stockNo: '2473',
    name: '思源',
  },
  {
    category: '其他電子業',
    stockNo: '2474',
    name: '可成',
  },
  {
    category: '電子工業',
    stockNo: '2474',
    name: '可成',
  },
  {
    category: '光電業',
    stockNo: '2475',
    name: '華映',
  },
  {
    category: '電子工業',
    stockNo: '2475',
    name: '華映',
  },
  {
    category: '電子工業',
    stockNo: '2476',
    name: '鉅祥',
  },
  {
    category: '電子零組件業',
    stockNo: '2476',
    name: '鉅祥',
  },
  {
    category: '其他電子業',
    stockNo: '2477',
    name: '美隆電',
  },
  {
    category: '電子工業',
    stockNo: '2477',
    name: '美隆電',
  },
  {
    category: '電子工業',
    stockNo: '2478',
    name: '大毅',
  },
  {
    category: '電子零組件業',
    stockNo: '2478',
    name: '大毅',
  },
  {
    category: '電子工業',
    stockNo: '2479',
    name: '和立',
  },
  {
    category: '資訊服務業',
    stockNo: '2480',
    name: '敦陽科',
  },
  {
    category: '電子工業',
    stockNo: '2480',
    name: '敦陽科',
  },
  {
    category: '半導體業',
    stockNo: '2481',
    name: '強茂',
  },
  {
    category: '電子工業',
    stockNo: '2481',
    name: '強茂',
  },
  {
    category: '其他電子業',
    stockNo: '2482',
    name: '連宇',
  },
  {
    category: '電子工業',
    stockNo: '2482',
    name: '連宇',
  },
  {
    category: '電子工業',
    stockNo: '2483',
    name: '百容',
  },
  {
    category: '電子零組件業',
    stockNo: '2483',
    name: '百容',
  },
  {
    category: '電子工業',
    stockNo: '2484',
    name: '希華',
  },
  {
    category: '電子零組件業',
    stockNo: '2484',
    name: '希華',
  },
  {
    category: '通信網路業',
    stockNo: '2485',
    name: '兆赫',
  },
  {
    category: '電子工業',
    stockNo: '2485',
    name: '兆赫',
  },
  {
    category: '光電業',
    stockNo: '2486',
    name: '一詮',
  },
  {
    category: '電子工業',
    stockNo: '2486',
    name: '一詮',
  },
  {
    category: '其他電子業',
    stockNo: '2488',
    name: '漢平',
  },
  {
    category: '電子工業',
    stockNo: '2488',
    name: '漢平',
  },
  {
    category: '光電業',
    stockNo: '2489',
    name: '瑞軒',
  },
  {
    category: '電子工業',
    stockNo: '2489',
    name: '瑞軒',
  },
  {
    category: '光電業',
    stockNo: '2491',
    name: '吉祥全',
  },
  {
    category: '電子工業',
    stockNo: '2491',
    name: '吉祥全',
  },
  {
    category: '電子工業',
    stockNo: '2492',
    name: '華新科',
  },
  {
    category: '電子零組件業',
    stockNo: '2492',
    name: '華新科',
  },
  {
    category: '電子工業',
    stockNo: '2493',
    name: '揚博',
  },
  {
    category: '電子零組件業',
    stockNo: '2493',
    name: '揚博',
  },
  {
    category: '通信網路業',
    stockNo: '2494',
    name: '廣業科',
  },
  {
    category: '電子工業',
    stockNo: '2494',
    name: '廣業科',
  },
  {
    category: '其他電子業',
    stockNo: '2495',
    name: '普安',
  },
  {
    category: '電子工業',
    stockNo: '2495',
    name: '普安',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '2495',
    name: '普安',
  },
  {
    category: '其他',
    stockNo: '2496',
    name: '卓越',
  },
  {
    category: '汽車工業',
    stockNo: '2497',
    name: '怡利電',
  },
  {
    category: '通信網路業',
    stockNo: '2498',
    name: '宏達電',
  },
  {
    category: '電子工業',
    stockNo: '2498',
    name: '宏達電',
  },
  {
    category: '光電業',
    stockNo: '2499',
    name: '東貝',
  },
  {
    category: '電子工業',
    stockNo: '2499',
    name: '東貝',
  },
  {
    category: '建材營造',
    stockNo: '2501',
    name: '國建',
  },
  {
    category: '建材營造',
    stockNo: '2504',
    name: '國產',
  },
  {
    category: '建材營造',
    stockNo: '2505',
    name: '國揚',
  },
  {
    category: '建材營造',
    stockNo: '2506',
    name: '太設',
  },
  {
    category: '建材營造',
    stockNo: '2509',
    name: '全坤建',
  },
  {
    category: '建材營造',
    stockNo: '2511',
    name: '太子',
  },
  {
    category: '其他',
    stockNo: '2514',
    name: '龍邦',
  },
  {
    category: '建材營造',
    stockNo: '2515',
    name: '中工',
  },
  {
    category: '建材營造',
    stockNo: '2516',
    name: '新建',
  },
  {
    category: '建材營造',
    stockNo: '2520',
    name: '冠德',
  },
  {
    category: '建材營造',
    stockNo: '2524',
    name: '京城',
  },
  {
    category: '建材營造',
    stockNo: '2526',
    name: '大陸',
  },
  {
    category: '建材營造',
    stockNo: '2527',
    name: '宏璟',
  },
  {
    category: '建材營造',
    stockNo: '2528',
    name: '皇普',
  },
  {
    category: '建材營造',
    stockNo: '2530',
    name: '華建',
  },
  {
    category: '建材營造',
    stockNo: '2534',
    name: '宏盛',
  },
  {
    category: '建材營造',
    stockNo: '2535',
    name: '達欣工',
  },
  {
    category: '建材營造',
    stockNo: '2536',
    name: '宏普',
  },
  {
    category: '建材營造',
    stockNo: '2537',
    name: '聯上發',
  },
  {
    category: '建材營造',
    stockNo: '2538',
    name: '基泰',
  },
  {
    category: '建材營造',
    stockNo: '2539',
    name: '櫻花建',
  },
  {
    category: '建材營造',
    stockNo: '2540',
    name: '愛山林',
  },
  {
    category: '建材營造',
    stockNo: '2542',
    name: '興富發',
  },
  {
    category: '建材營造',
    stockNo: '2543',
    name: '皇昌',
  },
  {
    category: '建材營造',
    stockNo: '2545',
    name: '皇翔',
  },
  {
    category: '建材營造',
    stockNo: '2546',
    name: '根基',
  },
  {
    category: '建材營造',
    stockNo: '2547',
    name: '日勝生',
  },
  {
    category: '建材營造',
    stockNo: '2548',
    name: '華固',
  },
  {
    category: '建材營造',
    stockNo: '2596',
    name: '綠意',
  },
  {
    category: '建材營造',
    stockNo: '2597',
    name: '潤弘',
  },
  {
    category: '貿易百貨',
    stockNo: '2601',
    name: '益航',
  },
  {
    category: '航運業',
    stockNo: '2603',
    name: '長榮',
  },
  {
    category: '航運業',
    stockNo: '2605',
    name: '新興',
  },
  {
    category: '航運業',
    stockNo: '2606',
    name: '裕民',
  },
  {
    category: '航運業',
    stockNo: '2607',
    name: '榮運',
  },
  {
    category: '航運業',
    stockNo: '2608',
    name: '嘉里大榮',
  },
  {
    category: '航運業',
    stockNo: '2609',
    name: '陽明',
  },
  {
    category: '航運業',
    stockNo: '2610',
    name: '華航',
  },
  {
    category: '航運業',
    stockNo: '2611',
    name: '志信',
  },
  {
    category: '航運業',
    stockNo: '2612',
    name: '中航',
  },
  {
    category: '航運業',
    stockNo: '2613',
    name: '中櫃',
  },
  {
    category: '其他',
    stockNo: '2614',
    name: '東森',
  },
  {
    category: '貿易百貨',
    stockNo: '2614',
    name: '東森',
  },
  {
    category: '航運業',
    stockNo: '2615',
    name: '萬海',
  },
  {
    category: '油電燃氣業',
    stockNo: '2616',
    name: '山隆',
  },
  {
    category: '航運業',
    stockNo: '2617',
    name: '台航',
  },
  {
    category: '航運業',
    stockNo: '2618',
    name: '長榮航',
  },
  {
    category: '航運業',
    stockNo: '2630',
    name: '亞航',
  },
  {
    category: '航運業',
    stockNo: '2633',
    name: '台灣高鐵',
  },
  {
    category: '航運業',
    stockNo: '2634',
    name: '漢翔',
  },
  {
    category: '航運業',
    stockNo: '2636',
    name: '台驊投控',
  },
  {
    category: '航運業',
    stockNo: '2637',
    name: '慧洋-KY',
  },
  {
    category: '其他',
    stockNo: '2640',
    name: '大車隊',
  },
  {
    category: '數位雲端類',
    stockNo: '2640',
    name: '大車隊',
  },
  {
    category: '航運業',
    stockNo: '2641',
    name: '正德',
  },
  {
    category: '航運業',
    stockNo: '2642',
    name: '宅配通',
  },
  {
    category: '航運業',
    stockNo: '2643',
    name: '捷迅',
  },
  {
    category: '航運業',
    stockNo: '2644',
    name: '中信造船',
  },
  {
    category: '航運業',
    stockNo: '2645',
    name: '長榮航太',
  },
  {
    category: '航運業',
    stockNo: '2646',
    name: '星宇航空',
  },
  {
    category: '觀光事業',
    stockNo: '2701',
    name: '萬企',
  },
  {
    category: '觀光餐旅',
    stockNo: '2701',
    name: '萬企',
  },
  {
    category: '觀光事業',
    stockNo: '2702',
    name: '華園',
  },
  {
    category: '觀光餐旅',
    stockNo: '2702',
    name: '華園',
  },
  {
    category: '觀光事業',
    stockNo: '2704',
    name: '國賓',
  },
  {
    category: '觀光餐旅',
    stockNo: '2704',
    name: '國賓',
  },
  {
    category: '觀光事業',
    stockNo: '2705',
    name: '六福',
  },
  {
    category: '觀光餐旅',
    stockNo: '2705',
    name: '六福',
  },
  {
    category: '觀光事業',
    stockNo: '2706',
    name: '第一店',
  },
  {
    category: '觀光餐旅',
    stockNo: '2706',
    name: '第一店',
  },
  {
    category: '觀光事業',
    stockNo: '2707',
    name: '晶華',
  },
  {
    category: '觀光餐旅',
    stockNo: '2707',
    name: '晶華',
  },
  {
    category: '觀光事業',
    stockNo: '2712',
    name: '遠雄來',
  },
  {
    category: '觀光餐旅',
    stockNo: '2712',
    name: '遠雄來',
  },
  {
    category: '建材營造',
    stockNo: '2718',
    name: '晶悅',
  },
  {
    category: '觀光事業',
    stockNo: '2718',
    name: '晶悅',
  },
  {
    category: '觀光餐旅',
    stockNo: '2718',
    name: '晶悅',
  },
  {
    category: '觀光事業',
    stockNo: '2719',
    name: '燦星旅',
  },
  {
    category: '觀光餐旅',
    stockNo: '2719',
    name: '燦星旅',
  },
  {
    category: '觀光事業',
    stockNo: '2722',
    name: '夏都',
  },
  {
    category: '觀光餐旅',
    stockNo: '2722',
    name: '夏都',
  },
  {
    category: '觀光事業',
    stockNo: '2723',
    name: '美食-KY',
  },
  {
    category: '觀光餐旅',
    stockNo: '2723',
    name: '美食-KY',
  },
  {
    category: '觀光事業',
    stockNo: '2724',
    name: '富驛-KY',
  },
  {
    category: '觀光餐旅',
    stockNo: '2724',
    name: '藝舍-KY',
  },
  {
    category: '觀光事業',
    stockNo: '2726',
    name: '雅茗-KY',
  },
  {
    category: '觀光餐旅',
    stockNo: '2726',
    name: '雅茗-KY',
  },
  {
    category: '觀光事業',
    stockNo: '2727',
    name: '王品',
  },
  {
    category: '觀光餐旅',
    stockNo: '2727',
    name: '王品',
  },
  {
    category: '觀光事業',
    stockNo: '2729',
    name: '瓦城',
  },
  {
    category: '觀光餐旅',
    stockNo: '2729',
    name: '瓦城',
  },
  {
    category: '觀光事業',
    stockNo: '2731',
    name: '雄獅',
  },
  {
    category: '觀光餐旅',
    stockNo: '2731',
    name: '雄獅',
  },
  {
    category: '觀光事業',
    stockNo: '2732',
    name: '六角',
  },
  {
    category: '觀光餐旅',
    stockNo: '2732',
    name: '六角',
  },
  {
    category: '觀光餐旅',
    stockNo: '2733',
    name: '維格餅家',
  },
  {
    category: '觀光事業',
    stockNo: '2734',
    name: '易飛網',
  },
  {
    category: '觀光餐旅',
    stockNo: '2734',
    name: '易飛網',
  },
  {
    category: '觀光事業',
    stockNo: '2736',
    name: '富野',
  },
  {
    category: '觀光餐旅',
    stockNo: '2736',
    name: '富野',
  },
  {
    category: '觀光事業',
    stockNo: '2739',
    name: '寒舍',
  },
  {
    category: '觀光餐旅',
    stockNo: '2739',
    name: '寒舍',
  },
  {
    category: '觀光事業',
    stockNo: '2740',
    name: '天蔥',
  },
  {
    category: '觀光餐旅',
    stockNo: '2740',
    name: '天蔥',
  },
  {
    category: '觀光餐旅',
    stockNo: '2741',
    name: '老四川',
  },
  {
    category: '觀光事業',
    stockNo: '2743',
    name: '山富',
  },
  {
    category: '觀光餐旅',
    stockNo: '2743',
    name: '山富',
  },
  {
    category: '觀光事業',
    stockNo: '2745',
    name: '五福',
  },
  {
    category: '觀光餐旅',
    stockNo: '2745',
    name: '五福',
  },
  {
    category: '觀光事業',
    stockNo: '2748',
    name: '雲品',
  },
  {
    category: '觀光餐旅',
    stockNo: '2748',
    name: '雲品',
  },
  {
    category: '觀光餐旅',
    stockNo: '2750',
    name: '桃禧',
  },
  {
    category: '觀光餐旅',
    stockNo: '2751',
    name: '王座',
  },
  {
    category: '觀光事業',
    stockNo: '2752',
    name: '豆府',
  },
  {
    category: '觀光餐旅',
    stockNo: '2752',
    name: '豆府',
  },
  {
    category: '觀光事業',
    stockNo: '2753',
    name: '八方雲集',
  },
  {
    category: '觀光餐旅',
    stockNo: '2753',
    name: '八方雲集',
  },
  {
    category: '觀光事業',
    stockNo: '2754',
    name: '亞洲藏壽司',
  },
  {
    category: '觀光餐旅',
    stockNo: '2754',
    name: '亞洲藏壽司',
  },
  {
    category: '觀光事業',
    stockNo: '2755',
    name: '揚秦',
  },
  {
    category: '觀光餐旅',
    stockNo: '2755',
    name: '揚秦',
  },
  {
    category: '觀光事業',
    stockNo: '2756',
    name: '聯發國際',
  },
  {
    category: '觀光餐旅',
    stockNo: '2756',
    name: '聯發國際',
  },
  {
    category: '觀光餐旅',
    stockNo: '2758',
    name: '路易莎咖啡',
  },
  {
    category: '觀光餐旅',
    stockNo: '2760',
    name: '巨宇翔',
  },
  {
    category: '觀光餐旅',
    stockNo: '2761',
    name: '橘焱胡同',
  },
  {
    category: '運動休閒',
    stockNo: '2762',
    name: '世界健身-KY',
  },
  {
    category: '金融保險',
    stockNo: '2801',
    name: '彰銀',
  },
  {
    category: '金融保險',
    stockNo: '2807',
    name: '竹商銀',
  },
  {
    category: '金融保險',
    stockNo: '2809',
    name: '京城銀',
  },
  {
    category: '金融保險',
    stockNo: '2812',
    name: '台中銀',
  },
  {
    category: '金融保險',
    stockNo: '2816',
    name: '旺旺保',
  },
  {
    category: '金融保險',
    stockNo: '2820',
    name: '華票',
  },
  {
    category: '金融保險',
    stockNo: '2823',
    name: '中壽',
  },
  {
    category: '金融保險',
    stockNo: '2827',
    name: '中聯',
  },
  {
    category: '金融保險',
    stockNo: '2831',
    name: '中華銀',
  },
  {
    category: '金融保險',
    stockNo: '2832',
    name: '台產',
  },
  {
    category: '金融保險',
    stockNo: '2833',
    name: '台壽保',
  },
  {
    category: '金融保險',
    stockNo: '2833A',
    name: '台壽甲',
  },
  {
    category: '金融保險',
    stockNo: '2834',
    name: '臺企銀',
  },
  {
    category: '金融保險',
    stockNo: '2836',
    name: '高雄銀',
  },
  {
    category: '金融保險',
    stockNo: '2836A',
    name: '高雄銀甲特',
  },
  {
    category: '金融保險',
    stockNo: '2837',
    name: '萬泰銀',
  },
  {
    category: '金融保險',
    stockNo: '2838',
    name: '聯邦銀',
  },
  {
    category: '金融保險',
    stockNo: '2838A',
    name: '聯邦銀甲特',
  },
  {
    category: '建材營造',
    stockNo: '2841',
    name: '台開',
  },
  {
    category: '金融保險',
    stockNo: '2845',
    name: '遠東銀',
  },
  {
    category: '金融保險',
    stockNo: '2847',
    name: '大眾銀',
  },
  {
    category: '金融保險',
    stockNo: '2849',
    name: '安泰銀',
  },
  {
    category: '金融保險',
    stockNo: '2850',
    name: '新產',
  },
  {
    category: '金融保險',
    stockNo: '2851',
    name: '中再保',
  },
  {
    category: '金融保險',
    stockNo: '2852',
    name: '第一保',
  },
  {
    category: '金融保險',
    stockNo: '2854',
    name: '寶來證',
  },
  {
    category: '金融保險',
    stockNo: '2855',
    name: '統一證',
  },
  {
    category: '金融保險',
    stockNo: '2856',
    name: '元富證',
  },
  {
    category: '金融保險',
    stockNo: '2867',
    name: '三商壽',
  },
  {
    category: '金融保險',
    stockNo: '2880',
    name: '華南金',
  },
  {
    category: '金融保險',
    stockNo: '2881',
    name: '富邦金',
  },
  {
    category: '金融保險',
    stockNo: '2881A',
    name: '富邦特',
  },
  {
    category: '金融保險',
    stockNo: '2881B',
    name: '富邦金乙特',
  },
  {
    category: '金融保險',
    stockNo: '2881C',
    name: '富邦金丙特',
  },
  {
    category: '金融保險',
    stockNo: '2882',
    name: '國泰金',
  },
  {
    category: '金融保險',
    stockNo: '2882A',
    name: '國泰特',
  },
  {
    category: '金融保險',
    stockNo: '2882B',
    name: '國泰金乙特',
  },
  {
    category: '金融保險',
    stockNo: '2883',
    name: '開發金',
  },
  {
    category: '金融保險',
    stockNo: '2883A',
    name: '開發特',
  },
  {
    category: '金融保險',
    stockNo: '2883B',
    name: '開發金乙特',
  },
  {
    category: '金融保險',
    stockNo: '2884',
    name: '玉山金',
  },
  {
    category: '金融保險',
    stockNo: '2885',
    name: '元大金',
  },
  {
    category: '金融保險',
    stockNo: '2886',
    name: '兆豐金',
  },
  {
    category: '金融保險',
    stockNo: '2887',
    name: '台新金',
  },
  {
    category: '金融保險',
    stockNo: '2887C',
    name: '新丙特',
  },
  {
    category: '金融保險',
    stockNo: '2887E',
    name: '台新戊特',
  },
  {
    category: '金融保險',
    stockNo: '2887F',
    name: '台新戊特二',
  },
  {
    category: '金融保險',
    stockNo: '2887Z1',
    name: '台新己特',
  },
  {
    category: '金融保險',
    stockNo: '2888',
    name: '新光金',
  },
  {
    category: '金融保險',
    stockNo: '2888A',
    name: '新光金甲特',
  },
  {
    category: '金融保險',
    stockNo: '2888B',
    name: '新光金乙特',
  },
  {
    category: '金融保險',
    stockNo: '2889',
    name: '國票金',
  },
  {
    category: '金融保險',
    stockNo: '2890',
    name: '永豐金',
  },
  {
    category: '金融保險',
    stockNo: '2891',
    name: '中信金',
  },
  {
    category: '金融保險',
    stockNo: '2891A',
    name: '中信特',
  },
  {
    category: '金融保險',
    stockNo: '2891B',
    name: '中信金乙特',
  },
  {
    category: '金融保險',
    stockNo: '2891C',
    name: '中信金丙特',
  },
  {
    category: '金融保險',
    stockNo: '2892',
    name: '第一金',
  },
  {
    category: '金融保險',
    stockNo: '2897',
    name: '王道銀行',
  },
  {
    category: '金融保險',
    stockNo: '2897A',
    name: '王道銀甲特',
  },
  {
    category: '貿易百貨',
    stockNo: '2901',
    name: '欣欣',
  },
  {
    category: '貿易百貨',
    stockNo: '2903',
    name: '遠百',
  },
  {
    category: '其他',
    stockNo: '2904',
    name: '匯僑',
  },
  {
    category: '貿易百貨',
    stockNo: '2905',
    name: '三商',
  },
  {
    category: '貿易百貨',
    stockNo: '2906',
    name: '高林',
  },
  {
    category: '貿易百貨',
    stockNo: '2908',
    name: '特力',
  },
  {
    category: '貿易百貨',
    stockNo: '2910',
    name: '統領',
  },
  {
    category: '貿易百貨',
    stockNo: '2911',
    name: '麗嬰房',
  },
  {
    category: '貿易百貨',
    stockNo: '2912',
    name: '統一超',
  },
  {
    category: '貿易百貨',
    stockNo: '2913',
    name: '農林',
  },
  {
    category: '貿易百貨',
    stockNo: '2915',
    name: '潤泰全',
  },
  {
    category: '居家生活類',
    stockNo: '2916',
    name: '滿心',
  },
  {
    category: '貿易百貨',
    stockNo: '2916',
    name: '滿心',
  },
  {
    category: '建材營造',
    stockNo: '2923',
    name: '鼎固-KY',
  },
  {
    category: '居家生活類',
    stockNo: '2924',
    name: '宏太-KY',
  },
  {
    category: '貿易百貨',
    stockNo: '2924',
    name: '宏太-KY',
  },
  {
    category: '文化創意業',
    stockNo: '2926',
    name: '誠品生活',
  },
  {
    category: '觀光事業',
    stockNo: '2928',
    name: '紅馬-KY',
  },
  {
    category: '貿易百貨',
    stockNo: '2929',
    name: '淘帝-KY',
  },
  {
    category: '貿易百貨',
    stockNo: '2936',
    name: '客思達-KY',
  },
  {
    category: '居家生活類',
    stockNo: '2937',
    name: '集雅社',
  },
  {
    category: '貿易百貨',
    stockNo: '2937',
    name: '集雅社',
  },
  {
    category: '居家生活',
    stockNo: '2938',
    name: '床的世界',
  },
  {
    category: '貿易百貨',
    stockNo: '2939',
    name: '凱羿-KY',
  },
  {
    category: '居家生活類',
    stockNo: '2941',
    name: '米斯特',
  },
  {
    category: '居家生活',
    stockNo: '2942',
    name: '京站',
  },
  {
    category: '貿易百貨',
    stockNo: '2945',
    name: '三商家購',
  },
  {
    category: '居家生活類',
    stockNo: '2947',
    name: '振宇五金',
  },
  {
    category: '貿易百貨',
    stockNo: '2947',
    name: '振宇五金',
  },
  {
    category: '居家生活類',
    stockNo: '2948',
    name: '寶陞',
  },
  {
    category: '數位雲端類',
    stockNo: '2949',
    name: '欣新網',
  },
  {
    category: '電子工業',
    stockNo: '3002',
    name: '歐格',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3002',
    name: '歐格',
  },
  {
    category: '電子工業',
    stockNo: '3003',
    name: '健和興',
  },
  {
    category: '電子零組件業',
    stockNo: '3003',
    name: '健和興',
  },
  {
    category: '鋼鐵工業',
    stockNo: '3004',
    name: '豐達科',
  },
  {
    category: '電子工業',
    stockNo: '3005',
    name: '神基',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3005',
    name: '神基',
  },
  {
    category: '半導體業',
    stockNo: '3006',
    name: '晶豪科',
  },
  {
    category: '電子工業',
    stockNo: '3006',
    name: '晶豪科',
  },
  {
    category: '電子工業',
    stockNo: '3007',
    name: '綠點',
  },
  {
    category: '光電業',
    stockNo: '3008',
    name: '大立光',
  },
  {
    category: '電子工業',
    stockNo: '3008',
    name: '大立光',
  },
  {
    category: '光電業',
    stockNo: '3009',
    name: '奇美電',
  },
  {
    category: '電子工業',
    stockNo: '3009',
    name: '奇美電',
  },
  {
    category: '電子工業',
    stockNo: '3010',
    name: '華立',
  },
  {
    category: '電子通路業',
    stockNo: '3010',
    name: '華立',
  },
  {
    category: '電子工業',
    stockNo: '3011',
    name: '今皓',
  },
  {
    category: '電子零組件業',
    stockNo: '3011',
    name: '今皓',
  },
  {
    category: '電子工業',
    stockNo: '3013',
    name: '晟銘電',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3013',
    name: '晟銘電',
  },
  {
    category: '半導體業',
    stockNo: '3014',
    name: '聯陽',
  },
  {
    category: '電子工業',
    stockNo: '3014',
    name: '聯陽',
  },
  {
    category: '電子工業',
    stockNo: '3015',
    name: '全漢',
  },
  {
    category: '電子零組件業',
    stockNo: '3015',
    name: '全漢',
  },
  {
    category: '半導體業',
    stockNo: '3016',
    name: '嘉晶',
  },
  {
    category: '電子工業',
    stockNo: '3016',
    name: '嘉晶',
  },
  {
    category: '電子工業',
    stockNo: '3017',
    name: '奇鋐',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3017',
    name: '奇鋐',
  },
  {
    category: '其他電子業',
    stockNo: '3018',
    name: '隆銘綠能',
  },
  {
    category: '電子工業',
    stockNo: '3018',
    name: '隆銘綠能',
  },
  {
    category: '光電業',
    stockNo: '3019',
    name: '亞光',
  },
  {
    category: '電子工業',
    stockNo: '3019',
    name: '亞光',
  },
  {
    category: '電子工業',
    stockNo: '3020',
    name: '奇普仕',
  },
  {
    category: '電子通路業',
    stockNo: '3020',
    name: '奇普仕',
  },
  {
    category: '電子工業',
    stockNo: '3021',
    name: '鴻名',
  },
  {
    category: '電子零組件業',
    stockNo: '3021',
    name: '鴻名',
  },
  {
    category: '電子工業',
    stockNo: '3022',
    name: '威強電',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3022',
    name: '威強電',
  },
  {
    category: '電子工業',
    stockNo: '3023',
    name: '信邦',
  },
  {
    category: '電子零組件業',
    stockNo: '3023',
    name: '信邦',
  },
  {
    category: '光電業',
    stockNo: '3024',
    name: '憶聲',
  },
  {
    category: '電子工業',
    stockNo: '3024',
    name: '憶聲',
  },
  {
    category: '通信網路業',
    stockNo: '3025',
    name: '星通',
  },
  {
    category: '電子工業',
    stockNo: '3025',
    name: '星通',
  },
  {
    category: '電子工業',
    stockNo: '3026',
    name: '禾伸堂',
  },
  {
    category: '電子零組件業',
    stockNo: '3026',
    name: '禾伸堂',
  },
  {
    category: '通信網路業',
    stockNo: '3027',
    name: '盛達',
  },
  {
    category: '電子工業',
    stockNo: '3027',
    name: '盛達',
  },
  {
    category: '電子工業',
    stockNo: '3028',
    name: '增你強',
  },
  {
    category: '電子通路業',
    stockNo: '3028',
    name: '增你強',
  },
  {
    category: '資訊服務業',
    stockNo: '3029',
    name: '零壹',
  },
  {
    category: '電子工業',
    stockNo: '3029',
    name: '零壹',
  },
  {
    category: '其他電子業',
    stockNo: '3030',
    name: '德律',
  },
  {
    category: '電子工業',
    stockNo: '3030',
    name: '德律',
  },
  {
    category: '光電業',
    stockNo: '3031',
    name: '佰鴻',
  },
  {
    category: '電子工業',
    stockNo: '3031',
    name: '佰鴻',
  },
  {
    category: '電子工業',
    stockNo: '3032',
    name: '偉訓',
  },
  {
    category: '電子零組件業',
    stockNo: '3032',
    name: '偉訓',
  },
  {
    category: '電子工業',
    stockNo: '3033',
    name: '威健',
  },
  {
    category: '電子通路業',
    stockNo: '3033',
    name: '威健',
  },
  {
    category: '半導體業',
    stockNo: '3034',
    name: '聯詠',
  },
  {
    category: '電子工業',
    stockNo: '3034',
    name: '聯詠',
  },
  {
    category: '半導體業',
    stockNo: '3035',
    name: '智原',
  },
  {
    category: '電子工業',
    stockNo: '3035',
    name: '智原',
  },
  {
    category: '電子工業',
    stockNo: '3036',
    name: '文曄',
  },
  {
    category: '電子通路業',
    stockNo: '3036',
    name: '文曄',
  },
  {
    category: '電子工業',
    stockNo: '3036A',
    name: '文曄甲特',
  },
  {
    category: '電子通路業',
    stockNo: '3036A',
    name: '文曄甲特',
  },
  {
    category: '電子工業',
    stockNo: '3037',
    name: '欣興',
  },
  {
    category: '電子零組件業',
    stockNo: '3037',
    name: '欣興',
  },
  {
    category: '光電業',
    stockNo: '3038',
    name: '全台',
  },
  {
    category: '電子工業',
    stockNo: '3038',
    name: '全台',
  },
  {
    category: '其他',
    stockNo: '3040',
    name: '遠見',
  },
  {
    category: '半導體業',
    stockNo: '3041',
    name: '揚智',
  },
  {
    category: '電子工業',
    stockNo: '3041',
    name: '揚智',
  },
  {
    category: '電子工業',
    stockNo: '3042',
    name: '晶技',
  },
  {
    category: '電子零組件業',
    stockNo: '3042',
    name: '晶技',
  },
  {
    category: '其他電子業',
    stockNo: '3043',
    name: '科風',
  },
  {
    category: '電子工業',
    stockNo: '3043',
    name: '科風',
  },
  {
    category: '電子工業',
    stockNo: '3044',
    name: '健鼎',
  },
  {
    category: '電子零組件業',
    stockNo: '3044',
    name: '健鼎',
  },
  {
    category: '通信網路業',
    stockNo: '3045',
    name: '台灣大',
  },
  {
    category: '電子工業',
    stockNo: '3045',
    name: '台灣大',
  },
  {
    category: '電子工業',
    stockNo: '3046',
    name: '建碁',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3046',
    name: '建碁',
  },
  {
    category: '通信網路業',
    stockNo: '3047',
    name: '訊舟',
  },
  {
    category: '電子工業',
    stockNo: '3047',
    name: '訊舟',
  },
  {
    category: '電子工業',
    stockNo: '3048',
    name: '益登',
  },
  {
    category: '電子通路業',
    stockNo: '3048',
    name: '益登',
  },
  {
    category: '光電業',
    stockNo: '3049',
    name: '精金',
  },
  {
    category: '電子工業',
    stockNo: '3049',
    name: '精金',
  },
  {
    category: '光電業',
    stockNo: '3050',
    name: '鈺德',
  },
  {
    category: '電子工業',
    stockNo: '3050',
    name: '鈺德',
  },
  {
    category: '光電業',
    stockNo: '3051',
    name: '力特',
  },
  {
    category: '電子工業',
    stockNo: '3051',
    name: '力特',
  },
  {
    category: '建材營造',
    stockNo: '3052',
    name: '夆典',
  },
  {
    category: '其他電子業',
    stockNo: '3053',
    name: '鼎營',
  },
  {
    category: '電子工業',
    stockNo: '3053',
    name: '鼎營',
  },
  {
    category: '半導體業',
    stockNo: '3054',
    name: '立萬利',
  },
  {
    category: '電子工業',
    stockNo: '3054',
    name: '立萬利',
  },
  {
    category: '食品工業',
    stockNo: '3054',
    name: '立萬利',
  },
  {
    category: '電子工業',
    stockNo: '3055',
    name: '蔚華科',
  },
  {
    category: '電子通路業',
    stockNo: '3055',
    name: '蔚華科',
  },
  {
    category: '建材營造',
    stockNo: '3056',
    name: '富華新',
  },
  {
    category: '電子工業',
    stockNo: '3057',
    name: '喬鼎',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3057',
    name: '喬鼎',
  },
  {
    category: '電子工業',
    stockNo: '3058',
    name: '立德',
  },
  {
    category: '電子零組件業',
    stockNo: '3058',
    name: '立德',
  },
  {
    category: '光電業',
    stockNo: '3059',
    name: '華晶科',
  },
  {
    category: '電子工業',
    stockNo: '3059',
    name: '華晶科',
  },
  {
    category: '電子工業',
    stockNo: '3060',
    name: '銘異',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3060',
    name: '銘異',
  },
  {
    category: '光電業',
    stockNo: '3061',
    name: '璨圓',
  },
  {
    category: '電子工業',
    stockNo: '3061',
    name: '璨圓',
  },
  {
    category: '通信網路業',
    stockNo: '3062',
    name: '建漢',
  },
  {
    category: '電子工業',
    stockNo: '3062',
    name: '建漢',
  },
  {
    category: '半導體業',
    stockNo: '3063',
    name: '飛信',
  },
  {
    category: '電子工業',
    stockNo: '3063',
    name: '飛信',
  },
  {
    category: '文化創意業',
    stockNo: '3064',
    name: '泰偉',
  },
  {
    category: '光電業',
    stockNo: '3066',
    name: '李洲',
  },
  {
    category: '其他電子類',
    stockNo: '3067',
    name: '全域',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3071',
    name: '協禧',
  },
  {
    category: '半導體業',
    stockNo: '3073',
    name: '天方能源',
  },
  {
    category: '綠能環保類',
    stockNo: '3073',
    name: '天方能源',
  },
  {
    category: '電子零組件業',
    stockNo: '3078',
    name: '僑威',
  },
  {
    category: '光電業',
    stockNo: '3080',
    name: '威力盟',
  },
  {
    category: '電子工業',
    stockNo: '3080',
    name: '威力盟',
  },
  {
    category: '通信網路業',
    stockNo: '3081',
    name: '聯亞',
  },
  {
    category: '文化創意業',
    stockNo: '3083',
    name: '網龍',
  },
  {
    category: '數位雲端類',
    stockNo: '3085',
    name: '新零售',
  },
  {
    category: '電子商務業',
    stockNo: '3085',
    name: '新零售',
  },
  {
    category: '文化創意業',
    stockNo: '3086',
    name: '華義',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3088',
    name: '艾訊',
  },
  {
    category: '電子零組件業',
    stockNo: '3089',
    name: '億杰',
  },
  {
    category: '電子工業',
    stockNo: '3090',
    name: '日電貿',
  },
  {
    category: '電子零組件業',
    stockNo: '3090',
    name: '日電貿',
  },
  {
    category: '電子工業',
    stockNo: '3092',
    name: '鴻碩',
  },
  {
    category: '電子零組件業',
    stockNo: '3092',
    name: '鴻碩',
  },
  {
    category: '電子零組件業',
    stockNo: '3092',
    name: '鴻碩',
  },
  {
    category: '其他電子類',
    stockNo: '3093',
    name: '港建*',
  },
  {
    category: '半導體業',
    stockNo: '3094',
    name: '聯傑',
  },
  {
    category: '電子工業',
    stockNo: '3094',
    name: '聯傑',
  },
  {
    category: '通信網路業',
    stockNo: '3095',
    name: '及成',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3097',
    name: '拍檔',
  },
  {
    category: '半導體業',
    stockNo: '3105',
    name: '穩懋',
  },
  {
    category: '電子零組件業',
    stockNo: '3114',
    name: '好德',
  },
  {
    category: '電子零組件業',
    stockNo: '3115',
    name: '富榮綱',
  },
  {
    category: '電子零組件業',
    stockNo: '3117',
    name: '年程',
  },
  {
    category: '生技醫療業',
    stockNo: '3118',
    name: '進階',
  },
  {
    category: '半導體業',
    stockNo: '3122',
    name: '笙泉',
  },
  {
    category: '光電業',
    stockNo: '3128',
    name: '昇銳',
  },
  {
    category: '數位雲端',
    stockNo: '3130',
    name: '一零四',
  },
  {
    category: '資訊服務業',
    stockNo: '3130',
    name: '一零四',
  },
  {
    category: '電子工業',
    stockNo: '3130',
    name: '一零四',
  },
  {
    category: '其他電子類',
    stockNo: '3131',
    name: '弘塑',
  },
  {
    category: '半導體業',
    stockNo: '3135',
    name: '凌航',
  },
  {
    category: '通信網路業',
    stockNo: '3138',
    name: '耀登',
  },
  {
    category: '電子工業',
    stockNo: '3138',
    name: '耀登',
  },
  {
    category: '半導體業',
    stockNo: '3141',
    name: '晶宏',
  },
  {
    category: '電子工業',
    stockNo: '3142',
    name: '遠茂',
  },
  {
    category: '電子零組件業',
    stockNo: '3144',
    name: '新揚科',
  },
  {
    category: '資訊服務業',
    stockNo: '3147',
    name: '大綜',
  },
  {
    category: '光電業',
    stockNo: '3149',
    name: '正達',
  },
  {
    category: '電子工業',
    stockNo: '3149',
    name: '正達',
  },
  {
    category: '半導體業',
    stockNo: '3150',
    name: '鈺寶',
  },
  {
    category: '通信網路業',
    stockNo: '3152',
    name: '璟德',
  },
  {
    category: '資訊服務業',
    stockNo: '3158',
    name: '嘉實',
  },
  {
    category: '電機機械',
    stockNo: '3162',
    name: '精確',
  },
  {
    category: '通信網路業',
    stockNo: '3163',
    name: '波若威',
  },
  {
    category: '化學生技醫療',
    stockNo: '3164',
    name: '景岳',
  },
  {
    category: '生技醫療業',
    stockNo: '3164',
    name: '景岳',
  },
  {
    category: '電機機械',
    stockNo: '3167',
    name: '大量',
  },
  {
    category: '光電業',
    stockNo: '3168',
    name: '眾福科',
  },
  {
    category: '電子工業',
    stockNo: '3168',
    name: '眾福科',
  },
  {
    category: '半導體業',
    stockNo: '3169',
    name: '亞信',
  },
  {
    category: '居家生活類',
    stockNo: '3171',
    name: '新洲',
  },
  {
    category: '貿易百貨',
    stockNo: '3171',
    name: '新洲',
  },
  {
    category: '生技醫療業',
    stockNo: '3176',
    name: '基亞',
  },
  {
    category: '半導體業',
    stockNo: '3178',
    name: '公準',
  },
  {
    category: '電機機械',
    stockNo: '3178',
    name: '公準',
  },
  {
    category: '生技醫療業',
    stockNo: '3184',
    name: '微邦',
  },
  {
    category: '建材營造',
    stockNo: '3188',
    name: '鑫龍騰',
  },
  {
    category: '半導體業',
    stockNo: '3189',
    name: '景碩',
  },
  {
    category: '電子工業',
    stockNo: '3189',
    name: '景碩',
  },
  {
    category: '電子零組件業',
    stockNo: '3191',
    name: '雲嘉南',
  },
  {
    category: '電子零組件業',
    stockNo: '3202',
    name: '樺晟',
  },
  {
    category: '生技醫療業',
    stockNo: '3205',
    name: '佰研',
  },
  {
    category: '電子零組件業',
    stockNo: '3206',
    name: '志豐',
  },
  {
    category: '電子零組件業',
    stockNo: '3207',
    name: '耀勝',
  },
  {
    category: '電子工業',
    stockNo: '3209',
    name: '全科',
  },
  {
    category: '電子通路業',
    stockNo: '3209',
    name: '全科',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3211',
    name: '順達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3213',
    name: '茂訊',
  },
  {
    category: '電子工業',
    stockNo: '3214',
    name: '元砷',
  },
  {
    category: '電子零組件業',
    stockNo: '3217',
    name: '優群',
  },
  {
    category: '生技醫療業',
    stockNo: '3218',
    name: '大學光',
  },
  {
    category: '其他電子類',
    stockNo: '3219',
    name: '倚強科',
  },
  {
    category: '半導體業',
    stockNo: '3219',
    name: '倚強股份',
  },
  {
    category: '通信網路業',
    stockNo: '3221',
    name: '台嘉碩',
  },
  {
    category: '電子通路業',
    stockNo: '3224',
    name: '三顧',
  },
  {
    category: '電機機械',
    stockNo: '3226',
    name: '至寶電',
  },
  {
    category: '半導體業',
    stockNo: '3227',
    name: '原相',
  },
  {
    category: '半導體業',
    stockNo: '3228',
    name: '金麗科',
  },
  {
    category: '電子工業',
    stockNo: '3229',
    name: '晟鈦',
  },
  {
    category: '電子零組件業',
    stockNo: '3229',
    name: '晟鈦',
  },
  {
    category: '光電業',
    stockNo: '3230',
    name: '錦明',
  },
  {
    category: '電子工業',
    stockNo: '3231',
    name: '緯創',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3231',
    name: '緯創',
  },
  {
    category: '電子通路業',
    stockNo: '3232',
    name: '昱捷',
  },
  {
    category: '通信網路業',
    stockNo: '3234',
    name: '光環',
  },
  {
    category: '電子零組件業',
    stockNo: '3236',
    name: '千如',
  },
  {
    category: '觀光事業',
    stockNo: '3252',
    name: '海灣',
  },
  {
    category: '觀光餐旅',
    stockNo: '3252',
    name: '海灣',
  },
  {
    category: '半導體業',
    stockNo: '3257',
    name: '虹冠電',
  },
  {
    category: '電子工業',
    stockNo: '3257',
    name: '虹冠電',
  },
  {
    category: '半導體業',
    stockNo: '3259',
    name: '鑫創',
  },
  {
    category: '半導體業',
    stockNo: '3260',
    name: '威剛',
  },
  {
    category: '半導體業',
    stockNo: '3264',
    name: '欣銓',
  },
  {
    category: '半導體業',
    stockNo: '3265',
    name: '台星科',
  },
  {
    category: '建材營造',
    stockNo: '3266',
    name: '昇陽',
  },
  {
    category: '半導體業',
    stockNo: '3268',
    name: '海德威',
  },
  {
    category: '半導體業',
    stockNo: '3271',
    name: '其樂達',
  },
  {
    category: '電子工業',
    stockNo: '3271',
    name: '其樂達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3272',
    name: '東碩',
  },
  {
    category: '電子零組件業',
    stockNo: '3276',
    name: '宇環',
  },
  {
    category: '其他',
    stockNo: '3284',
    name: '太普高',
  },
  {
    category: '其他電子類',
    stockNo: '3285',
    name: '微端',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3287',
    name: '廣寰科',
  },
  {
    category: '電子零組件業',
    stockNo: '3288',
    name: '點晶',
  },
  {
    category: '其他電子類',
    stockNo: '3289',
    name: '宜特',
  },
  {
    category: '電子零組件業',
    stockNo: '3290',
    name: '東浦',
  },
  {
    category: '文化創意業',
    stockNo: '3293',
    name: '鈊象',
  },
  {
    category: '電子零組件業',
    stockNo: '3294',
    name: '英濟',
  },
  {
    category: '電子工業',
    stockNo: '3296',
    name: '勝德',
  },
  {
    category: '電子零組件業',
    stockNo: '3296',
    name: '勝德',
  },
  {
    category: '光電業',
    stockNo: '3297',
    name: '杭特',
  },
  {
    category: '其他電子類',
    stockNo: '3303',
    name: '岱稜',
  },
  {
    category: '其他電子業',
    stockNo: '3305',
    name: '昇貿',
  },
  {
    category: '電子工業',
    stockNo: '3305',
    name: '昇貿',
  },
  {
    category: '通信網路業',
    stockNo: '3306',
    name: '鼎天',
  },
  {
    category: '電子工業',
    stockNo: '3308',
    name: '聯德',
  },
  {
    category: '電子零組件業',
    stockNo: '3308',
    name: '聯德',
  },
  {
    category: '電子零組件業',
    stockNo: '3310',
    name: '佳穎',
  },
  {
    category: '通信網路業',
    stockNo: '3311',
    name: '閎暉',
  },
  {
    category: '電子工業',
    stockNo: '3311',
    name: '閎暉',
  },
  {
    category: '電子工業',
    stockNo: '3312',
    name: '弘憶股',
  },
  {
    category: '電子通路業',
    stockNo: '3312',
    name: '弘憶股',
  },
  {
    category: '其他',
    stockNo: '3313',
    name: '斐成',
  },
  {
    category: '電子零組件業',
    stockNo: '3313',
    name: '斐成',
  },
  {
    category: '電子工業',
    stockNo: '3315',
    name: '宣昶',
  },
  {
    category: '電子通路業',
    stockNo: '3315',
    name: '宣昶',
  },
  {
    category: '半導體業',
    stockNo: '3317',
    name: '尼克森',
  },
  {
    category: '電子工業',
    stockNo: '3321',
    name: '同泰',
  },
  {
    category: '電子零組件業',
    stockNo: '3321',
    name: '同泰',
  },
  {
    category: '電子零組件業',
    stockNo: '3322',
    name: '建舜電',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3323',
    name: '加百裕',
  },
  {
    category: '其他電子類',
    stockNo: '3324',
    name: '雙鴻',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3325',
    name: '旭品',
  },
  {
    category: '電子零組件業',
    stockNo: '3332',
    name: '幸康',
  },
  {
    category: '電子工業',
    stockNo: '3338',
    name: '泰碩',
  },
  {
    category: '電子零組件業',
    stockNo: '3338',
    name: '泰碩',
  },
  {
    category: '光電業',
    stockNo: '3339',
    name: '泰谷',
  },
  {
    category: '汽車工業',
    stockNo: '3346',
    name: '麗清',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3349',
    name: '寶德',
  },
  {
    category: '電子零組件業',
    stockNo: '3354',
    name: '律勝',
  },
  {
    category: '光電業',
    stockNo: '3356',
    name: '奇偶',
  },
  {
    category: '電子工業',
    stockNo: '3356',
    name: '奇偶',
  },
  {
    category: '電子零組件業',
    stockNo: '3357',
    name: '臺慶科',
  },
  {
    category: '電子通路業',
    stockNo: '3360',
    name: '尚立',
  },
  {
    category: '光電業',
    stockNo: '3362',
    name: '先進光',
  },
  {
    category: '通信網路業',
    stockNo: '3363',
    name: '上詮',
  },
  {
    category: '其他電子業',
    stockNo: '3367',
    name: '英華達',
  },
  {
    category: '電子工業',
    stockNo: '3367',
    name: '英華達',
  },
  {
    category: '半導體業',
    stockNo: '3372',
    name: '典範',
  },
  {
    category: '其他電子類',
    stockNo: '3373',
    name: '熱映',
  },
  {
    category: '半導體業',
    stockNo: '3374',
    name: '精材',
  },
  {
    category: '電子工業',
    stockNo: '3376',
    name: '新日興',
  },
  {
    category: '電子零組件業',
    stockNo: '3376',
    name: '新日興',
  },
  {
    category: '電機機械',
    stockNo: '3379',
    name: '彬台',
  },
  {
    category: '通信網路業',
    stockNo: '3380',
    name: '明泰',
  },
  {
    category: '電子工業',
    stockNo: '3380',
    name: '明泰',
  },
  {
    category: '光電業',
    stockNo: '3383',
    name: '新世紀',
  },
  {
    category: '電子工業',
    stockNo: '3383',
    name: '新世紀',
  },
  {
    category: '電子零組件業',
    stockNo: '3388',
    name: '崇越電',
  },
  {
    category: '電子零組件業',
    stockNo: '3390',
    name: '旭軟',
  },
  {
    category: '其他電子類',
    stockNo: '3402',
    name: '漢科',
  },
  {
    category: '光電業',
    stockNo: '3406',
    name: '玉晶光',
  },
  {
    category: '電子工業',
    stockNo: '3406',
    name: '玉晶光',
  },
  {
    category: '半導體業',
    stockNo: '3413',
    name: '京鼎',
  },
  {
    category: '電子工業',
    stockNo: '3413',
    name: '京鼎',
  },
  {
    category: '電子工業',
    stockNo: '3416',
    name: '融程電',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3416',
    name: '融程電',
  },
  {
    category: '通信網路業',
    stockNo: '3419',
    name: '譁裕',
  },
  {
    category: '電子工業',
    stockNo: '3419',
    name: '譁裕',
  },
  {
    category: '電機機械',
    stockNo: '3426',
    name: '台興',
  },
  {
    category: '化學工業',
    stockNo: '3430',
    name: '奇鈦科',
  },
  {
    category: '電子工業',
    stockNo: '3432',
    name: '台端',
  },
  {
    category: '電子零組件業',
    stockNo: '3432',
    name: '台端',
  },
  {
    category: '光電業',
    stockNo: '3434',
    name: '哲固',
  },
  {
    category: '光電業',
    stockNo: '3437',
    name: '榮創',
  },
  {
    category: '電子工業',
    stockNo: '3437',
    name: '榮創',
  },
  {
    category: '半導體業',
    stockNo: '3438',
    name: '類比科',
  },
  {
    category: '光電業',
    stockNo: '3441',
    name: '聯一光',
  },
  {
    category: '半導體業',
    stockNo: '3443',
    name: '創意',
  },
  {
    category: '電子工業',
    stockNo: '3443',
    name: '創意',
  },
  {
    category: '電子通路業',
    stockNo: '3444',
    name: '利機',
  },
  {
    category: '通信網路業',
    stockNo: '3447',
    name: '展達',
  },
  {
    category: '電子工業',
    stockNo: '3447',
    name: '展達',
  },
  {
    category: '其他電子業',
    stockNo: '3450',
    name: '聯鈞',
  },
  {
    category: '半導體業',
    stockNo: '3450',
    name: '聯鈞',
  },
  {
    category: '電子工業',
    stockNo: '3450',
    name: '聯鈞',
  },
  {
    category: '光電業',
    stockNo: '3454',
    name: '晶睿',
  },
  {
    category: '電子工業',
    stockNo: '3454',
    name: '晶睿',
  },
  {
    category: '光電業',
    stockNo: '3455',
    name: '由田',
  },
  {
    category: '電子零組件業',
    stockNo: '3465',
    name: '進泰電子',
  },
  {
    category: '通信網路業',
    stockNo: '3466',
    name: '德晉',
  },
  {
    category: '半導體業',
    stockNo: '3467',
    name: '台灣精材',
  },
  {
    category: '半導體業',
    stockNo: '3474',
    name: '華亞科',
  },
  {
    category: '電子工業',
    stockNo: '3474',
    name: '華亞科',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3479',
    name: '安勤',
  },
  {
    category: '光電業',
    stockNo: '3481',
    name: '群創',
  },
  {
    category: '電子工業',
    stockNo: '3481',
    name: '群創',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3483',
    name: '力致',
  },
  {
    category: '電子零組件業',
    stockNo: '3484',
    name: '崧騰',
  },
  {
    category: '光電業',
    stockNo: '3485',
    name: '敘豐',
  },
  {
    category: '建材營造',
    stockNo: '3489',
    name: '森寶',
  },
  {
    category: '光電業',
    stockNo: '3490',
    name: '單井',
  },
  {
    category: '通信網路業',
    stockNo: '3491',
    name: '昇達科',
  },
  {
    category: '電子零組件業',
    stockNo: '3492',
    name: '長盛',
  },
  {
    category: '電子工業',
    stockNo: '3494',
    name: '誠研',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3494',
    name: '誠研',
  },
  {
    category: '其他電子類',
    stockNo: '3498',
    name: '陽程',
  },
  {
    category: '通信網路業',
    stockNo: '3499',
    name: '環天科',
  },
  {
    category: '電子工業',
    stockNo: '3501',
    name: '維熹',
  },
  {
    category: '電子零組件業',
    stockNo: '3501',
    name: '維熹',
  },
  {
    category: '光電業',
    stockNo: '3504',
    name: '揚明光',
  },
  {
    category: '電子工業',
    stockNo: '3504',
    name: '揚明光',
  },
  {
    category: '其他電子類',
    stockNo: '3508',
    name: '位速',
  },
  {
    category: '電子零組件業',
    stockNo: '3511',
    name: '矽瑪',
  },
  {
    category: '建材營造',
    stockNo: '3512',
    name: '皇龍',
  },
  {
    category: '電子零組件業',
    stockNo: '3512',
    name: '皇龍',
  },
  {
    category: '光電業',
    stockNo: '3514',
    name: '昱晶',
  },
  {
    category: '電子工業',
    stockNo: '3514',
    name: '昱晶',
  },
  {
    category: '電子工業',
    stockNo: '3515',
    name: '華擎',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3515',
    name: '華擎',
  },
  {
    category: '光電業',
    stockNo: '3516',
    name: '亞帝歐',
  },
  {
    category: '其他電子業',
    stockNo: '3518',
    name: '柏騰',
  },
  {
    category: '電子工業',
    stockNo: '3518',
    name: '柏騰',
  },
  {
    category: '半導體業',
    stockNo: '3519',
    name: '綠能',
  },
  {
    category: '電子工業',
    stockNo: '3519',
    name: '綠能',
  },
  {
    category: '電子零組件業',
    stockNo: '3520',
    name: '華盈',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3521',
    name: '鴻翊',
  },
  {
    category: '觀光事業',
    stockNo: '3522',
    name: '御頂',
  },
  {
    category: '觀光餐旅',
    stockNo: '3522',
    name: '御頂',
  },
  {
    category: '光電業',
    stockNo: '3523',
    name: '迎輝',
  },
  {
    category: '電子零組件業',
    stockNo: '3526',
    name: '凡甲',
  },
  {
    category: '半導體業',
    stockNo: '3527',
    name: '聚積',
  },
  {
    category: '電子工業',
    stockNo: '3528',
    name: '安馳',
  },
  {
    category: '電子通路業',
    stockNo: '3528',
    name: '安馳',
  },
  {
    category: '半導體業',
    stockNo: '3529',
    name: '力旺',
  },
  {
    category: '半導體業',
    stockNo: '3530',
    name: '晶相光',
  },
  {
    category: '電子工業',
    stockNo: '3530',
    name: '晶相光',
  },
  {
    category: '光電業',
    stockNo: '3531',
    name: '先益',
  },
  {
    category: '半導體業',
    stockNo: '3532',
    name: '台勝科',
  },
  {
    category: '電子工業',
    stockNo: '3532',
    name: '台勝科',
  },
  {
    category: '電子工業',
    stockNo: '3533',
    name: '嘉澤',
  },
  {
    category: '電子零組件業',
    stockNo: '3533',
    name: '嘉澤',
  },
  {
    category: '半導體業',
    stockNo: '3534',
    name: '雷凌',
  },
  {
    category: '電子工業',
    stockNo: '3534',
    name: '雷凌',
  },
  {
    category: '光電業',
    stockNo: '3535',
    name: '晶彩科',
  },
  {
    category: '電子工業',
    stockNo: '3535',
    name: '晶彩科',
  },
  {
    category: '半導體業',
    stockNo: '3536',
    name: '誠創',
  },
  {
    category: '電子工業',
    stockNo: '3536',
    name: '誠創',
  },
  {
    category: '電子零組件業',
    stockNo: '3537',
    name: '堡達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3540',
    name: '曜越',
  },
  {
    category: '其他電子類',
    stockNo: '3541',
    name: '西柏',
  },
  {
    category: '光電業',
    stockNo: '3543',
    name: '州巧',
  },
  {
    category: '電子工業',
    stockNo: '3543',
    name: '州巧',
  },
  {
    category: '半導體業',
    stockNo: '3545',
    name: '敦泰',
  },
  {
    category: '電子工業',
    stockNo: '3545',
    name: '敦泰',
  },
  {
    category: '文化創意業',
    stockNo: '3546',
    name: '宇峻',
  },
  {
    category: '電子零組件業',
    stockNo: '3548',
    name: '兆利',
  },
  {
    category: '電子工業',
    stockNo: '3550',
    name: '聯穎',
  },
  {
    category: '電子零組件業',
    stockNo: '3550',
    name: '聯穎',
  },
  {
    category: '其他電子類',
    stockNo: '3551',
    name: '世禾',
  },
  {
    category: '綠能環保類',
    stockNo: '3551',
    name: '世禾',
  },
  {
    category: '其他電子類',
    stockNo: '3552',
    name: '同致',
  },
  {
    category: '半導體業',
    stockNo: '3555',
    name: '博士旺',
  },
  {
    category: '半導體業',
    stockNo: '3556',
    name: '禾瑞亞',
  },
  {
    category: '其他',
    stockNo: '3557',
    name: '嘉威',
  },
  {
    category: '居家生活',
    stockNo: '3557',
    name: '嘉威',
  },
  {
    category: '通信網路業',
    stockNo: '3558',
    name: '神準',
  },
  {
    category: '半導體業',
    stockNo: '3559',
    name: '全智科',
  },
  {
    category: '電子工業',
    stockNo: '3559',
    name: '全智科',
  },
  {
    category: '光電業',
    stockNo: '3561',
    name: '昇陽光電',
  },
  {
    category: '電子工業',
    stockNo: '3561',
    name: '昇陽光電',
  },
  {
    category: '光電業',
    stockNo: '3563',
    name: '牧德',
  },
  {
    category: '電子工業',
    stockNo: '3563',
    name: '牧德',
  },
  {
    category: '通信網路業',
    stockNo: '3564',
    name: '其陽',
  },
  {
    category: '半導體業',
    stockNo: '3567',
    name: '逸昌',
  },
  {
    category: '資訊服務業',
    stockNo: '3570',
    name: '大塚',
  },
  {
    category: '光電業',
    stockNo: '3573',
    name: '穎台',
  },
  {
    category: '電子工業',
    stockNo: '3573',
    name: '穎台',
  },
  {
    category: '光電業',
    stockNo: '3576',
    name: '聯合再生',
  },
  {
    category: '電子工業',
    stockNo: '3576',
    name: '聯合再生',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3577',
    name: '泓格',
  },
  {
    category: '半導體業',
    stockNo: '3579',
    name: '尚志',
  },
  {
    category: '電子工業',
    stockNo: '3579',
    name: '尚志',
  },
  {
    category: '其他電子類',
    stockNo: '3580',
    name: '友威科',
  },
  {
    category: '半導體業',
    stockNo: '3581',
    name: '博磊',
  },
  {
    category: '半導體業',
    stockNo: '3583',
    name: '辛耘',
  },
  {
    category: '電子工業',
    stockNo: '3583',
    name: '辛耘',
  },
  {
    category: '光電業',
    stockNo: '3584',
    name: '介面',
  },
  {
    category: '電子工業',
    stockNo: '3584',
    name: '介面',
  },
  {
    category: '電子零組件業',
    stockNo: '3585',
    name: '聯致',
  },
  {
    category: '其他電子類',
    stockNo: '3587',
    name: '閎康',
  },
  {
    category: '半導體業',
    stockNo: '3588',
    name: '通嘉',
  },
  {
    category: '電子工業',
    stockNo: '3588',
    name: '通嘉',
  },
  {
    category: '光電業',
    stockNo: '3591',
    name: '艾笛森',
  },
  {
    category: '電子工業',
    stockNo: '3591',
    name: '艾笛森',
  },
  {
    category: '半導體業',
    stockNo: '3592',
    name: '瑞鼎',
  },
  {
    category: '電子工業',
    stockNo: '3592',
    name: '瑞鼎',
  },
  {
    category: '電子工業',
    stockNo: '3593',
    name: '力銘',
  },
  {
    category: '電子零組件業',
    stockNo: '3593',
    name: '力銘',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3594',
    name: '磐儀',
  },
  {
    category: '光電業',
    stockNo: '3595',
    name: '山太士',
  },
  {
    category: '通信網路業',
    stockNo: '3596',
    name: '智易',
  },
  {
    category: '電子工業',
    stockNo: '3596',
    name: '智易',
  },
  {
    category: '電子零組件業',
    stockNo: '3597',
    name: '映興',
  },
  {
    category: '半導體業',
    stockNo: '3598',
    name: '奕力',
  },
  {
    category: '電子工業',
    stockNo: '3598',
    name: '奕力',
  },
  {
    category: '光電業',
    stockNo: '3599',
    name: '旺能',
  },
  {
    category: '電子工業',
    stockNo: '3599',
    name: '旺能',
  },
  {
    category: '電子通路業',
    stockNo: '3603',
    name: '建祥國際',
  },
  {
    category: '電子工業',
    stockNo: '3605',
    name: '宏致',
  },
  {
    category: '電子零組件業',
    stockNo: '3605',
    name: '宏致',
  },
  {
    category: '電子工業',
    stockNo: '3607',
    name: '谷崧',
  },
  {
    category: '電子零組件業',
    stockNo: '3607',
    name: '谷崧',
  },
  {
    category: '電子零組件業',
    stockNo: '3609',
    name: '三一東林',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3611',
    name: '鼎翰',
  },
  {
    category: '半導體業',
    stockNo: '3614',
    name: '誠致',
  },
  {
    category: '電子工業',
    stockNo: '3614',
    name: '誠致',
  },
  {
    category: '光電業',
    stockNo: '3615',
    name: '安可',
  },
  {
    category: '其他電子業',
    stockNo: '3617',
    name: '碩天',
  },
  {
    category: '電子工業',
    stockNo: '3617',
    name: '碩天',
  },
  {
    category: '光電業',
    stockNo: '3622',
    name: '洋華',
  },
  {
    category: '電子工業',
    stockNo: '3622',
    name: '洋華',
  },
  {
    category: '光電業',
    stockNo: '3623',
    name: '富晶通',
  },
  {
    category: '電子零組件業',
    stockNo: '3624',
    name: '光頡',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3625',
    name: '西勝',
  },
  {
    category: '光電業',
    stockNo: '3627',
    name: '華信科',
  },
  {
    category: '其他電子類',
    stockNo: '3628',
    name: '盈正',
  },
  {
    category: '光電業',
    stockNo: '3629',
    name: '地心引力',
  },
  {
    category: '文化創意業',
    stockNo: '3629',
    name: '地心引力',
  },
  {
    category: '光電業',
    stockNo: '3630',
    name: '新鉅科',
  },
  {
    category: '電子零組件業',
    stockNo: '3631',
    name: '晟楠',
  },
  {
    category: '通信網路業',
    stockNo: '3632',
    name: '研勤',
  },
  {
    category: '光電業',
    stockNo: '3633',
    name: '云光',
  },
  {
    category: '半導體業',
    stockNo: '3638',
    name: 'F-IML',
  },
  {
    category: '電子工業',
    stockNo: '3638',
    name: 'F-IML',
  },
  {
    category: '其他電子類',
    stockNo: '3642',
    name: '駿熠電',
  },
  {
    category: '電子工業',
    stockNo: '3645',
    name: '達邁',
  },
  {
    category: '電子零組件業',
    stockNo: '3645',
    name: '達邁',
  },
  {
    category: '電子零組件業',
    stockNo: '3646',
    name: '艾恩特',
  },
  {
    category: '電子工業',
    stockNo: '3652',
    name: '精聯',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3652',
    name: '精聯',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3652',
    name: '精聯',
  },
  {
    category: '電子工業',
    stockNo: '3653',
    name: '健策',
  },
  {
    category: '電子零組件業',
    stockNo: '3653',
    name: '健策',
  },
  {
    category: '光電業',
    stockNo: '3659',
    name: '百辰',
  },
  {
    category: '半導體業',
    stockNo: '3661',
    name: '世芯-KY',
  },
  {
    category: '電子工業',
    stockNo: '3661',
    name: '世芯-KY',
  },
  {
    category: '其他電子類',
    stockNo: '3663',
    name: '鑫科',
  },
  {
    category: '通信網路業',
    stockNo: '3664',
    name: '安瑞-KY',
  },
  {
    category: '其他電子業',
    stockNo: '3665',
    name: '貿聯-KY',
  },
  {
    category: '電子工業',
    stockNo: '3665',
    name: '貿聯-KY',
  },
  {
    category: '光電業',
    stockNo: '3666',
    name: '光耀',
  },
  {
    category: '光電業',
    stockNo: '3669',
    name: '圓展',
  },
  {
    category: '通信網路業',
    stockNo: '3669',
    name: '圓展',
  },
  {
    category: '電子工業',
    stockNo: '3669',
    name: '圓展',
  },
  {
    category: '通信網路業',
    stockNo: '3672',
    name: '康聯訊',
  },
  {
    category: '光電業',
    stockNo: '3673',
    name: 'TPK-KY',
  },
  {
    category: '電子工業',
    stockNo: '3673',
    name: 'TPK-KY',
  },
  {
    category: '半導體業',
    stockNo: '3675',
    name: '德微',
  },
  {
    category: '光電業',
    stockNo: '3678',
    name: '聯享',
  },
  {
    category: '電子工業',
    stockNo: '3679',
    name: '新至陞',
  },
  {
    category: '電子零組件業',
    stockNo: '3679',
    name: '新至陞',
  },
  {
    category: '半導體業',
    stockNo: '3680',
    name: '家登',
  },
  {
    category: '通信網路業',
    stockNo: '3682',
    name: '亞太電',
  },
  {
    category: '電子工業',
    stockNo: '3682',
    name: '亞太電',
  },
  {
    category: '通信網路業',
    stockNo: '3684',
    name: '榮昌',
  },
  {
    category: '光電業',
    stockNo: '3685',
    name: '元創精密',
  },
  {
    category: '電機機械',
    stockNo: '3685',
    name: '元創精密',
  },
  {
    category: '半導體業',
    stockNo: '3686',
    name: '達能',
  },
  {
    category: '電子工業',
    stockNo: '3686',
    name: '達能',
  },
  {
    category: '數位雲端類',
    stockNo: '3687',
    name: '歐買尬',
  },
  {
    category: '文化創意業',
    stockNo: '3687',
    name: '歐買尬',
  },
  {
    category: '電子商務業',
    stockNo: '3687',
    name: '歐買尬',
  },
  {
    category: '電子零組件業',
    stockNo: '3689',
    name: '湧德',
  },
  {
    category: '光電業',
    stockNo: '3691',
    name: '碩禾',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3693',
    name: '營邦',
  },
  {
    category: '通信網路業',
    stockNo: '3694',
    name: '海華',
  },
  {
    category: '電子工業',
    stockNo: '3694',
    name: '海華',
  },
  {
    category: '半導體業',
    stockNo: '3697',
    name: 'F-晨星',
  },
  {
    category: '電子工業',
    stockNo: '3697',
    name: 'F-晨星',
  },
  {
    category: '光電業',
    stockNo: '3698',
    name: '隆達',
  },
  {
    category: '電子工業',
    stockNo: '3698',
    name: '隆達',
  },
  {
    category: '電子工業',
    stockNo: '3701',
    name: '大眾控',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3701',
    name: '大眾控',
  },
  {
    category: '電子工業',
    stockNo: '3702',
    name: '大聯大',
  },
  {
    category: '電子通路業',
    stockNo: '3702',
    name: '大聯大',
  },
  {
    category: '電子工業',
    stockNo: '3702A',
    name: '大聯大甲特',
  },
  {
    category: '電子通路業',
    stockNo: '3702A',
    name: '大聯大甲特',
  },
  {
    category: '建材營造',
    stockNo: '3703',
    name: '欣陸',
  },
  {
    category: '通信網路業',
    stockNo: '3704',
    name: '合勤控',
  },
  {
    category: '電子工業',
    stockNo: '3704',
    name: '合勤控',
  },
  {
    category: '化學生技醫療',
    stockNo: '3705',
    name: '永信',
  },
  {
    category: '生技醫療業',
    stockNo: '3705',
    name: '永信',
  },
  {
    category: '電子工業',
    stockNo: '3706',
    name: '神達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3706',
    name: '神達',
  },
  {
    category: '半導體業',
    stockNo: '3707',
    name: '漢磊',
  },
  {
    category: '化學工業',
    stockNo: '3708',
    name: '上緯投控',
  },
  {
    category: '化學生技醫療',
    stockNo: '3708',
    name: '上緯投控',
  },
  {
    category: '綠能環保',
    stockNo: '3708',
    name: '上緯投控',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3709',
    name: '鑫聯大投控',
  },
  {
    category: '電子零組件業',
    stockNo: '3710',
    name: '連展投控',
  },
  {
    category: '半導體業',
    stockNo: '3711',
    name: '日月光投控',
  },
  {
    category: '電子工業',
    stockNo: '3711',
    name: '日月光投控',
  },
  {
    category: '電子工業',
    stockNo: '3712',
    name: '永崴投控',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '3712',
    name: '永崴投控',
  },
  {
    category: '光電業',
    stockNo: '3713',
    name: '新晶投控',
  },
  {
    category: '綠能環保類',
    stockNo: '3713',
    name: '新晶投控',
  },
  {
    category: '光電業',
    stockNo: '3714',
    name: '富采',
  },
  {
    category: '電子工業',
    stockNo: '3714',
    name: '富采',
  },
  {
    category: '電子工業',
    stockNo: '3715',
    name: '定穎投控',
  },
  {
    category: '電子零組件業',
    stockNo: '3715',
    name: '定穎投控',
  },
  {
    category: '生技醫療業',
    stockNo: '4102',
    name: '永日',
  },
  {
    category: '化學生技醫療',
    stockNo: '4104',
    name: '佳醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4104',
    name: '佳醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4105',
    name: '東洋',
  },
  {
    category: '化學生技醫療',
    stockNo: '4106',
    name: '雃博',
  },
  {
    category: '生技醫療業',
    stockNo: '4106',
    name: '雃博',
  },
  {
    category: '生技醫療業',
    stockNo: '4107',
    name: '邦特',
  },
  {
    category: '化學生技醫療',
    stockNo: '4108',
    name: '懷特',
  },
  {
    category: '生技醫療業',
    stockNo: '4108',
    name: '懷特',
  },
  {
    category: '生技醫療業',
    stockNo: '4109',
    name: '加捷生醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4111',
    name: '濟生',
  },
  {
    category: '建材營造',
    stockNo: '4113',
    name: '聯上',
  },
  {
    category: '生技醫療業',
    stockNo: '4114',
    name: '健喬',
  },
  {
    category: '生技醫療業',
    stockNo: '4115',
    name: '善德生技',
  },
  {
    category: '生技醫療業',
    stockNo: '4116',
    name: '明基醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4117',
    name: '普生',
  },
  {
    category: '化學生技醫療',
    stockNo: '4119',
    name: '旭富',
  },
  {
    category: '生技醫療業',
    stockNo: '4119',
    name: '旭富',
  },
  {
    category: '生技醫療業',
    stockNo: '4120',
    name: '友華',
  },
  {
    category: '生技醫療業',
    stockNo: '4121',
    name: '優盛',
  },
  {
    category: '生技醫療業',
    stockNo: '4123',
    name: '晟德',
  },
  {
    category: '生技醫療業',
    stockNo: '4126',
    name: '太醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4127',
    name: '天良',
  },
  {
    category: '生技醫療業',
    stockNo: '4128',
    name: '中天',
  },
  {
    category: '生技醫療業',
    stockNo: '4129',
    name: '聯合',
  },
  {
    category: '生技醫療業',
    stockNo: '4129A',
    name: '聯合甲特',
  },
  {
    category: '生技醫療業',
    stockNo: '4130',
    name: '健亞',
  },
  {
    category: '生技醫療業',
    stockNo: '4131',
    name: '浩泰',
  },
  {
    category: '生技醫療業',
    stockNo: '4132',
    name: '國鼎',
  },
  {
    category: '化學生技醫療',
    stockNo: '4133',
    name: '亞諾法',
  },
  {
    category: '生技醫療業',
    stockNo: '4133',
    name: '亞諾法',
  },
  {
    category: '化學生技醫療',
    stockNo: '4137',
    name: '麗豐-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4137',
    name: '麗豐-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4138',
    name: '曜亞',
  },
  {
    category: '生技醫療業',
    stockNo: '4139',
    name: '馬光-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '4141',
    name: '龍燈-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4141',
    name: '龍燈-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '4142',
    name: '國光生',
  },
  {
    category: '生技醫療業',
    stockNo: '4142',
    name: '國光生',
  },
  {
    category: '化學生技醫療',
    stockNo: '4144',
    name: '康聯-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4144',
    name: '康聯-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4147',
    name: '中裕',
  },
  {
    category: '化學生技醫療',
    stockNo: '4148',
    name: '全宇生技-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4148',
    name: '全宇生技-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4150',
    name: '優你康',
  },
  {
    category: '生技醫療業',
    stockNo: '4152',
    name: '台微體',
  },
  {
    category: '生技醫療業',
    stockNo: '4153',
    name: '鈺緯',
  },
  {
    category: '其他',
    stockNo: '4154',
    name: '樂威科-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4154',
    name: '樂威科-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '4155',
    name: '訊映',
  },
  {
    category: '生技醫療業',
    stockNo: '4155',
    name: '訊映',
  },
  {
    category: '生技醫療業',
    stockNo: '4157',
    name: '太景*-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4160',
    name: '訊聯基因',
  },
  {
    category: '生技醫療業',
    stockNo: '4161',
    name: '聿新科',
  },
  {
    category: '生技醫療業',
    stockNo: '4162',
    name: '智擎',
  },
  {
    category: '生技醫療業',
    stockNo: '4163',
    name: '鐿鈦',
  },
  {
    category: '化學生技醫療',
    stockNo: '4164',
    name: '承業醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4164',
    name: '承業醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4166',
    name: '友霖',
  },
  {
    category: '生技醫療業',
    stockNo: '4167',
    name: '松瑞藥',
  },
  {
    category: '生技醫療業',
    stockNo: '4168',
    name: '醣聯',
  },
  {
    category: '生技醫療業',
    stockNo: '4169',
    name: '泰宗',
  },
  {
    category: '生技醫療業',
    stockNo: '4170',
    name: '鑫品生醫',
  },
  {
    category: '農業科技業',
    stockNo: '4171',
    name: '瑞基',
  },
  {
    category: '生技醫療業',
    stockNo: '4172',
    name: '因華',
  },
  {
    category: '生技醫療業',
    stockNo: '4173',
    name: '久裕',
  },
  {
    category: '生技醫療業',
    stockNo: '4174',
    name: '浩鼎',
  },
  {
    category: '生技醫療業',
    stockNo: '4175',
    name: '杏一',
  },
  {
    category: '生技醫療業',
    stockNo: '4183',
    name: '福永生技',
  },
  {
    category: '生技醫療業',
    stockNo: '4186',
    name: '尖端醫',
  },
  {
    category: '生技醫療業',
    stockNo: '4188',
    name: '安克',
  },
  {
    category: '化學生技醫療',
    stockNo: '4190',
    name: '佐登-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4190',
    name: '佐登-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '4192',
    name: '杏國',
  },
  {
    category: '生技醫療業',
    stockNo: '4194',
    name: '禾生技',
  },
  {
    category: '生技醫療業',
    stockNo: '4195',
    name: '基米',
  },
  {
    category: '生技醫療業',
    stockNo: '4197',
    name: '暐世',
  },
  {
    category: '生技醫療業',
    stockNo: '4198',
    name: '欣大健康',
  },
  {
    category: '食品工業',
    stockNo: '4205',
    name: '中華食',
  },
  {
    category: '食品工業',
    stockNo: '4207',
    name: '環泰',
  },
  {
    category: '塑膠工業',
    stockNo: '4303',
    name: '信立',
  },
  {
    category: '塑膠工業',
    stockNo: '4304',
    name: '勝昱',
  },
  {
    category: '塑膠工業',
    stockNo: '4305',
    name: '世坤',
  },
  {
    category: '塑膠工業',
    stockNo: '4306',
    name: '炎洲',
  },
  {
    category: '紡織纖維',
    stockNo: '4401',
    name: '東隆興',
  },
  {
    category: '紡織纖維',
    stockNo: '4402',
    name: '福大',
  },
  {
    category: '紡織纖維',
    stockNo: '4406',
    name: '新昕纖',
  },
  {
    category: '紡織纖維',
    stockNo: '4413',
    name: '飛寶企業',
  },
  {
    category: '紡織纖維',
    stockNo: '4414',
    name: '如興',
  },
  {
    category: '建材營造',
    stockNo: '4416',
    name: '三圓',
  },
  {
    category: '紡織纖維',
    stockNo: '4417',
    name: '金洲',
  },
  {
    category: '紡織纖維',
    stockNo: '4419',
    name: '元勝',
  },
  {
    category: '紡織纖維',
    stockNo: '4420',
    name: '光明',
  },
  {
    category: '紡織纖維',
    stockNo: '4426',
    name: '利勤',
  },
  {
    category: '紡織纖維',
    stockNo: '4429',
    name: '聚紡',
  },
  {
    category: '其他',
    stockNo: '4430',
    name: '耀億',
  },
  {
    category: '其他',
    stockNo: '4431',
    name: '敏成健康',
  },
  {
    category: '紡織纖維',
    stockNo: '4432',
    name: '銘旺實',
  },
  {
    category: '紡織纖維',
    stockNo: '4433',
    name: '興采',
  },
  {
    category: '紡織纖維',
    stockNo: '4438',
    name: '廣越',
  },
  {
    category: '紡織纖維',
    stockNo: '4439',
    name: '冠星-KY',
  },
  {
    category: '紡織纖維',
    stockNo: '4440',
    name: '宜新實業',
  },
  {
    category: '紡織纖維',
    stockNo: '4441',
    name: '振大環球',
  },
  {
    category: '紡織纖維',
    stockNo: '4442',
    name: '竣邦-KY',
  },
  {
    category: '電機機械',
    stockNo: '4502',
    name: '健信',
  },
  {
    category: '電機機械',
    stockNo: '4503',
    name: '金雨',
  },
  {
    category: '電機機械',
    stockNo: '4506',
    name: '崇友',
  },
  {
    category: '電機機械',
    stockNo: '4510',
    name: '高鋒',
  },
  {
    category: '電機機械',
    stockNo: '4513',
    name: '福裕',
  },
  {
    category: '電機機械',
    stockNo: '4523',
    name: '永彰',
  },
  {
    category: '電機機械',
    stockNo: '4526',
    name: '東台',
  },
  {
    category: '電機機械',
    stockNo: '4527',
    name: '方土霖',
  },
  {
    category: '電機機械',
    stockNo: '4528',
    name: '江興鍛',
  },
  {
    category: '其他',
    stockNo: '4529',
    name: '淳紳',
  },
  {
    category: '觀光餐旅',
    stockNo: '4530',
    name: '宏易',
  },
  {
    category: '電機機械',
    stockNo: '4530',
    name: '宏易',
  },
  {
    category: '電機機械',
    stockNo: '4532',
    name: '瑞智',
  },
  {
    category: '電機機械',
    stockNo: '4533',
    name: '協易機',
  },
  {
    category: '電機機械',
    stockNo: '4534',
    name: '慶騰',
  },
  {
    category: '電機機械',
    stockNo: '4535',
    name: '至興',
  },
  {
    category: '其他',
    stockNo: '4536',
    name: '拓凱',
  },
  {
    category: '運動休閒',
    stockNo: '4536',
    name: '拓凱',
  },
  {
    category: '光電業',
    stockNo: '4537',
    name: '旭東',
  },
  {
    category: '電機機械',
    stockNo: '4538',
    name: '大詠城',
  },
  {
    category: '電機機械',
    stockNo: '4540',
    name: '全球傳動',
  },
  {
    category: '其他',
    stockNo: '4541',
    name: '晟田',
  },
  {
    category: '電子零組件業',
    stockNo: '4542',
    name: '科嶠',
  },
  {
    category: '電機機械',
    stockNo: '4543',
    name: '萬在',
  },
  {
    category: '電機機械',
    stockNo: '4544',
    name: '春日',
  },
  {
    category: '電子工業',
    stockNo: '4545',
    name: '銘鈺',
  },
  {
    category: '電子零組件業',
    stockNo: '4545',
    name: '銘鈺',
  },
  {
    category: '電機機械',
    stockNo: '4546',
    name: '長亨',
  },
  {
    category: '電機機械',
    stockNo: '4549',
    name: '桓達',
  },
  {
    category: '電機機械',
    stockNo: '4550',
    name: '長佳',
  },
  {
    category: '汽車工業',
    stockNo: '4551',
    name: '智伸科',
  },
  {
    category: '電機機械',
    stockNo: '4552',
    name: '力達-KY',
  },
  {
    category: '電機機械',
    stockNo: '4553',
    name: '盛復',
  },
  {
    category: '其他電子類',
    stockNo: '4554',
    name: '橙的',
  },
  {
    category: '電機機械',
    stockNo: '4555',
    name: '氣立',
  },
  {
    category: '其他',
    stockNo: '4556',
    name: '旭然',
  },
  {
    category: '汽車工業',
    stockNo: '4557',
    name: '永新-KY',
  },
  {
    category: '電機機械',
    stockNo: '4558',
    name: '寶緯',
  },
  {
    category: '運動休閒',
    stockNo: '4559',
    name: '久裕興',
  },
  {
    category: '電機機械',
    stockNo: '4560',
    name: '強信-KY',
  },
  {
    category: '電機機械',
    stockNo: '4561',
    name: '健椿',
  },
  {
    category: '電機機械',
    stockNo: '4562',
    name: '穎漢',
  },
  {
    category: '電機機械',
    stockNo: '4563',
    name: '百德',
  },
  {
    category: '電機機械',
    stockNo: '4564',
    name: '元翎',
  },
  {
    category: '電機機械',
    stockNo: '4565',
    name: '宏偉',
  },
  {
    category: '電機機械',
    stockNo: '4566',
    name: '時碩工業',
  },
  {
    category: '電機機械',
    stockNo: '4568',
    name: '科際精密',
  },
  {
    category: '汽車工業',
    stockNo: '4569',
    name: '六方科-KY',
  },
  {
    category: '電機機械',
    stockNo: '4570',
    name: '傑生',
  },
  {
    category: '電機機械',
    stockNo: '4571',
    name: '鈞興-KY',
  },
  {
    category: '電機機械',
    stockNo: '4572',
    name: '駐龍',
  },
  {
    category: '電機機械',
    stockNo: '4573',
    name: '高明鐵',
  },
  {
    category: '電機機械',
    stockNo: '4575',
    name: '銓寶',
  },
  {
    category: '電機機械',
    stockNo: '4576',
    name: '大銀微系統',
  },
  {
    category: '其他電子類',
    stockNo: '4577',
    name: '達航科技',
  },
  {
    category: '電機機械',
    stockNo: '4578',
    name: '總格精密',
  },
  {
    category: '電機機械',
    stockNo: '4580',
    name: '捷流閥業',
  },
  {
    category: '汽車工業',
    stockNo: '4581',
    name: '光隆精密-KY',
  },
  {
    category: '綠能環保',
    stockNo: '4582',
    name: '聚恆',
  },
  {
    category: '電機機械',
    stockNo: '4583',
    name: '台灣精銳',
  },
  {
    category: '電機機械',
    stockNo: '4584',
    name: '君帆',
  },
  {
    category: '電機機械',
    stockNo: '4587',
    name: '寶元數控',
  },
  {
    category: '其他電子業',
    stockNo: '4588',
    name: '玖鼎電力',
  },
  {
    category: '電子工業',
    stockNo: '4588',
    name: '玖鼎電力',
  },
  {
    category: '電機機械',
    stockNo: '4589',
    name: '碩陽電機',
  },
  {
    category: '居家生活類',
    stockNo: '4609',
    name: '唐鋒',
  },
  {
    category: '電器電纜',
    stockNo: '4609',
    name: '唐鋒',
  },
  {
    category: '化學工業',
    stockNo: '4702',
    name: '中美實',
  },
  {
    category: '居家生活類',
    stockNo: '4702',
    name: '中美實',
  },
  {
    category: '化學工業',
    stockNo: '4706',
    name: '大恭',
  },
  {
    category: '化學工業',
    stockNo: '4707',
    name: '磐亞',
  },
  {
    category: '化學工業',
    stockNo: '4711',
    name: '永純',
  },
  {
    category: '食品工業',
    stockNo: '4712',
    name: '南璋',
  },
  {
    category: '化學工業',
    stockNo: '4714',
    name: '永捷',
  },
  {
    category: '化學工業',
    stockNo: '4716',
    name: '大立',
  },
  {
    category: '化學工業',
    stockNo: '4720',
    name: '德淵',
  },
  {
    category: '化學生技醫療',
    stockNo: '4720',
    name: '德淵',
  },
  {
    category: '化學工業',
    stockNo: '4721',
    name: '美琪瑪',
  },
  {
    category: '化學工業',
    stockNo: '4722',
    name: '國精化',
  },
  {
    category: '化學生技醫療',
    stockNo: '4722',
    name: '國精化',
  },
  {
    category: '生技醫療業',
    stockNo: '4724',
    name: '宣捷幹細胞',
  },
  {
    category: '化學工業',
    stockNo: '4725',
    name: '信昌化',
  },
  {
    category: '化學生技醫療',
    stockNo: '4725',
    name: '信昌化',
  },
  {
    category: '生技醫療業',
    stockNo: '4726',
    name: '永昕',
  },
  {
    category: '生技醫療業',
    stockNo: '4728',
    name: '雙美',
  },
  {
    category: '光電業',
    stockNo: '4729',
    name: '熒茂',
  },
  {
    category: '生技醫療業',
    stockNo: '4732',
    name: '彥臣',
  },
  {
    category: '化學工業',
    stockNo: '4733',
    name: '上緯',
  },
  {
    category: '化學生技醫療',
    stockNo: '4733',
    name: '上緯',
  },
  {
    category: '生技醫療業',
    stockNo: '4735',
    name: '豪展',
  },
  {
    category: '化學生技醫療',
    stockNo: '4736',
    name: '泰博',
  },
  {
    category: '生技醫療業',
    stockNo: '4736',
    name: '泰博',
  },
  {
    category: '生技醫療業',
    stockNo: '4736',
    name: '泰博',
  },
  {
    category: '化學生技醫療',
    stockNo: '4737',
    name: '華廣',
  },
  {
    category: '生技醫療業',
    stockNo: '4737',
    name: '華廣',
  },
  {
    category: '化學工業',
    stockNo: '4738',
    name: '尚化',
  },
  {
    category: '化學工業',
    stockNo: '4739',
    name: '康普',
  },
  {
    category: '化學生技醫療',
    stockNo: '4739',
    name: '康普',
  },
  {
    category: '化學工業',
    stockNo: '4741',
    name: '泓瀚',
  },
  {
    category: '生技醫療業',
    stockNo: '4743',
    name: '合一',
  },
  {
    category: '生技醫療業',
    stockNo: '4744',
    name: '皇將',
  },
  {
    category: '生技醫療業',
    stockNo: '4745',
    name: '合富-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '4746',
    name: '台耀',
  },
  {
    category: '生技醫療業',
    stockNo: '4746',
    name: '台耀',
  },
  {
    category: '生技醫療業',
    stockNo: '4747',
    name: '強生',
  },
  {
    category: '光電業',
    stockNo: '4749',
    name: '新應材',
  },
  {
    category: '化學工業',
    stockNo: '4754',
    name: '國碳科',
  },
  {
    category: '化學工業',
    stockNo: '4755',
    name: '三福化',
  },
  {
    category: '化學生技醫療',
    stockNo: '4755',
    name: '三福化',
  },
  {
    category: '其他電子類',
    stockNo: '4760',
    name: '勤凱',
  },
  {
    category: '化學工業',
    stockNo: '4763',
    name: '材料-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '4763',
    name: '材料-KY',
  },
  {
    category: '化學工業',
    stockNo: '4764',
    name: '雙鍵',
  },
  {
    category: '化學生技醫療',
    stockNo: '4764',
    name: '雙鍵',
  },
  {
    category: '化學工業',
    stockNo: '4765',
    name: '磐采',
  },
  {
    category: '化學工業',
    stockNo: '4766',
    name: '南寶',
  },
  {
    category: '化學生技醫療',
    stockNo: '4766',
    name: '南寶',
  },
  {
    category: '化學工業',
    stockNo: '4767',
    name: '誠泰科技',
  },
  {
    category: '化學工業',
    stockNo: '4768',
    name: '晶呈科技',
  },
  {
    category: '化學工業',
    stockNo: '4770',
    name: '上品',
  },
  {
    category: '化學生技醫療',
    stockNo: '4770',
    name: '上品',
  },
  {
    category: '化學生技醫療',
    stockNo: '4771',
    name: '望隼',
  },
  {
    category: '生技醫療業',
    stockNo: '4771',
    name: '望隼',
  },
  {
    category: '化學工業',
    stockNo: '4772',
    name: '台特化',
  },
  {
    category: '化學工業',
    stockNo: '4773',
    name: '高福',
  },
  {
    category: '文化創意業',
    stockNo: '4803',
    name: 'VHQ-KY',
  },
  {
    category: '觀光事業',
    stockNo: '4804',
    name: '大略-KY',
  },
  {
    category: '觀光餐旅',
    stockNo: '4804',
    name: '大略-KY',
  },
  {
    category: '文化創意業',
    stockNo: '4806',
    name: '昇華',
  },
  {
    category: '貿易百貨',
    stockNo: '4807',
    name: '日成-KY',
  },
  {
    category: '通信網路業',
    stockNo: '4903',
    name: '聯光通',
  },
  {
    category: '通信網路業',
    stockNo: '4904',
    name: '遠傳',
  },
  {
    category: '電子工業',
    stockNo: '4904',
    name: '遠傳',
  },
  {
    category: '通信網路業',
    stockNo: '4905',
    name: '台聯電',
  },
  {
    category: '通信網路業',
    stockNo: '4906',
    name: '正文',
  },
  {
    category: '電子工業',
    stockNo: '4906',
    name: '正文',
  },
  {
    category: '建材營造',
    stockNo: '4907',
    name: '富宇',
  },
  {
    category: '通信網路業',
    stockNo: '4908',
    name: '前鼎',
  },
  {
    category: '通信網路業',
    stockNo: '4909',
    name: '新復興',
  },
  {
    category: '生技醫療業',
    stockNo: '4911',
    name: '德英',
  },
  {
    category: '電子工業',
    stockNo: '4912',
    name: '聯德控股-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '4912',
    name: '聯德控股-KY',
  },
  {
    category: '電子工業',
    stockNo: '4915',
    name: '致伸',
  },
  {
    category: '電子零組件業',
    stockNo: '4915',
    name: '致伸',
  },
  {
    category: '電子工業',
    stockNo: '4916',
    name: '事欣科',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '4916',
    name: '事欣科',
  },
  {
    category: '半導體業',
    stockNo: '4919',
    name: '新唐',
  },
  {
    category: '電子工業',
    stockNo: '4919',
    name: '新唐',
  },
  {
    category: '半導體業',
    stockNo: '4923',
    name: '力士',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '4924',
    name: '欣厚-KY',
  },
  {
    category: '半導體業',
    stockNo: '4925',
    name: '智微',
  },
  {
    category: '電子工業',
    stockNo: '4927',
    name: '泰鼎-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '4927',
    name: '泰鼎-KY',
  },
  {
    category: '電器電纜',
    stockNo: '4930',
    name: '燦星網',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '4931',
    name: '新盛力',
  },
  {
    category: '光電業',
    stockNo: '4933',
    name: '友輝',
  },
  {
    category: '光電業',
    stockNo: '4934',
    name: '太極',
  },
  {
    category: '電子工業',
    stockNo: '4934',
    name: '太極',
  },
  {
    category: '光電業',
    stockNo: '4935',
    name: '茂林-KY',
  },
  {
    category: '電子工業',
    stockNo: '4935',
    name: '茂林-KY',
  },
  {
    category: '電子工業',
    stockNo: '4938',
    name: '和碩',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '4938',
    name: '和碩',
  },
  {
    category: '電子零組件業',
    stockNo: '4939',
    name: '亞電',
  },
  {
    category: '光電業',
    stockNo: '4942',
    name: '嘉彰',
  },
  {
    category: '電子工業',
    stockNo: '4942',
    name: '嘉彰',
  },
  {
    category: '電子工業',
    stockNo: '4943',
    name: '康控-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '4943',
    name: '康控-KY',
  },
  {
    category: '光電業',
    stockNo: '4944',
    name: '兆遠',
  },
  {
    category: '半導體業',
    stockNo: '4945',
    name: '陞達科技',
  },
  {
    category: '文化創意業',
    stockNo: '4946',
    name: '辣椒',
  },
  {
    category: '光電業',
    stockNo: '4949',
    name: '有成精密',
  },
  {
    category: '光電業',
    stockNo: '4949',
    name: '有成精密',
  },
  {
    category: '電子工業',
    stockNo: '4949',
    name: '有成精密',
  },
  {
    category: '其他',
    stockNo: '4950',
    name: '牧東',
  },
  {
    category: '半導體業',
    stockNo: '4951',
    name: '精拓科',
  },
  {
    category: '半導體業',
    stockNo: '4952',
    name: '凌通',
  },
  {
    category: '電子工業',
    stockNo: '4952',
    name: '凌通',
  },
  {
    category: '資訊服務業',
    stockNo: '4953',
    name: '緯軟',
  },
  {
    category: '光電業',
    stockNo: '4956',
    name: '光鋐',
  },
  {
    category: '電子工業',
    stockNo: '4956',
    name: '光鋐',
  },
  {
    category: '電子工業',
    stockNo: '4958',
    name: '臻鼎-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '4958',
    name: '臻鼎-KY',
  },
  {
    category: '光電業',
    stockNo: '4960',
    name: '誠美材',
  },
  {
    category: '電子工業',
    stockNo: '4960',
    name: '誠美材',
  },
  {
    category: '半導體業',
    stockNo: '4961',
    name: '天鈺',
  },
  {
    category: '電子工業',
    stockNo: '4961',
    name: '天鈺',
  },
  {
    category: '半導體業',
    stockNo: '4966',
    name: '譜瑞-KY',
  },
  {
    category: '半導體業',
    stockNo: '4967',
    name: '十銓',
  },
  {
    category: '電子工業',
    stockNo: '4967',
    name: '十銓',
  },
  {
    category: '半導體業',
    stockNo: '4968',
    name: '立積',
  },
  {
    category: '電子工業',
    stockNo: '4968',
    name: '立積',
  },
  {
    category: '半導體業',
    stockNo: '4971',
    name: 'IET-KY',
  },
  {
    category: '光電業',
    stockNo: '4972',
    name: '湯石照明',
  },
  {
    category: '半導體業',
    stockNo: '4973',
    name: '廣穎',
  },
  {
    category: '電子零組件業',
    stockNo: '4974',
    name: '亞泰',
  },
  {
    category: '光電業',
    stockNo: '4976',
    name: '佳凌',
  },
  {
    category: '電子工業',
    stockNo: '4976',
    name: '佳凌',
  },
  {
    category: '通信網路業',
    stockNo: '4977',
    name: '眾達-KY',
  },
  {
    category: '電子工業',
    stockNo: '4977',
    name: '眾達-KY',
  },
  {
    category: '通信網路業',
    stockNo: '4979',
    name: '華星光',
  },
  {
    category: '電子零組件業',
    stockNo: '4980',
    name: '佐臻',
  },
  {
    category: '通信網路業',
    stockNo: '4984',
    name: '科納-KY',
  },
  {
    category: '電子工業',
    stockNo: '4984',
    name: '科納-KY',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '4987',
    name: '科誠',
  },
  {
    category: '電子工業',
    stockNo: '4989',
    name: '榮科',
  },
  {
    category: '電子零組件業',
    stockNo: '4989',
    name: '榮科',
  },
  {
    category: '半導體業',
    stockNo: '4991',
    name: '環宇-KY',
  },
  {
    category: '資訊服務業',
    stockNo: '4994',
    name: '傳奇',
  },
  {
    category: '電子工業',
    stockNo: '4994',
    name: '傳奇',
  },
  {
    category: '光電業',
    stockNo: '4995',
    name: '晶達',
  },
  {
    category: '電子工業',
    stockNo: '4999',
    name: '鑫禾',
  },
  {
    category: '電子零組件業',
    stockNo: '4999',
    name: '鑫禾',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5007',
    name: '三星',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5009',
    name: '榮剛',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5011',
    name: '久陽',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5013',
    name: '強新',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5014',
    name: '建錩',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5015',
    name: '華祺',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5016',
    name: '松和',
  },
  {
    category: '橡膠工業',
    stockNo: '5102',
    name: '富強',
  },
  {
    category: '資訊服務業',
    stockNo: '5201',
    name: '凱衛',
  },
  {
    category: '資訊服務業',
    stockNo: '5202',
    name: '力新',
  },
  {
    category: '資訊服務業',
    stockNo: '5203',
    name: '訊連',
  },
  {
    category: '電子工業',
    stockNo: '5203',
    name: '訊連',
  },
  {
    category: '其他電子類',
    stockNo: '5205',
    name: '中茂',
  },
  {
    category: '綠能環保類',
    stockNo: '5205',
    name: '中茂',
  },
  {
    category: '建材營造',
    stockNo: '5206',
    name: '坤悅',
  },
  {
    category: '其他',
    stockNo: '5209',
    name: '新鼎',
  },
  {
    category: '資訊服務業',
    stockNo: '5209',
    name: '新鼎',
  },
  {
    category: '資訊服務業',
    stockNo: '5210',
    name: '寶碩',
  },
  {
    category: '資訊服務業',
    stockNo: '5211',
    name: '蒙恬',
  },
  {
    category: '資訊服務業',
    stockNo: '5212',
    name: '凌網',
  },
  {
    category: '建材營造',
    stockNo: '5213',
    name: '亞昕',
  },
  {
    category: '電子工業',
    stockNo: '5215',
    name: '科嘉-KY',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5215',
    name: '科嘉-KY',
  },
  {
    category: '光電業',
    stockNo: '5220',
    name: '萬達光電',
  },
  {
    category: '半導體業',
    stockNo: '5222',
    name: '全訊',
  },
  {
    category: '電子工業',
    stockNo: '5222',
    name: '全訊',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5223',
    name: '安力-KY',
  },
  {
    category: '其他電子業',
    stockNo: '5225',
    name: '東科-KY',
  },
  {
    category: '電子工業',
    stockNo: '5225',
    name: '東科-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '5227',
    name: '立凱-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '5228',
    name: '鈺鎧',
  },
  {
    category: '光電業',
    stockNo: '5230',
    name: '雷笛克光學',
  },
  {
    category: '其他電子業',
    stockNo: '5233',
    name: '有量',
  },
  {
    category: '光電業',
    stockNo: '5234',
    name: '達興材料',
  },
  {
    category: '電子工業',
    stockNo: '5234',
    name: '達興材料',
  },
  {
    category: '半導體業',
    stockNo: '5236',
    name: '凌陽創新',
  },
  {
    category: '光電業',
    stockNo: '5240',
    name: '建騰',
  },
  {
    category: '光電業',
    stockNo: '5243',
    name: '乙盛-KY',
  },
  {
    category: '電子工業',
    stockNo: '5243',
    name: '乙盛-KY',
  },
  {
    category: '光電業',
    stockNo: '5244',
    name: '弘凱',
  },
  {
    category: '電子工業',
    stockNo: '5244',
    name: '弘凱',
  },
  {
    category: '光電業',
    stockNo: '5245',
    name: '智晶',
  },
  {
    category: '半導體業',
    stockNo: '5246',
    name: '勵威',
  },
  {
    category: '光電業',
    stockNo: '5248',
    name: '景傳',
  },
  {
    category: '光電業',
    stockNo: '5251',
    name: '天鉞電',
  },
  {
    category: '電子零組件業',
    stockNo: '5254',
    name: '欣訊科技',
  },
  {
    category: '電子工業',
    stockNo: '5258',
    name: '虹堡',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5258',
    name: '虹堡',
  },
  {
    category: '光電業',
    stockNo: '5259',
    name: '奕智博',
  },
  {
    category: '電子工業',
    stockNo: '5259',
    name: '奕智博',
  },
  {
    category: '半導體業',
    stockNo: '5262',
    name: '立達',
  },
  {
    category: '文化創意業',
    stockNo: '5263',
    name: '智崴',
  },
  {
    category: '電子工業',
    stockNo: '5264',
    name: '鎧勝-KY',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5264',
    name: '鎧勝-KY',
  },
  {
    category: '光電業',
    stockNo: '5267',
    name: '龍翩',
  },
  {
    category: '半導體業',
    stockNo: '5269',
    name: '祥碩',
  },
  {
    category: '電子工業',
    stockNo: '5269',
    name: '祥碩',
  },
  {
    category: '電子零組件業',
    stockNo: '5271',
    name: '紘通',
  },
  {
    category: '半導體業',
    stockNo: '5272',
    name: '笙科',
  },
  {
    category: '半導體業',
    stockNo: '5274',
    name: '信驊',
  },
  {
    category: '其他',
    stockNo: '5276',
    name: '達輝-KY',
  },
  {
    category: '光電業',
    stockNo: '5277',
    name: '葳天',
  },
  {
    category: '數位雲端類',
    stockNo: '5278',
    name: '尚凡',
  },
  {
    category: '電子商務業',
    stockNo: '5278',
    name: '尚凡',
  },
  {
    category: '半導體業',
    stockNo: '5280',
    name: 'F-敦泰',
  },
  {
    category: '電子工業',
    stockNo: '5280',
    name: 'F-敦泰',
  },
  {
    category: '光電業',
    stockNo: '5281',
    name: '大峽谷-KY',
  },
  {
    category: '電器電纜',
    stockNo: '5283',
    name: '禾聯碩',
  },
  {
    category: '其他',
    stockNo: '5284',
    name: 'jpp-KY',
  },
  {
    category: '半導體業',
    stockNo: '5285',
    name: '界霖',
  },
  {
    category: '電子工業',
    stockNo: '5285',
    name: '界霖',
  },
  {
    category: '數位雲端類',
    stockNo: '5287',
    name: '數字',
  },
  {
    category: '電子商務業',
    stockNo: '5287',
    name: '數字',
  },
  {
    category: '電機機械',
    stockNo: '5288',
    name: '豐祥-KY',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5289',
    name: '宜鼎',
  },
  {
    category: '電子零組件業',
    stockNo: '5291',
    name: '邑昇',
  },
  {
    category: '綠能環保',
    stockNo: '5292',
    name: '華懋',
  },
  {
    category: '半導體業',
    stockNo: '5297',
    name: '廣化',
  },
  {
    category: '半導體業',
    stockNo: '5299',
    name: '杰力',
  },
  {
    category: '觀光事業',
    stockNo: '5301',
    name: '寶得利',
  },
  {
    category: '觀光餐旅',
    stockNo: '5301',
    name: '寶得利',
  },
  {
    category: '半導體業',
    stockNo: '5302',
    name: '太欣',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5304',
    name: '鼎創達',
  },
  {
    category: '半導體業',
    stockNo: '5305',
    name: '敦南',
  },
  {
    category: '電子工業',
    stockNo: '5305',
    name: '敦南',
  },
  {
    category: '其他',
    stockNo: '5306',
    name: '桂盟',
  },
  {
    category: '運動休閒',
    stockNo: '5306',
    name: '桂盟',
  },
  {
    category: '電子零組件業',
    stockNo: '5309',
    name: '系統電',
  },
  {
    category: '資訊服務業',
    stockNo: '5310',
    name: '天剛',
  },
  {
    category: '生技醫療業',
    stockNo: '5312',
    name: '寶島科',
  },
  {
    category: '半導體業',
    stockNo: '5314',
    name: '世紀',
  },
  {
    category: '光電業',
    stockNo: '5315',
    name: '光聯',
  },
  {
    category: '數位雲端類',
    stockNo: '5321',
    name: '美而快',
  },
  {
    category: '電子商務業',
    stockNo: '5321',
    name: '美而快',
  },
  {
    category: '電子零組件業',
    stockNo: '5321',
    name: '美而快',
  },
  {
    category: '建材營造',
    stockNo: '5324',
    name: '士開',
  },
  {
    category: '電子零組件業',
    stockNo: '5328',
    name: '華容',
  },
  {
    category: '電子零組件業',
    stockNo: '5340',
    name: '建榮',
  },
  {
    category: '半導體業',
    stockNo: '5344',
    name: '立衛',
  },
  {
    category: '其他',
    stockNo: '5345',
    name: '天揚',
  },
  {
    category: '電子零組件業',
    stockNo: '5345',
    name: '天揚',
  },
  {
    category: '半導體業',
    stockNo: '5347',
    name: '世界',
  },
  {
    category: '通信網路業',
    stockNo: '5348',
    name: '正能量智能',
  },
  {
    category: '電子零組件業',
    stockNo: '5349',
    name: '先豐',
  },
  {
    category: '半導體業',
    stockNo: '5351',
    name: '鈺創',
  },
  {
    category: '通信網路業',
    stockNo: '5353',
    name: '台林',
  },
  {
    category: '電子零組件業',
    stockNo: '5355',
    name: '佳總',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5356',
    name: '協益',
  },
  {
    category: '觀光事業',
    stockNo: '5364',
    name: '力麗店',
  },
  {
    category: '觀光餐旅',
    stockNo: '5364',
    name: '力麗店',
  },
  {
    category: '光電業',
    stockNo: '5371',
    name: '中光電',
  },
  {
    category: '電子零組件業',
    stockNo: '5381',
    name: '合正',
  },
  {
    category: '其他電子類',
    stockNo: '5383',
    name: '金利',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5386',
    name: '青雲',
  },
  {
    category: '通信網路業',
    stockNo: '5388',
    name: '中磊',
  },
  {
    category: '電子工業',
    stockNo: '5388',
    name: '中磊',
  },
  {
    category: '光電業',
    stockNo: '5392',
    name: '能率',
  },
  {
    category: '其他',
    stockNo: '5398',
    name: '慕康生醫',
  },
  {
    category: '資訊服務業',
    stockNo: '5403',
    name: '中菲',
  },
  {
    category: '資訊服務業',
    stockNo: '5410',
    name: '國眾',
  },
  {
    category: '半導體業',
    stockNo: '5425',
    name: '台半',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5426',
    name: '振發',
  },
  {
    category: '光電業',
    stockNo: '5432',
    name: '新門',
  },
  {
    category: '電子工業',
    stockNo: '5434',
    name: '崇越',
  },
  {
    category: '電子通路業',
    stockNo: '5434',
    name: '崇越',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5438',
    name: '東友',
  },
  {
    category: '電子零組件業',
    stockNo: '5439',
    name: '高技',
  },
  {
    category: '光電業',
    stockNo: '5443',
    name: '均豪',
  },
  {
    category: '其他',
    stockNo: '5450',
    name: '南良',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5450',
    name: '寶聯通',
  },
  {
    category: '其他電子類',
    stockNo: '5452',
    name: '佶優',
  },
  {
    category: '建材營造',
    stockNo: '5455',
    name: '昇益',
  },
  {
    category: '電子零組件業',
    stockNo: '5457',
    name: '宣德',
  },
  {
    category: '電子零組件業',
    stockNo: '5460',
    name: '同協',
  },
  {
    category: '電子零組件業',
    stockNo: '5464',
    name: '霖宏',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5465',
    name: '富驊',
  },
  {
    category: '半導體業',
    stockNo: '5468',
    name: '凱鈺',
  },
  {
    category: '電子工業',
    stockNo: '5469',
    name: '瀚宇博',
  },
  {
    category: '電子零組件業',
    stockNo: '5469',
    name: '瀚宇博',
  },
  {
    category: '半導體業',
    stockNo: '5471',
    name: '松翰',
  },
  {
    category: '電子工業',
    stockNo: '5471',
    name: '松翰',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5474',
    name: '聰泰',
  },
  {
    category: '電子零組件業',
    stockNo: '5475',
    name: '德宏',
  },
  {
    category: '文化創意業',
    stockNo: '5478',
    name: '智冠',
  },
  {
    category: '其他',
    stockNo: '5481',
    name: '新華',
  },
  {
    category: '電子零組件業',
    stockNo: '5481',
    name: '新華',
  },
  {
    category: '半導體業',
    stockNo: '5483',
    name: '中美晶',
  },
  {
    category: '光電業',
    stockNo: '5484',
    name: '慧友',
  },
  {
    category: '電子工業',
    stockNo: '5484',
    name: '慧友',
  },
  {
    category: '半導體業',
    stockNo: '5487',
    name: '通泰',
  },
  {
    category: '電子零組件業',
    stockNo: '5488',
    name: '松普',
  },
  {
    category: '其他電子類',
    stockNo: '5489',
    name: '彩富',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '5490',
    name: '同亨',
  },
  {
    category: '其他電子類',
    stockNo: '5493',
    name: '三聯',
  },
  {
    category: '電子零組件業',
    stockNo: '5498',
    name: '凱崴',
  },
  {
    category: '建材營造',
    stockNo: '5508',
    name: '永信建',
  },
  {
    category: '建材營造',
    stockNo: '5511',
    name: '德昌',
  },
  {
    category: '建材營造',
    stockNo: '5512',
    name: '力麒',
  },
  {
    category: '建材營造',
    stockNo: '5514',
    name: '三豐',
  },
  {
    category: '建材營造',
    stockNo: '5515',
    name: '建國',
  },
  {
    category: '建材營造',
    stockNo: '5516',
    name: '雙喜',
  },
  {
    category: '建材營造',
    stockNo: '5519',
    name: '隆大',
  },
  {
    category: '建材營造',
    stockNo: '5520',
    name: '力泰',
  },
  {
    category: '建材營造',
    stockNo: '5521',
    name: '工信',
  },
  {
    category: '建材營造',
    stockNo: '5522',
    name: '遠雄',
  },
  {
    category: '建材營造',
    stockNo: '5523',
    name: '豐謙',
  },
  {
    category: '建材營造',
    stockNo: '5525',
    name: '順天',
  },
  {
    category: '建材營造',
    stockNo: '5529',
    name: '鉅陞',
  },
  {
    category: '其他',
    stockNo: '5530',
    name: '龍巖',
  },
  {
    category: '建材營造',
    stockNo: '5531',
    name: '鄉林',
  },
  {
    category: '建材營造',
    stockNo: '5533',
    name: '皇鼎',
  },
  {
    category: '建材營造',
    stockNo: '5534',
    name: '長虹',
  },
  {
    category: '其他電子類',
    stockNo: '5536',
    name: '聖暉*',
  },
  {
    category: '鋼鐵工業',
    stockNo: '5538',
    name: '東明-KY',
  },
  {
    category: '建材營造',
    stockNo: '5543',
    name: '桓鼎-KY',
  },
  {
    category: '建材營造',
    stockNo: '5546',
    name: '永固-KY',
  },
  {
    category: '建材營造',
    stockNo: '5547',
    name: '久舜',
  },
  {
    category: '建材營造',
    stockNo: '5548',
    name: '安倉',
  },
  {
    category: '航運業',
    stockNo: '5601',
    name: '台聯櫃',
  },
  {
    category: '航運業',
    stockNo: '5603',
    name: '陸海',
  },
  {
    category: '其他',
    stockNo: '5604',
    name: '中連',
  },
  {
    category: '航運業',
    stockNo: '5604',
    name: '中連貨',
  },
  {
    category: '航運業',
    stockNo: '5607',
    name: '遠雄港',
  },
  {
    category: '航運業',
    stockNo: '5608',
    name: '四維航',
  },
  {
    category: '航運業',
    stockNo: '5609',
    name: '中菲行',
  },
  {
    category: '觀光事業',
    stockNo: '5701',
    name: '劍湖山',
  },
  {
    category: '觀光餐旅',
    stockNo: '5701',
    name: '劍湖山',
  },
  {
    category: '觀光事業',
    stockNo: '5703',
    name: '亞都',
  },
  {
    category: '觀光餐旅',
    stockNo: '5703',
    name: '亞都',
  },
  {
    category: '觀光事業',
    stockNo: '5704',
    name: '老爺知',
  },
  {
    category: '觀光餐旅',
    stockNo: '5704',
    name: '老爺知',
  },
  {
    category: '觀光事業',
    stockNo: '5706',
    name: '鳳凰',
  },
  {
    category: '觀光餐旅',
    stockNo: '5706',
    name: '鳳凰',
  },
  {
    category: '金融業',
    stockNo: '5820',
    name: '日盛金',
  },
  {
    category: '金融保險',
    stockNo: '5854',
    name: '合庫',
  },
  {
    category: '金融業',
    stockNo: '5859',
    name: '遠壽',
  },
  {
    category: '金融業',
    stockNo: '5863',
    name: '瑞興銀',
  },
  {
    category: '金融業',
    stockNo: '5864',
    name: '致和證',
  },
  {
    category: '其他',
    stockNo: '5871',
    name: '中租-KY',
  },
  {
    category: '其他',
    stockNo: '5871A',
    name: '中租-KY甲特',
  },
  {
    category: '金融保險',
    stockNo: '5876',
    name: '上海商銀',
  },
  {
    category: '金融業',
    stockNo: '5878',
    name: '台名',
  },
  {
    category: '金融保險',
    stockNo: '5880',
    name: '合庫金',
  },
  {
    category: '居家生活類',
    stockNo: '5902',
    name: '德記',
  },
  {
    category: '貿易百貨',
    stockNo: '5902',
    name: '德記',
  },
  {
    category: '居家生活類',
    stockNo: '5903',
    name: '全家',
  },
  {
    category: '貿易百貨',
    stockNo: '5903',
    name: '全家',
  },
  {
    category: '居家生活類',
    stockNo: '5904',
    name: '寶雅',
  },
  {
    category: '貿易百貨',
    stockNo: '5904',
    name: '寶雅',
  },
  {
    category: '觀光餐旅',
    stockNo: '5905',
    name: '南仁湖',
  },
  {
    category: '貿易百貨',
    stockNo: '5905',
    name: '南仁湖',
  },
  {
    category: '貿易百貨',
    stockNo: '5906',
    name: '台南-KY',
  },
  {
    category: '貿易百貨',
    stockNo: '5907',
    name: '大洋-KY',
  },
  {
    category: '金融保險',
    stockNo: '6004',
    name: '元京證',
  },
  {
    category: '金融保險',
    stockNo: '6005',
    name: '群益證',
  },
  {
    category: '金融保險',
    stockNo: '6012',
    name: '金鼎證',
  },
  {
    category: '金融業',
    stockNo: '6015',
    name: '宏遠證',
  },
  {
    category: '金融業',
    stockNo: '6016',
    name: '康和證',
  },
  {
    category: '金融業',
    stockNo: '6020',
    name: '大展證',
  },
  {
    category: '金融業',
    stockNo: '6021',
    name: '美好證',
  },
  {
    category: '金融業',
    stockNo: '6023',
    name: '元大期',
  },
  {
    category: '金融保險',
    stockNo: '6024',
    name: '群益期',
  },
  {
    category: '金融業',
    stockNo: '6026',
    name: '福邦證',
  },
  {
    category: '金融業',
    stockNo: '6027',
    name: '德信',
  },
  {
    category: '金融業',
    stockNo: '6028',
    name: '公勝保經',
  },
  {
    category: '金融業',
    stockNo: '6035',
    name: '悠遊卡',
  },
  {
    category: '文化創意業',
    stockNo: '6101',
    name: '寬魚國際',
  },
  {
    category: '半導體業',
    stockNo: '6103',
    name: '合邦',
  },
  {
    category: '半導體業',
    stockNo: '6104',
    name: '創惟',
  },
  {
    category: '電子工業',
    stockNo: '6108',
    name: '競國',
  },
  {
    category: '電子零組件業',
    stockNo: '6108',
    name: '競國',
  },
  {
    category: '通信網路業',
    stockNo: '6109',
    name: '亞元',
  },
  {
    category: '文化創意業',
    stockNo: '6111',
    name: '大宇資',
  },
  {
    category: '資訊服務業',
    stockNo: '6112',
    name: '邁達特',
  },
  {
    category: '電子工業',
    stockNo: '6112',
    name: '邁達特',
  },
  {
    category: '電子通路業',
    stockNo: '6113',
    name: '亞矽',
  },
  {
    category: '電子零組件業',
    stockNo: '6114',
    name: '久威',
  },
  {
    category: '電子工業',
    stockNo: '6115',
    name: '鎰勝',
  },
  {
    category: '電子零組件業',
    stockNo: '6115',
    name: '鎰勝',
  },
  {
    category: '光電業',
    stockNo: '6116',
    name: '彩晶',
  },
  {
    category: '電子工業',
    stockNo: '6116',
    name: '彩晶',
  },
  {
    category: '電子工業',
    stockNo: '6117',
    name: '迎廣',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6117',
    name: '迎廣',
  },
  {
    category: '電子通路業',
    stockNo: '6118',
    name: '建達',
  },
  {
    category: '電子工業',
    stockNo: '6119',
    name: '大傳',
  },
  {
    category: '電子通路業',
    stockNo: '6119',
    name: '大傳',
  },
  {
    category: '光電業',
    stockNo: '6120',
    name: '達運',
  },
  {
    category: '電子工業',
    stockNo: '6120',
    name: '達運',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6121',
    name: '新普',
  },
  {
    category: '電機機械',
    stockNo: '6122',
    name: '擎邦',
  },
  {
    category: '資訊服務業',
    stockNo: '6123',
    name: '上奇',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6123',
    name: '上奇',
  },
  {
    category: '電子零組件業',
    stockNo: '6124',
    name: '業強',
  },
  {
    category: '光電業',
    stockNo: '6125',
    name: '廣運',
  },
  {
    category: '電子零組件業',
    stockNo: '6126',
    name: '信音',
  },
  {
    category: '電子零組件業',
    stockNo: '6127',
    name: '九豪',
  },
  {
    category: '電子工業',
    stockNo: '6128',
    name: '上福',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6128',
    name: '上福',
  },
  {
    category: '半導體業',
    stockNo: '6129',
    name: '普誠',
  },
  {
    category: '生技醫療業',
    stockNo: '6130',
    name: '上亞科技',
  },
  {
    category: '光電業',
    stockNo: '6131',
    name: '鈞泰',
  },
  {
    category: '電子工業',
    stockNo: '6131',
    name: '鈞泰',
  },
  {
    category: '電子工業',
    stockNo: '6133',
    name: '金橋',
  },
  {
    category: '電子零組件業',
    stockNo: '6133',
    name: '金橋',
  },
  {
    category: '電子零組件業',
    stockNo: '6134',
    name: '萬旭',
  },
  {
    category: '通信網路業',
    stockNo: '6136',
    name: '富爾特',
  },
  {
    category: '電子工業',
    stockNo: '6136',
    name: '富爾特',
  },
  {
    category: '半導體業',
    stockNo: '6138',
    name: '茂達',
  },
  {
    category: '其他電子業',
    stockNo: '6139',
    name: '亞翔',
  },
  {
    category: '電子工業',
    stockNo: '6139',
    name: '亞翔',
  },
  {
    category: '資訊服務業',
    stockNo: '6140',
    name: '訊達',
  },
  {
    category: '電子工業',
    stockNo: '6141',
    name: '柏承',
  },
  {
    category: '電子零組件業',
    stockNo: '6141',
    name: '柏承',
  },
  {
    category: '通信網路業',
    stockNo: '6142',
    name: '友勁',
  },
  {
    category: '電子工業',
    stockNo: '6142',
    name: '友勁',
  },
  {
    category: '通信網路業',
    stockNo: '6143',
    name: '振曜',
  },
  {
    category: '文化創意業',
    stockNo: '6144',
    name: '得利影',
  },
  {
    category: '電子工業',
    stockNo: '6145',
    name: '勁永',
  },
  {
    category: '電子通路業',
    stockNo: '6145',
    name: '勁永',
  },
  {
    category: '其他電子類',
    stockNo: '6146',
    name: '耕興',
  },
  {
    category: '半導體業',
    stockNo: '6147',
    name: '頎邦',
  },
  {
    category: '資訊服務業',
    stockNo: '6148',
    name: '驊宏資',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6150',
    name: '撼訊',
  },
  {
    category: '其他電子類',
    stockNo: '6151',
    name: '晉倫',
  },
  {
    category: '通信網路業',
    stockNo: '6152',
    name: '百一',
  },
  {
    category: '電子工業',
    stockNo: '6152',
    name: '百一',
  },
  {
    category: '電子工業',
    stockNo: '6153',
    name: '嘉聯益',
  },
  {
    category: '電子零組件業',
    stockNo: '6153',
    name: '嘉聯益',
  },
  {
    category: '電子通路業',
    stockNo: '6154',
    name: '順發',
  },
  {
    category: '電子工業',
    stockNo: '6155',
    name: '鈞寶',
  },
  {
    category: '電子零組件業',
    stockNo: '6155',
    name: '鈞寶',
  },
  {
    category: '電子零組件業',
    stockNo: '6156',
    name: '松上',
  },
  {
    category: '電子零組件業',
    stockNo: '6158',
    name: '禾昌',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6160',
    name: '欣技',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6161',
    name: '捷波',
  },
  {
    category: '通信網路業',
    stockNo: '6163',
    name: '華電網',
  },
  {
    category: '光電業',
    stockNo: '6164',
    name: '華興',
  },
  {
    category: '電子工業',
    stockNo: '6164',
    name: '華興',
  },
  {
    category: '其他',
    stockNo: '6165',
    name: '浪凡',
  },
  {
    category: '數位雲端',
    stockNo: '6165',
    name: '浪凡',
  },
  {
    category: '電子工業',
    stockNo: '6165',
    name: '浪凡',
  },
  {
    category: '電子零組件業',
    stockNo: '6165',
    name: '浪凡',
  },
  {
    category: '電子工業',
    stockNo: '6166',
    name: '凌華',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6166',
    name: '凌華',
  },
  {
    category: '光電業',
    stockNo: '6167',
    name: '久正',
  },
  {
    category: '光電業',
    stockNo: '6168',
    name: '宏齊',
  },
  {
    category: '電子工業',
    stockNo: '6168',
    name: '宏齊',
  },
  {
    category: '文化創意業',
    stockNo: '6169',
    name: '昱泉',
  },
  {
    category: '通信網路業',
    stockNo: '6170',
    name: '統振',
  },
  {
    category: '建材營造',
    stockNo: '6171',
    name: '大城地產',
  },
  {
    category: '電子工業',
    stockNo: '6172',
    name: '互億',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6172',
    name: '互億',
  },
  {
    category: '電子零組件業',
    stockNo: '6173',
    name: '信昌電',
  },
  {
    category: '電子零組件業',
    stockNo: '6174',
    name: '安碁',
  },
  {
    category: '電子零組件業',
    stockNo: '6175',
    name: '立敦',
  },
  {
    category: '光電業',
    stockNo: '6176',
    name: '瑞儀',
  },
  {
    category: '電子工業',
    stockNo: '6176',
    name: '瑞儀',
  },
  {
    category: '建材營造',
    stockNo: '6177',
    name: '達麗',
  },
  {
    category: '其他',
    stockNo: '6179',
    name: '亞通',
  },
  {
    category: '文化創意業',
    stockNo: '6180',
    name: '橘子',
  },
  {
    category: '半導體業',
    stockNo: '6182',
    name: '合晶',
  },
  {
    category: '資訊服務業',
    stockNo: '6183',
    name: '關貿',
  },
  {
    category: '電子工業',
    stockNo: '6183',
    name: '關貿',
  },
  {
    category: '其他',
    stockNo: '6184',
    name: '大豐電',
  },
  {
    category: '電子零組件業',
    stockNo: '6185',
    name: '幃翔',
  },
  {
    category: '建材營造',
    stockNo: '6186',
    name: '新潤',
  },
  {
    category: '其他電子類',
    stockNo: '6187',
    name: '萬潤',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6188',
    name: '廣明',
  },
  {
    category: '電子工業',
    stockNo: '6189',
    name: '豐藝',
  },
  {
    category: '電子通路業',
    stockNo: '6189',
    name: '豐藝',
  },
  {
    category: '通信網路業',
    stockNo: '6190',
    name: '萬泰科',
  },
  {
    category: '電子工業',
    stockNo: '6191',
    name: '精成科',
  },
  {
    category: '電子零組件業',
    stockNo: '6191',
    name: '精成科',
  },
  {
    category: '其他電子業',
    stockNo: '6192',
    name: '巨路',
  },
  {
    category: '電子工業',
    stockNo: '6192',
    name: '巨路',
  },
  {
    category: '電子零組件業',
    stockNo: '6194',
    name: '育富',
  },
  {
    category: '居家生活類',
    stockNo: '6195',
    name: '詩肯',
  },
  {
    category: '貿易百貨',
    stockNo: '6195',
    name: '詩肯',
  },
  {
    category: '其他電子業',
    stockNo: '6196',
    name: '帆宣',
  },
  {
    category: '電子工業',
    stockNo: '6196',
    name: '帆宣',
  },
  {
    category: '電子工業',
    stockNo: '6197',
    name: '佳必琪',
  },
  {
    category: '電子零組件業',
    stockNo: '6197',
    name: '佳必琪',
  },
  {
    category: '半導體業',
    stockNo: '6198',
    name: '瑞築',
  },
  {
    category: '其他',
    stockNo: '6199',
    name: '天品',
  },
  {
    category: '其他電子業',
    stockNo: '6201',
    name: '亞弘電',
  },
  {
    category: '電子工業',
    stockNo: '6201',
    name: '亞弘電',
  },
  {
    category: '半導體業',
    stockNo: '6202',
    name: '盛群',
  },
  {
    category: '電子工業',
    stockNo: '6202',
    name: '盛群',
  },
  {
    category: '電子零組件業',
    stockNo: '6203',
    name: '海韻電',
  },
  {
    category: '電子零組件業',
    stockNo: '6204',
    name: '艾華',
  },
  {
    category: '電子工業',
    stockNo: '6205',
    name: '詮欣',
  },
  {
    category: '電子零組件業',
    stockNo: '6205',
    name: '詮欣',
  },
  {
    category: '電子工業',
    stockNo: '6206',
    name: '飛捷',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6206',
    name: '飛捷',
  },
  {
    category: '電子零組件業',
    stockNo: '6207',
    name: '雷科',
  },
  {
    category: '電子零組件業',
    stockNo: '6208',
    name: '日揚',
  },
  {
    category: '光電業',
    stockNo: '6209',
    name: '今國光',
  },
  {
    category: '電子工業',
    stockNo: '6209',
    name: '今國光',
  },
  {
    category: '電子零組件業',
    stockNo: '6210',
    name: '慶生',
  },
  {
    category: '建材營造',
    stockNo: '6212',
    name: '理銘',
  },
  {
    category: '電子工業',
    stockNo: '6213',
    name: '聯茂',
  },
  {
    category: '電子零組件業',
    stockNo: '6213',
    name: '聯茂',
  },
  {
    category: '資訊服務業',
    stockNo: '6214',
    name: '精誠',
  },
  {
    category: '電子工業',
    stockNo: '6214',
    name: '精誠',
  },
  {
    category: '其他電子業',
    stockNo: '6215',
    name: '和椿',
  },
  {
    category: '電子工業',
    stockNo: '6215',
    name: '和椿',
  },
  {
    category: '通信網路業',
    stockNo: '6216',
    name: '居易',
  },
  {
    category: '電子工業',
    stockNo: '6216',
    name: '居易',
  },
  {
    category: '電子零組件業',
    stockNo: '6217',
    name: '中探針',
  },
  {
    category: '通信網路業',
    stockNo: '6218',
    name: '豪勉',
  },
  {
    category: '建材營造',
    stockNo: '6219',
    name: '富旺',
  },
  {
    category: '電子零組件業',
    stockNo: '6220',
    name: '岳豐',
  },
  {
    category: '資訊服務業',
    stockNo: '6221',
    name: '晉泰',
  },
  {
    category: '光電業',
    stockNo: '6222',
    name: '上揚',
  },
  {
    category: '半導體業',
    stockNo: '6223',
    name: '旺矽',
  },
  {
    category: '電子工業',
    stockNo: '6224',
    name: '聚鼎',
  },
  {
    category: '電子零組件業',
    stockNo: '6224',
    name: '聚鼎',
  },
  {
    category: '光電業',
    stockNo: '6225',
    name: '天瀚',
  },
  {
    category: '電子工業',
    stockNo: '6225',
    name: '天瀚',
  },
  {
    category: '光電業',
    stockNo: '6226',
    name: '光鼎',
  },
  {
    category: '電子工業',
    stockNo: '6226',
    name: '光鼎',
  },
  {
    category: '電子通路業',
    stockNo: '6227',
    name: '茂綸',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6228',
    name: '全譜',
  },
  {
    category: '半導體業',
    stockNo: '6229',
    name: '研通',
  },
  {
    category: '電子工業',
    stockNo: '6230',
    name: '尼得科超眾',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6230',
    name: '尼得科超眾',
  },
  {
    category: '資訊服務業',
    stockNo: '6231',
    name: '系微',
  },
  {
    category: '半導體業',
    stockNo: '6233',
    name: '旺玖',
  },
  {
    category: '光電業',
    stockNo: '6234',
    name: '高僑',
  },
  {
    category: '電子工業',
    stockNo: '6235',
    name: '華孚',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6235',
    name: '華孚',
  },
  {
    category: '其他',
    stockNo: '6236',
    name: '中湛',
  },
  {
    category: '半導體業',
    stockNo: '6237',
    name: '驊訊',
  },
  {
    category: '其他電子類',
    stockNo: '6238',
    name: '勝麗',
  },
  {
    category: '半導體業',
    stockNo: '6239',
    name: '力成',
  },
  {
    category: '電子工業',
    stockNo: '6239',
    name: '力成',
  },
  {
    category: '其他',
    stockNo: '6240',
    name: '松崗',
  },
  {
    category: '資訊服務業',
    stockNo: '6240',
    name: '松崗',
  },
  {
    category: '通信網路業',
    stockNo: '6241',
    name: '易通展',
  },
  {
    category: '生技醫療業',
    stockNo: '6242',
    name: '立康',
  },
  {
    category: '半導體業',
    stockNo: '6243',
    name: '迅杰',
  },
  {
    category: '電子工業',
    stockNo: '6243',
    name: '迅杰',
  },
  {
    category: '光電業',
    stockNo: '6244',
    name: '茂迪',
  },
  {
    category: '通信網路業',
    stockNo: '6245',
    name: '立端',
  },
  {
    category: '光電業',
    stockNo: '6246',
    name: '臺龍',
  },
  {
    category: '其他電子類',
    stockNo: '6247',
    name: '淇譽電',
  },
  {
    category: '鋼鐵工業',
    stockNo: '6248',
    name: '沛波',
  },
  {
    category: '電子工業',
    stockNo: '6251',
    name: '定穎',
  },
  {
    category: '電子零組件業',
    stockNo: '6251',
    name: '定穎',
  },
  {
    category: '光電業',
    stockNo: '6255',
    name: '奈普',
  },
  {
    category: '電子工業',
    stockNo: '6255',
    name: '奈普',
  },
  {
    category: '半導體業',
    stockNo: '6257',
    name: '矽格',
  },
  {
    category: '電子工業',
    stockNo: '6257',
    name: '矽格',
  },
  {
    category: '電子零組件業',
    stockNo: '6259',
    name: '百徽',
  },
  {
    category: '半導體業',
    stockNo: '6261',
    name: '久元',
  },
  {
    category: '通信網路業',
    stockNo: '6263',
    name: '普萊德',
  },
  {
    category: '建材營造',
    stockNo: '6264',
    name: '富裔',
  },
  {
    category: '電子通路業',
    stockNo: '6265',
    name: '方土昶',
  },
  {
    category: '電子零組件業',
    stockNo: '6266',
    name: '泰詠',
  },
  {
    category: '電子工業',
    stockNo: '6269',
    name: '台郡',
  },
  {
    category: '電子零組件業',
    stockNo: '6269',
    name: '台郡',
  },
  {
    category: '電子通路業',
    stockNo: '6270',
    name: '倍微',
  },
  {
    category: '半導體業',
    stockNo: '6271',
    name: '同欣電',
  },
  {
    category: '電子工業',
    stockNo: '6271',
    name: '同欣電',
  },
  {
    category: '電子零組件業',
    stockNo: '6272',
    name: '驊陞',
  },
  {
    category: '電子零組件業',
    stockNo: '6274',
    name: '台燿',
  },
  {
    category: '其他電子類',
    stockNo: '6275',
    name: '元山',
  },
  {
    category: '電子零組件業',
    stockNo: '6275',
    name: '元山',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6276',
    name: '安鈦克',
  },
  {
    category: '電子工業',
    stockNo: '6277',
    name: '宏正',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6277',
    name: '宏正',
  },
  {
    category: '光電業',
    stockNo: '6278',
    name: '台表科',
  },
  {
    category: '電子工業',
    stockNo: '6278',
    name: '台表科',
  },
  {
    category: '電子零組件業',
    stockNo: '6279',
    name: '胡連',
  },
  {
    category: '電子工業',
    stockNo: '6280',
    name: '崇貿',
  },
  {
    category: '電子工業',
    stockNo: '6281',
    name: '全國電',
  },
  {
    category: '電子通路業',
    stockNo: '6281',
    name: '全國電',
  },
  {
    category: '電子工業',
    stockNo: '6282',
    name: '康舒',
  },
  {
    category: '電子零組件業',
    stockNo: '6282',
    name: '康舒',
  },
  {
    category: '其他電子業',
    stockNo: '6283',
    name: '淳安',
  },
  {
    category: '電子工業',
    stockNo: '6283',
    name: '淳安',
  },
  {
    category: '電子零組件業',
    stockNo: '6284',
    name: '佳邦',
  },
  {
    category: '通信網路業',
    stockNo: '6285',
    name: '啟碁',
  },
  {
    category: '電子工業',
    stockNo: '6285',
    name: '啟碁',
  },
  {
    category: '半導體業',
    stockNo: '6286',
    name: '立錡',
  },
  {
    category: '電子工業',
    stockNo: '6286',
    name: '立錡',
  },
  {
    category: '半導體業',
    stockNo: '6287',
    name: '元隆',
  },
  {
    category: '汽車工業',
    stockNo: '6288',
    name: '聯嘉',
  },
  {
    category: '光電業',
    stockNo: '6289',
    name: '華上',
  },
  {
    category: '電子工業',
    stockNo: '6289',
    name: '華上',
  },
  {
    category: '電子零組件業',
    stockNo: '6290',
    name: '良維',
  },
  {
    category: '半導體業',
    stockNo: '6291',
    name: '沛亨',
  },
  {
    category: '電子零組件業',
    stockNo: '6292',
    name: '迅德',
  },
  {
    category: '文化創意業',
    stockNo: '6294',
    name: '智基',
  },
  {
    category: '通信網路業',
    stockNo: '6403',
    name: '群登',
  },
  {
    category: '資訊服務業',
    stockNo: '6404',
    name: '通訊-KY',
  },
  {
    category: '光電業',
    stockNo: '6405',
    name: '悅城',
  },
  {
    category: '電子工業',
    stockNo: '6405',
    name: '悅城',
  },
  {
    category: '電子零組件業',
    stockNo: '6407',
    name: '相互',
  },
  {
    category: '其他電子業',
    stockNo: '6409',
    name: '旭隼',
  },
  {
    category: '電子工業',
    stockNo: '6409',
    name: '旭隼',
  },
  {
    category: '半導體業',
    stockNo: '6411',
    name: '晶焱',
  },
  {
    category: '電子工業',
    stockNo: '6412',
    name: '群電',
  },
  {
    category: '電子零組件業',
    stockNo: '6412',
    name: '群電',
  },
  {
    category: '電子工業',
    stockNo: '6414',
    name: '樺漢',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6414',
    name: '樺漢',
  },
  {
    category: '半導體業',
    stockNo: '6415',
    name: '矽力*-KY',
  },
  {
    category: '電子工業',
    stockNo: '6415',
    name: '矽力*-KY',
  },
  {
    category: '通信網路業',
    stockNo: '6416',
    name: '瑞祺電通',
  },
  {
    category: '電子工業',
    stockNo: '6416',
    name: '瑞祺電通',
  },
  {
    category: '通信網路業',
    stockNo: '6417',
    name: '韋僑',
  },
  {
    category: '電子零組件業',
    stockNo: '6418',
    name: '詠昇',
  },
  {
    category: '光電業',
    stockNo: '6419',
    name: '京晨科',
  },
  {
    category: '電子工業',
    stockNo: '6422',
    name: '君耀-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '6422',
    name: '君耀-KY',
  },
  {
    category: '半導體業',
    stockNo: '6423',
    name: '億而得',
  },
  {
    category: '電機機械',
    stockNo: '6425',
    name: '易發',
  },
  {
    category: '通信網路業',
    stockNo: '6426',
    name: '統新',
  },
  {
    category: '通信網路業',
    stockNo: '6426',
    name: '統新',
  },
  {
    category: '電子工業',
    stockNo: '6426',
    name: '統新',
  },
  {
    category: '文化創意業',
    stockNo: '6428',
    name: '台灣淘米',
  },
  {
    category: '光電業',
    stockNo: '6431',
    name: '光麗-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '6431',
    name: '光麗-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6431',
    name: '光麗-KY',
  },
  {
    category: '電子工業',
    stockNo: '6431',
    name: '光麗-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '6432',
    name: '今展科',
  },
  {
    category: '光電業',
    stockNo: '6434',
    name: '達輝光電',
  },
  {
    category: '半導體業',
    stockNo: '6435',
    name: '大中',
  },
  {
    category: '其他電子業',
    stockNo: '6438',
    name: '迅得',
  },
  {
    category: '其他電子類',
    stockNo: '6438',
    name: '迅得',
  },
  {
    category: '電子工業',
    stockNo: '6438',
    name: '迅得',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6441',
    name: '廣錠',
  },
  {
    category: '通信網路業',
    stockNo: '6442',
    name: '光聖',
  },
  {
    category: '電子工業',
    stockNo: '6442',
    name: '光聖',
  },
  {
    category: '光電業',
    stockNo: '6443',
    name: '元晶',
  },
  {
    category: '電子工業',
    stockNo: '6443',
    name: '元晶',
  },
  {
    category: '化學生技醫療',
    stockNo: '6446',
    name: '藥華藥',
  },
  {
    category: '生技醫療業',
    stockNo: '6446',
    name: '藥華藥',
  },
  {
    category: '生技醫療業',
    stockNo: '6446',
    name: '藥華藥',
  },
  {
    category: '電子工業',
    stockNo: '6449',
    name: '鈺邦',
  },
  {
    category: '電子零組件業',
    stockNo: '6449',
    name: '鈺邦',
  },
  {
    category: '半導體業',
    stockNo: '6451',
    name: '訊芯-KY',
  },
  {
    category: '電子工業',
    stockNo: '6451',
    name: '訊芯-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '6452',
    name: '康友-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6452',
    name: '康友-KY',
  },
  {
    category: '光電業',
    stockNo: '6456',
    name: 'GIS-KY',
  },
  {
    category: '電子工業',
    stockNo: '6456',
    name: 'GIS-KY',
  },
  {
    category: '半導體業',
    stockNo: '6457',
    name: '紘康',
  },
  {
    category: '生技醫療業',
    stockNo: '6461',
    name: '益得',
  },
  {
    category: '半導體業',
    stockNo: '6462',
    name: '神盾',
  },
  {
    category: '其他',
    stockNo: '6464',
    name: '台數科',
  },
  {
    category: '通信網路業',
    stockNo: '6465',
    name: '威潤',
  },
  {
    category: '生技醫療業',
    stockNo: '6469',
    name: '大樹',
  },
  {
    category: '通信網路業',
    stockNo: '6470',
    name: '宇智',
  },
  {
    category: '化學生技醫療',
    stockNo: '6472',
    name: '保瑞',
  },
  {
    category: '生技醫療業',
    stockNo: '6472',
    name: '保瑞',
  },
  {
    category: '生技醫療業',
    stockNo: '6472',
    name: '保瑞',
  },
  {
    category: '數位雲端',
    stockNo: '6473',
    name: '美賣*',
  },
  {
    category: '電子通路業',
    stockNo: '6474',
    name: '華豫寧',
  },
  {
    category: '光電業',
    stockNo: '6477',
    name: '安集',
  },
  {
    category: '電子工業',
    stockNo: '6477',
    name: '安集',
  },
  {
    category: '文化創意業',
    stockNo: '6482',
    name: '弘煜科',
  },
  {
    category: '生技醫療業',
    stockNo: '6483',
    name: '原創生醫',
  },
  {
    category: '半導體業',
    stockNo: '6485',
    name: '點序',
  },
  {
    category: '通信網路業',
    stockNo: '6486',
    name: '互動',
  },
  {
    category: '半導體業',
    stockNo: '6488',
    name: '環球晶',
  },
  {
    category: '化學生技醫療',
    stockNo: '6491',
    name: '晶碩',
  },
  {
    category: '生技醫療業',
    stockNo: '6491',
    name: '晶碩',
  },
  {
    category: '生技醫療業',
    stockNo: '6492',
    name: '生華科',
  },
  {
    category: '生技醫療業',
    stockNo: '6493',
    name: '雷虎生',
  },
  {
    category: '半導體業',
    stockNo: '6494',
    name: '九齊',
  },
  {
    category: '化學工業',
    stockNo: '6495',
    name: '納諾*-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6496',
    name: '科懋',
  },
  {
    category: '生技醫療業',
    stockNo: '6497',
    name: '亞獅康-KY',
  },
  {
    category: '光電業',
    stockNo: '6498',
    name: '久禾光',
  },
  {
    category: '生技醫療業',
    stockNo: '6499',
    name: '益安',
  },
  {
    category: '其他',
    stockNo: '6504',
    name: '南六',
  },
  {
    category: '油電燃氣業',
    stockNo: '6505',
    name: '台塑化',
  },
  {
    category: '化學工業',
    stockNo: '6506',
    name: '雙邦',
  },
  {
    category: '紡織纖維',
    stockNo: '6506',
    name: '雙邦',
  },
  {
    category: '農業科技業',
    stockNo: '6508',
    name: '惠光',
  },
  {
    category: '化學工業',
    stockNo: '6509',
    name: '聚和',
  },
  {
    category: '半導體業',
    stockNo: '6510',
    name: '精測',
  },
  {
    category: '其他電子類',
    stockNo: '6512',
    name: '啟發電',
  },
  {
    category: '通信網路業',
    stockNo: '6514',
    name: '芮特-KY',
  },
  {
    category: '半導體業',
    stockNo: '6515',
    name: '穎崴',
  },
  {
    category: '電子工業',
    stockNo: '6515',
    name: '穎崴',
  },
  {
    category: '資訊服務業',
    stockNo: '6516',
    name: '勤崴國際',
  },
  {
    category: '光電業',
    stockNo: '6517',
    name: '保勝光學',
  },
  {
    category: '生技醫療業',
    stockNo: '6518',
    name: '康科特',
  },
  {
    category: '生技醫療業',
    stockNo: '6523',
    name: '達爾膚',
  },
  {
    category: '半導體業',
    stockNo: '6525',
    name: '捷敏-KY',
  },
  {
    category: '電子工業',
    stockNo: '6525',
    name: '捷敏-KY',
  },
  {
    category: '半導體業',
    stockNo: '6526',
    name: '達發',
  },
  {
    category: '電子工業',
    stockNo: '6526',
    name: '達發',
  },
  {
    category: '生技醫療業',
    stockNo: '6527',
    name: '明達醫',
  },
  {
    category: '通信網路業',
    stockNo: '6530',
    name: '創威',
  },
  {
    category: '半導體業',
    stockNo: '6531',
    name: '愛普*',
  },
  {
    category: '電子工業',
    stockNo: '6531',
    name: '愛普*',
  },
  {
    category: '半導體業',
    stockNo: '6532',
    name: '瑞耘',
  },
  {
    category: '半導體業',
    stockNo: '6533',
    name: '晶心科',
  },
  {
    category: '電子工業',
    stockNo: '6533',
    name: '晶心科',
  },
  {
    category: '創新版股票',
    stockNo: '6534',
    name: '正瀚-創',
  },
  {
    category: '生技醫療業',
    stockNo: '6535',
    name: '順藥',
  },
  {
    category: '資訊服務業',
    stockNo: '6536',
    name: '碩豐',
  },
  {
    category: '電子零組件業',
    stockNo: '6538',
    name: '倉和',
  },
  {
    category: '生技醫療業',
    stockNo: '6539',
    name: '麗彤',
  },
  {
    category: '化學生技醫療',
    stockNo: '6541',
    name: '泰福-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6541',
    name: '泰福-KY',
  },
  {
    category: '文化創意業',
    stockNo: '6542',
    name: '隆中',
  },
  {
    category: '生技醫療業',
    stockNo: '6543',
    name: '普惠醫工',
  },
  {
    category: '通信網路業',
    stockNo: '6546',
    name: '正基',
  },
  {
    category: '生技醫療業',
    stockNo: '6547',
    name: '高端疫苗',
  },
  {
    category: '半導體業',
    stockNo: '6548',
    name: '長科*',
  },
  {
    category: '生技醫療業',
    stockNo: '6549',
    name: '景凱',
  },
  {
    category: '化學生技醫療',
    stockNo: '6550',
    name: '北極星藥業-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6550',
    name: '北極星藥業-KY',
  },
  {
    category: '半導體業',
    stockNo: '6552',
    name: '易華電',
  },
  {
    category: '電子工業',
    stockNo: '6552',
    name: '易華電',
  },
  {
    category: '電子零組件業',
    stockNo: '6555',
    name: '榮炭',
  },
  {
    category: '光電業',
    stockNo: '6556',
    name: '勝品',
  },
  {
    category: '其他電子業',
    stockNo: '6558',
    name: '興能高',
  },
  {
    category: '電子工業',
    stockNo: '6558',
    name: '興能高',
  },
  {
    category: '光電業',
    stockNo: '6559',
    name: '研晶',
  },
  {
    category: '光電業',
    stockNo: '6560',
    name: '欣普羅',
  },
  {
    category: '通信網路業',
    stockNo: '6561',
    name: '是方',
  },
  {
    category: '生技醫療業',
    stockNo: '6562',
    name: '聯亞藥',
  },
  {
    category: '生技醫療業',
    stockNo: '6564',
    name: '安特羅',
  },
  {
    category: '數位雲端',
    stockNo: '6565',
    name: '物聯',
  },
  {
    category: '半導體業',
    stockNo: '6568',
    name: '宏觀',
  },
  {
    category: '生技醫療業',
    stockNo: '6569',
    name: '醫揚',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6570',
    name: '維田',
  },
  {
    category: '生技醫療業',
    stockNo: '6572',
    name: '博錸',
  },
  {
    category: '半導體業',
    stockNo: '6573',
    name: '虹揚-KY',
  },
  {
    category: '電子工業',
    stockNo: '6573',
    name: '虹揚-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6574',
    name: '霈方',
  },
  {
    category: '生技醫療業',
    stockNo: '6576',
    name: '逸達',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6577',
    name: '勁豐',
  },
  {
    category: '農業科技業',
    stockNo: '6578',
    name: '達邦蛋白',
  },
  {
    category: '電子工業',
    stockNo: '6579',
    name: '研揚',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6579',
    name: '研揚',
  },
  {
    category: '生技醫療業',
    stockNo: '6580',
    name: '台睿',
  },
  {
    category: '其他',
    stockNo: '6581',
    name: '鋼聯',
  },
  {
    category: '綠能環保',
    stockNo: '6581',
    name: '鋼聯',
  },
  {
    category: '橡膠工業',
    stockNo: '6582',
    name: '申豐',
  },
  {
    category: '文化創意業',
    stockNo: '6583',
    name: '友松',
  },
  {
    category: '電子零組件業',
    stockNo: '6584',
    name: '南俊國際',
  },
  {
    category: '其他',
    stockNo: '6585',
    name: '鼎基',
  },
  {
    category: '生技醫療業',
    stockNo: '6586',
    name: '醣基',
  },
  {
    category: '通信網路業',
    stockNo: '6588',
    name: '東典光電',
  },
  {
    category: '生技醫療業',
    stockNo: '6589',
    name: '台康生技',
  },
  {
    category: '資訊服務業',
    stockNo: '6590',
    name: '普鴻',
  },
  {
    category: '電子工業',
    stockNo: '6591',
    name: '動力-KY',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6591',
    name: '動力-KY',
  },
  {
    category: '其他',
    stockNo: '6592',
    name: '和潤企業',
  },
  {
    category: '其他',
    stockNo: '6592A',
    name: '和潤企業甲特',
  },
  {
    category: '其他',
    stockNo: '6592B',
    name: '和潤企業乙特',
  },
  {
    category: '資訊服務業',
    stockNo: '6593',
    name: '台灣銘板',
  },
  {
    category: '半導體業',
    stockNo: '6594',
    name: '展匯科',
  },
  {
    category: '文化創意業',
    stockNo: '6595',
    name: '光禹國際',
  },
  {
    category: '文化創意業',
    stockNo: '6596',
    name: '寬宏藝術',
  },
  {
    category: '電子零組件業',
    stockNo: '6597',
    name: '立誠',
  },
  {
    category: '化學生技醫療',
    stockNo: '6598',
    name: 'ABC-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6598',
    name: 'ABC-KY',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6599',
    name: '普達系統',
  },
  {
    category: '電機機械',
    stockNo: '6603',
    name: '富強鑫',
  },
  {
    category: '汽車工業',
    stockNo: '6605',
    name: '帝寶',
  },
  {
    category: '電機機械',
    stockNo: '6606',
    name: '建德工業',
  },
  {
    category: '電機機械',
    stockNo: '6609',
    name: '瀧澤科',
  },
  {
    category: '生技醫療業',
    stockNo: '6610',
    name: '安成生技',
  },
  {
    category: '生技醫療業',
    stockNo: '6612',
    name: '奈米醫材',
  },
  {
    category: '其他電子類',
    stockNo: '6613',
    name: '朋億*',
  },
  {
    category: '生技醫療業',
    stockNo: '6615',
    name: '慧智',
  },
  {
    category: '其他',
    stockNo: '6616',
    name: '特昇-KY',
  },
  {
    category: '居家生活類',
    stockNo: '6616',
    name: '特昇-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6617',
    name: '共信-KY',
  },
  {
    category: '化學工業',
    stockNo: '6618',
    name: '永虹先進',
  },
  {
    category: '生技醫療業',
    stockNo: '6620',
    name: '漢達',
  },
  {
    category: '生技醫療業',
    stockNo: '6621',
    name: '華宇藥',
  },
  {
    category: '文化創意業',
    stockNo: '6622',
    name: '百聿數碼',
  },
  {
    category: '其他',
    stockNo: '6624',
    name: '萬年清',
  },
  {
    category: '綠能環保類',
    stockNo: '6624',
    name: '萬年清',
  },
  {
    category: '其他',
    stockNo: '6625',
    name: '必應',
  },
  {
    category: '文化創意業',
    stockNo: '6626',
    name: '唯數',
  },
  {
    category: '其他',
    stockNo: '6629',
    name: '泰金-KY',
  },
  {
    category: '居家生活類',
    stockNo: '6629',
    name: '泰金-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6634',
    name: '欣耀',
  },
  {
    category: '生技醫療業',
    stockNo: '6637',
    name: '醫影',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6638',
    name: '沅聖',
  },
  {
    category: '油電燃氣業',
    stockNo: '6639',
    name: '源大環能',
  },
  {
    category: '半導體業',
    stockNo: '6640',
    name: '均華',
  },
  {
    category: '其他',
    stockNo: '6641',
    name: '基士德-KY',
  },
  {
    category: '綠能環保',
    stockNo: '6641',
    name: '基士德-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '6642',
    name: '富致',
  },
  {
    category: '半導體業',
    stockNo: '6643',
    name: 'M31',
  },
  {
    category: '創新版股票',
    stockNo: '6645',
    name: '金萬林-創',
  },
  {
    category: '其他電子業',
    stockNo: '6648',
    name: '斯其大',
  },
  {
    category: '生技醫療業',
    stockNo: '6649',
    name: '台生材',
  },
  {
    category: '文化創意業',
    stockNo: '6650',
    name: '帝圖',
  },
  {
    category: '半導體業',
    stockNo: '6651',
    name: '全宇昕',
  },
  {
    category: '生技醫療業',
    stockNo: '6652',
    name: '雅祥生醫',
  },
  {
    category: '其他電子類',
    stockNo: '6654',
    name: '天正國際',
  },
  {
    category: '其他',
    stockNo: '6655',
    name: '科定',
  },
  {
    category: '化學生技醫療',
    stockNo: '6657',
    name: '華安',
  },
  {
    category: '生技醫療業',
    stockNo: '6657',
    name: '華安',
  },
  {
    category: '其他電子業',
    stockNo: '6658',
    name: '聯策',
  },
  {
    category: '電子工業',
    stockNo: '6658',
    name: '聯策',
  },
  {
    category: '生技醫療業',
    stockNo: '6661',
    name: '威健生技',
  },
  {
    category: '生技醫療業',
    stockNo: '6662',
    name: '樂斯科',
  },
  {
    category: '電子零組件業',
    stockNo: '6664',
    name: '群翊',
  },
  {
    category: '生技醫療業',
    stockNo: '6665',
    name: '康聯生醫',
  },
  {
    category: '化學生技醫療',
    stockNo: '6666',
    name: '羅麗芬-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6666',
    name: '羅麗芬-KY',
  },
  {
    category: '其他電子類',
    stockNo: '6667',
    name: '信紘科',
  },
  {
    category: '光電業',
    stockNo: '6668',
    name: '中揚光',
  },
  {
    category: '電子工業',
    stockNo: '6668',
    name: '中揚光',
  },
  {
    category: '電子工業',
    stockNo: '6669',
    name: '緯穎',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6669',
    name: '緯穎',
  },
  {
    category: '其他',
    stockNo: '6670',
    name: '復盛應用',
  },
  {
    category: '運動休閒',
    stockNo: '6670',
    name: '復盛應用',
  },
  {
    category: '其他',
    stockNo: '6671',
    name: '三能-KY',
  },
  {
    category: '居家生活',
    stockNo: '6671',
    name: '三能-KY',
  },
  {
    category: '電子工業',
    stockNo: '6672',
    name: '騰輝電子-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '6672',
    name: '騰輝電子-KY',
  },
  {
    category: '光電業',
    stockNo: '6673',
    name: '和詮',
  },
  {
    category: '通信網路業',
    stockNo: '6674',
    name: '鋐寶科技',
  },
  {
    category: '電子工業',
    stockNo: '6674',
    name: '鋐寶科技',
  },
  {
    category: '生技醫療業',
    stockNo: '6676',
    name: '祥翊',
  },
  {
    category: '生技醫療業',
    stockNo: '6677',
    name: '瑩碩生技',
  },
  {
    category: '半導體業',
    stockNo: '6679',
    name: '鈺太',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6680',
    name: '鑫創電子',
  },
  {
    category: '光電業',
    stockNo: '6682',
    name: '華旭矽材',
  },
  {
    category: '半導體業',
    stockNo: '6683',
    name: '雍智科技',
  },
  {
    category: '半導體業',
    stockNo: '6684',
    name: '安格',
  },
  {
    category: '其他電子業',
    stockNo: '6689',
    name: '伊雲谷',
  },
  {
    category: '數位雲端',
    stockNo: '6689',
    name: '伊雲谷',
  },
  {
    category: '電子工業',
    stockNo: '6689',
    name: '伊雲谷',
  },
  {
    category: '數位雲端類',
    stockNo: '6690',
    name: '安碁資訊',
  },
  {
    category: '資訊服務業',
    stockNo: '6690',
    name: '安碁資訊',
  },
  {
    category: '其他電子業',
    stockNo: '6691',
    name: '洋基工程',
  },
  {
    category: '電子工業',
    stockNo: '6691',
    name: '洋基工程',
  },
  {
    category: '綠能環保類',
    stockNo: '6692',
    name: '進能服',
  },
  {
    category: '半導體業',
    stockNo: '6693',
    name: '廣閎科',
  },
  {
    category: '半導體業',
    stockNo: '6695',
    name: '芯鼎',
  },
  {
    category: '電子工業',
    stockNo: '6695',
    name: '芯鼎',
  },
  {
    category: '生技醫療業',
    stockNo: '6696',
    name: '仁新',
  },
  {
    category: '資訊服務業',
    stockNo: '6697',
    name: '東捷資訊',
  },
  {
    category: '其他電子業',
    stockNo: '6698',
    name: '旭暉應材',
  },
  {
    category: '電子工業',
    stockNo: '6698',
    name: '旭暉應材',
  },
  {
    category: '半導體業',
    stockNo: '6699',
    name: '奇邑',
  },
  {
    category: '航運業',
    stockNo: '6702',
    name: '興航',
  },
  {
    category: '生技醫療業',
    stockNo: '6703',
    name: '軒郁',
  },
  {
    category: '生技醫療業',
    stockNo: '6704',
    name: '國璽幹細胞',
  },
  {
    category: '電機機械',
    stockNo: '6705',
    name: '振躍精密',
  },
  {
    category: '光電業',
    stockNo: '6706',
    name: '惠特',
  },
  {
    category: '電子工業',
    stockNo: '6706',
    name: '惠特',
  },
  {
    category: '電子通路業',
    stockNo: '6707',
    name: '富基電通',
  },
  {
    category: '半導體業',
    stockNo: '6708',
    name: '天擎',
  },
  {
    category: '生技醫療業',
    stockNo: '6709',
    name: '昱厚生技',
  },
  {
    category: '生技醫療業',
    stockNo: '6712',
    name: '長聖',
  },
  {
    category: '電子工業',
    stockNo: '6715',
    name: '嘉基',
  },
  {
    category: '電子零組件業',
    stockNo: '6715',
    name: '嘉基',
  },
  {
    category: '半導體業',
    stockNo: '6716',
    name: '應廣',
  },
  {
    category: '半導體業',
    stockNo: '6719',
    name: '力智',
  },
  {
    category: '電子工業',
    stockNo: '6719',
    name: '力智',
  },
  {
    category: '半導體業',
    stockNo: '6720',
    name: '久昌',
  },
  {
    category: '其他',
    stockNo: '6721',
    name: '信實',
  },
  {
    category: '其他電子業',
    stockNo: '6722',
    name: '輝創',
  },
  {
    category: '綠能環保',
    stockNo: '6723',
    name: '傑智環境',
  },
  {
    category: '其他電子業',
    stockNo: '6725',
    name: '矽科宏晟',
  },
  {
    category: '電子零組件業',
    stockNo: '6727',
    name: '亞泰金屬',
  },
  {
    category: '居家生活類',
    stockNo: '6728',
    name: '上洋',
  },
  {
    category: '貿易百貨',
    stockNo: '6728',
    name: '上洋',
  },
  {
    category: '光電業',
    stockNo: '6729',
    name: '機光科技',
  },
  {
    category: '生技醫療業',
    stockNo: '6730',
    name: '常廣',
  },
  {
    category: '半導體業',
    stockNo: '6732',
    name: '昇佳電子',
  },
  {
    category: '生技醫療業',
    stockNo: '6733',
    name: '博晟生醫',
  },
  {
    category: '生技醫療業',
    stockNo: '6734',
    name: '安盛生',
  },
  {
    category: '其他電子類',
    stockNo: '6735',
    name: '美達科技',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6737',
    name: '秀育',
  },
  {
    category: '資訊服務業',
    stockNo: '6738',
    name: '鼎恒',
  },
  {
    category: '其他電子業',
    stockNo: '6739',
    name: '竹陞科技',
  },
  {
    category: '數位雲端類',
    stockNo: '6741',
    name: '91APP*-KY',
  },
  {
    category: '電子商務業',
    stockNo: '6741',
    name: '91APP*-KY',
  },
  {
    category: '光電業',
    stockNo: '6742',
    name: '澤米',
  },
  {
    category: '電子工業',
    stockNo: '6742',
    name: '澤米',
  },
  {
    category: '其他電子業',
    stockNo: '6743',
    name: '安普新',
  },
  {
    category: '電子工業',
    stockNo: '6743',
    name: '安普新',
  },
  {
    category: '生技醫療業',
    stockNo: '6744',
    name: '豐技生技',
  },
  {
    category: '生技醫療業',
    stockNo: '6747',
    name: '亨泰光',
  },
  {
    category: '生技醫療業',
    stockNo: '6748',
    name: '亞果生醫',
  },
  {
    category: '其他電子業',
    stockNo: '6750',
    name: '泰創工程',
  },
  {
    category: '資訊服務業',
    stockNo: '6751',
    name: '智聯服務',
  },
  {
    category: '資訊服務業',
    stockNo: '6752',
    name: '叡揚',
  },
  {
    category: '航運業',
    stockNo: '6753',
    name: '龍德造船',
  },
  {
    category: '其他',
    stockNo: '6754',
    name: '匯僑設計',
  },
  {
    category: '居家生活',
    stockNo: '6754',
    name: '匯僑設計',
  },
  {
    category: '電子零組件業',
    stockNo: '6755',
    name: '連鋐科技',
  },
  {
    category: '半導體業',
    stockNo: '6756',
    name: '威鋒電子',
  },
  {
    category: '電子工業',
    stockNo: '6756',
    name: '威鋒電子',
  },
  {
    category: '創新版股票',
    stockNo: '6757',
    name: '台灣虎航-創',
  },
  {
    category: '生技醫療業',
    stockNo: '6758',
    name: '冠亞',
  },
  {
    category: '電子零組件業',
    stockNo: '6761',
    name: '穩得',
  },
  {
    category: '生技醫療業',
    stockNo: '6762',
    name: '達亞',
  },
  {
    category: '數位雲端類',
    stockNo: '6763',
    name: '綠界科技',
  },
  {
    category: '電子商務業',
    stockNo: '6763',
    name: '綠界科技',
  },
  {
    category: '其他',
    stockNo: '6764',
    name: '亞洲教育',
  },
  {
    category: '生技醫療業',
    stockNo: '6767',
    name: '台微醫',
  },
  {
    category: '其他',
    stockNo: '6768',
    name: '志強-KY',
  },
  {
    category: '運動休閒',
    stockNo: '6768',
    name: '志強-KY',
  },
  {
    category: '半導體業',
    stockNo: '6770',
    name: '力積電',
  },
  {
    category: '電子工業',
    stockNo: '6770',
    name: '力積電',
  },
  {
    category: '綠能環保',
    stockNo: '6771',
    name: '平和環保',
  },
  {
    category: '光電業',
    stockNo: '6775',
    name: '穎台科技',
  },
  {
    category: '電子工業',
    stockNo: '6776',
    name: '展碁國際',
  },
  {
    category: '電子通路業',
    stockNo: '6776',
    name: '展碁國際',
  },
  {
    category: '文化創意業',
    stockNo: '6780',
    name: '學習王',
  },
  {
    category: '電子工業',
    stockNo: '6781',
    name: 'AES-KY',
  },
  {
    category: '電子零組件業',
    stockNo: '6781',
    name: 'AES-KY',
  },
  {
    category: '化學生技醫療',
    stockNo: '6782',
    name: '視陽',
  },
  {
    category: '生技醫療業',
    stockNo: '6782',
    name: '視陽',
  },
  {
    category: '通信網路業',
    stockNo: '6784',
    name: '天凱科技',
  },
  {
    category: '生技醫療業',
    stockNo: '6785',
    name: '昱展新藥',
  },
  {
    category: '半導體業',
    stockNo: '6786',
    name: '芯測',
  },
  {
    category: '光電業',
    stockNo: '6787',
    name: '晶瑞光',
  },
  {
    category: '半導體業',
    stockNo: '6788',
    name: '華景電',
  },
  {
    category: '半導體業',
    stockNo: '6789',
    name: '采鈺',
  },
  {
    category: '電子工業',
    stockNo: '6789',
    name: '采鈺',
  },
  {
    category: '造紙工業',
    stockNo: '6790',
    name: '永豐實',
  },
  {
    category: '資訊服務業',
    stockNo: '6791',
    name: '虎門科技',
  },
  {
    category: '通信網路業',
    stockNo: '6792',
    name: '詠業',
  },
  {
    category: '電子工業',
    stockNo: '6792',
    name: '詠業',
  },
  {
    category: '其他',
    stockNo: '6793',
    name: '天力離岸',
  },
  {
    category: '生技醫療業',
    stockNo: '6794',
    name: '向榮生技',
  },
  {
    category: '化學生技醫療',
    stockNo: '6796',
    name: '晉弘',
  },
  {
    category: '生技醫療業',
    stockNo: '6796',
    name: '晉弘',
  },
  {
    category: '生技醫療業',
    stockNo: '6797',
    name: '圓點奈米',
  },
  {
    category: '運動休閒',
    stockNo: '6798',
    name: '展逸',
  },
  {
    category: '半導體業',
    stockNo: '6799',
    name: '來頡',
  },
  {
    category: '電子工業',
    stockNo: '6799',
    name: '來頡',
  },
  {
    category: '其他',
    stockNo: '6803',
    name: '崑鼎',
  },
  {
    category: '綠能環保類',
    stockNo: '6803',
    name: '崑鼎',
  },
  {
    category: '其他',
    stockNo: '6804',
    name: '明係',
  },
  {
    category: '運動休閒類',
    stockNo: '6804',
    name: '明係',
  },
  {
    category: '電子工業',
    stockNo: '6805',
    name: '富世達',
  },
  {
    category: '電子零組件業',
    stockNo: '6805',
    name: '富世達',
  },
  {
    category: '其他',
    stockNo: '6806',
    name: '森崴能源',
  },
  {
    category: '綠能環保',
    stockNo: '6806',
    name: '森崴能源',
  },
  {
    category: '其他',
    stockNo: '6807',
    name: '峰源-KY',
  },
  {
    category: '居家生活',
    stockNo: '6807',
    name: '峰源-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6808',
    name: '三鼎生技',
  },
  {
    category: '生技醫療業',
    stockNo: '6810',
    name: '新穎生醫',
  },
  {
    category: '數位雲端類',
    stockNo: '6811',
    name: '宏碁資訊',
  },
  {
    category: '資訊服務業',
    stockNo: '6811',
    name: '宏碁資訊',
  },
  {
    category: '光電業',
    stockNo: '6812',
    name: '梭特',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6813',
    name: '富動科',
  },
  {
    category: '生技醫療業',
    stockNo: '6814',
    name: '路迦生醫',
  },
  {
    category: '生技醫療業',
    stockNo: '6815',
    name: '晶鑽生醫',
  },
  {
    category: '資訊服務業',
    stockNo: '6816',
    name: '捷智商訊',
  },
  {
    category: '生技醫療業',
    stockNo: '6817',
    name: '溫士頓',
  },
  {
    category: '通信網路業',
    stockNo: '6818',
    name: '連騰',
  },
  {
    category: '半導體業',
    stockNo: '6819',
    name: '眾智',
  },
  {
    category: '通信網路業',
    stockNo: '6820',
    name: '連訊',
  },
  {
    category: '電子零組件業',
    stockNo: '6821',
    name: '聯寶',
  },
  {
    category: '半導體業',
    stockNo: '6823',
    name: '濾能',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6825',
    name: '和暢科技',
  },
  {
    category: '其他電子業',
    stockNo: '6826',
    name: '和淞',
  },
  {
    category: '生技醫療業',
    stockNo: '6827',
    name: '巨生醫',
  },
  {
    category: '電機機械',
    stockNo: '6829',
    name: '千附精密',
  },
  {
    category: '其他電子業',
    stockNo: '6830',
    name: '汎銓',
  },
  {
    category: '電子工業',
    stockNo: '6830',
    name: '汎銓',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6831',
    name: '邁科',
  },
  {
    category: '其他',
    stockNo: '6832',
    name: '金鼎科',
  },
  {
    category: '電子零組件業',
    stockNo: '6833',
    name: '太康精密',
  },
  {
    category: '電子工業',
    stockNo: '6834',
    name: '天二科技',
  },
  {
    category: '電子零組件業',
    stockNo: '6834',
    name: '天二科技',
  },
  {
    category: '電子工業',
    stockNo: '6835',
    name: '圓裕',
  },
  {
    category: '電子零組件業',
    stockNo: '6835',
    name: '圓裕',
  },
  {
    category: '生技醫療業',
    stockNo: '6838',
    name: '台新藥',
  },
  {
    category: '綠能環保',
    stockNo: '6839',
    name: '開陽能源',
  },
  {
    category: '其他電子類',
    stockNo: '6840',
    name: '東研信超',
  },
  {
    category: '生技醫療業',
    stockNo: '6841',
    name: '長佳智能',
  },
  {
    category: '半導體業',
    stockNo: '6842',
    name: '一元素',
  },
  {
    category: '電機機械',
    stockNo: '6843',
    name: '進典',
  },
  {
    category: '生技醫療業',
    stockNo: '6844',
    name: '諾貝兒',
  },
  {
    category: '食品工業',
    stockNo: '6846',
    name: '綠茵',
  },
  {
    category: '生技醫療業',
    stockNo: '6847',
    name: '普瑞博',
  },
  {
    category: '生技醫療業',
    stockNo: '6848',
    name: '拉法醫',
  },
  {
    category: '生技醫療業',
    stockNo: '6850',
    name: '光鼎生技',
  },
  {
    category: '創新板股票',
    stockNo: '6854',
    name: '錼創科技-KY創',
  },
  {
    category: '創新版股票',
    stockNo: '6854',
    name: '錼創科技-KY創',
  },
  {
    category: '其他電子類',
    stockNo: '6855',
    name: '數泓科',
  },
  {
    category: '文化創意業',
    stockNo: '6856',
    name: '鑫傳',
  },
  {
    category: '生技醫療業',
    stockNo: '6857',
    name: '宏碁智醫',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6858',
    name: '愛比科技',
  },
  {
    category: '光電業',
    stockNo: '6859',
    name: '伯特光',
  },
  {
    category: '化學生技醫療',
    stockNo: '6861',
    name: '睿生光電',
  },
  {
    category: '生技醫療業',
    stockNo: '6861',
    name: '睿生光電',
  },
  {
    category: '通信網路業',
    stockNo: '6863',
    name: '永道-KY',
  },
  {
    category: '電子工業',
    stockNo: '6863',
    name: '永道-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '6864',
    name: '元樟生技',
  },
  {
    category: '資訊服務業',
    stockNo: '6865',
    name: '偉康科技',
  },
  {
    category: '光電業',
    stockNo: '6867',
    name: '坦德科技',
  },
  {
    category: '資訊服務業',
    stockNo: '6868',
    name: '采威國際',
  },
  {
    category: '創新板股票',
    stockNo: '6869',
    name: '雲豹能源-創',
  },
  {
    category: '創新版股票',
    stockNo: '6869',
    name: '雲豹能源-創',
  },
  {
    category: '數位雲端類',
    stockNo: '6870',
    name: '騰雲',
  },
  {
    category: '生技醫療業',
    stockNo: '6872',
    name: '浩宇生醫',
  },
  {
    category: '創新板股票',
    stockNo: '6873',
    name: '泓德能源-創',
  },
  {
    category: '創新版股票',
    stockNo: '6873',
    name: '泓德能源-創',
  },
  {
    category: '資訊服務業',
    stockNo: '6874',
    name: '倍力',
  },
  {
    category: '生技醫療業',
    stockNo: '6875',
    name: '國邑*',
  },
  {
    category: '生技醫療業',
    stockNo: '6876',
    name: '朗齊生醫*',
  },
  {
    category: '其他電子類',
    stockNo: '6877',
    name: '鏵友益',
  },
  {
    category: '金融業',
    stockNo: '6878',
    name: '歐付寶',
  },
  {
    category: '生技醫療業',
    stockNo: '6879',
    name: '大江基因',
  },
  {
    category: '其他',
    stockNo: '6881',
    name: '潤德',
  },
  {
    category: '資訊服務業',
    stockNo: '6882',
    name: '甲尚',
  },
  {
    category: '資訊服務業',
    stockNo: '6884',
    name: '海柏特',
  },
  {
    category: '生技醫療業',
    stockNo: '6885',
    name: '全福生技',
  },
  {
    category: '食品工業',
    stockNo: '6886',
    name: '遠東生技',
  },
  {
    category: '生技醫療業',
    stockNo: '6891',
    name: '樂迦再生',
  },
  {
    category: '生技醫療業',
    stockNo: '6892',
    name: '台寶生醫',
  },
  {
    category: '綠能環保類',
    stockNo: '6894',
    name: '衛司特',
  },
  {
    category: '半導體業',
    stockNo: '6895',
    name: '宏碩系統',
  },
  {
    category: '資訊服務業',
    stockNo: '6898',
    name: '程曦資訊',
  },
  {
    category: '光電業',
    stockNo: '6899',
    name: '創為精密',
  },
  {
    category: '其他',
    stockNo: '6901',
    name: '鑽石投資',
  },
  {
    category: '創新版股票',
    stockNo: '6902',
    name: '走著瞧-創',
  },
  {
    category: '其他電子業',
    stockNo: '6903',
    name: '巨漢',
  },
  {
    category: '其他',
    stockNo: '6904',
    name: '伯鑫',
  },
  {
    category: '數位雲端',
    stockNo: '6906',
    name: '現觀科',
  },
  {
    category: '電子通路業',
    stockNo: '6908',
    name: '宏碁遊戲',
  },
  {
    category: '半導體業',
    stockNo: '6909',
    name: '創控',
  },
  {
    category: '數位雲端',
    stockNo: '6910',
    name: '德鴻',
  },
  {
    category: '其他',
    stockNo: '6911',
    name: '群運',
  },
  {
    category: '綠能環保',
    stockNo: '6912',
    name: '益鈞環科*',
  },
  {
    category: '電子零組件業',
    stockNo: '6913',
    name: '鴻呈',
  },
  {
    category: '其他',
    stockNo: '6914',
    name: '阜爾運通',
  },
  {
    category: '其他',
    stockNo: '6914',
    name: '阜爾運通',
  },
  {
    category: '電子零組件業',
    stockNo: '6915',
    name: '美強光',
  },
  {
    category: '光電業',
    stockNo: '6916',
    name: '華凌',
  },
  {
    category: '電子工業',
    stockNo: '6916',
    name: '華凌',
  },
  {
    category: '生技醫療業',
    stockNo: '6917',
    name: '竟天',
  },
  {
    category: '生技醫療業',
    stockNo: '6918',
    name: '愛派司',
  },
  {
    category: '生技醫療業',
    stockNo: '6919',
    name: '康霈*',
  },
  {
    category: '半導體業',
    stockNo: '6920',
    name: '恆勁科技',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6922',
    name: '宸曜',
  },
  {
    category: '綠能環保',
    stockNo: '6923',
    name: '中台',
  },
  {
    category: '數位雲端',
    stockNo: '6925',
    name: '意藍',
  },
  {
    category: '生技醫療業',
    stockNo: '6926',
    name: '聖安生醫',
  },
  {
    category: '半導體業',
    stockNo: '6927',
    name: '聯合聚晶',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6928',
    name: '攸泰科技',
  },
  {
    category: '生技醫療業',
    stockNo: '6929',
    name: '佑全',
  },
  {
    category: '生技醫療業',
    stockNo: '6931',
    name: '青松健康',
  },
  {
    category: '生技醫療業',
    stockNo: '6932',
    name: '水星生醫*',
  },
  {
    category: '電子工業',
    stockNo: '6933',
    name: 'AMAX-KY',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '6933',
    name: 'AMAX-KY',
  },
  {
    category: '食品工業',
    stockNo: '6935',
    name: '王子製藥',
  },
  {
    category: '農業科技',
    stockNo: '6936',
    name: '永鴻生技',
  },
  {
    category: '半導體業',
    stockNo: '6937',
    name: '天虹',
  },
  {
    category: '電子工業',
    stockNo: '6937',
    name: '天虹',
  },
  {
    category: '資訊服務業',
    stockNo: '6938',
    name: '藍新資訊',
  },
  {
    category: '生技醫療業',
    stockNo: '6939',
    name: '啟弘生技',
  },
  {
    category: '電子零組件業',
    stockNo: '6940',
    name: '格斯科技*',
  },
  {
    category: '綠能環保',
    stockNo: '6944',
    name: '兆聯實業',
  },
  {
    category: '生技醫療業',
    stockNo: '6945',
    name: '圓祥生技',
  },
  {
    category: '綠能環保',
    stockNo: '6947',
    name: '台鎔科技',
  },
  {
    category: '創新版股票',
    stockNo: '6949',
    name: '沛爾生醫-創',
  },
  {
    category: '綠能環保',
    stockNo: '6951',
    name: '青新',
  },
  {
    category: '農業科技',
    stockNo: '6952',
    name: '大武山',
  },
  {
    category: '半導體業',
    stockNo: '6953',
    name: '家碩',
  },
  {
    category: '生技醫療業',
    stockNo: '6955',
    name: '邦睿生技',
  },
  {
    category: '其他',
    stockNo: '6958',
    name: '日盛台駿',
  },
  {
    category: '化學工業',
    stockNo: '6959',
    name: '兆捷科技',
  },
  {
    category: '觀光餐旅',
    stockNo: '6961',
    name: '旅天下',
  },
  {
    category: '食品工業',
    stockNo: '6963',
    name: '品元',
  },
  {
    category: '電子零組件業',
    stockNo: '6967',
    name: '汎瑋材料',
  },
  {
    category: '居家生活',
    stockNo: '6968',
    name: '萬達寵物',
  },
  {
    category: '綠能環保',
    stockNo: '6971',
    name: '惠民實業',
  },
  {
    category: '生技醫療業',
    stockNo: '6973',
    name: '永立榮',
  },
  {
    category: '生技醫療業',
    stockNo: '6976',
    name: '育世博-KY',
  },
  {
    category: '綠能環保',
    stockNo: '6977',
    name: '聯純',
  },
  {
    category: '通信網路業',
    stockNo: '6980',
    name: '鐳洋科技',
  },
  {
    category: '電機機械',
    stockNo: '6982',
    name: '大井泵浦',
  },
  {
    category: '其他電子業',
    stockNo: '6983',
    name: '華洋精機',
  },
  {
    category: '數位雲端',
    stockNo: '6984',
    name: '交流資服',
  },
  {
    category: '生技醫療業',
    stockNo: '6986',
    name: '和迅',
  },
  {
    category: '綠能環保',
    stockNo: '6990',
    name: '華鉬',
  },
  {
    category: '綠能環保',
    stockNo: '6994',
    name: '富威電力',
  },
  {
    category: '半導體業',
    stockNo: '6996',
    name: '力領科技',
  },
  {
    category: '數位雲端',
    stockNo: '6997',
    name: '博弘',
  },
  {
    category: '所有證券',
    stockNo: '708785',
    name: '信驊中信9B購01',
  },
  {
    category: '所有證券',
    stockNo: '709403',
    name: '雙美國票9B購01',
  },
  {
    category: '所有證券',
    stockNo: '709966',
    name: '金居群益9B購01',
  },
  {
    category: '所有證券',
    stockNo: '709972',
    name: '旺矽元大9B購01',
  },
  {
    category: '所有證券',
    stockNo: '709983',
    name: '群聯日盛9B購01',
  },
  {
    category: '所有證券',
    stockNo: '709985',
    name: '大江富邦9B購02',
  },
  {
    category: '所有證券',
    stockNo: '709994',
    name: '中美晶元大9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710499',
    name: '網家國泰9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710502',
    name: '泰博元大9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710505',
    name: '泰博富邦9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710509',
    name: '建榮凱基9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710510',
    name: '群聯凱基9B購03',
  },
  {
    category: '所有證券',
    stockNo: '710516',
    name: '宇峻永豐9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710533',
    name: '鈊象元大9B購04',
  },
  {
    category: '所有證券',
    stockNo: '710534',
    name: '鈺太元大9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710553',
    name: '穩懋統一9B購03',
  },
  {
    category: '所有證券',
    stockNo: '710560',
    name: '宏捷科元大9B購02',
  },
  {
    category: '所有證券',
    stockNo: '710561',
    name: '威剛元大9B購02',
  },
  {
    category: '所有證券',
    stockNo: '710566',
    name: '碩禾元大9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710569',
    name: '中美晶富邦9B購04',
  },
  {
    category: '所有證券',
    stockNo: '710575',
    name: '環球晶中信9B購01',
  },
  {
    category: '所有證券',
    stockNo: '710590',
    name: '鈺太凱基9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711126',
    name: '聯亞元大9B購05',
  },
  {
    category: '所有證券',
    stockNo: '711127',
    name: '頎邦元大9B購03',
  },
  {
    category: '所有證券',
    stockNo: '711131',
    name: '胡連永豐9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711132',
    name: '僑威永豐9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711133',
    name: '寶雅永豐9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711134',
    name: '中美晶群益9B購03',
  },
  {
    category: '所有證券',
    stockNo: '711135',
    name: '元太群益9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711137',
    name: '胡連群益9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711139',
    name: '中美晶凱基9B購02',
  },
  {
    category: '所有證券',
    stockNo: '711140',
    name: '旺矽凱基9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711141',
    name: '胡連凱基9B購01',
  },
  {
    category: '所有證券',
    stockNo: '711145',
    name: '環球晶國票9B購02',
  },
  {
    category: '所有證券',
    stockNo: '73107P',
    name: '原相國票9B售02',
  },
  {
    category: '所有證券',
    stockNo: '73193P',
    name: '神盾元大9B售04',
  },
  {
    category: '光電業',
    stockNo: '7402',
    name: '邑錡',
  },
  {
    category: '電子零組件業',
    stockNo: '7419',
    name: '達勝',
  },
  {
    category: '生技醫療業',
    stockNo: '7427',
    name: '華上生醫',
  },
  {
    category: '其他',
    stockNo: '7443',
    name: '凡事康',
  },
  {
    category: '綠能環保',
    stockNo: '7507',
    name: '環拓科技',
  },
  {
    category: '其他',
    stockNo: '7516',
    name: '清淨海',
  },
  {
    category: '半導體業',
    stockNo: '7530',
    name: '鋒魁科技',
  },
  {
    category: '數位雲端',
    stockNo: '7547',
    name: '碩網',
  },
  {
    category: '數位雲端',
    stockNo: '7551',
    name: '知識科技',
  },
  {
    category: '生技醫療業',
    stockNo: '7555',
    name: '美萌',
  },
  {
    category: '半導體業',
    stockNo: '7556',
    name: '意德士',
  },
  {
    category: '其他',
    stockNo: '7558',
    name: '群利科技',
  },
  {
    category: '生技醫療業',
    stockNo: '7561',
    name: '光晟生技',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '7562',
    name: '博來科技',
  },
  {
    category: '觀光餐旅',
    stockNo: '7566',
    name: '亞果遊艇',
  },
  {
    category: '生技醫療業',
    stockNo: '7575',
    name: '安美得',
  },
  {
    category: '其他',
    stockNo: '7578',
    name: '利百景',
  },
  {
    category: '綠能環保',
    stockNo: '7583',
    name: '國際海洋',
  },
  {
    category: '文化創意業',
    stockNo: '7584',
    name: '樂意',
  },
  {
    category: '其他',
    stockNo: '7590',
    name: '怡和國際',
  },
  {
    category: '生技醫療業',
    stockNo: '7595',
    name: '世基生醫',
  },
  {
    category: '生技醫療業',
    stockNo: '7607',
    name: '通用幹細胞*',
  },
  {
    category: '綠能環保',
    stockNo: '7610',
    name: '聯友金屬',
  },
  {
    category: '其他電子業',
    stockNo: '7631',
    name: '聚賢研發',
  },
  {
    category: '電機機械',
    stockNo: '7642',
    name: '昶瑞機電',
  },
  {
    category: '綠能環保',
    stockNo: '7702',
    name: '前端風電',
  },
  {
    category: '其他電子業',
    stockNo: '7703',
    name: '銳澤',
  },
  {
    category: '半導體業',
    stockNo: '7704',
    name: '明遠精密',
  },
  {
    category: '觀光餐旅',
    stockNo: '7705',
    name: '三商餐飲',
  },
  {
    category: '其他',
    stockNo: '7706',
    name: '宏碁創達',
  },
  {
    category: '半導體業',
    stockNo: '7707',
    name: '益芯科',
  },
  {
    category: '觀光餐旅',
    stockNo: '7708',
    name: '全家餐飲',
  },
  {
    category: '電機機械',
    stockNo: '7709',
    name: '榮田',
  },
  {
    category: '半導體業',
    stockNo: '7712',
    name: '博盛半導體',
  },
  {
    category: '生技醫療業',
    stockNo: '7713',
    name: '威力德生醫',
  },
  {
    category: '數位雲端',
    stockNo: '7714',
    name: '創泓科技',
  },
  {
    category: '綠能環保',
    stockNo: '7715',
    name: '裕山',
  },
  {
    category: '航運業',
    stockNo: '7716',
    name: '昱臺國際',
  },
  {
    category: '鋼鐵工業',
    stockNo: '7718',
    name: '友鋮',
  },
  {
    category: '其他',
    stockNo: '7719',
    name: '碳基',
  },
  {
    category: '數位雲端',
    stockNo: '7721',
    name: '微程式',
  },
  {
    category: '數位雲端',
    stockNo: '7722',
    name: 'LINEPAY',
  },
  {
    category: '觀光餐旅',
    stockNo: '7723',
    name: '築間',
  },
  {
    category: '生技醫療業',
    stockNo: '7725',
    name: '列特博',
  },
  {
    category: '生技醫療業',
    stockNo: '7726',
    name: '暄達',
  },
  {
    category: '其他電子業',
    stockNo: '7728',
    name: '光焱科技',
  },
  {
    category: '生技醫療業',
    stockNo: '7729',
    name: '仲恩生醫',
  },
  {
    category: '半導體業',
    stockNo: '7730',
    name: '暉盛',
  },
  {
    category: '食品工業',
    stockNo: '7731',
    name: '火星生技*',
  },
  {
    category: '電機機械',
    stockNo: '7732',
    name: '金興精密',
  },
  {
    category: '半導體業',
    stockNo: '7734',
    name: '印能科技',
  },
  {
    category: '電機機械',
    stockNo: '7736',
    name: '虎山',
  },
  {
    category: '食品工業',
    stockNo: '7743',
    name: '金利食安',
  },
  {
    category: '電子工業',
    stockNo: '8008',
    name: '建興電',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8008',
    name: '建興電',
  },
  {
    category: '通信網路業',
    stockNo: '8011',
    name: '台通',
  },
  {
    category: '電子工業',
    stockNo: '8011',
    name: '台通',
  },
  {
    category: '半導體業',
    stockNo: '8016',
    name: '矽創',
  },
  {
    category: '電子工業',
    stockNo: '8016',
    name: '矽創',
  },
  {
    category: '其他電子業',
    stockNo: '8021',
    name: '尖點',
  },
  {
    category: '電子工業',
    stockNo: '8021',
    name: '尖點',
  },
  {
    category: '半導體業',
    stockNo: '8024',
    name: '佑華',
  },
  {
    category: '電機機械',
    stockNo: '8027',
    name: '鈦昇',
  },
  {
    category: '半導體業',
    stockNo: '8028',
    name: '昇陽半導體',
  },
  {
    category: '電子工業',
    stockNo: '8028',
    name: '昇陽半導體',
  },
  {
    category: '電子通路業',
    stockNo: '8032',
    name: '光菱',
  },
  {
    category: '其他',
    stockNo: '8033',
    name: '雷虎',
  },
  {
    category: '通信網路業',
    stockNo: '8034',
    name: '榮群',
  },
  {
    category: '電子零組件業',
    stockNo: '8038',
    name: '長園科',
  },
  {
    category: '電子工業',
    stockNo: '8039',
    name: '台虹',
  },
  {
    category: '電子零組件業',
    stockNo: '8039',
    name: '台虹',
  },
  {
    category: '半導體業',
    stockNo: '8040',
    name: '九暘',
  },
  {
    category: '電機機械',
    stockNo: '8041',
    name: '東元精電',
  },
  {
    category: '電子零組件業',
    stockNo: '8042',
    name: '金山電',
  },
  {
    category: '電子零組件業',
    stockNo: '8043',
    name: '蜜望實',
  },
  {
    category: '數位雲端類',
    stockNo: '8044',
    name: '網家',
  },
  {
    category: '電子商務業',
    stockNo: '8044',
    name: '網家',
  },
  {
    category: '通信網路業',
    stockNo: '8045',
    name: '達運光電',
  },
  {
    category: '電子工業',
    stockNo: '8046',
    name: '南電',
  },
  {
    category: '電子零組件業',
    stockNo: '8046',
    name: '南電',
  },
  {
    category: '其他電子類',
    stockNo: '8047',
    name: '星雲',
  },
  {
    category: '通信網路業',
    stockNo: '8048',
    name: '德勝',
  },
  {
    category: '光電業',
    stockNo: '8049',
    name: '晶采',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8050',
    name: '廣積',
  },
  {
    category: '半導體業',
    stockNo: '8054',
    name: '安國',
  },
  {
    category: '通信網路業',
    stockNo: '8059',
    name: '凱碩',
  },
  {
    category: '光電業',
    stockNo: '8064',
    name: '東捷',
  },
  {
    category: '居家生活類',
    stockNo: '8066',
    name: '來思達',
  },
  {
    category: '貿易百貨',
    stockNo: '8066',
    name: '來思達',
  },
  {
    category: '電子通路業',
    stockNo: '8067',
    name: '志旭',
  },
  {
    category: '電子通路業',
    stockNo: '8068',
    name: '全達',
  },
  {
    category: '光電業',
    stockNo: '8069',
    name: '元太',
  },
  {
    category: '電子工業',
    stockNo: '8070',
    name: '長華*',
  },
  {
    category: '電子通路業',
    stockNo: '8070',
    name: '長華*',
  },
  {
    category: '電子零組件業',
    stockNo: '8071',
    name: '能率網通',
  },
  {
    category: '電子工業',
    stockNo: '8072',
    name: '陞泰',
  },
  {
    category: '電子通路業',
    stockNo: '8072',
    name: '陞泰',
  },
  {
    category: '電子零組件業',
    stockNo: '8074',
    name: '鉅橡',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8076',
    name: '伍豐',
  },
  {
    category: '觀光事業',
    stockNo: '8077',
    name: '洛碁',
  },
  {
    category: '觀光餐旅',
    stockNo: '8077',
    name: '洛碁',
  },
  {
    category: '通信網路業',
    stockNo: '8078',
    name: '華寶',
  },
  {
    category: '電子工業',
    stockNo: '8078',
    name: '華寶',
  },
  {
    category: '建材營造',
    stockNo: '8080',
    name: '印鉐',
  },
  {
    category: '電子零組件業',
    stockNo: '8080',
    name: '永利聯合',
  },
  {
    category: '半導體業',
    stockNo: '8081',
    name: '致新',
  },
  {
    category: '電子工業',
    stockNo: '8081',
    name: '致新',
  },
  {
    category: '電機機械',
    stockNo: '8083',
    name: '瑞穎',
  },
  {
    category: '電子通路業',
    stockNo: '8084',
    name: '巨虹',
  },
  {
    category: '其他電子類',
    stockNo: '8085',
    name: '福華',
  },
  {
    category: '半導體業',
    stockNo: '8086',
    name: '宏捷科',
  },
  {
    category: '光電業',
    stockNo: '8087',
    name: '華鎂鑫',
  },
  {
    category: '綠能環保類',
    stockNo: '8087',
    name: '華鎂鑫',
  },
  {
    category: '半導體業',
    stockNo: '8088',
    name: '品安',
  },
  {
    category: '通信網路業',
    stockNo: '8089',
    name: '康全電訊',
  },
  {
    category: '電子零組件業',
    stockNo: '8091',
    name: '翔名',
  },
  {
    category: '其他電子類',
    stockNo: '8092',
    name: '建暐',
  },
  {
    category: '電子零組件業',
    stockNo: '8093',
    name: '保銳',
  },
  {
    category: '電子通路業',
    stockNo: '8096',
    name: '擎亞',
  },
  {
    category: '通信網路業',
    stockNo: '8097',
    name: '常珵',
  },
  {
    category: '半導體業',
    stockNo: '8098',
    name: '慶康科技',
  },
  {
    category: '資訊服務業',
    stockNo: '8099',
    name: '大世科',
  },
  {
    category: '通信網路業',
    stockNo: '8101',
    name: '華冠',
  },
  {
    category: '電子工業',
    stockNo: '8101',
    name: '華冠',
  },
  {
    category: '半導體業',
    stockNo: '8102',
    name: '傑霖科技',
  },
  {
    category: '電子工業',
    stockNo: '8103',
    name: '瀚荃',
  },
  {
    category: '電子零組件業',
    stockNo: '8103',
    name: '瀚荃',
  },
  {
    category: '光電業',
    stockNo: '8104',
    name: '錸寶',
  },
  {
    category: '電子工業',
    stockNo: '8104',
    name: '錸寶',
  },
  {
    category: '光電業',
    stockNo: '8105',
    name: '凌巨',
  },
  {
    category: '電子工業',
    stockNo: '8105',
    name: '凌巨',
  },
  {
    category: '電機機械',
    stockNo: '8107',
    name: '大億金茂',
  },
  {
    category: '電子零組件業',
    stockNo: '8109',
    name: '博大',
  },
  {
    category: '半導體業',
    stockNo: '8110',
    name: '華東',
  },
  {
    category: '電子工業',
    stockNo: '8110',
    name: '華東',
  },
  {
    category: '光電業',
    stockNo: '8111',
    name: '立碁',
  },
  {
    category: '電子工業',
    stockNo: '8112',
    name: '至上',
  },
  {
    category: '電子通路業',
    stockNo: '8112',
    name: '至上',
  },
  {
    category: '電子工業',
    stockNo: '8112A',
    name: '至上甲特',
  },
  {
    category: '電子通路業',
    stockNo: '8112A',
    name: '至上甲特',
  },
  {
    category: '電子工業',
    stockNo: '8114',
    name: '振樺電',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8114',
    name: '振樺電',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8119',
    name: '公信',
  },
  {
    category: '電子零組件業',
    stockNo: '8121',
    name: '越峰',
  },
  {
    category: '半導體業',
    stockNo: '8131',
    name: '福懋科',
  },
  {
    category: '電子工業',
    stockNo: '8131',
    name: '福懋科',
  },
  {
    category: '電子零組件業',
    stockNo: '8147',
    name: '正淩',
  },
  {
    category: '半導體業',
    stockNo: '8150',
    name: '南茂',
  },
  {
    category: '電子工業',
    stockNo: '8150',
    name: '南茂',
  },
  {
    category: '電子零組件業',
    stockNo: '8155',
    name: '博智',
  },
  {
    category: '創新版股票',
    stockNo: '8162',
    name: '微矽電子-創',
  },
  {
    category: '電子工業',
    stockNo: '8163',
    name: '達方',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8163',
    name: '達方',
  },
  {
    category: '綠能環保類',
    stockNo: '8171',
    name: '天宇',
  },
  {
    category: '通信網路業',
    stockNo: '8171',
    name: '天宇',
  },
  {
    category: '通信網路業',
    stockNo: '8176',
    name: '智捷',
  },
  {
    category: '電子零組件業',
    stockNo: '8182',
    name: '加高',
  },
  {
    category: '其他電子類',
    stockNo: '8183',
    name: '精星',
  },
  {
    category: '光電業',
    stockNo: '8199',
    name: '廣鎵',
  },
  {
    category: '電子工業',
    stockNo: '8199',
    name: '廣鎵',
  },
  {
    category: '其他電子業',
    stockNo: '8201',
    name: '無敵',
  },
  {
    category: '電子工業',
    stockNo: '8201',
    name: '無敵',
  },
  {
    category: '電子工業',
    stockNo: '8210',
    name: '勤誠',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8210',
    name: '勤誠',
  },
  {
    category: '電子工業',
    stockNo: '8213',
    name: '志超',
  },
  {
    category: '電子零組件業',
    stockNo: '8213',
    name: '志超',
  },
  {
    category: '光電業',
    stockNo: '8215',
    name: '明基材',
  },
  {
    category: '電子工業',
    stockNo: '8215',
    name: '明基材',
  },
  {
    category: '電機機械',
    stockNo: '8222',
    name: '寶一',
  },
  {
    category: '半導體業',
    stockNo: '8227',
    name: '巨有科技',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8234',
    name: '新漢',
  },
  {
    category: '光電業',
    stockNo: '8240',
    name: '華宏',
  },
  {
    category: '電子工業',
    stockNo: '8249',
    name: '菱光',
  },
  {
    category: '電子零組件業',
    stockNo: '8249',
    name: '菱光',
  },
  {
    category: '電機機械',
    stockNo: '8255',
    name: '朋程',
  },
  {
    category: '半導體業',
    stockNo: '8261',
    name: '富鼎',
  },
  {
    category: '電子工業',
    stockNo: '8261',
    name: '富鼎',
  },
  {
    category: '半導體業',
    stockNo: '8271',
    name: '宇瞻',
  },
  {
    category: '電子工業',
    stockNo: '8271',
    name: '宇瞻',
  },
  {
    category: '資訊服務業',
    stockNo: '8272',
    name: '全景軟體',
  },
  {
    category: '半導體業',
    stockNo: '8277',
    name: '商丞',
  },
  {
    category: '生技醫療業',
    stockNo: '8279',
    name: '生展',
  },
  {
    category: '資訊服務業',
    stockNo: '8284',
    name: '三竹',
  },
  {
    category: '電子零組件業',
    stockNo: '8289',
    name: '泰藝',
  },
  {
    category: '電子零組件業',
    stockNo: '8291',
    name: '尚茂',
  },
  {
    category: '資訊服務業',
    stockNo: '8298',
    name: '威睿',
  },
  {
    category: '半導體業',
    stockNo: '8299',
    name: '群聯',
  },
  {
    category: '文化創意業',
    stockNo: '8329',
    name: '台視',
  },
  {
    category: '其他',
    stockNo: '8341',
    name: '日友',
  },
  {
    category: '綠能環保',
    stockNo: '8341',
    name: '日友',
  },
  {
    category: '其他',
    stockNo: '8342',
    name: '益張',
  },
  {
    category: '鋼鐵工業',
    stockNo: '8349',
    name: '恒耀',
  },
  {
    category: '鋼鐵工業',
    stockNo: '8349A',
    name: '恒耀甲特',
  },
  {
    category: '其他',
    stockNo: '8354',
    name: '冠好',
  },
  {
    category: '塑膠工業',
    stockNo: '8354',
    name: '冠好',
  },
  {
    category: '電子零組件業',
    stockNo: '8358',
    name: '金居',
  },
  {
    category: '觀光餐旅',
    stockNo: '8359',
    name: '錢櫃',
  },
  {
    category: '航運業',
    stockNo: '8367',
    name: '建新國際',
  },
  {
    category: '電機機械',
    stockNo: '8374',
    name: '羅昇',
  },
  {
    category: '其他電子類',
    stockNo: '8383',
    name: '千附',
  },
  {
    category: '其他',
    stockNo: '8390',
    name: '金益鼎',
  },
  {
    category: '綠能環保類',
    stockNo: '8390',
    name: '金益鼎',
  },
  {
    category: '其他',
    stockNo: '8401',
    name: '白紗科',
  },
  {
    category: '生技醫療業',
    stockNo: '8403',
    name: '盛弘',
  },
  {
    category: '其他',
    stockNo: '8404',
    name: '百和興業-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '8406',
    name: '金可-KY',
  },
  {
    category: '生技醫療業',
    stockNo: '8409',
    name: '商之器',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '8410',
    name: '森田',
  },
  {
    category: '其他',
    stockNo: '8411',
    name: '福貞-KY',
  },
  {
    category: '鋼鐵工業',
    stockNo: '8415',
    name: '大國鋼',
  },
  {
    category: '資訊服務業',
    stockNo: '8416',
    name: '實威',
  },
  {
    category: '其他',
    stockNo: '8418',
    name: '捷必勝-KY',
  },
  {
    category: '其他',
    stockNo: '8420',
    name: '明揚',
  },
  {
    category: '運動休閒類',
    stockNo: '8420',
    name: '明揚',
  },
  {
    category: '其他',
    stockNo: '8421',
    name: '旭源',
  },
  {
    category: '其他',
    stockNo: '8422',
    name: '可寧衛',
  },
  {
    category: '綠能環保',
    stockNo: '8422',
    name: '可寧衛',
  },
  {
    category: '其他',
    stockNo: '8423',
    name: '保綠-KY',
  },
  {
    category: '綠能環保類',
    stockNo: '8423',
    name: '保綠-KY',
  },
  {
    category: '建材營造',
    stockNo: '8424',
    name: '惠普',
  },
  {
    category: '其他',
    stockNo: '8426',
    name: '紅木-KY',
  },
  {
    category: '其他',
    stockNo: '8427',
    name: '基勝-KY',
  },
  {
    category: '貿易百貨',
    stockNo: '8429',
    name: '金麗-KY',
  },
  {
    category: '其他電子類',
    stockNo: '8431',
    name: '匯鑽科',
  },
  {
    category: '生技醫療業',
    stockNo: '8432',
    name: '東生華',
  },
  {
    category: '居家生活類',
    stockNo: '8433',
    name: '弘帆',
  },
  {
    category: '貿易百貨',
    stockNo: '8433',
    name: '弘帆',
  },
  {
    category: '其他',
    stockNo: '8435',
    name: '鉅邁',
  },
  {
    category: '生技醫療業',
    stockNo: '8436',
    name: '大江',
  },
  {
    category: '其他',
    stockNo: '8437',
    name: '大地-KY',
  },
  {
    category: '其他',
    stockNo: '8438',
    name: '昶昕',
  },
  {
    category: '綠能環保',
    stockNo: '8438',
    name: '昶昕',
  },
  {
    category: '其他',
    stockNo: '8440',
    name: '綠電',
  },
  {
    category: '綠能環保類',
    stockNo: '8440',
    name: '綠電',
  },
  {
    category: '其他',
    stockNo: '8442',
    name: '威宏-KY',
  },
  {
    category: '貿易百貨',
    stockNo: '8443',
    name: '阿瘦',
  },
  {
    category: '其他',
    stockNo: '8444',
    name: '綠河-KY',
  },
  {
    category: '文化創意業',
    stockNo: '8446',
    name: '華研',
  },
  {
    category: '文化創意業',
    stockNo: '8450',
    name: '霹靂',
  },
  {
    category: '數位雲端',
    stockNo: '8454',
    name: '富邦媒',
  },
  {
    category: '貿易百貨',
    stockNo: '8454',
    name: '富邦媒',
  },
  {
    category: '其他電子類',
    stockNo: '8455',
    name: '大拓-KY',
  },
  {
    category: '文化創意業',
    stockNo: '8458',
    name: '影一',
  },
  {
    category: '觀光事業',
    stockNo: '8462',
    name: '柏文',
  },
  {
    category: '觀光餐旅',
    stockNo: '8462',
    name: '柏文',
  },
  {
    category: '運動休閒',
    stockNo: '8462',
    name: '柏文',
  },
  {
    category: '其他',
    stockNo: '8463',
    name: '潤泰材',
  },
  {
    category: '其他',
    stockNo: '8464',
    name: '億豐',
  },
  {
    category: '居家生活',
    stockNo: '8464',
    name: '億豐',
  },
  {
    category: '其他',
    stockNo: '8466',
    name: '美吉吉-KY',
  },
  {
    category: '其他',
    stockNo: '8467',
    name: '波力-KY',
  },
  {
    category: '運動休閒',
    stockNo: '8467',
    name: '波力-KY',
  },
  {
    category: '數位雲端類',
    stockNo: '8472',
    name: '夠麻吉',
  },
  {
    category: '電子商務業',
    stockNo: '8472',
    name: '夠麻吉',
  },
  {
    category: '其他',
    stockNo: '8473',
    name: '山林水',
  },
  {
    category: '綠能環保',
    stockNo: '8473',
    name: '山林水',
  },
  {
    category: '其他',
    stockNo: '8476',
    name: '台境',
  },
  {
    category: '綠能環保',
    stockNo: '8476',
    name: '台境',
  },
  {
    category: '綠能環保類',
    stockNo: '8476',
    name: '台境',
  },
  {
    category: '數位雲端類',
    stockNo: '8477',
    name: '創業家',
  },
  {
    category: '電子商務業',
    stockNo: '8477',
    name: '創業家',
  },
  {
    category: '其他',
    stockNo: '8478',
    name: '東哥遊艇',
  },
  {
    category: '運動休閒',
    stockNo: '8478',
    name: '東哥遊艇',
  },
  {
    category: '其他',
    stockNo: '8480',
    name: '泰昇-KY',
  },
  {
    category: '其他',
    stockNo: '8481',
    name: '政伸',
  },
  {
    category: '其他',
    stockNo: '8482',
    name: '商億-KY',
  },
  {
    category: '居家生活',
    stockNo: '8482',
    name: '商億-KY',
  },
  {
    category: '創新版股票',
    stockNo: '8487',
    name: '愛爾達-創',
  },
  {
    category: '其他',
    stockNo: '8488',
    name: '吉源-KY',
  },
  {
    category: '其他',
    stockNo: '8489',
    name: '三貝德',
  },
  {
    category: '文化創意業',
    stockNo: '8489',
    name: '三貝德',
  },
  {
    category: '其他',
    stockNo: '8497',
    name: '格威傳媒',
  },
  {
    category: '其他',
    stockNo: '8499',
    name: '鼎炫-KY',
  },
  {
    category: '其他電子業',
    stockNo: '8499',
    name: '鼎炫-KY',
  },
  {
    category: '電子工業',
    stockNo: '8499',
    name: '鼎炫-KY',
  },
  {
    category: '其他',
    stockNo: '8905',
    name: '裕國',
  },
  {
    category: '其他',
    stockNo: '8906',
    name: '花王',
  },
  {
    category: '油電燃氣業',
    stockNo: '8908',
    name: '欣雄',
  },
  {
    category: '其他',
    stockNo: '8916',
    name: '光隆',
  },
  {
    category: '其他',
    stockNo: '8916A',
    name: '光隆甲特',
  },
  {
    category: '油電燃氣業',
    stockNo: '8917',
    name: '欣泰',
  },
  {
    category: '其他',
    stockNo: '8921',
    name: '沈氏',
  },
  {
    category: '文化創意業',
    stockNo: '8923',
    name: '時報',
  },
  {
    category: '其他',
    stockNo: '8924',
    name: '大田',
  },
  {
    category: '運動休閒類',
    stockNo: '8924',
    name: '大田',
  },
  {
    category: '油電燃氣業',
    stockNo: '8926',
    name: '台汽電',
  },
  {
    category: '油電燃氣業',
    stockNo: '8927',
    name: '北基',
  },
  {
    category: '其他',
    stockNo: '8928',
    name: '鉅明',
  },
  {
    category: '運動休閒類',
    stockNo: '8928',
    name: '鉅明',
  },
  {
    category: '其他',
    stockNo: '8929',
    name: '富堡',
  },
  {
    category: '鋼鐵工業',
    stockNo: '8930',
    name: '青鋼',
  },
  {
    category: '油電燃氣業',
    stockNo: '8931',
    name: '大汽電',
  },
  {
    category: '其他',
    stockNo: '8932',
    name: '智通',
  },
  {
    category: '其他',
    stockNo: '8933',
    name: '愛地雅',
  },
  {
    category: '運動休閒類',
    stockNo: '8933',
    name: '愛地雅',
  },
  {
    category: '其他',
    stockNo: '8934',
    name: '衡平',
  },
  {
    category: '其他',
    stockNo: '8935',
    name: '邦泰',
  },
  {
    category: '其他',
    stockNo: '8936',
    name: '國統',
  },
  {
    category: '其他',
    stockNo: '8937',
    name: '合騏',
  },
  {
    category: '其他',
    stockNo: '8938',
    name: '明安',
  },
  {
    category: '運動休閒類',
    stockNo: '8938',
    name: '明安',
  },
  {
    category: '觀光事業',
    stockNo: '8940',
    name: '新天地',
  },
  {
    category: '觀光餐旅',
    stockNo: '8940',
    name: '新天地',
  },
  {
    category: '居家生活類',
    stockNo: '8941',
    name: '關中',
  },
  {
    category: '貿易百貨',
    stockNo: '8941',
    name: '關中',
  },
  {
    category: '其他',
    stockNo: '8942',
    name: '森鉅',
  },
  {
    category: '電機機械',
    stockNo: '8996',
    name: '高力',
  },
  {
    category: '存託憑證',
    stockNo: '910069',
    name: '新曄',
  },
  {
    category: '存託憑證',
    stockNo: '9101',
    name: '福雷電',
  },
  {
    category: '存託憑證',
    stockNo: '9102',
    name: '東亞科',
  },
  {
    category: '存託憑證',
    stockNo: '9103',
    name: '美德醫療-DR',
  },
  {
    category: '存託憑證',
    stockNo: '910322',
    name: '康師傅-DR',
  },
  {
    category: '存託憑證',
    stockNo: '9104',
    name: '萬宇科',
  },
  {
    category: '存託憑證',
    stockNo: '910482',
    name: '聖馬丁-DR',
  },
  {
    category: '存託憑證',
    stockNo: '9105',
    name: '泰金寶-DR',
  },
  {
    category: '存託憑證',
    stockNo: '910579',
    name: '歐聖',
  },
  {
    category: '存託憑證',
    stockNo: '9106',
    name: '新焦點-DR',
  },
  {
    category: '存託憑證',
    stockNo: '910708',
    name: '恒大健-DR',
  },
  {
    category: '存託憑證',
    stockNo: '910801',
    name: '金衛-DR',
  },
  {
    category: '存託憑證',
    stockNo: '910861',
    name: '神州-DR',
  },
  {
    category: '存託憑證',
    stockNo: '910948',
    name: '融達',
  },
  {
    category: '存託憑證',
    stockNo: '9110',
    name: '越南控-DR',
  },
  {
    category: '存託憑證',
    stockNo: '911201',
    name: '僑威控',
  },
  {
    category: '存託憑證',
    stockNo: '911602',
    name: '華豐泰',
  },
  {
    category: '存託憑證',
    stockNo: '911606',
    name: '超級',
  },
  {
    category: '存託憑證',
    stockNo: '911608',
    name: '明輝-DR',
  },
  {
    category: '存託憑證',
    stockNo: '911609',
    name: '揚子江',
  },
  {
    category: '存託憑證',
    stockNo: '911610',
    name: '聯環',
  },
  {
    category: '存託憑證',
    stockNo: '911611',
    name: '中泰山-DR',
  },
  {
    category: '存託憑證',
    stockNo: '911612',
    name: '滬安',
  },
  {
    category: '存託憑證',
    stockNo: '911616',
    name: '杜康-DR',
  },
  {
    category: '存託憑證',
    stockNo: '911619',
    name: '耀傑-DR',
  },
  {
    category: '存託憑證',
    stockNo: '911622',
    name: '泰聚亨-DR',
  },
  {
    category: '存託憑證',
    stockNo: '911626',
    name: 'MSH-DR',
  },
  {
    category: '存託憑證',
    stockNo: '911868',
    name: '同方友友-DR',
  },
  {
    category: '存託憑證',
    stockNo: '912000',
    name: '晨訊科-DR',
  },
  {
    category: '存託憑證',
    stockNo: '912398',
    name: '友佳-DR',
  },
  {
    category: '存託憑證',
    stockNo: '9136',
    name: '巨騰-DR',
  },
  {
    category: '存託憑證',
    stockNo: '913889',
    name: '大成糖',
  },
  {
    category: '存託憑證',
    stockNo: '9151',
    name: '旺旺',
  },
  {
    category: '存託憑證',
    stockNo: '9157',
    name: '陽光能源-DR',
  },
  {
    category: '存託憑證',
    stockNo: '916665',
    name: '爾必達',
  },
  {
    category: '存託憑證',
    stockNo: '9188',
    name: '精熙-DR',
  },
  {
    category: '貿易百貨',
    stockNo: '9801',
    name: '力霸',
  },
  {
    category: '其他',
    stockNo: '9802',
    name: '鈺齊-KY',
  },
  {
    category: '運動休閒',
    stockNo: '9802',
    name: '鈺齊-KY',
  },
  {
    category: '其他',
    stockNo: '9902',
    name: '台火',
  },
  {
    category: '其他',
    stockNo: '9904',
    name: '寶成',
  },
  {
    category: '運動休閒',
    stockNo: '9904',
    name: '寶成',
  },
  {
    category: '其他',
    stockNo: '9905',
    name: '大華',
  },
  {
    category: '建材營造',
    stockNo: '9906',
    name: '欣巴巴',
  },
  {
    category: '其他',
    stockNo: '9907',
    name: '統一實',
  },
  {
    category: '油電燃氣業',
    stockNo: '9908',
    name: '大台北',
  },
  {
    category: '其他',
    stockNo: '9910',
    name: '豐泰',
  },
  {
    category: '運動休閒',
    stockNo: '9910',
    name: '豐泰',
  },
  {
    category: '其他',
    stockNo: '9911',
    name: '櫻花',
  },
  {
    category: '居家生活',
    stockNo: '9911',
    name: '櫻花',
  },
  {
    category: '電子工業',
    stockNo: '9912',
    name: '偉聯',
  },
  {
    category: '電腦及週邊設備業',
    stockNo: '9912',
    name: '偉聯',
  },
  {
    category: '其他',
    stockNo: '9914',
    name: '美利達',
  },
  {
    category: '運動休閒',
    stockNo: '9914',
    name: '美利達',
  },
  {
    category: '其他',
    stockNo: '9915',
    name: '億豐',
  },
  {
    category: '其他',
    stockNo: '9917',
    name: '中保科',
  },
  {
    category: '油電燃氣業',
    stockNo: '9918',
    name: '欣天然',
  },
  {
    category: '其他',
    stockNo: '9919',
    name: '康那香',
  },
  {
    category: '其他',
    stockNo: '9921',
    name: '巨大',
  },
  {
    category: '運動休閒',
    stockNo: '9921',
    name: '巨大',
  },
  {
    category: '其他',
    stockNo: '9922',
    name: '優美',
  },
  {
    category: '其他',
    stockNo: '9924',
    name: '福興',
  },
  {
    category: '居家生活',
    stockNo: '9924',
    name: '福興',
  },
  {
    category: '其他',
    stockNo: '9925',
    name: '新保',
  },
  {
    category: '油電燃氣業',
    stockNo: '9926',
    name: '新海',
  },
  {
    category: '其他',
    stockNo: '9927',
    name: '泰銘',
  },
  {
    category: '其他',
    stockNo: '9928',
    name: '中視',
  },
  {
    category: '其他',
    stockNo: '9929',
    name: '秋雨',
  },
  {
    category: '其他',
    stockNo: '9930',
    name: '中聯資源',
  },
  {
    category: '綠能環保',
    stockNo: '9930',
    name: '中聯資源',
  },
  {
    category: '油電燃氣業',
    stockNo: '9931',
    name: '欣高',
  },
  {
    category: '其他',
    stockNo: '9933',
    name: '中鼎',
  },
  {
    category: '其他',
    stockNo: '9934',
    name: '成霖',
  },
  {
    category: '居家生活',
    stockNo: '9934',
    name: '成霖',
  },
  {
    category: '其他',
    stockNo: '9935',
    name: '慶豐富',
  },
  {
    category: '居家生活',
    stockNo: '9935',
    name: '慶豐富',
  },
  {
    category: '油電燃氣業',
    stockNo: '9937',
    name: '全國',
  },
  {
    category: '其他',
    stockNo: '9938',
    name: '百和',
  },
  {
    category: '其他',
    stockNo: '9939',
    name: '宏全',
  },
  {
    category: '其他',
    stockNo: '9940',
    name: '信義',
  },
  {
    category: '其他',
    stockNo: '9941',
    name: '裕融',
  },
  {
    category: '其他',
    stockNo: '9941A',
    name: '裕融甲特',
  },
  {
    category: '其他',
    stockNo: '9942',
    name: '茂順',
  },
  {
    category: '觀光事業',
    stockNo: '9943',
    name: '好樂迪',
  },
  {
    category: '觀光餐旅',
    stockNo: '9943',
    name: '好樂迪',
  },
  {
    category: '其他',
    stockNo: '9944',
    name: '新麗',
  },
  {
    category: '其他',
    stockNo: '9945',
    name: '潤泰新',
  },
  {
    category: '建材營造',
    stockNo: '9946',
    name: '三發地產',
  },
  {
    category: '文化創意業',
    stockNo: '9949',
    name: '琉園',
  },
  {
    category: '塑膠工業',
    stockNo: '9950',
    name: '萬國通',
  },
  {
    category: '電機機械',
    stockNo: '9951',
    name: '皇田',
  },
  {
    category: '其他',
    stockNo: '9955',
    name: '佳龍',
  },
  {
    category: '綠能環保',
    stockNo: '9955',
    name: '佳龍',
  },
  {
    category: '鋼鐵工業',
    stockNo: '9957',
    name: '燁聯',
  },
  {
    category: '鋼鐵工業',
    stockNo: '9958',
    name: '世紀鋼',
  },
  {
    category: '貿易百貨',
    stockNo: '9960',
    name: '邁達康',
  },
  {
    category: '運動休閒類',
    stockNo: '9960',
    name: '邁達康',
  },
  {
    category: '鋼鐵工業',
    stockNo: '9962',
    name: '有益',
  },
  {
    category: 'Index',
    stockNo: 'Automobile',
    name: '汽車類指數',
  },
  {
    category: 'Index',
    stockNo: 'BiotechnologyMedicalCare',
    name: '生技醫療類指數',
  },
  {
    category: 'Index',
    stockNo: 'BuildingMaterialConstruction',
    name: '建材營造類指數',
  },
  {
    category: 'Index',
    stockNo: 'Cement',
    name: '水泥類指數',
  },
  {
    category: 'Index',
    stockNo: 'Chemical',
    name: '化學類指數',
  },
  {
    category: 'Index',
    stockNo: 'ChemicalBiotechnologyMedicalCare',
    name: '化學生技醫療類指數',
  },
  {
    category: 'Index',
    stockNo: 'CommunicationsInternet',
    name: '通信網路類指數',
  },
  {
    category: 'Index',
    stockNo: 'ComputerPeripheralEquipment',
    name: '電腦及週邊設備類指數',
  },
  {
    category: 'Index',
    stockNo: 'ElectricalCable',
    name: '電器電纜類指數',
  },
  {
    category: 'Index',
    stockNo: 'ElectricMachinery',
    name: '電機機械類指數',
  },
  {
    category: 'Index',
    stockNo: 'Electronic',
    name: '電子類指數',
  },
  {
    category: 'Index',
    stockNo: 'ElectronicPartsComponents',
    name: '電子零組件類指數',
  },
  {
    category: 'Index',
    stockNo: 'ElectronicProductsDistribution',
    name: '電子通路類指數',
  },
  {
    category: 'Index',
    stockNo: 'FinancialInsurance',
    name: '金融保險類指數',
  },
  {
    category: 'Index',
    stockNo: 'Food',
    name: '食品類指數',
  },
  {
    category: 'Index',
    stockNo: 'GlassCeramic',
    name: '玻璃陶瓷類指數',
  },
  {
    category: 'Index',
    stockNo: 'InformationService',
    name: '資訊服務類指數',
  },
  {
    category: 'Index',
    stockNo: 'IronSteel',
    name: '鋼鐵類指數',
  },
  {
    category: 'Index',
    stockNo: 'OilGasElectricity',
    name: '油電燃氣類指數',
  },
  {
    category: 'Index',
    stockNo: 'Optoelectronic',
    name: '光電類指數',
  },
  {
    category: 'Index',
    stockNo: 'Other',
    name: '其他類指數',
  },
  {
    category: 'Index',
    stockNo: 'OtherElectronic',
    name: '其他電子類指數',
  },
  {
    category: 'Index',
    stockNo: 'PaperPulp',
    name: '造紙類指數',
  },
  {
    category: 'Index',
    stockNo: 'Plastics',
    name: '塑膠類指數',
  },
  {
    category: 'Index',
    stockNo: 'Rubber',
    name: '橡膠類指數',
  },
  {
    category: 'Index',
    stockNo: 'Semiconductor',
    name: '半導體類指數',
  },
  {
    category: 'Index',
    stockNo: 'ShippingTransportation',
    name: '航運業類指數',
  },
  {
    category: '大盤',
    stockNo: 'TAIEX',
    name: '加權指數',
  },
  {
    category: 'Index',
    stockNo: 'Textiles',
    name: '紡織纖維類指數',
  },
  {
    category: 'Index',
    stockNo: 'Tourism',
    name: '觀光事業類指數',
  },
  {
    category: '大盤',
    stockNo: 'TPEx',
    name: '櫃買指數',
  },
  {
    category: 'Index',
    stockNo: 'TradingConsumersGoods',
    name: '貿易百貨類指數',
  },
];

export default { stockInfo: data };
