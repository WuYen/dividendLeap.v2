import mongoose from 'mongoose';
import config from '../utility/config';
import { filterPositive, getDataAndProcessToResult } from '../service/rankingService';

mongoose.connect(config.MONGODB_URI).then(async () => {
  //await filterPositive();
  mongoose.disconnect();
});
