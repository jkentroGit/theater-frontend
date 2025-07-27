import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive,  MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, public authService: AuthService, private snackBar: MatSnackBar) {}

  username: string = '';

    logout() {
      this.authService.logout();
      this.snackBar.open('Επιτυχής αποσύνδεση', '', { duration: 3000,  horizontalPosition: 'right',
        verticalPosition: 'bottom',});
      this.router.navigate(['app-login']);
    };

    login() {
      this.router.navigate(['app-login']);
    };
}
