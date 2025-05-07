import dotenv from 'dotenv';
dotenv.config(); // get config vars

const NODE_ENV: string | undefined = process.env.NODE_ENV;
const MONGODB_URI: string = process.env.MONGODB_URI || '';
const SERVER_URL: string = process.env.SERVER_URL || 'http://localhost:8000';
const SERVER_PORT: string = process.env.PORT || process.env.SERVER_PORT || '8000';
const CLIENT_URL: string = process.env.CLIENT_URL || 'http://localhost:3000';
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || 'secret';

const FINMIND_TOKEN: string | undefined = process.env.FINMIND_TOKEN;
const FUGLE_API_KEY: string = process.env.FUGLE_API_KEY || '';
const FUGLE_API_USE_PROXY: boolean = process.env.FUGLE_API_USE_PROXY === 'true';

const ADMIN_LINE_TOKEN: string = process.env.ADMIN_LINE_TOKEN || '';
const LINE_CHANNEL_ID: string = process.env.LINE_CHANNEL_ID || '';
const LINE_CHANNEL_SECRET: string = process.env.LINE_CHANNEL_SECRET || '';
const LINE_CHANNEL_ACCESS_TOKEN: string = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';
const LINE_USER_ID: string = process.env.LINE_USER_ID || '';

const GEMINI_KEY: string = process.env.GEMINI_KEY || '';
const OPEN_AI_KEY: string = process.env.OPEN_AI_KEY || '';

const TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CALLBACK_URL: string = process.env.TELEGRAM_CALLBACK_URL || '';
const TELEGRAM_USE_WEBHOOK: boolean = process.env.TELEGRAM_USE_WEBHOOK === 'true';
const TELEGRAM_BOT_ENABLE: boolean = process.env.TELEGRAM_USE_WEBHOOK === 'true';

export default {
  NODE_ENV,
  MONGODB_URI,
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  TOKEN_SECRET,
  FINMIND_TOKEN,
  FUGLE_API_KEY,
  FUGLE_API_USE_PROXY,
  ADMIN_LINE_TOKEN,
  LINE_CHANNEL_ID,
  LINE_CHANNEL_SECRET,
  LINE_CHANNEL_ACCESS_TOKEN,
  LINE_USER_ID,
  GEMINI_KEY,
  OPEN_AI_KEY,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CALLBACK_URL,
  TELEGRAM_USE_WEBHOOK,
  TELEGRAM_BOT_ENABLE,
};
