import { AnyBulkWriteOperation } from 'mongodb';
import { ICacheEntry, StockHistoricalCache } from '../model/stockHistoricalCache';
import { toDateString } from '../utility/dateTime';
import { FugleAPIBuilder } from '../utility/fugleCaller';
import {
  FugleDataset,
  StockHistoricalResponse,
  HistoricalDataInfo,
  StockIntradayQuoteResponse,
} from '../utility/fugleTypes';

export { HistoricalDataInfo };

export async function getStockPriceIntraday(stockNo: string): Promise<StockIntradayQuoteResponse | null> {
  try {
    const data = await new FugleAPIBuilder(FugleDataset.StockIntradayQuote)
      .setParam({
        symbol: stockNo,
      })
      .get();
    return data;
  } catch (error) {
    console.log('fugle StockIntradayQuote error', error);
    return null;
  }
}

export async function getStockPriceByDates(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<StockHistoricalResponse | null> {
  try {
    const historicalData = await new FugleAPIBuilder(FugleDataset.StockHistorical)
      .setParam({
        symbol: stockNo,
        from: toDateString(startDate, '-'),
        to: toDateString(endDate, '-'),
      })
      .get();
    return historicalData;
  } catch (error) {
    console.log('fugle dayInfo error', error);
    return null;
  }
}

export async function getCachedStockPriceByDates(
  stockNo: string,
  startDate: string,
  endDate: string
): Promise<StockHistoricalResponse | null> {
  let cachedData = await StockHistoricalCache.findOne({ stockNo, startDate, endDate });

  if (cachedData && !isCacheExpired(new Date(), cachedData.createdAt)) {
    console.log(`Cache hit ${stockNo}`);
    return cachedData.data;
  }

  try {
    const rawData = await getStockPriceByDates(stockNo, startDate, endDate);

    if (rawData) {
      await StockHistoricalCache.findOneAndUpdate(
        { stockNo, startDate, endDate },
        {
          $set: {
            data: rawData,
            createdAt: new Date(),
          },
        },
        { upsert: true, new: true }
      );
      console.log('Data fetched and cached');
      return rawData;
    }
    console.log('No data returned from original interface');
    return null;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}

// 定义关键时间点
const MARKET_CLOSE_HOUR = 14; // 假设市场收盘时间是下午2点

export function isCacheExpired(now: Date, createdAt: Date): boolean {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const cacheDate = new Date(createdAt);
  const cacheDay = new Date(cacheDate.getFullYear(), cacheDate.getMonth(), cacheDate.getDate());
  const marketCloseTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), MARKET_CLOSE_HOUR, 0, 0);

  // 如果缓存是今天创建的
  if (cacheDay.getTime() === today.getTime()) {
    // 只有在当前时间是盘后，且缓存是在今天盘中或盘前创建的情况下，才视为过期
    return now >= marketCloseTime && cacheDate < marketCloseTime;
  }

  // 如果缓存是昨天创建的
  if (cacheDay.getTime() === today.getTime() - 86400000) {
    return now >= marketCloseTime;
  }

  return true; // 如果缓存比昨天还早，视为过期（虽然实际上可能已经被 TTL 删除）
}

interface StockRequest {
  stockNo: string;
  startDate: string;
  endDate: string;
}

export async function getCachedStockPriceByDatesBatch(
  requests: StockRequest[]
): Promise<(StockHistoricalResponse | null)[]> {
  // 1. 先查詢所有可能的緩存數據
  const cacheQueries = requests.map((req) => ({
    stockNo: req.stockNo,
    startDate: req.startDate,
    endDate: req.endDate,
  }));

  const cachedData = await StockHistoricalCache.find({
    $or: cacheQueries,
  });

  // 2. 處理緩存命中和過期的情況
  const cacheMap = new Map(cachedData.map((cache) => [`${cache.stockNo}-${cache.startDate}-${cache.endDate}`, cache]));

  const fetchRequests: StockRequest[] = [];
  const results: (StockHistoricalResponse | null)[] = [];

  for (const req of requests) {
    const cacheKey = `${req.stockNo}-${req.startDate}-${req.endDate}`;
    const cache = cacheMap.get(cacheKey);

    if (cache && !isCacheExpired(new Date(), cache.createdAt)) {
      console.log(`Cache hit ${req.stockNo}`);
      results.push(cache.data);
    } else {
      fetchRequests.push(req);
      results.push(null); // 佔位，之後更新
    }
  }

  // 3. 批量獲取未緩存的數據
  if (fetchRequests.length > 0) {
    const fetchedData = await Promise.all(
      fetchRequests.map((req) => getStockPriceByDates(req.stockNo, req.startDate, req.endDate))
    );

    // 4. 更新緩存和結果
    let bulkOps: AnyBulkWriteOperation<ICacheEntry>[] = []; // Initialize empty array to store update operations

    fetchedData.forEach((data, index) => {
      if (data) {
        // Check if data exists before creating update operation
        bulkOps.push({
          updateOne: {
            filter: {
              stockNo: fetchRequests[index].stockNo,
              startDate: fetchRequests[index].startDate,
              endDate: fetchRequests[index].endDate,
            },
            update: {
              $set: {
                data, // Use data directly since it's already checked for existence
                createdAt: new Date(),
              },
            },
            upsert: true,
          },
        });
      }
    });

    if (bulkOps.length > 0) {
      await StockHistoricalCache.bulkWrite(bulkOps);
    }

    // 更新結果數組
    let fetchedIndex = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i] === null) {
        results[i] = fetchedData[fetchedIndex++] || null;
      }
    }
  }

  return results;
}

export default {
  getStockPriceByDates,
  getCachedStockPriceByDates,
  getStockPriceIntraday,
};
