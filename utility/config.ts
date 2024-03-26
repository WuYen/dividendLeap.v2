import dotenv from 'dotenv';
dotenv.config(); // get config vars

const NODE_ENV: string | undefined = process.env.NODE_ENV;
const MONGODB_URI: string = process.env.MONGODB_URI || '';
const SERVER_PORT: string = process.env.SERVER_PORT || '8000';
const DIVIDENDINFO_URL: string | undefined = process.env.DIVIDENDINFO_URL;
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || 'secret';
const MAIL_ACCOUNT: string | undefined = process.env.MAIL_ACCOUNT;
const MAIL_PASSWORD: string | undefined = process.env.MAIL_PASSWORD;
const FINMIND_TOKEN: string | undefined = process.env.FINMIND_TOKEN;

const LINE_NOTIFY_AUTH_URL: string | undefined =
  process.env.LINE_NOTIFY_AUTH_URL || 'https://notify-bot.line.me/oauth/authorize';
const LINE_NOTIFY_TOKEN_URL: string | undefined =
  process.env.LINE_NOTIFY_TOKEN_URL || 'https://notify-bot.line.me/oauth/token';
const LINE_NOTIFY_CLIENT_ID: string | undefined = process.env.LINE_NOTIFY_CLIENT_ID || '';
const LINE_NOTIFY_CLIENT_SECRET: string | undefined = process.env.LINE_NOTIFY_CLIENT_SECRET || '';
const LINE_NOTIFY_CALL_BACK_URL: string | undefined =
  process.env.LINE_NOTIFY_CALL_BACK_URL || 'http://localhost:8000/line/callback';
const LINE_NOTIFY_URL: string | undefined = process.env.LINE_NOTIFY_URL || 'https://notify-api.line.me/api/notify';
const LINE_NOTIFY_CLIENT_SIDE_CALL_BACK_URL: string | undefined =
  process.env.LINE_NOTIFY_CLIENT_SIDE_CALL_BACK_URL || 'http://localhost:3000/line/registration/callback';
const FUGLE_API_KEY: string = process.env.FUGLE_API_KEY || '';
const ADMIN_LINE_TOKEN: string = process.env.ADMIN_LINE_TOKEN || '';
const CYCLIC_URL: string = process.env.CYCLIC_URL || 'http://localhost:8000';
const CLIENT_URL: string = process.env.CLIENT_URL || 'http://localhost:3000';

const LINE_CHANNEL_ID: string = process.env.LINE_CHANNEL_ID || '';
const LINE_CHANNEL_SECRET: string = process.env.LINE_CHANNEL_SECRET || '';
const LINE_CHANNEL_ACCESS_TOKEN: string = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';

export default {
  NODE_ENV,
  MONGODB_URI,
  SERVER_PORT,
  DIVIDENDINFO_URL,
  TOKEN_SECRET,
  MAIL_ACCOUNT,
  MAIL_PASSWORD,
  FINMIND_TOKEN,
  LINE_NOTIFY_AUTH_URL,
  LINE_NOTIFY_TOKEN_URL,
  LINE_NOTIFY_CLIENT_ID,
  LINE_NOTIFY_CLIENT_SECRET,
  LINE_NOTIFY_CALL_BACK_URL,
  LINE_NOTIFY_URL,
  LINE_NOTIFY_CLIENT_SIDE_CALL_BACK_URL,
  FUGLE_API_KEY,
  ADMIN_LINE_TOKEN,
  CYCLIC_URL,
  CLIENT_URL,
  LINE_CHANNEL_ID,
  LINE_CHANNEL_SECRET,
  LINE_CHANNEL_ACCESS_TOKEN,
};
