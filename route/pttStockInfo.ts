import express, { Router, NextFunction, Request, Response, urlencoded } from 'express';
import service from '../service/pttStockInfo';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  var savedPosts = await service.getNewPosts();

  const messageBuilder: string[] = service.processMessage(savedPosts);

  const channel = req.query.channel || '';
  if (channel?.length) {
    if (messageBuilder.length > 3) {
      const encodeMsg = encodeURIComponent(messageBuilder.join('\n'));
      res.redirect(`/line/send?msg=${encodeMsg}&channel=${channel}`);
    }
  }
  res.json({ msg: messageBuilder.join('\n') });
});

export default router;
