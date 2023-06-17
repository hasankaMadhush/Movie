import { Model } from 'mongoose';

import Movie from 'resources/movie/movie.interface';
import MovieModel from 'resources/movie/movie.model';
import { MovieType } from 'utils/enums/movie.enums';

class MovieService {
  private movie: Model<Movie> = MovieModel;

  public async getAll(
    limit: number = 50,
    offset: number = 0,
    sortBy: string = MovieType.Title
  ): Promise<Movie[] | Error> {
    try {
      return await this.movie.find().skip(offset).limit(limit).sort({ sortBy: 1 });
    } catch (error) {
      throw new Error('Unable to get movies');
    }
  }

  public async getBy(
    limit: number = 50,
    offset: number = 0,
    sortBy: string = MovieType.Title,
    filterBy: string = MovieType.Title,
    filterValue: string = ''
  ): Promise<Movie[] | Error> {
    try {
      return await this.movie
        .find({ filterBy: filterValue })
        .skip(offset)
        .limit(limit)
        .sort({ sortBy: 1 });
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
