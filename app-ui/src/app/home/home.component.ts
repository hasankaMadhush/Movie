import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as dayjs from 'dayjs';
import {
  faArrowRight,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../services/auth.service';
import Collection from '../interfaces/collection.interface';
import { CollectionService } from '../services/collection.service';
import Movie from '../interfaces/movie.interface';
import { MovieService } from '../services/movie.service';
import User from '../interfaces/user.interface';

// ideally these values should come from env config
const MOVIE_LIMIT = 10;
const COLLECTION_LIMIT = 5;
const BASE_OFFSET = 0;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faArrowRight = faArrowRight;
  faChevronCircleRight = faChevronCircleRight;
  dayjs = dayjs;

  user: User | undefined | null;
  latestCollections: Collection[] = [];
  exploreCollections: Collection[] = [];
  latestMovies: Movie[] = [];
  content = `Welcome to "My Movies" - Your Personal Film Sanctuary! Enter a realm where movies come
   alive and stories unfold. Immerse yourself in a world of cinematic wonders, where you can
   explore a handpicked selection of captivating films. From beloved classics to hidden gems,
   embark on a journey of discovery and indulge in the magic of storytelling. Whether you seek
   laughter, tears, or thrilling adventures, "My Movies" is your gateway to cinematic bliss.
    Welcome to a place where movies become an unforgettable part of your life.`;

  constructor(
    private authService: AuthService,
    private collectionService: CollectionService,
    private movieService: MovieService,
    private router: Router
  ) {
    this.authService.isLoggedInUser.subscribe(
      (response) => (this.user = response)
    );
    this.getLatestCollectionList();
    this.getExploreCollectionList();
    this.getLatestMovieList();
  }

  getLatestCollectionList() {
    this.collectionService
      .getMyCollections(COLLECTION_LIMIT, BASE_OFFSET)
      .subscribe((response) => {
        this.latestCollections = response.data;
      });
  }

  getExploreCollectionList(search: string = '') {
    this.collectionService
      .getOthersCollections(COLLECTION_LIMIT, BASE_OFFSET, search)
      .subscribe((response) => {
        this.exploreCollections = response.data;
      });
  }

  getLatestMovieList() {
    this.movieService
      .getMovies(MOVIE_LIMIT)
      .subscribe((response) => (this.latestMovies = response.data.movies));
  }

  navigateToCollection(id: string) {
    this.router.navigate(['collections', id]);
  }

  navigateToMovie(id: string) {
    this.router.navigate(['movie', id]);
  }
}
