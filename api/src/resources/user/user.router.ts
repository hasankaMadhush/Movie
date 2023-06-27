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
    this.router.get(
      `${this.path}/:id/my-collections/search`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.UserController.searchMyCollectionsAndMovies
    );
    this.router.get(
      `${this.path}/:id/my-collections`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.UserController.getCollections
    );

    this.router.get(
      `${this.path}/:id/others-collections`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.UserController.getOtherCollections
    );
  }
}

export default UserRouter;
