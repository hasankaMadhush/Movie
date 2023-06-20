import { Component } from '@angular/core';

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-ui';
  faRightFromBracket = faRightFromBracket;
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
