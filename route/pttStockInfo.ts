import express, { Router, NextFunction, Request, Response } from 'express';
import service, { isRePosts, processSinglePostToMessage, parsePosts } from '../service/pttStockInfo';
import lineService from '../service/lineService';
import { delay } from '../utility/delay';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { AuthorModel, IAuthor } from '../model/Author';
import * as AuthorService from '../service/pttStockAuthor';
import { IPostInfo } from '../model/PostInfo';
import { todayDate, today } from '../utility/dateTime';
import config from '../utility/config';
import { AuthorHistoricalCache, IHistoricalCache } from '../model/AuthorHistoricalCache';
import { getStockNoFromTitle } from '../service/pttStockAuthor';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await service.getLast50Posts();
  res.json({ posts: savedPosts });
});

router.get('/new', async (req: Request, res: Response, next: NextFunction) => {
  const newPosts = await service.getNewPosts();

  if (newPosts && newPosts.length) {
    try {
      const tokenInfos: ILineToken[] | null = await retrieveTokenInfo(
        req.query.channel as string,
        req.query.channels as string
      );
      //先統一拿所有的author, 之後會改成by user 訂閱方式
      const subscribeAuthor: string[] = (await AuthorModel.find({}, 'name').lean()).map((author) => author.name);
      if (tokenInfos != null && tokenInfos.length > 0) {
        for (const tokenInfo of tokenInfos) {
          for (const post of newPosts) {
            const isSubscribed = (post.author && subscribeAuthor.includes(post.author)) as boolean;
            if ((post.tag == '標的' || isSubscribed) && !isRePosts(post)) {
              const notifyContent = processSinglePostToMessage(post, isSubscribed);
              if (post.tag == '標的' && getStockNoFromTitle(post)) {
                notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
              }
              await lineService.sendMessage(tokenInfo.token, notifyContent.join('\n'));
              await delay(25);
            }
          }
        }
      }
    } catch (error) {
      console.log('send notify fail', error);
    }
  }

  res.json({ msg: `send notify success` });
});

interface ResultItem extends AuthorService.PriceInfoResponse {
  post: IPostInfo;
  isRecentPost: boolean;
}

router.get('/author/:id', async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.id;
  const refresh = Boolean(req.query.refresh === 'true');
  const existingResult = await AuthorHistoricalCache.findOne({ authorId }).lean().exec();
  // Check if there is an existing result and if it's not expired
  if (!refresh && existingResult && Date.now() - existingResult.timestamp < 3 * 60 * 60 * 1000) {
    res.json(existingResult.data);
  } else {
    const result: ResultItem[] = [];
    const $ = await AuthorService.getHtmlSource(authorId);
    const posts = parsePosts($, +new Date());
    const targetPosts: IPostInfo[] = AuthorService.getTargetPosts(posts);
    console.log(`targetPosts.length:${targetPosts.length}`);
    for (let i = 0; i < Math.min(targetPosts.length, 4); i++) {
      const info = targetPosts[i];
      const stockNo = AuthorService.getStockNoFromTitle(info);
      if (stockNo) {
        const postDate = new Date(info.id * 1000);
        const targetDates = AuthorService.getDateRangeBaseOnPostedDate(postDate, todayDate());
        const resultInfo: AuthorService.PriceInfoResponse | null = await AuthorService.getPriceInfoByDates(
          stockNo,
          targetDates[0],
          targetDates[1]
        );
        if (resultInfo) {
          result.push({
            ...resultInfo,
            post: info,
            isRecentPost: AuthorService.isRecentPost(postDate, todayDate()),
          });
        }
      }
    }
    // Delete any existing result for the authorId
    await AuthorHistoricalCache.deleteMany({ authorId }).exec();
    const newResult: IHistoricalCache = {
      timestamp: +Date.now(),
      authorId,
      data: result,
    };
    await new AuthorHistoricalCache(newResult).save();

    res.json(result);
  }
});

export default router;

async function retrieveTokenInfo(channel: string, channels: string) {
  let tokenInfos: ILineToken[] | null = [];

  if (channel) {
    const token = await lineService.getTokenByChannel(channel);
    if (token == null) {
      throw new Error('No match token for ' + channel);
    }
    tokenInfos.push(token);
  } else if (channels) {
    const splitedChannel = channels.split(',');
    const retrivedTokens = await lineService.getTokensBychannels(splitedChannel);
    if (retrivedTokens == null || retrivedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = retrivedTokens;
  } else {
    const retrivedTokens = await lineService.getAllEnabledChannel();
    if (retrivedTokens == null || retrivedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = retrivedTokens;
  }
  return tokenInfos;
}
