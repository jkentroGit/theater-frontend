import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../shared/interfaces/decoded-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor(private router: Router) {}

  isAdmin: boolean = false;
  username: string = '';

  ngOnInit() {

      const token = localStorage.getItem('token');
         if (token) {
          try {
          const decoded = jwtDecode<DecodedToken>(token);
          this.isAdmin = decoded.role === 'ADMIN';
          this.username = decoded.username;
          console.log(this.isAdmin, this.username )
        } catch (err) {
          console.error('Token decode failed', err);
          this.isAdmin = false;
        }
      }
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['app-login']);
    }

}
