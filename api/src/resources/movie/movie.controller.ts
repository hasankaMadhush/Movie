import { Request, Response, NextFunction } from 'express';

import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import MovieService from 'resources/movie/movie.service';
import responseMiddleware from 'middleware/response.middleware';

class MovieController {
  private MovieService = new MovieService();

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { limit = 50, offset = 0, search = '' } = req.query;
      if (search) {
        const searchText = search.toString();
        return responseMiddleware(res, HttpStatus.Ok, {
          count: await this.MovieService.searchCount(searchText),
          movies: await this.MovieService.search(Number(limit), Number(offset), searchText),
        });
      }
      responseMiddleware(res, HttpStatus.Ok, {
        count: await this.MovieService.countAll(),
        movies: await this.MovieService.getAll(Number(limit), Number(offset)),
      });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getBy = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const { filterBy, filterValue } = req.body;
      const movies = await this.MovieService.getBy(
        filterBy,
        filterValue,
        Number(limit),
        Number(offset)
      );
      responseMiddleware(res, HttpStatus.Ok, { movies });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const movie = await this.MovieService.getById(id);
      responseMiddleware(res, HttpStatus.Ok, { movie });
    } catch (error) {}
  };
}

export default MovieController;
