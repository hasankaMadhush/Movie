import { Document } from 'mongoose';

interface User extends Document {
  email: string;
  name: string;
  password: string;
  role: string;
  token?: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export default User;
