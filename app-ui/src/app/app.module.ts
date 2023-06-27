import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AllCollectionsComponent } from './all-collections/all-collections.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthInterceptor } from './app-routing/authconfig.interceptor';
import { CollectionComponent } from './collection/collection.component';
import { CollectionsTableComponent } from './collections-table/collections-table.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieTableComponent } from './movie-table/movie-table.component';
import { MyCollectionsComponent } from './my-collections/my-collections.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ResultsCountComponent } from './results-count/results-count.component';
import routeConfig from './app.routes';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    MyCollectionsComponent,
    AllCollectionsComponent,
    NavbarComponent,
    SignupComponent,
    HomeComponent,
    SearchComponent,
    CollectionsTableComponent,
    HeroSectionComponent,
    CollectionComponent,
    MovieTableComponent,
    MovieComponent,
    ToastComponent,
    PaginationComponent,
    ResultsCountComponent,
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
  providers: [
    provideRouter(routeConfig),
    NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
