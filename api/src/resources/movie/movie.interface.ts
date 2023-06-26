import Document from 'mongoose';

interface Movie extends Document {
  title: string;
  released_date: Date;
  language: string;
  overview: string;
  poster: string;
}

export default Movie;
