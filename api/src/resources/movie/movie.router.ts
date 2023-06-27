import { Router } from 'express';

import authenticatedMiddleware from 'middleware/authenticated.middleware';
import { Roles } from 'utils/enums/roles.enums';
import RouterInterace from 'utils/interfaces/router.interface';
import MovieController from './movie.controller';

class MovieRouter implements RouterInterace {
  public path: string = '/movies';
  public router: Router = Router();
  private MovieController = new MovieController();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.MovieController.getAll
    );
    this.router.get(
      `${this.path}/:id`,
      authenticatedMiddleware([Roles.Admin, Roles.User]),
      this.MovieController.getById
    );
  }
}

export default MovieRouter;
