import { Model, Types } from 'mongoose';

import MovieCollection from 'resources/movieCollection/movieCollection.interface';
import MovieCollectionModel from 'resources/movieCollection/movieCollection.model';

class MovieCollectionService {
  private movieCollection: Model<MovieCollection> = MovieCollectionModel;

  public async create(
    name: string,
    createdBy: Types.ObjectId,
    movies: Types.ObjectId[]
  ): Promise<string | Error> {
    try {
      const movieCollection = await this.movieCollection.create({
        name,
        owner: createdBy,
        movies,
      });
      return movieCollection.name;
    } catch (error: any) {
      throw new Error(`Unable to create collection: ${error.message}`);
    }
  }

  public async getById(id: string): Promise<MovieCollection | Error> {
    try {
      const movieCollection = await this.movieCollection
        .findById({ _id: id })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies', select: '_id title' });
      if (!movieCollection) {
        throw new Error('Movie Collection not found.');
      }
      return movieCollection;
    } catch (error: any) {
      throw new Error('Unable to get movie collection');
    }
  }

  public async findByUser(userId: string): Promise<MovieCollection[] | Error> {
    try {
      return await this.movieCollection
        .find({ owner: userId })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies', select: '_id title' });
    } catch (error) {
      throw new Error('Unable to get movie collection');
    }
  }

  public async getOtherUsersCollections(userId: string): Promise<MovieCollection[] | Error> {
    try {
      return await this.movieCollection
        .find({ owner: { $ne: userId } })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies', select: '_id title' });
    } catch (error) {
      throw new Error('Unable to get movie collection');
    }
  }

  public async addMovies(id: string, movies: string[]): Promise<MovieCollection | Error> {
    try {
      const movieCollection = await this.movieCollection.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { movies: movies } }
      );
      if (!movieCollection) {
        throw new Error('Unable to get add to collection, collection not found');
      }
      return movieCollection;
    } catch (error: any) {
      console.log('error found::', error.message);
      throw new Error('Unable to update movie collection');
    }
  }

  public async removeMovies(id: string, movies: string[]): Promise<MovieCollection | Error> {
    try {
      const updatedCollection = await this.movieCollection.findByIdAndUpdate(
        { _id: id },
        { $pull: { $in: movies } }
      );
      if (!updatedCollection) {
        throw new Error('Unable to get remove from collection, collection not found');
      }
      return updatedCollection;
    } catch (error) {
      throw new Error('Unable to remove movies from collection');
    }
  }

  public async deleteCollection(id: string): Promise<MovieCollection | Error> {
    try {
      const deletedCollection = await this.movieCollection.findByIdAndDelete({ _id: id });
      if (!deletedCollection) {
        throw new Error('Unable to find collection to delete');
      }
      return deletedCollection;
    } catch (error) {
      throw new Error('Unable to delete collection');
    }
  }
}

export default MovieCollectionService;
