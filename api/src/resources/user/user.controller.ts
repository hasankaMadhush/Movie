import { Request, Response, NextFunction } from 'express';

import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import UserService from 'resources/user/user.service';
import responseMiddleware from 'middleware/response.middleware';
import { Roles } from 'utils/enums/roles.enums';

class UserController {
  private UserService = new UserService();

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, name, password } = req.body;
      const token = await this.UserService.register(name, email, password, Roles.User);
      responseMiddleware(res, HttpStatus.Created, { token });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const token = await this.UserService.login(email, password);
      responseMiddleware(res, HttpStatus.Ok, { token });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, 'No logged in user'));
      }
      const user = await this.UserService.getUser(req.user._id.toString());
      responseMiddleware(res, HttpStatus.Ok, { user });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };
}

export default UserController;
