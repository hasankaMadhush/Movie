import { Schema, model } from 'mongoose';

import Movie from 'resources/movie/movie.interface';

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    language: { type: String, required: true },
    overview: { type: String },
    poster: { type: String },
  },
  { timestamps: true }
);

export default model<Movie>('Movie', MovieSchema);
