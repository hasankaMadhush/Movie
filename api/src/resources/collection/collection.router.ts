import { Router } from 'express';

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
      // validationMiddleware(validate.create),
      this.CollectionController.create
    );
    // add authentication validations
    this.router.get(`${this.path}/:id`, this.CollectionController.get);
    this.router.post(`${this.path}/:id`, this.CollectionController.addMovies);
    this.router.post(`${this.path}/:id/remove`, this.CollectionController.removeMovies);
    this.router.delete(`${this.path}/:id`, this.CollectionController.delete);
  }
}

export default CollectionRouter;
