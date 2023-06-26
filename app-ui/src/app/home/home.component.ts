import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as dayjs from 'dayjs';
import {
  faArrowRight,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/services/auth.service';
import Collection from 'src/app/interfaces/collection.interface';
import { CollectionService } from 'src/app/services/collection.service';
import { environment } from 'src/environments/environment';
import Movie from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import User from 'src/app/interfaces/user.interface';

const {
  defaultDashboardMovieLimit,
  defaultDashboardCollectionLimit,
  defaultOffset,
  defualtDateFormat,
} = environment;

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
  dateFormat: string = defualtDateFormat;
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
    this.authService.loggedInUser.subscribe(
      (response) => (this.user = response)
    );
    this.getLatestCollectionList();
    this.getExploreCollectionList();
    this.getLatestMovieList();
  }

  // get latest collection of logged in user
  getLatestCollectionList() {
    this.collectionService
      .getMine(defaultDashboardCollectionLimit, defaultOffset - 1)
      .subscribe((response) => {
        this.latestCollections = response.data;
      });
  }

  // get other users collections
  getExploreCollectionList(search: string = '') {
    this.collectionService
      .getOthers(defaultDashboardCollectionLimit, defaultOffset - 1, search)
      .subscribe((response) => {
        this.exploreCollections = response.data;
      });
  }

  // get latest movies
  getLatestMovieList() {
    this.movieService
      .getMovies(defaultDashboardMovieLimit)
      .subscribe((response) => (this.latestMovies = response.data.movies));
  }

  // navigate to selected collection page
  navigateToCollection(id: string) {
    this.router.navigate(['collections', id]);
  }

  // navigates to selected movie page
  navigateToMovie(id: string) {
    this.router.navigate(['movie', id]);
  }
}
