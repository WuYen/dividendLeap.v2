import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import responseHandler from '../utility/responseHandler';

export default [
  cors(),
  express.json({
    verify: (req, _res, buffer) => {
      (req as express.Request & { rawBody?: Buffer }).rawBody = Buffer.from(buffer);
    },
  }),
  express.urlencoded({ extended: false }),
  morgan('tiny'),
  responseHandler,
];
