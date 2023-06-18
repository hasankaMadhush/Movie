import mongoose from 'mongoose';
import DBConnectionInterface from './interfaces/db.connection.interface';

class MongoDB implements DBConnectionInterface {
  connect(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DB_URI, MONGO_DATABASE } = process.env;
    const host: string = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB_URI}`;
    mongoose
      .connect(host, { dbName: MONGO_DATABASE })
      .then(() => 'Connected to Mongo DB instance')
      .catch((error: any) => {
        console.log(`Connection to Mongo DB instance failed with ${error.message}.`);
      });
  }
}

export default MongoDB;
