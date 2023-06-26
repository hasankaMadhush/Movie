import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as dayjs from 'dayjs';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import { ApiService } from 'src/app/services/api.service';
import Collection from 'src/app/interfaces/collection.interface';
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
  collection: Collection | undefined;
  movies: Movie[] = [];
  sourceTypes = SOURCES;

  constructor(private apiService: ApiService, private location: Location) {
    this.collectionId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.apiService.get(this.collectionId).subscribe((response) => {
      this.collection = response.data;
      this.movies = response.data.movies;
      this.title = response.data.name;
      this.content = `Created on: ${dayjs(response.data.createdAt).format(
        defualtDateFormat
      )}, Updated on: ${dayjs(response.data.updatedAt).format(
        defualtDateFormat
      )}`;
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
}
