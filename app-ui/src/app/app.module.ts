import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AllCollectionsComponent } from './all-collections/all-collections.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { MyCollectionsComponent } from './my-collections/my-collections.component';
import { NavbarComponent } from './navbar/navbar.component';
import routeConfig from './app.routes';
import { SignupComponent } from './signup/signup.component';
import { MovieTableRowComponent } from './movie-table-row/movie-table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    MyCollectionsComponent,
    AllCollectionsComponent,
    NavbarComponent,
    SignupComponent,
    MovieTableRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideRouter(routeConfig)],
  bootstrap: [AppComponent],
})
export class AppModule {}
