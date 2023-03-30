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
const FUGLE_TOKEN: string | undefined = process.env.FUGLE_TOKEN;
const FUGLE_URI: string | undefined = process.env.FUGLE_URI;

export = {
  NODE_ENV,
  MONGODB_URI,
  SERVER_PORT,
  DIVIDENDINFO_URL,
  TOKEN_SECRET,
  MAIL_ACCOUNT,
  MAIL_PASSWORD,
  FINMIND_TOKEN,
  FUGLE_TOKEN,
  FUGLE_URI,
};
