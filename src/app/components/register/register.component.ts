import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    constructor(private snackBar: MatSnackBar, private router: Router, public authService: AuthService, 
      private http: HttpClient) {}

    form =new FormGroup ({
    username: new FormControl ('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl ('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl ('', [Validators.required, Validators.minLength(8)]),
    firstname: new FormControl ('', [Validators.required, Validators.maxLength(20)]),
    lastname: new FormControl ('',[Validators.required, Validators.maxLength(20)]),
    address: new FormGroup ({
      street: new FormControl ('', Validators.required),
      streetNum: new FormControl ('', Validators.required),
      city: new FormControl ('', Validators.required),
      tk: new FormControl ('', Validators.required)
    }),
    mobile: new FormControl ('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl ('', [Validators.required, Validators.email]),
    role: new FormControl ('')

  },this.passwordConfirmValidator,
  );

  passwordConfirmValidator(control: AbstractControl): {[key:string]: boolean} | null {
    const form = control as FormGroup;

    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value

    if(password && confirmPassword && password!==confirmPassword) {
      form.get('confirmPassword')?.setErrors({passwordMismatch: true})
      return {passwordMismatch: true}
    }
    return null
  };

  onSubmit() {

    // Ο πρώτος χρήστης να γίνεται ADMIN αυτόματα

    this.authService.getAllUsers().subscribe((response) => {
      const isDBEmpty = response.data.length === 0;

      const data: User = {
        username: this.form.get('username')?.value || '',
        firstname: this.form.get('firstname')?.value || '',
        lastname: this.form.get('lastname')?.value || '',
        email: this.form.get('email')?.value || '',
        mobile: this.form.get('mobile')?.value || '',
        address: {
          street: this.form.controls.address.controls.street?.value || '',
          streetNum: this.form.controls.address.controls.streetNum?.value || '',
          city: this.form.controls.address.controls.city?.value || '',
          tk: this.form.controls.address.controls.tk?.value || ''
        },
        role: isDBEmpty ? 'ADMIN' : this.authService.isAdmin() ? this.form.get('role')?.value || '' : 'USER',
        password: this.form.get('password')?.value || ''
      };

      this.http.post('http://localhost:3000/api/users', data).subscribe({
        next: () => {
          this.snackBar.open('Επιτυχής κατοχύρωση χρήστη', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          if(!this.authService.isAdmin()) {
          setTimeout(() => {
            this.router.navigate(['/app-login']);
          }, 3000);
          } else {
            setTimeout(() => {
              this.router.navigate(['/app-user-list']);
            }, 3000);
          }
        },
        error: () => {
          this.snackBar.open('Αποτυχία κατοχύρωσης χρήστη', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        }
      });
    });
  };
}

