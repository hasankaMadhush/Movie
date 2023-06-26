import Movie from './movie.interface';
import User from './user.interface';

interface Collection {
  _id: string;
  createdAt: any;
  name: string;
  owner: User;
  movies: Movie[];
}

export default Collection;
