import { Component} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Credentials } from '../../shared/interfaces/credentials';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService, private http: HttpClient) {}




  form = new FormGroup ({
    username: new FormControl ('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl ('', [Validators.required])
  }
);

register() {

this.router.navigate(['app-register']);

}

onSubmit() {
  if (this.form.invalid) {
    return;
  }

  const data: Credentials = {
    'username': this.form.get('username')?.value || '',
    'password': this.form.get('password')?.value || ''
  }

    this.http.post<any>('http://localhost:3000/api/auth', data).subscribe({
      next: (response) => {
        this.snackBar.open('Επιτυχής σύνδεση', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.authService.login(response.data);
        setTimeout(() => {
          this.router.navigate(['app-play-list']);
        }, 2000);

      },

      error: (err) => {
        this.snackBar.open('Αποτυχία σύνδεσης', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',

      });
      this.form.reset();}
    });
  }
};
