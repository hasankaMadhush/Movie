import { Router } from 'express';

import authenticatedMiddleware from 'middleware/authenticated.middleware';
import { Roles } from 'utils/enums/roles.enums';
import CollectionController from 'resources/collection/collection.controller';
import RouterInterace from 'utils/interfaces/router.interface';
import validate from 'resources/collection/collection.validation';
import validationMiddleware from 'middleware/validation.middleware';

/**
 * TO DO: Add Middleware validations
 */
class CollectionRouter implements RouterInterace {
  public path = '/collections';
  public router = Router();
  private CollectionController = new CollectionController();

  constructor() {
    this.initialiseRoutes();
  }

  public initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      // validationMiddleware(validate.create),
      this.CollectionController.create
    );
    // add authentication validations
    this.router.get(
      `${this.path}/:id`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.CollectionController.get
    );
    this.router.post(
      `${this.path}/:id/movies`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.CollectionController.addMovies
    );
    this.router.post(
      `${this.path}/:id/movies/remove`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.CollectionController.removeMovies
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.CollectionController.delete
    );
  }
}

export default CollectionRouter;
