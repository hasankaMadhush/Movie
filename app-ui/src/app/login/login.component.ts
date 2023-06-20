import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // authService: AuthService;
  // router: Router;
  applyForm = new FormGroup({
    email: new FormControl('test@gmail.com'),
    password: new FormControl('123@intel'),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log(
      'username:',
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? ''
    );

    this.authService
      .login(
        this.applyForm.value.email ?? '',
        this.applyForm.value.password ?? ''
      )
      .subscribe((response) => {
        console.log('response:', response);
        if (response.data?.token) {
          this.router.navigate(['/movies']);
        }
      });
  }
}
