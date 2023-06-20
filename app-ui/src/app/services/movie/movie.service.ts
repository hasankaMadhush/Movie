import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
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

  getMovies() {
    return this.apiService.getMovies();
    // .pipe(
    // tap((response: any) => {
    //   const { movies = [] } = response.data;
    //   console.log('movies:', movies);
    //   this._movies$.next(movies);
    // })
    // );
  }
}
