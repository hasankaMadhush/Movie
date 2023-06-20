import { Router } from 'express';

import authenticatedMiddleware from 'middleware/authenticated.middleware';
import { Roles } from 'utils/enums/roles.enums';
import RouterInterace from 'utils/interfaces/router.interface';
import UserController from './user.controller';
import validationMiddleware from 'middleware/validation.middleware';
import validate from 'resources/user/user.validation';

class UserRouter implements RouterInterace {
  public path: string = '/users';
  public router: Router = Router();
  private UserController = new UserController();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.UserController.create
    );
    this.router.post(
      `${this.path}/authenticate`,
      validationMiddleware(validate.authenticate),
      this.UserController.authenticate
    );
    // add authentication middleware
    this.router.get(`${this.path}/:id/my-collections`, this.UserController.getCollections);
    this.router.get(`${this.path}/:id/other-collections`, this.UserController.getOtherCollections);
  }
}

export default UserRouter;
