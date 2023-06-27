import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
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
