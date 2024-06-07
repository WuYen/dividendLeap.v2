import express, { Router, NextFunction, Request, Response } from 'express';
import { delay } from '../utility/delay';
import config from '../utility/config';
import { todayDate, today } from '../utility/dateTime';

import { AuthorModel, IAuthor } from '../model/Author';
import { ILineToken, TokenLevel } from '../model/lineToken';
import { IPostInfo, PostInfoModel } from '../model/PostInfo';
import { AuthorHistoricalCache, IHistoricalCache } from '../model/AuthorHistoricalCache';

import lineService from '../service/lineService';
import * as AuthorService from '../service/pttAuthorService';
import { getStockNoFromTitle } from '../service/pttAuthorService';
import service, { isRePosts, processSinglePostToMessage, parsePosts } from '../service/pttStockPostService';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await service.getLast50Posts();
  res.sendSuccess(200, { message: 'success', data: { posts: savedPosts } });
});

router.get('/list/author', async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthorModel.find().sort({ likes: -1 }).lean().exec();
  res.sendSuccess(200, { message: 'success', data: result });
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
      const subscribeAuthor: IAuthor[] = await AuthorModel.find({}).lean();
      if (tokenInfos != null && tokenInfos.length > 0) {
        for (const tokenInfo of tokenInfos) {
          for (const post of newPosts) {
            const authorInfo = subscribeAuthor.find((x) => x.name === post.author);
            const isSubscribed = authorInfo != null;
            if (post.tag === '標的' && !isRePosts(post)) {
              let notifyContent: string[] = [];
              if (tokenInfo.tokenLevel.includes(TokenLevel.Test)) {
                notifyContent = ['', ''];
                if (isSubscribed && post.tag == '標的') {
                  notifyContent.push(`【✨✨大神來囉✨✨】`);
                }
                notifyContent.push(`[${post.tag}] ${post.title}`);
                notifyContent.push(`作者: ${post.author} ${authorInfo ? `👍:${authorInfo.likes}` : ''}`);
                notifyContent.push('');
                notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}?token=${tokenInfo.channel}`);
              } else {
                notifyContent = processSinglePostToMessage(post, isSubscribed);
                if (post.tag == '標的' && getStockNoFromTitle(post)) {
                  notifyContent.push(`${config.CLIENT_URL}/ptt/author/${post.author}`);
                }
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

  res.sendSuccess(200, { message: 'send notify success' });
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
    res.sendSuccess(200, { message: 'success', data: existingResult.data });
  } else {
    const result: ResultItem[] = [];
    const $ = await AuthorService.getHtmlSource(authorId);
    const posts = parsePosts($, +new Date());

    const storedPosts = await PostInfoModel.find({ author: authorId })
      .sort({ id: -1 }) // 按 id 降序排列
      .limit(8) // 只返回最近的五篇
      .lean()
      .exec();

    const combinedPosts = [...posts, ...storedPosts].filter(
      (postInfo, index, self) => index === self.findIndex((item) => item.id === postInfo.id)
    );
    combinedPosts.sort((a, b) => b.id - a.id);
    //const targetPosts: IPostInfo[] = AuthorService.getTargetPosts(posts);
    console.log(`posts.length:${combinedPosts.length}`);
    for (let i = 0; i < Math.min(combinedPosts.length, 8); i++) {
      const info = combinedPosts[i];
      const stockNo = AuthorService.getStockNoFromTitle(info);

      const postDate = new Date(info.id * 1000);
      const isRecentPost = AuthorService.isPostedInOneWeek(postDate, todayDate());
      var target: ResultItem = {
        stockNo,
        historicalInfo: [],
        processedData: [],
        post: info,
        isRecentPost,
      };
      if (stockNo) {
        const targetDates = AuthorService.getDateRangeBaseOnPostedDate(postDate, todayDate());
        const resultInfo: AuthorService.PriceInfoResponse | null = await AuthorService.getPriceInfoByDates(
          stockNo,
          targetDates[0],
          targetDates[1]
        );
        if (resultInfo) {
          isRecentPost && AuthorService.processRecentPost(postDate, resultInfo);
          target.historicalInfo = resultInfo.historicalInfo;
          target.processedData = resultInfo.processedData;
        }
      }

      result.push(target);
    }
    // Delete any existing result for the authorId
    await AuthorHistoricalCache.deleteMany({ authorId }).exec();
    const newResult: IHistoricalCache = {
      timestamp: +Date.now(),
      authorId,
      data: result,
    };
    await new AuthorHistoricalCache(newResult).save();

    res.sendSuccess(200, { message: 'success', data: result });
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
    const splittedChannel = channels.split(',');
    const savedTokens = await lineService.getTokensByChannels(splittedChannel);
    if (savedTokens == null || savedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = savedTokens;
  } else {
    const retrivedTokens = await lineService.getAllEnabledChannel();
    if (retrivedTokens == null || retrivedTokens.length < 1) {
      throw new Error('No match tokens for ' + channels);
    }
    tokenInfos = retrivedTokens;
  }
  return tokenInfos;
}
