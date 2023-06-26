import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Collection from 'src/app/interfaces/collection.interface';
import Movie from 'src/app/interfaces/movie.interface';
import User from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  loggedInUser: User | null | undefined;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.authService.loggedInUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
  }

  // get collections related to current logged in user
  getMine(limit: number, offset: number, search: string = '') {
    return this.apiService.getMyCollections(
      this.loggedInUser?._id || '',
      limit,
      offset,
      search
    );
  }

  // gets collections that are not related to current logged in user
  getOthers(limit: number, offset: number, search: string) {
    return this.apiService.getOthersCollections(
      this.loggedInUser?._id || '',
      limit,
      offset,
      search
    );
  }

  // add movies to selected collection
  addMovies(collection: Collection, movie: Movie) {
    return this.apiService.addMoviesToCollection(collection._id, [movie._id]);
  }

  // creates a new collection - movies can be empty
  create(name: string, userId: string, movieIds: string[]) {
    return this.apiService.createCollection(name, userId, movieIds);
  }

  // get a single collection by ID
  get(id: string) {
    return this.apiService.get(id);
  }
}
