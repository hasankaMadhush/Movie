import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as dayjs from 'dayjs';
import {
  faArrowLeftLong,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';
import Movie from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

const { defualtDateFormat } = environment;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  dayjs = dayjs;
  faCirclePlus = faCirclePlus;
  faArrowLeftLong = faArrowLeftLong;

  @Input() movie!: Movie;

  route: ActivatedRoute = inject(ActivatedRoute);
  movieId: string;
  dateFormat: string = defualtDateFormat;

  constructor(private movieService: MovieService, private location: Location) {
    this.movieId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getMovie();
  }

  getMovie() {
    this.movieService
      .getMovie(this.movieId)
      .subscribe((response) => (this.movie = response.data.movie));
  }

  goBack() {
    this.location.back();
  }
}
