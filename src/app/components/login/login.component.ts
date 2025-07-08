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

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private http = inject(HttpClient);

  form = new FormGroup ({
    username: new FormControl ('', Validators.required),
    password: new FormControl ('', Validators.required)
  }
);

onSubmit() {
  const data: Credentials = {
    'username': this.form.get('username')?.value || '',
    'password': this.form.get('password')?.value || ''
  }

    this.http.post<any>('http://localhost:3000/api/auth', data).subscribe({
      next: (response) => {
        console.log('Success:', response);
        localStorage.setItem('token', response.data);      
      },
      
      error: (err) => console.error('Error:', err)
    });
  }
};
