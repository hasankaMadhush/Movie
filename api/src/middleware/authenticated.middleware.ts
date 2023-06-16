import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import HttpException from 'utils/exceptions/http.exception';
import token from 'utils/token';
import Token from 'utils/interfaces/token.interface';
import userModel from 'resources/user/user.model';

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    console.log('in:');
    const bearer: string | undefined = req.headers.authorization;
    console.log('bearer:', bearer);
    if (!bearer || !bearer?.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unathorized'));
    }
    const accessToken = bearer.split('Bearer ')[1].trim();
    console.log('accesstoken:', accessToken);
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unathorized'));
    }

    const user = await userModel.findById(payload.id).select('-password').exec();
    console.log('user:', user);
    if (!user) {
      return next(new HttpException(401, 'Unathorized'));
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unathorized'));
  }
}

export default authenticatedMiddleware;
