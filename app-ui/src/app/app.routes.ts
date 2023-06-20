import { Route } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { MoviesComponent } from './movies/movies.component';
import { MyCollectionsComponent } from './my-collections/my-collections.component';
import { AllCollectionsComponent } from './all-collections/all-collections.component';
import { LoginComponent } from './login/login.component';

const routes: Route[] = [
  {
    path: 'home',
    component: NavbarComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'collections',
    component: MyCollectionsComponent,
  },
  {
    path: 'collections/All',
    component: AllCollectionsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
];

export default routes;
