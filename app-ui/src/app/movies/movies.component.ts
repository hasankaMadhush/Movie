import { Component } from '@angular/core';
import Movie from '../interfaces/movie.interface';
import { MovieService } from '../services/movie/movie.service';
import { BehaviorSubject, pipe, tap } from 'rxjs';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  movies: Movie[] = [];
  faHeart = faHeart;

  constructor(private movieService: MovieService) {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe((value) => {
      console.log('value:', value);
      const { movies = [] } = value.data;
      this.movies = movies;
    });
    // this.movies = this.movieService.movies.pipe(tap(value) => console);
    console.log('movies:', this.movies);
  }
}
