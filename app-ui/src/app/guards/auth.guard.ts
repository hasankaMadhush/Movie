import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

const isAuthenticated = ():
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  let authenticated = false;
  authService.isLoggedIn$.subscribe((status) => (authenticated = status));

  if (authenticated) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const authGuard: CanActivateFn = isAuthenticated;
