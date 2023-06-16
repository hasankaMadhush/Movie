import { Request, Response, NextFunction } from 'express';

import HttpException from 'utils/exceptions/http.exception';
import UserService from 'resources/user/user.service';
import responseMiddleware from 'middleware/response.middleware';

class UserController {
  private UserService = new UserService();

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, name, password } = req.body;
      const token = await this.UserService.register(name, email, password, 'user');
      responseMiddleware(res, 201, { token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
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
      responseMiddleware(res, 200, { token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
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
      responseMiddleware(res, 200, { user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
