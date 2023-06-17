import { Document, Types } from 'mongoose';

interface MovieCollection extends Document {
  name: string;
  owner: Types.ObjectId;
  movies: [Types.ObjectId];
}

export default MovieCollection;
