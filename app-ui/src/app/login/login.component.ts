import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('test@gmail.com'),
    password: new FormControl('123@intel'),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService
      .login(this.form.value.email ?? '', this.form.value.password ?? '')
      .subscribe((response) => {
        if (response.data?.token) {
          this.router.navigate(['/']);
        }
      });
  }
}
