import { Model, Types } from 'mongoose';

import Collection from 'resources/collection/collection.interface';
import CollectionModel from 'resources/collection/collection.model';

class CollectionService {
  private collection: Model<Collection> = CollectionModel;

  public async create(
    name: string,
    createdBy: Types.ObjectId,
    movies: Types.ObjectId[]
  ): Promise<Collection | Error> {
    try {
      return await this.collection.create({
        name,
        owner: createdBy,
        movies,
      });
    } catch (error: any) {
      throw new Error(`Unable to create collection: ${error.message}`);
    }
  }

  public async get(id: string): Promise<Collection | Error> {
    try {
      const collection = await this.collection
        .findById({ _id: id })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies' });
      if (!collection) {
        throw new Error('Movie Collection not found.');
      }
      return collection;
    } catch (error: any) {
      throw new Error('Unable to get movie collection');
    }
  }

  public async addMovies(id: string, movies: string[]): Promise<Collection | Error> {
    try {
      const collection = await this.collection.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { movies: movies } }
      );
      if (!collection) {
        throw new Error('Unable to get add to collection, collection not found');
      }
      return collection;
    } catch (error: any) {
      throw new Error('Unable to update movie collection');
    }
  }

  public async removeMovies(id: string, movies: string[]): Promise<Collection | Error> {
    try {
      const updatedCollection = await this.collection.findByIdAndUpdate(
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

  public async delete(id: string): Promise<Collection | Error> {
    try {
      const deletedCollection = await this.collection.findByIdAndDelete({ _id: id });
      if (!deletedCollection) {
        throw new Error('Unable to find collection to delete');
      }
      return deletedCollection;
    } catch (error) {
      throw new Error('Unable to delete collection');
    }
  }
}

export default CollectionService;
