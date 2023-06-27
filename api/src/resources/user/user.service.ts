import { Model } from 'mongoose';

import Collection from 'resources/collection/collection.interface';
import CollectionModel from 'resources/collection/collection.model';
import User from './user.interface';
import UserModel from 'resources/user/user.model';

class UserService {
  private user: Model<User> = UserModel;
  private collection: Model<Collection> = CollectionModel;

  /**
   * returns the user without password field
   *
   * mongoose didn't support create function to omit certain fields,
   * therefore needs to query again to remove password
   */
  public async create(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<User | Error> {
    try {
      const user = await this.user.create({
        name,
        email,
        password,
        role,
      });
      const passwordLessUser = await this.user.findById({ _id: user._id }).select('-password');
      if (passwordLessUser) {
        return passwordLessUser;
      }
      throw new Error(`Unable to create user`);
    } catch (error: any) {
      throw new Error(`Unable to create user:${error.message}`);
    }
  }

  /**
   * returns the user without password.
   *
   * mongoose didn't support create function to omit certain fields,
   * therefore needs to query again to remove password
   */
  public async authenticate(email: string, password: string): Promise<User | Error> {
    try {
      const user = await this.user.findOne({ email });
      if (!user) {
        throw new Error('Unable to find the user');
      }
      if (await user.isValidPassword(password)) {
        const passwordLessUser = await this.user.findById({ _id: user._id }).select('-password');
        if (passwordLessUser) {
          return passwordLessUser;
        }
      }
      throw new Error('Invalid password.');
    } catch (error: any) {
      throw new Error(`Unable to authenticate user: ${error.message}`);
    }
  }

  /**
   * gets collections for a given user,
   * sort is supported only for created timestamp
   */
  public async getCollections(
    userId: string,
    limit: number,
    offset: number
  ): Promise<Collection[] | Error> {
    try {
      return await this.collection
        .find({ owner: userId })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies' })
        .limit(limit)
        .skip(offset * limit)
        .sort({ createdAt: 'desc' });
    } catch (error: any) {
      throw new Error(`Unable to get collection: ${error.message}`);
    }
  }

  /**
   * gets collections that are not created by the given user
   * sorting is supported only for created timestamp atm
   */
  public async getOthersCollections(
    userId: string,
    limit: number,
    offset: number
  ): Promise<Collection[] | Error> {
    try {
      return await this.collection
        .find({ owner: { $ne: userId } })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies' })
        .limit(limit)
        .skip(offset * limit)
        .sort({ createdAt: 'desc' });
    } catch (error: any) {
      throw new Error(`Unable to get collection: ${error.message}`);
    }
  }

  /**
   * search collection by name for a given user
   * search is not case sensitive
   */
  public async searchCollections(
    userId: string,
    searchText: string = ''
  ): Promise<Collection[] | Error> {
    try {
      return await this.collection
        .find({
          owner: userId,
          name: { $regex: new RegExp(searchText, 'i') },
        })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies' });
    } catch (error: any) {
      throw new Error(`Unable to search collections: ${error.message}`);
    }
  }

  /**
   * search collections that are not created by the given user
   * search is not case sensitive
   */
  public async searchOthersCollections(
    userId: string,
    searchText: string = ''
  ): Promise<Collection[] | Error> {
    try {
      return await this.collection
        .find({
          owner: { $ne: userId },
          name: { $regex: new RegExp(searchText, 'i') },
        })
        .populate({ path: 'owner', select: '_id name' })
        .populate({ path: 'movies' });
    } catch (error: any) {
      throw new Error(`Unable to search collections: ${error.message}`);
    }
  }

  /**
   * get the total collections count for the given user
   * used for pagination purposes/ total record count display
   */
  public async getCollectionsCount(userId: string): Promise<number | Error> {
    try {
      return await this.collection.find({ owner: userId }).count();
    } catch (error: any) {
      throw new Error(`Unable to get collection: ${error.message}`);
    }
  }

  /**
   * get the total collections count for the given user for the given search parameter
   * used for pagination purposes/ total record count display
   */
  public async searchCollectionsCount(
    userId: string,
    searchText: string = ''
  ): Promise<number | Error> {
    try {
      return await this.collection
        .find({
          owner: userId,
          name: { $regex: new RegExp(searchText, 'i') },
        })
        .count();
    } catch (error: any) {
      throw new Error(`Unable to search collections: ${error.message}`);
    }
  }

  /**
   * get the total collections count that are not created by for the given user
   * used for pagination purposes/ total record count display
   */
  public async getOthersCollectionsCount(userId: string): Promise<number | Error> {
    try {
      return await this.collection.find({ owner: { $ne: userId } }).count();
    } catch (error: any) {
      throw new Error(`Unable to get collection: ${error.message}`);
    }
  }

  /**
   * get the total collections count that are not created by the given user for the given search parameter
   * used for pagination purposes/ total record count display
   */
  public async searchOthersCollectionsCount(
    userId: string,
    searchText: string = ''
  ): Promise<number | Error> {
    try {
      return await this.collection
        .find({
          owner: { $ne: userId },
          name: { $regex: new RegExp(searchText, 'i') },
        })
        .count();
    } catch (error: any) {
      throw new Error(`Unable to search collections: ${error.message}`);
    }
  }
}

export default UserService;
