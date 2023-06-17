import Document from 'mongoose';

interface Movie extends Document {
  title: string;
  year: string;
  runTimeinMinutes: number;
  genres: string[];
}

export default Movie;
