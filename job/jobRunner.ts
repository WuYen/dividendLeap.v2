import mongoose from 'mongoose';
import config from '../utility/config';

mongoose.connect(config.MONGODB_URI).then(async () => {
  mongoose.disconnect();
});
