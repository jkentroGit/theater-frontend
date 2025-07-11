import { Component, inject} from '@angular/core';
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

  private http = inject(HttpClient);
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  form = new FormGroup ({
    username: new FormControl ('', Validators.required),
    password: new FormControl ('', Validators.required)
  }
);

register() {

this.router.navigate(['app-register']);  

}

onSubmit() {
  const data: Credentials = {
    'username': this.form.get('username')?.value || '',
    'password': this.form.get('password')?.value || ''
  }

    this.http.post<any>('http://localhost:3000/api/auth', data).subscribe({
      next: (response) => {
        this.snackBar.open('Login successfully', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',

      });
      this.form.reset();
      localStorage.setItem('token', response.data);
      this.router.navigate(['/app-play-list']);  
      },
      
      error: (err) => { 
        this.snackBar.open('Login failed', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        
      });
      this.form.reset();}
    });
  }
};
