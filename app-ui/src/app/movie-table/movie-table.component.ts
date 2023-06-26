import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as dayjs from 'dayjs';
import { faAdd, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

import Collection from 'src/app/interfaces/collection.interface';
import { CollectionService } from 'src/app/services/collection.service';
import { environment } from 'src/environments/environment';
import Movie from 'src/app/interfaces/movie.interface';
import { SOURCES } from 'src/lib/constants';

const defaultCollectionSuggestionList = 8;
const { defualtDateFormat } = environment;

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css'],
})
export class MovieTableComponent {
  dayjs = dayjs;
  faHeart = faHeart;
  faAdd = faAdd;
  faTrash = faTrash;

  @Input() source: string = '';
  @Input() movies: Movie[] = [];
  @Input() addToCollection!: (collection: Collection, movie: Movie) => void;

  collections: Collection[] = [];
  sourceTypes = SOURCES;
  dateFormat: string = defualtDateFormat;

  constructor(
    private router: Router,
    private collectionService: CollectionService
  ) {
    this.generateCollectionList();
  }

  // redirecting a single movie page
  navigateToCollection(id: string) {
    this.router.navigate(['movie', id]);
  }

  // generates the data for add to collection dropdown
  generateCollectionList() {
    this.collectionService
      .getMine(defaultCollectionSuggestionList, 0)
      .subscribe((response) => (this.collections = response.data));
  }
}
