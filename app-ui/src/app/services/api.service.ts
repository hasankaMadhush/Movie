import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

const { server, defaultLimit, defaultOffset, defaultDashboardCollectionLimit } =
  environment;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${server}/users/authenticate`, {
      email: username,
      password,
    });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${server}/users`, {
      name,
      email,
      password,
    });
  }

  getMovies(
    limit: number = defaultLimit,
    offset: number = defaultOffset - 1, // should be zero
    search: string = ''
  ): Observable<any> {
    return this.http.get(
      `${server}/movies?limit=${limit}&offset=${offset}&search=${search}`
    );
  }

  getMyCollections(
    id: string,
    limit: number = defaultDashboardCollectionLimit,
    offset: number = defaultOffset - 1, // should be zero
    search: string = ''
  ): Observable<any> {
    return this.http.get(
      `${server}/users/${id}/my-collections?limit=${limit}&offset=${offset}&search=${search}`
    );
  }

  getOthersCollections(
    id: string,
    limit = defaultDashboardCollectionLimit,
    offset = defaultOffset - 1, // should be zero
    search = ''
  ): Observable<any> {
    return this.http.get(
      `${server}/users/${id}/others-collections?limit=${limit}&offset=${offset}&search=${search}`
    );
  }

  createCollection(
    name: string,
    createdBy: string,
    movies: string[]
  ): Observable<any> {
    return this.http.post(`${server}/collections`, { name, createdBy, movies });
  }

  get(id: string): Observable<any> {
    return this.http.get(`${server}/collections/${id}`);
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${server}/movies/${id}`);
  }

  addMoviesToCollection(id: string, movieIds: string[]): Observable<any> {
    return this.http.post(`${server}/collections/${id}/movies`, {
      movies: movieIds,
    });
  }
}
