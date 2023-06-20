import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AllCollectionsComponent } from '../all-collections/all-collections.component';
import { LoginComponent } from '../login/login.component';
import { MoviesComponent } from '../movies/movies.component';
import { MyCollectionsComponent } from '../my-collections/my-collections.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SignupComponent } from '../signup/signup.component';

const routes: Route[] = [
  {
    path: '',
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
    path: 'collections/all',
    component: AllCollectionsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
