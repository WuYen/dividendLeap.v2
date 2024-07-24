import { SMA, RSI, MACD, BollingerBands, Stochastic, IchimokuCloud } from 'technicalindicators';
import { IPostInfo } from '../model/PostInfo';
import { getStockNoFromTitle } from '../utility/stockPostHelper';
import stockPriceService, { HistoricalDataInfo } from './stockPriceService';
import { toDateString } from '../utility/dateTime';
import { IchimokuCloudOutput } from 'technicalindicators/declarations/ichimoku/IchimokuCloud';

// 定義分析結果的接口
export interface AnalysisResults {
  isSMAUp: boolean;
  isRSILow: boolean;
  isMACDPositive: boolean;
  isBollingerPositive: boolean;
  isStochasticPositive: boolean;
  isPriceAboveCloud: boolean;
  isTenkanAboveKijun: boolean;
  isSenkouSpanABullish: boolean;
  isChikouAbovePrice: boolean;
  recommandBuying: boolean;
  recommandCount: number;
}

// 計算 Chikou Span
function calculateChikou(closePrices: number[], displacement: number): number {
  return closePrices[closePrices.length - displacement - 1];
}

// 分析 Ichimoku Cloud
function analyzeIchimokuCloud(ichimokuCloud: IchimokuCloudOutput, lastClose: number, chikou: number) {
  const { conversion: tenkanSen, base: kijunSen, spanA: senkouSpanA, spanB: senkouSpanB } = ichimokuCloud;

  // 當前價格高於雲層: 表示市場處於上升趨勢中，可能是一個看漲信號
  const isPriceAboveCloud = lastClose > Math.max(senkouSpanA, senkouSpanB);

  // 轉換線 (Tenkan-sen) 高於基準線 (Kijun-sen): 表示短期勢頭比長期勢頭強，可能是一個看漲信號
  const isTenkanAboveKijun = tenkanSen > kijunSen;

  // 前景 A (Senkou Span A) 高於前景 B (Senkou Span B): 表示未來價格預測呈現上升趨勢，可能是一個看漲信號
  const isSenkouSpanABullish = senkouSpanA > senkouSpanB;

  // 遲行線 (Chikou Span) 高於當前價格: 表示過去的價格勢頭支持當前的上升趨勢，可能是一個看漲信號
  const isChikouAbovePrice = chikou > lastClose;

  return {
    ichimokuCloud,
    isPriceAboveCloud,
    isTenkanAboveKijun,
    isSenkouSpanABullish,
    isChikouAbovePrice,
  };
}

// 分析股票數據
function analyzeStock(data: HistoricalDataInfo[]): AnalysisResults {
  const closePrices = data.map((candle) => candle.close);
  const highPrices = data.map((candle) => candle.high);
  const lowPrices = data.map((candle) => candle.low);

  // 計算技術指標
  const sma = SMA.calculate({ period: 20, values: closePrices });
  const rsi = RSI.calculate({ period: 14, values: closePrices });
  const macd = MACD.calculate({
    values: closePrices,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });
  const bollinger = BollingerBands.calculate({
    period: 20,
    values: closePrices,
    stdDev: 2,
  });
  const stochastic = Stochastic.calculate({
    high: highPrices,
    low: lowPrices,
    close: closePrices,
    period: 14,
    signalPeriod: 3,
  });

  const ichimoku = IchimokuCloud.calculate({
    high: highPrices,
    low: lowPrices,
    conversionPeriod: 9,
    basePeriod: 26,
    spanPeriod: 52,
    displacement: 26,
  });

  const lastClose = closePrices[closePrices.length - 1];
  const chikou = calculateChikou(closePrices, 26);
  const ichimokuAnalysis = analyzeIchimokuCloud(ichimoku[ichimoku.length - 1], lastClose, chikou);

  // 計算獨立技術指標
  const isSMAUp = sma[sma.length - 1] > lastClose;
  const isRSILow = rsi[rsi.length - 1] < 30;
  const macdLine = macd[macd.length - 1].MACD as number;
  const signalLine = macd[macd.length - 1].signal as number;
  const isMACDPositive = macdLine > signalLine;
  const isBollingerPositive = lastClose > bollinger[bollinger.length - 1].middle;
  const isStochasticPositive = stochastic[stochastic.length - 1].k < 20;

  console.log(
    `isSMAUp: ${isSMAUp}, isRSILow: ${isRSILow}, isMACDPositive: ${isMACDPositive}, isBollingerPositive: ${isBollingerPositive}, isStochasticPositive: ${isStochasticPositive}`
  );

  const allIndicators = [
    isSMAUp,
    isRSILow,
    isMACDPositive,
    isBollingerPositive,
    isStochasticPositive,
    ichimokuAnalysis.isPriceAboveCloud,
    ichimokuAnalysis.isTenkanAboveKijun,
    ichimokuAnalysis.isSenkouSpanABullish,
    ichimokuAnalysis.isChikouAbovePrice,
  ];

  // 計算符合條件的指標數量
  const positiveIndicator = allIndicators.filter(Boolean).length;
  const isPositive = positiveIndicator > allIndicators.length / 2;
  const confidence = positiveIndicator / allIndicators.length;

  return {
    isSMAUp,
    isRSILow,
    isMACDPositive,
    isBollingerPositive,
    isStochasticPositive,
    isPriceAboveCloud: ichimokuAnalysis.isPriceAboveCloud,
    isTenkanAboveKijun: ichimokuAnalysis.isTenkanAboveKijun,
    isSenkouSpanABullish: ichimokuAnalysis.isSenkouSpanABullish,
    isChikouAbovePrice: ichimokuAnalysis.isChikouAbovePrice,
    recommandBuying: positiveIndicator >= 3,
    recommandCount: positiveIndicator,
  };
}

export interface AnalysisResponse extends AnalysisResults {
  post: IPostInfo;
  stockNo: string;
  startDate: Date;
  endDate: Date;
}

export async function analysisPost(post: IPostInfo): Promise<AnalysisResponse> {
  const symbol = getStockNoFromTitle(post);
  const today = new Date();
  const endDate = new Date(post.id * 1000); // 假設發文日當基準 回測 發文當下值不值得買
  const startDate = new Date(endDate); // 創建 startDate 作為 endDate 的副本
  startDate.setMonth(endDate.getMonth() - 3); // 從今天回推三個月

  console.log(`start analysis post ${post.title}, \nfrom:${toDateString(startDate)} to:${toDateString(endDate)}`);

  const historicalData = await stockPriceService.getCachedStockPriceByDates(
    symbol,
    toDateString(startDate),
    toDateString(endDate)
  );

  const result = analyzeStock((historicalData?.data as HistoricalDataInfo[]).reverse());

  return { post: post, stockNo: symbol, startDate, endDate, ...result };
}
