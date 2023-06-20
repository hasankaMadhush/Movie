import { Request, Response, NextFunction } from 'express';

import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import responseMiddleware from 'middleware/response.middleware';
import { Roles } from 'utils/enums/roles.enums';
import token from 'utils/token';
import User from './user.interface';
import UserService from 'resources/user/user.service';

class UserController {
  private UserService = new UserService();

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, name, password } = req.body;
      const token = await this.UserService.create(name, email, password, Roles.User);
      responseMiddleware(res, HttpStatus.Created, { token });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const user: User | Error = await this.UserService.authenticate(email, password);
      if (!(user instanceof Error)) {
        const accessToken = token.create(user);
        responseMiddleware(res, HttpStatus.Ok, { ...user, token });
      }
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getCollections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      responseMiddleware(res, HttpStatus.Ok, await this.UserService.getCollections(id));
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getOtherCollections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      responseMiddleware(res, HttpStatus.Ok, await this.UserService.getOtherCollections(id));
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };
}

export default UserController;
