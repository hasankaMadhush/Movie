import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as dayjs from 'dayjs';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../services/auth.service';
import Collection from 'src/app/interfaces/collection.interface';
import { CollectionService } from 'src/app/services/collection.service';
import { environment } from 'src/environments/environment';
import Movie from 'src/app/interfaces/movie.interface';
import { SOURCES } from 'src/lib/constants';

const { defualtDateFormat } = environment;

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  dayjs = dayjs;
  faArrowLeftLong = faArrowLeftLong;

  title: string = '';
  content: string = '';
  collectionId: string;
  collection!: Collection;
  movies: Movie[] = [];
  isTheOwner: boolean = false;
  sourceTypes = SOURCES;

  constructor(
    private collectionService: CollectionService,
    private location: Location,
    private authService: AuthService
  ) {
    this.collectionId = this.route.snapshot.params['id'];
    this.get();
  }

  get() {
    this.collectionService.get(this.collectionId).subscribe((response) => {
      this.collection = response.data;
      this.movies = response.data.movies;
      this.title = response.data.name;
      this.content = `Created on: ${dayjs(response.data.createdAt).format(
        defualtDateFormat
      )}, Updated on: ${dayjs(response.data.updatedAt).format(
        defualtDateFormat
      )}`;
      this.setIsTheOwner(response.data);
    });
  }

  // search collections
  search(input: string) {
    this.movies = this.movies.filter((movie) =>
      new RegExp(input, 'i').test(movie.title)
    );
  }

  // goes back to list view
  goBack() {
    this.location.back();
  }

  removeFromCollection(collection: Collection, movie: Movie) {
    this.collectionService
      .removeMovies(collection, movie)
      .subscribe((response) => {
        if (response.data) {
          window.alert(
            `${movie.title} removed successfully from ${collection.name} collection`
          );
          window.location.reload();
        }
      });
  }

  setIsTheOwner(collection: Collection) {
    this.authService.loggedInUser.subscribe(
      (value) => (this.isTheOwner = value?._id === collection.owner._id)
    );
  }
}
