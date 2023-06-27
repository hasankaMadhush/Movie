import mongoose from 'mongoose';
import DBConnectionInterface from './interfaces/db.connection.interface';

const SUCCESS_MSG = 'Connected to Mongo DB instance';
const FAILED_MSG = 'Connection to Mongo DB instance failed with';
const MONGO_SRV = 'mongodb+srv://';

class MongoDB implements DBConnectionInterface {
  connect(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DB_URI, MONGO_DATABASE } = process.env;
    const host: string = `${MONGO_SRV}${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB_URI}`;
    mongoose
      .connect(host, { dbName: MONGO_DATABASE })
      .then(() => SUCCESS_MSG)
      .catch((error: any) => {
        console.log(`${FAILED_MSG} ${error.message}.`);
      });
  }
}

export default MongoDB;
