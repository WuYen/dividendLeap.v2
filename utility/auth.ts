import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import asyncLocalStorage from '../utility/asyncLocalStorage';
import config from './config';

interface IUserPayload {
  id: string;
  fugleApiKey?: string; // Add this line
}

interface IAuthRequest extends Request {
  user?: IUserPayload;
}

/**
 * Middleware for routing
 * @param req
 * @param res
 * @param next
 * @returns
 */
function authentication(req: IAuthRequest, res: Response, next: NextFunction): void {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.sendError(401, { message: '沒登入' });
    return;
  }

  jwt.verify(token, config.TOKEN_SECRET, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.sendError(403, { message: '登入過期' });
        return;
      } else {
        console.error(err);
        res.sendError(403, { message: '登入錯誤' });
        return;
      }
    }

    req.user = user as IUserPayload;
    const store = new Map<string, string>();
    store.set('id', req.user.id || '');
    store.set('fugleApiKey', req.user.fugleApiKey || '');
    asyncLocalStorage.run(store, () => {
      next();
    });
  });
}

function sign(data: IUserPayload): string {
  const token = jwt.sign(data, config.TOKEN_SECRET, { expiresIn: '30d' });
  return token;
}

// function verify(token: string): boolean {
//   try {
//     jwt.verify(token, config.TOKEN_SECRET);
//     return true;
//   } catch (err) {
//     return false;
//   }
// }

export { authentication, sign, IUserPayload, IAuthRequest };
