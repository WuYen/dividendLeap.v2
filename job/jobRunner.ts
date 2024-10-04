import mongoose from 'mongoose';
import config from '../utility/config';
import { convertToJSONL, parts } from '../service/geminiAIService';
import * as fs from 'fs';

// mongoose.connect(config.MONGODB_URI).then(async () => {
//   mongoose.disconnect();
// });

var jsonOutput = convertToJSONL(parts);
console.log(jsonOutput);

// Write JSON output to file
fs.writeFile('output.jsonl', jsonOutput, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('JSON output written to output.json');
  }
});
