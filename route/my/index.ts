import express, { Router } from 'express';
import { authentication } from '../../utility/auth';

import myPostRoute from './my.post';
import myKeywordRoute from './my.keyword';
import myAuthorRoute from './my.author';

const router: Router = express.Router();

//驗證已登入的 middleware
router.use(authentication);

router.use(myPostRoute);
router.use(myKeywordRoute);
router.use(myAuthorRoute);

export default router;
