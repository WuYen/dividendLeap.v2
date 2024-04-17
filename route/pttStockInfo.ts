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

router.get('/author/list', async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthorModel.find().sort({ likes: -1 }).lean().exec();

  // try {
  //   // 根据作者名查找作者及其帖子
  //   const authorNames = ['uzgo', 'kobekid']; // 假设这里是你的作者名数组
  //   const authorsWithPosts = await AuthorModel.aggregate([
  //     { $match: { name: { $in: authorNames } } },
  //     {
  //       $lookup: {
  //         from: 'postinfos', // 假设这是帖子集合的名称
  //         localField: 'name', // 使用作者的名字进行匹配
  //         foreignField: 'author', // 假设这是帖子中作者的字段名
  //         as: 'posts',
  //       },
  //     },
  //     { $project: { name: 1, posts: { $slice: ['$posts', 5] } } }, // 限制每个作者的帖子数量为 5 条
  //   ]);

  //   console.log(JSON.stringify(authorsWithPosts));
  // } catch (err) {
  //   console.error(err);
  // }

  res.json(result);
});

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
        const isRecentPost = AuthorService.isPostedInOneWeek(postDate, todayDate());
        const resultInfo: AuthorService.PriceInfoResponse | null = await AuthorService.getPriceInfoByDates(
          stockNo,
          targetDates[0],
          targetDates[1]
        );
        if (resultInfo) {
          if (isRecentPost) {
            AuthorService.processRecentPost(postDate, resultInfo);
          }
          result.push({
            ...resultInfo,
            post: info,
            isRecentPost,
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

router.get('/author/:id/like', async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.id;
  try {
    let authorInfo = await AuthorModel.findOne({ name: authorId }).exec();

    if (!authorInfo) {
      authorInfo = new AuthorModel({
        name: authorId,
        likes: 0,
        dislikes: 0,
      });
    }

    authorInfo.likes += 1;

    await authorInfo.save();

    res.json('Liked!');
  } catch (error) {
    console.error('Error while liking author:', error);
    res.status(500).json({ error: 'Internal server error' });
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
