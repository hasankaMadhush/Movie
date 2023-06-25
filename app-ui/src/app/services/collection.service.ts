import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Collection from 'src/app/interfaces/collection.interface';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import User from 'src/app/interfaces/user.interface';
import Movie from 'src/app/interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  _myCollections$ = new BehaviorSubject<Collection[]>([]);
  _othersCollections$ = new BehaviorSubject<Collection[]>([]);
  myCollections = this._myCollections$.asObservable();
  othersCollections = this._othersCollections$.asObservable();
  loggedInUser: User | null | undefined;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.authService.isLoggedInUser.subscribe((value) => {
      console.log('user CollectionService:', value);
      this.loggedInUser = value;
    });
  }

  getMyCollections(limit: number, offset: number, search: string = '') {
    return this.apiService.getMyCollections(
      this.loggedInUser?._id || '',
      limit,
      offset,
      search
    );
  }

  getOthersCollections(limit: number, offset: number, search: string) {
    return this.apiService.getOthersCollections(
      this.loggedInUser?._id || '',
      limit,
      offset,
      search
    );
  }

  addToCollection(collection: Collection, movie: Movie) {
    return this.apiService.addMoviesToCollection(collection._id, [movie._id]);
  }
}
