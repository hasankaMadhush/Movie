import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AllCollectionsComponent } from 'src/app/all-collections/all-collections.component';
import { authGuard } from 'src/app/guards/auth.guard';
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
    canActivate: [authGuard],
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    canActivate: [authGuard],
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-collections',
    component: MyCollectionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'collections/:id',
    component: CollectionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'collections',
    component: AllCollectionsComponent,
    canActivate: [authGuard],
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
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
