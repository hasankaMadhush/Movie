import { Component, Input } from '@angular/core';
import Movie from '../interfaces/movie.interface';

@Component({
  selector: 'app-movie-table-row',
  templateUrl: './movie-table-row.component.html',
  styleUrls: ['./movie-table-row.component.css'],
})
export class MovieTableRowComponent {
  @Input() movie!: Movie;
}
