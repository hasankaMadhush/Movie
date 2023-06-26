import { Component } from '@angular/core';

import * as dayjs from 'dayjs';
import { faHeart, faAdd } from '@fortawesome/free-solid-svg-icons';

import Collection from 'src/app/interfaces/collection.interface';
import { CollectionService } from 'src/app/services/collection.service';
import { environment } from 'src/environments/environment';
import Movie from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import { SOURCES } from 'src/lib/constants';

const { defaultOffset, defaultLimit } = environment;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  faHeart = faHeart;
  faAdd = faAdd;
  dayjs = dayjs;

  movies: Movie[] = [];
  collections: Collection[] = [];
  limit: number = defaultLimit;
  offset: number = defaultOffset;
  sourceTypes = SOURCES;
  searchText: string = '';
  totalMovieCount: number = 0;
  totalPages: number = 0;
  toastTitle!: string;
  toastBody!: string;
  showToast: boolean = false;
  heroTitle: string = 'Movies';
  heroContent: string = `Embark on a cinematic journey through a world of diverse genres! From
      pulse-pounding action to side-splitting comedy, gripping drama to
      heartwarming romance, mind-bending science fiction to awe-inspiring
      fantasy, there's a movie for every taste. Get ready to explore the magic
      of movies and indulge in unforgettable stories that span genres, captivate
      your imagination, and ignite your emotions. Welcome to a collection where
      the power of storytelling knows no bounds!`;

  constructor(
    private movieService: MovieService,
    private collectionService: CollectionService
  ) {
    this.getMovies();
    this.generateCollectionList();
  }

  getMovies(search: string = '') {
    this.movieService
      .getMovies(this.limit, this.offset - 1, search)
      .subscribe((response) => {
        this.movies = response.data?.movies || [];
        this.totalMovieCount = response.data?.count || 0;
        this.totalPages = Math.ceil(this.totalMovieCount / this.limit);
      });
  }

  generateCollectionList() {
    this.collectionService
      .getMine(this.limit, this.offset - 1)
      .subscribe((response) => {
        this.collections = response.data;
      });
  }

  addToCollection(collection: Collection, movie: Movie) {
    this.collectionService
      .addMovies(collection, movie)
      .subscribe((response) => {
        if (response.data) {
          this.toastTitle = 'Success';
          this.toastBody = `${movie.title} added successfully to ${collection.name} collection`;
          this.showToast = true;
          window.alert(this.toastBody);
        }
      });
  }

  setCurrentPage(currentPage: number) {
    this.offset = currentPage;
    this.getMovies();
  }
}
