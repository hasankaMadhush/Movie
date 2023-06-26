import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService
      .register(
        this.form.value.name ?? '',
        this.form.value.email ?? '',
        this.form.value.password ?? ''
      )
      .subscribe((response: any) => {
        if (response.data?.token) {
          this.router.navigate(['/login']);
        }
      });
  }
}
