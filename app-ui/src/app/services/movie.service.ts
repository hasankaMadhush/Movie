import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import Movie from 'src/app/interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  _movies$ = new BehaviorSubject<Movie[]>([]);
  movies = this._movies$.asObservable();

  constructor(private apiService: ApiService) {
    this.getMovies();
  }

  getMovies(limit: number = 50, offset: number = 0, search: string = '') {
    console.log('query offset::', offset);
    return this.apiService.getMovies(limit, offset, search);
    // .pipe(
    // tap((response: any) => {
    //   const { movies = [] } = response.data;
    //   console.log('movies:', movies);
    //   this._movies$.next(movies);
    // })
    // );
  }
}
