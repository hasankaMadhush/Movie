import { Model } from 'mongoose';

import Movie from 'resources/movie/movie.interface';
import MovieModel from 'resources/movie/movie.model';

class MovieService {
  private movie: Model<Movie> = MovieModel;

  /**
   * gets all movies
   * limit, skip supported
   * sort is supported only created timestamp only for atm.
   */
  public async getAll(limit: number = 50, offset: number = 0): Promise<Movie[] | Error> {
    try {
      return await this.movie
        .find()
        .limit(limit)
        .skip(offset * limit)
        .sort({ createdAt: 'desc' });
    } catch (error) {
      throw new Error('Unable to get movies');
    }
  }

  // get a single movie
  public async getById(_id: string): Promise<Movie | Error> {
    try {
      const movie = await this.movie.findById({ _id });
      if (!movie) {
        throw new Error('Movie not found');
      }
      return movie;
    } catch (error) {
      throw new Error('Unable to get movie');
    }
  }

  /**
   * search a movie by title
   * improvements:
   *  - search on release date
   *  - search on overview content
   */
  public async search(
    limit: number = 50,
    offset: number = 0,
    search: string = ''
  ): Promise<Movie[] | Error> {
    try {
      return await this.movie
        .find({
          title: { $regex: new RegExp(search, 'i') },
        })
        .limit(limit)
        .skip(offset * limit);
    } catch (error: any) {
      throw new Error(`Unable to search movies: ${error.message}`);
    }
  }

  /**
   * counts all movie records
   * used for pagination/ results counter
   */
  public async countAll(): Promise<number | Error> {
    try {
      return await this.movie.count();
    } catch (error: any) {
      throw new Error(`Unable to count all movies: ${error.message}`);
    }
  }

  /**
   * counts all movie records matching for given movie title
   * used for pagination/ results counter
   */
  public async searchCount(search: string): Promise<number | Error> {
    try {
      return await this.movie
        .find({
          title: { $regex: new RegExp(search, 'i') },
        })
        .count();
    } catch (error: any) {
      throw new Error(`Unable to count all movies: ${error.message}`);
    }
  }
}

export default MovieService;
