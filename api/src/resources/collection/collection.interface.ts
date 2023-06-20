import { Document, Types } from 'mongoose';

interface Collection extends Document {
  name: string;
  owner: Types.ObjectId;
  movies: [Types.ObjectId];
}

export default Collection;
