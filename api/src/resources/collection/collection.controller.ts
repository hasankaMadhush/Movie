import { NextFunction, Request, Response } from 'express';

import CollectionService from 'resources/collection/collection.service';
import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import responseMiddleware from 'middleware/response.middleware';

class MovieCollectionController {
  private CollectionService = new CollectionService();

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, createdBy, movies = [] } = req.body;
      responseMiddleware(
        res,
        HttpStatus.Created,
        await this.CollectionService.create(name, createdBy, movies)
      );
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      responseMiddleware(res, HttpStatus.Ok, await this.CollectionService.get(id));
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
      const { movies = [] } = req.body;
      responseMiddleware(res, HttpStatus.Ok, await this.CollectionService.addMovies(id, movies));
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public removeMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { movies = [] } = req.body;
      responseMiddleware(res, HttpStatus.Ok, await this.CollectionService.removeMovies(id, movies));
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      responseMiddleware(res, HttpStatus.Ok, await this.CollectionService.delete(id));
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };
}

export default MovieCollectionController;
