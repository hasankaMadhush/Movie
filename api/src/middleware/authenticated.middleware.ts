import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import { Roles } from 'utils/enums/roles.enums';
import token from 'utils/token';
import Token from 'utils/interfaces/token.interface';
import userModel from 'resources/user/user.model';

const UNATHORIZED = 'Unathorized';

function authenticatedMiddleware(roles: string[] | string = [Roles.User]): any {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      try {
        const bearer: string | undefined = req.headers.authorization;
        if (!bearer || !bearer?.startsWith('Bearer ')) {
          return next(new HttpException(HttpStatus.Unauthorized, UNATHORIZED));
        }
        const accessToken = bearer.split('Bearer ')[1].trim();
        const payload: Token | jwt.JsonWebTokenError = await token.verify(accessToken);

        if (payload instanceof jwt.JsonWebTokenError) {
          return next(new HttpException(HttpStatus.Unauthorized, UNATHORIZED));
        }

        const user = await userModel.findById(payload.id).select('-password').exec();
        if (!user) {
          return next(new HttpException(HttpStatus.Unauthorized, UNATHORIZED));
        }
        req.user = user;
        return next();
      } catch (error) {
        return next(new HttpException(HttpStatus.Unauthorized, UNATHORIZED));
      }
    },
  ];
}

export default authenticatedMiddleware;
