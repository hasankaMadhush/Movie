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
    return this.http.post(`${server}/users/login`, {
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

  getMovies(): Observable<any> {
    return this.http.get(`${server}/movies`);
  }

  // getMyCollections(): Observable<any> {
  //   // return this.http.post(`${server}/collections`);
  // }
}
