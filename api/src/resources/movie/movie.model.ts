import { Schema, model } from 'mongoose';

import Movie from 'resources/movie/movie.interface';

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    runTimeInMinutes: { type: Number, required: true },
    genres: { type: [String], required: true },
  },
  { timestamps: true }
);

export default model<Movie>('Movie', MovieSchema);
