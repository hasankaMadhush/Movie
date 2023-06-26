import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

const { defaultLimit, defaultOffset } = environment;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private apiService: ApiService) {}

  getMovies(
    limit: number = defaultLimit,
    offset: number = defaultOffset,
    search: string = ''
  ) {
    return this.apiService.getMovies(limit, offset, search);
  }

  getMovie(id: string) {
    return this.apiService.getMovie(id);
  }
}
