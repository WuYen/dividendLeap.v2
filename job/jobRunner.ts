import mongoose from 'mongoose';
import config from '../utility/config';

import updateDayInfo from './updateDayInfo';
import updateSchedule from './updateSchedule';
import { getPosts, getPriceForPosts, groupData, posts } from '../service/postTrendService';
import { isValidStockPost } from '../utility/validatePost';
import fs from 'fs';
import path from 'path';

mongoose.connect(config.MONGODB_URI).then(async () => {
  var rawData = [];

  //await updateSchedule(rawData);
  //await updateDayInfo();
  // var posts = await getPosts();
  // var filterPosts = posts.filter(isValidStockPost);
  // console.log(`Size Before: ${posts.length}, After: ${filterPosts.length}`);
  // console.log(JSON.stringify(filterPosts));

  const postsWithPrice = await getPriceForPosts(posts);
  const result = groupData(new Date(), postsWithPrice);
  const filePath = path.join(__dirname, 'result.json'); // 定義文件路徑
  writeResultToJsonFile(result, filePath);

  mongoose.disconnect();
});

function writeResultToJsonFile(result: any, filePath: string) {
  const jsonContent = JSON.stringify(result, null, 2); // 格式化 JSON
  fs.writeFileSync(filePath, jsonContent, 'utf8');
}
