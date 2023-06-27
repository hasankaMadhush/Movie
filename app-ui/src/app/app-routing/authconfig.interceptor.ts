import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';

import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

const BEARER = 'Bearer ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: BEARER + authToken,
      },
    });
    return next.handle(req).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              if (err.error?.message) {
                window.alert(err.error.message);
              }
              return;
            }
            this.router.navigate(['login']);
          }
        }
      )
    );
  }
}
