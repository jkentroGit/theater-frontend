import { Component } from '@angular/core';
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


    logout() {
      this.authService.logout();
      this.router.navigate(['app-login']);
    }

}
