import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService) {
    // this._isLoggedIn$.next(false);
    this.isLoggedIn();
  }

  isLoggedIn(): void {
    this._isLoggedIn$.next(!!localStorage.getItem('jwt'));
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        const { token } = response.data || '';
        this._isLoggedIn$.next(!!token);
        localStorage.setItem('jwt', token);
      })
    );
  }

  register(
    name: string,
    email: string,
    password: string,
    role: string = 'user'
  ) {
    return this.apiService.register(name, email, password, role);
  }

  logout(): void {
    this._isLoggedIn$.next(false);
  }
}
