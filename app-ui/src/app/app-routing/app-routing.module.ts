import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AllCollectionsComponent } from 'src/app/all-collections/all-collections.component';
import { CollectionComponent } from 'src/app/collection/collection.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MovieComponent } from 'src/app/movie/movie.component';
import { MoviesComponent } from 'src/app/movies/movies.component';
import { MyCollectionsComponent } from 'src/app/my-collections/my-collections.component';
import { SignupComponent } from 'src/app/signup/signup.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'my-collections',
    component: MyCollectionsComponent,
  },
  {
    path: 'collections/:id',
    component: CollectionComponent,
  },
  {
    path: 'collections',
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
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
