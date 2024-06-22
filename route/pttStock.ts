import express, { Router, NextFunction, Request, Response } from 'express';

import { AuthorModel } from '../model/Author';
import { AuthorHistoricalCache } from '../model/AuthorHistoricalCache';

import { AuthorHistoricalResponse, getAuthorHistoryPosts } from '../service/pttAuthorService';
import { getLast50Posts } from '../service/pttStockPostService';
import { getNewPostAndSendLineNotify } from '../service/notifyService';

const router: Router = express.Router();

router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await getLast50Posts();
  res.sendSuccess(200, { message: 'success', data: { posts: savedPosts } });
});

router.get('/authors', async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthorModel.find().sort({ likes: -1 }).lean().exec();
  res.sendSuccess(200, { message: 'success', data: result });
});

router.get('/author/:id', async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.id;
  const refresh = Boolean(req.query.refresh === 'true');
  const existingResult = await AuthorHistoricalCache.findOne({ authorId }).lean().exec();

  if (!refresh && existingResult && Date.now() - existingResult.timestamp < 3 * 60 * 60 * 1000) {
    res.sendSuccess(200, { message: 'success', data: existingResult.data });
  } else {
    const result: AuthorHistoricalResponse[] = await getAuthorHistoryPosts(authorId);
    res.sendSuccess(200, { message: 'success', data: result });
  }
});

router.get('/new', async (req: Request, res: Response, next: NextFunction) => {
  try {
    var { notifyCount, postCount } = await getNewPostAndSendLineNotify(
      req.query.channel as string,
      req.query.channels as string
    );
    return res.sendSuccess(200, {
      message: `send notify success, postCount: ${postCount}, notifyCount:${notifyCount}`,
    });
  } catch (error) {
    console.log('send notify fail', error);
    return res.sendSuccess(500, { message: 'send notify fail' });
  }
});

// router.get('/post/content', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     var url = req.query.url;
//     if (!url) {
//       return res.sendError(500, { message: 'no url in query' });
//     }
//     var promptWrod =
//       '幫我分析文章\n' +
//       '首先先抓出進退場機制, 用條列的方式列出 *進場 *停利 *停損\n' +
//       '如果文章中沒特別說明則該項顯示無\n' +
//       '接著列出原文重點摘要盡量簡短\n' +
//       '文章內容如下\n\n';
//     var postContent = await fetchPostDetail(`https://www.ptt.cc/bbs/Stock/${url}.html`);

//     //var resultText = await generateWithTunedModel(promptWrod + postContent);
//     var resultText = await generateTextTest(promptWrod + postContent);
//     // var result = await processSinglePostDetailToMessage(`https://www.ptt.cc/bbs/Stock/${url}.html`);
//     await lineService.sendMessage(config.ADMIN_LINE_TOKEN, resultText);
//     return res.sendSuccess(200, {
//       message: `send notify success`,
//       data: resultText,
//     });
//   } catch (error) {
//     console.log('send notify fail', error);
//     return res.sendError(500, { message: 'send notify fail' });
//   }
// });

export default router;
