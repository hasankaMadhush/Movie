import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import * as dayjs from 'dayjs';
import {
  faTrash,
  faArrowDownWideShort,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/services/auth.service';
import Collection from 'src/app/interfaces/collection.interface';
import { CollectionService } from 'src/app/services/collection.service';
import { environment } from 'src/environments/environment';
import Movie from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import User from 'src/app/interfaces/user.interface';

const {
  defaultDashboardCollectionLimit,
  defaultLimit,
  defaultOffset,
  defualtDateFormat,
} = environment;

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css'],
})
export class MyCollectionsComponent {
  dayjs = dayjs;
  faTrash = faTrash;
  faPlus = faPlus;
  faBars = faArrowDownWideShort;

  collections: Collection[] = [];
  movies: Movie[] = [];
  isAllCollections = false;
  totalCollectionsCount: number = 0;
  offset: number = defaultOffset;
  totalPages: number = 0;
  loggedInUser: User | null | undefined;
  dateFormat: string = defualtDateFormat;
  header: string[] = ['#', 'Name', 'Movies', 'Created on', ''];
  title: string = 'My Collections';
  content: string = `Step into a world of cinematic wonders! Discover a curated collection of your 
    favorite movies, carefully handpicked for your entertainment. From timeless classics to
    contemporary masterpieces, each film holds a special place in collections. Delve into 
    captivating stories, experience unforgettable performances, and immerse yourself in the magic 
    of cinema. Sit back, relax, and enjoy the movies that have touched your virtual heart and
    captured your digital soul. Welcome to a collection made for the ultimate movie enthusiast!`;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    movies: new FormArray([]),
  });

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    private movieService: MovieService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getAll();
    this.authService.loggedInUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
    this.getMovies();
  }

  getAll(search: string = '') {
    this.collectionService
      .getMine(defaultLimit, this.offset - 1, search)
      .subscribe((response) => {
        this.totalCollectionsCount = response.data.count;
        this.collections = response.data.collections;
        this.totalPages = Math.ceil(this.totalCollectionsCount / defaultLimit);
      });
  }

  // gets movies for search function in create collection modal
  getMovies(search: string = '') {
    this.movieService
      .getMovies(defaultDashboardCollectionLimit, this.offset - 1, search)
      .subscribe((response) => (this.movies = response.data.movies));
  }

  // creates a new collection
  create(): void {
    this.collectionService
      .create(
        this.form.value.name,
        this.loggedInUser?._id || '',
        this.form.value.movies.map((movie: Movie) => movie._id)
      )
      .subscribe((response) => {
        if (response) {
          this.getAll();
          // this.activeModal.close(); // not working as expected, need troubleshooting
        }
      });
  }

  // add selected movies to create collection modal for saving
  addToList(value: Movie) {
    this.form.value.movies.push(value);
    this.movies = []; // resets the search results in order to hide the search result section
  }

  setCurrentPage(currentPage: number) {
    this.offset = currentPage;
    this.getAll();
  }

  delete(collection: Collection) {
    this.collectionService.delete(collection._id).subscribe((response) => {
      if (response) {
        window.alert(`${collection.name} removed successfully`);
        this.getAll();
      }
    });
  }
}
