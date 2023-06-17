import { Router } from 'express';

import MovieCollectionController from 'resources/movieCollection/movieCollection.controller';
import RouterInterace from 'utils/interfaces/router.interface';
import validate from 'resources/movieCollection/movieCollection.validation';
import validationMiddleware from 'middleware/validation.middleware';

/**
 * TO DO: Add Middleware validations
 */
class MovieConnectionRouter implements RouterInterace {
  public path = '/collections';
  public router = Router();
  private MovieCollectionController = new MovieCollectionController();

  constructor() {
    this.initialiseRoutes();
  }

  public initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      // validationMiddleware(validate.create),
      this.MovieCollectionController.create
    );
    this.router.get(`${this.path}/:id`, this.MovieCollectionController.getById);
    this.router.get(`${this.path}/users/:id`, this.MovieCollectionController.findByUser);
    this.router.get(
      `${this.path}/users/:id/other`,
      this.MovieCollectionController.getOtherUsersCollections
    );
    this.router.put(`${this.path}/:id`, this.MovieCollectionController.addMovies);
  }
}

export default MovieConnectionRouter;
