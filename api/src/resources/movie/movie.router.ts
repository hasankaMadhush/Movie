import { Router } from 'express';

import authenticatedMiddleware from 'middleware/authenticated.middleware';
import { Roles } from 'utils/enums/roles.enums';
import RouterInterace from 'utils/interfaces/router.interface';
import MovieController from './movie.controller';
import validationMiddleware from 'middleware/validation.middleware';
import validate from 'resources/movie/movie.validation';

class MovieRouter implements RouterInterace {
  public path: string = '/movies';
  public router: Router = Router();
  private MovieController = new MovieController();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}/movies/:limit/:offset/:sortBy`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      validationMiddleware(validate.getAll),
      this.MovieController.getAll
    );
    this.router.post(
      `${this.path}/movies/:limit/:offset/:sortBy`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      validationMiddleware(validate.getBy),
      this.MovieController.getBy
    );
    this.router.post(
      `${this.path}/movies/:id`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      validationMiddleware(validate.getById),
      this.MovieController.getById
    );
  }
}

export default MovieRouter;
