import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService} from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import {User} from '../../shared/interfaces/user';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  displayedColumns: string[] = ['username', 'fullname', 'address', 'email', 'mobile', 'role', 'actions'];

  constructor(private router: Router, private snackBar: MatSnackBar,public authService: AuthService) {}

  users: User[] = [];
  
  ngOnInit(): void {
    this.loadAllUsers();
  };

  loadAllUsers() {
    this.authService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: (err) => {
        this.snackBar.open('Αποτυχία εύρεσης χρηστών', '', { duration: 3000, horizontalPosition: 'right',
          verticalPosition: 'bottom' });
      }
    });
  };

 

  onDeleteUser(user: User) {

    this.authService.deleteUser(user.username!).subscribe({
      next: () => {
        this.snackBar.open('Επιτυχημένη διαγραφή χρήστη', '', { duration: 3000, horizontalPosition: 'right',
          verticalPosition: 'bottom' });

        setTimeout(() => {
          this.loadAllUsers();
        }, 2000);
      },
      error: () => {
        this.snackBar.open('Αποτυχία διαγραφής χρήστη', '', { duration: 3000, horizontalPosition: 'right',
          verticalPosition: 'bottom' });
      }
    });
  };
}
