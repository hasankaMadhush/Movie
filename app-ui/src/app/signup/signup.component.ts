import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('user'),
  });
  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService
      .register(
        this.registerForm.value.name ?? '',
        this.registerForm.value.email ?? '',
        this.registerForm.value.password ?? '',
        this.registerForm.value.role ?? ''
      )
      .subscribe((response: any) => {
        console.log('response: ', response);
        const { token } = response.data;
        if (token) {
          this.router.navigate(['/login']);
        }
      });
  }
}
