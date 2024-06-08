// middleware/responseHandler.ts

import { Request, Response, NextFunction } from 'express';

type ResponseType = {
  message?: string;
  data?: any;
};

type ErrorResponseType = {
  message: string;
  data?: any;
};

declare global {
  namespace Express {
    interface Response {
      sendSuccess: (statusCode: number, data: ResponseType) => Response;
      sendError: (statusCode: number, data: ErrorResponseType) => Response;
    }
  }
}

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = (statusCode: number, payload: ResponseType) => {
    return res.status(statusCode).json({ success: true, ...payload });
  };

  res.sendError = (statusCode: number, payload: ErrorResponseType) => {
    return res.status(statusCode).json({
      success: false,
      ...payload,
    });
  };

  next();
};

export default responseHandler;
