import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from './config';

interface IUserPayload {
  id: string;
  // Add other properties as needed
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
    res.status(401).send({ success: false, message: '沒登入', token: null }); // if there isn't any token
    return;
  }

  jwt.verify(token, config.TOKEN_SECRET, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.status(403).json({ success: false, message: 'Token expired', token: null });
      } else {
        console.error(err);
        res.status(403).json({ success: false, message: 'Token invalid', token: null });
      }
    }
    req.user = user as IUserPayload;
    next(); // pass the execution off to whatever request the client intended
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

export { authentication, sign, IUserPayload };
