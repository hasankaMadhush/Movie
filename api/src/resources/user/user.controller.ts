import { Request, Response, NextFunction } from 'express';

import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import responseMiddleware from 'middleware/response.middleware';
import { Roles } from 'utils/enums/roles.enums';
import token from 'utils/token';
import User from './user.interface';
import UserService from 'resources/user/user.service';

class UserController {
  private UserService = new UserService();

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, name, password } = req.body;
      responseMiddleware(
        res,
        HttpStatus.Created,
        await this.UserService.create(name, email, password, Roles.User)
      );
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const user: User | Error = await this.UserService.authenticate(email, password);
      if (!(user instanceof Error)) {
        responseMiddleware(res, HttpStatus.Ok, { user, token: token.create(user) });
      }
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getCollections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { limit = 5, offset = 0, search = '' } = req.query;
      if (search) {
        return responseMiddleware(res, HttpStatus.Ok, {
          count: await this.UserService.searchCollectionsCount(id),
          collections: await this.UserService.searchCollections(id, search.toString()),
        });
      }
      responseMiddleware(res, HttpStatus.Ok, {
        count: await this.UserService.getCollectionsCount(id),
        collections: await this.UserService.getCollections(id, Number(limit), Number(offset)),
      });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public getOtherCollections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { limit = 5, offset = 0, search = '' } = req.query;
      if (search) {
        const searchText = search.toString();
        return responseMiddleware(res, HttpStatus.Ok, {
          count: await this.UserService.searchOthersCollectionsCount(id, searchText),
          collections: await this.UserService.searchOthersCollections(id, searchText),
        });
      }
      responseMiddleware(res, HttpStatus.Ok, {
        count: await this.UserService.getOthersCollectionsCount(id),
        collections: await this.UserService.getOthersCollections(id, Number(limit), Number(offset)),
      });
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };

  public searchMyCollectionsAndMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { search = '' } = req.query;
      responseMiddleware(
        res,
        HttpStatus.Ok,
        await this.UserService.searchCollections(id, search.toString())
      );
    } catch (error: any) {
      next(new HttpException(HttpStatus.Bad_Request, error.message));
    }
  };
}

export default UserController;
