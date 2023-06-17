import { Model } from 'mongoose';

import Movie from 'resources/movie/movie.interface';
import MovieModel from 'resources/movie/movie.model';
import { MovieType } from 'utils/enums/movie.enums';

class MovieService {
  private movie: Model<Movie> = MovieModel;

  public async getAll(limit: number = 50, offset: number = 0): Promise<Movie[] | Error> {
    try {
      return await this.movie.find().skip(offset).limit(limit);
    } catch (error) {
      throw new Error('Unable to get movies');
    }
  }

  public async getBy(
    filterBy: string = MovieType.Title,
    filterValue: string = '',
    limit: number = 50,
    offset: number = 0
  ): Promise<Movie[] | Error> {
    try {
      return await this.movie
        .find({ [filterBy]: filterValue })
        .skip(offset)
        .limit(limit);
    } catch (error) {
      throw new Error('Unable to get movies');
    }
  }

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
}

export default MovieService;
