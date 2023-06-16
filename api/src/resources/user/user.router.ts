import { Router } from 'express';

import RouterInterace from 'utils/interfaces/router.interface';
import UserController from './user.controller';
import validationMiddleware from 'middleware/validation.middleware';
import validate from 'resources/user/user.validation';
import authenticatedMiddleware from 'middleware/authenticated.middleware';

class UserRouter implements RouterInterace {
  public path: string = '/users';
  public router = Router();
  private UserController = new UserController();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.UserController.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.UserController.login
    );
    this.router.get(`${this.path}/get`, authenticatedMiddleware, this.UserController.getUser);
  }
}

export default UserRouter;
