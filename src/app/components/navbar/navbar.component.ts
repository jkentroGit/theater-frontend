import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../shared/interfaces/decoded-token';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor(private router: Router, public authService: AuthService) {}

  isAdmin: boolean = false;
  username: string = '';

  ngOnInit() {

      const token = localStorage.getItem('token');
         if (token) {
          try {
          const decoded = jwtDecode<DecodedToken>(token);
          this.isAdmin = decoded.role === 'ADMIN';
          this.username = decoded.username;
      
        } catch (err) {
          console.error('Token decode failed', err);
          this.isAdmin = false;
        }
      }
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['app-login']);
    }

}
