import express, { Router, NextFunction, Request, Response, urlencoded } from 'express';
import { getTodayWithTZ } from '../utility/dateTime';
import service from '../service/pttStockInfo';
import { IPostInfo } from '../model/PostInfo';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await service.handler();
  // var savedPosts: IPostInfo[] = [
  //   {
  //     tag: '閒聊',
  //     title: '2024/02/20 盤後閒聊',
  //     href: '/bbs/Stock/M.1708408802.A.B9B.html',
  //     author: 'vendan5566',
  //     date: '2/20',
  //   },
  //   {
  //     tag: '新聞',
  //     title: '美股「融漲」紅燈亮了？這指標逼近達康泡',
  //     href: '/bbs/Stock/M.1708443435.A.7D5.html',
  //     author: 'Cartier',
  //     date: '2/20',
  //   },
  // ];
  const messageBuilder: string[] = ['PTT Alert:', ''];
  if (savedPosts && savedPosts.length > 0) {
    savedPosts.forEach((post) => {
      if (post.tag == '標的') {
        messageBuilder.push(`[${post.tag}] ${post.title}`);
        messageBuilder.push(`作者: ${post.author}`);
        messageBuilder.push(`https://www.ptt.cc/${post.href}`);
        messageBuilder.push('');
      }
    });
  }

  const channel = req.query.channel || '';
  if (channel?.length) {
    if (messageBuilder.length > 3) {
      const encodeMsg = encodeURIComponent(messageBuilder.join('\n'));
      res.redirect(`/line/send?msg=${encodeMsg}&channel=${channel}`);
    }
  } else {
    res.json({ msg: messageBuilder.join('\n') });
  }
});

export default router;
