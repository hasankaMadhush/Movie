import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const server: string = 'http://localhost:4000/api';

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

  register(
    name: string,
    email: string,
    password: string,
    role: string = 'user'
  ): Observable<any> {
    console.log(':::', {
      name,
      email,
      password,
    });
    return this.http.post(`${server}/users/register`, {
      name,
      email,
      password,
    });
  }

  getMovies(
    limit: number = 50,
    offset: number = 0,
    search: string = ''
  ): Observable<any> {
    return this.http.get(
      `${server}/movies?limit=${limit}&offset=${offset}&search=${search}`
    );
  }

  getMyCollections(
    id: string,
    limit: number = 5,
    offset: number = 0,
    search: string = ''
  ): Observable<any> {
    return this.http.get(
      `${server}/users/${id}/my-collections?limit=${limit}&offset=${offset}&search=${search}`
    );
  }

  getOthersCollections(
    id: string,
    limit = 5,
    offset = 0,
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

  getCollection(id: string): Observable<any> {
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
