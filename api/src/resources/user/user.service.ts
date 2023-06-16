import { Model } from 'mongoose';

import UserModel from 'resources/user/user.model';
import token from 'utils/token';
import User from './user.interface';

class UserService {
  private user: Model<User> = UserModel;

  public async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string | Error> {
    try {
      const user = await this.user.create({
        name,
        email,
        password,
        role,
      });
      const accessToken = token.createToken(user);
      return accessToken;
    } catch (error) {
      throw new Error('Unable to create user');
    }
  }

  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });
      if (!user) {
        throw new Error('Unable to find the user');
      }

      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      }

      throw new Error('Wrong Credentials given.');
    } catch (error) {
      throw new Error('Unable to login user');
    }
  }

  public async getUser(_id: string): Promise<User | Error> {
    try {
      const user = await this.user.findById({ _id }).select('-password').exec();
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      throw new Error(`Unable to find user: ${error.message}`);
    }
  }
}

export default UserService;
