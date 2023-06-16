import jwt from 'jsonwebtoken';

import User from 'resources/user/user.interface';
import Token from 'utils/interfaces/token.interface';

const createToken = (user: User): string => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '1d',
  });
};

const verifyToken = async (token: string): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (error, payload) => {
      if (error) {
        return reject(error);
      }
      resolve(payload as Token);
    });
  });
};

export default { createToken, verifyToken };
