import { NextFunction, Request, Response } from 'express';

import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import MovieCollectionService from 'resources/movieCollection/movieCollection.service';
import responseMiddleware from 'middleware/response.middleware';

class MovieCollectionController {
  private MovieCollectionService = new MovieCollectionService();

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      console.log(req.body);
      const { name, createdBy, movies = [] } = req.body;
      const movieCollection = await this.MovieCollectionService.create(name, createdBy, movies);
      responseMiddleware(res, HttpStatus.Created, { name: movieCollection });
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
      responseMiddleware(res, HttpStatus.Ok, await this.MovieCollectionService.getById(id));
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public findByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      responseMiddleware(res, HttpStatus.Ok, await this.MovieCollectionService.findByUser(id));
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getOtherUsersCollections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      responseMiddleware(
        res,
        HttpStatus.Ok,
        await this.MovieCollectionService.getOtherUsersCollections(id)
      );
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public addMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { moviesToAdd = [] } = req.body;
      const movieCollection = this.MovieCollectionService.addMovies(id, moviesToAdd);
      responseMiddleware(res, HttpStatus.Ok, movieCollection);
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };
}

export default MovieCollectionController;
