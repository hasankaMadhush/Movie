import { Component, OnInit } from '@angular/core';
import {
  faRightFromBracket,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import User from 'src/app/interfaces/user.interface';

interface NavBarItems {
  link: string;
  title: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {}
  faRightFromBracket = faRightFromBracket;
  faUserCircle = faUserCircle;
  loggedInUser: User | null | undefined;
  navBarItems: NavBarItems[] = [
    { link: '', title: 'Home' },
    { link: 'movies', title: 'Movies' },
    { link: 'collections', title: 'Collections' },
    { link: 'my-collections', title: 'My Collections' },
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loggedInUser.subscribe((value) => {
      console.log('user:', value);
      this.loggedInUser = value;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
