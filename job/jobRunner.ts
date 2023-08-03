import mongoose from 'mongoose';
import config from '../utility/config';

import updateDayInfo from './updateDayInfo';
import updateSchedule from './updateSchedule';

mongoose.connect(config.MONGODB_URI).then(async () => {
  var rawData = [];

  //await updateSchedule(rawData);
  //await updateDayInfo();
  mongoose.disconnect();
});
