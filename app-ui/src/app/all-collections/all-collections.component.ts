import { Component } from '@angular/core';

import * as dayjs from 'dayjs';
import {
  faTrash,
  faArrowDownWideShort,
} from '@fortawesome/free-solid-svg-icons';

import Collection from 'src/app/interfaces/collection.interface';
import { CollectionService } from 'src/app/services/collection.service';
import { environment } from 'src/environments/environment';

const { defaultLimit, defaultOffset } = environment;
@Component({
  selector: 'app-all-collections',
  templateUrl: './all-collections.component.html',
  styleUrls: ['./all-collections.component.css'],
})
export class AllCollectionsComponent {
  dayjs = dayjs;
  faTrash = faTrash;
  faBars = faArrowDownWideShort;

  collections: Collection[] = [];
  isAll: boolean = true;
  totalCollectionsCount: number = 0;
  offset: number = defaultOffset;
  totalPages: number = 0;
  header = ['#', 'Name', 'Movies', 'Created By', 'Created on'];
  title: string = 'Collections';
  content: string = `Step into a world of cinematic wonders! Discover a curated collection of 
    favorite movies, carefully handpicked for entertainment. From timeless classics to contemporary 
    masterpieces, each film holds a special place in collections. Delve into captivating stories, 
    experience unforgettable performances, and immerse in the magic of cinema. Sit back, relax, 
    and enjoy the movies that have touched your virtual heart and captured your digital soul. 
    Welcome to a collections made by other ultimate movie enthusiasts!`;

  constructor(private collectionService: CollectionService) {
    this.getOthers();
  }

  /**
   * get collections not related to logged in user
   * supports search functionality
   * @param search
   */
  getOthers(search: string = '') {
    this.collectionService
      .getOthers(defaultLimit, this.offset - 1, search)
      .subscribe((response) => {
        this.totalCollectionsCount = response.data.count;
        this.collections = response.data.collections;
        this.totalPages = Math.ceil(this.totalCollectionsCount / defaultLimit);
      });
  }

  setCurrentPage(currentPage: number) {
    this.offset = currentPage;
    this.getOthers();
  }
}
