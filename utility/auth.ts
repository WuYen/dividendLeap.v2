import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './config';

interface UserPayload {
  id: string;
  // Add other properties as needed
}

interface AuthRequest extends Request {
  user?: UserPayload;
}

/**
 * Middleware for routing
 * @param req
 * @param res
 * @param next
 * @returns
 */
function authentication(req: AuthRequest, res: Response, next: NextFunction): void {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401).send({ success: false, message: '沒登入', token: null }); // if there isn't any token
    return;
  }

  jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
      return;
    }
    req.user = user as UserPayload;
    next(); // pass the execution off to whatever request the client intended
  });
}

function sign(data: UserPayload): string {
  const token = jwt.sign(data, config.TOKEN_SECRET);
  return token;
}

function verify(token: string): boolean {
  try {
    jwt.verify(token, config.TOKEN_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

export { authentication, sign, verify };
