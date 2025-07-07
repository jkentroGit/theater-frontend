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
import { User } from '../../shared/interfaces/user';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  standalone: true,  
  imports: [
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    private http = inject(HttpClient);

   form =new FormGroup ({
    username: new FormControl ('', [Validators.required]),
    password: new FormControl ('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl ('', [Validators.required, Validators.minLength(8)]),
    firstname: new FormControl ('', Validators.required),
    lastname: new FormControl ('', Validators.required),
    address: new FormGroup ({
      street: new FormControl ('', Validators.required),
      streetNum: new FormControl ('', Validators.required),
      city: new FormControl ('', Validators.required),
      tk: new FormControl ('', Validators.required)
    }),
    mobile: new FormControl ('', [Validators.required]),
    email: new FormControl ('', [Validators.required, Validators.email])        
  }
  );

onSubmit() {
  const data: User = {
      'username': this.form.get('username')?.value || '',
      'firstname': this.form.get('firstname')?.value || '',
      'lastname': this.form.get('lastname')?.value || '',
      'email':this.form.get('email')?.value || '',
      'mobile':this.form.get('mobile')?.value || '',
      'address': {
        'street':this.form.controls.address.controls.street?.value || '',
        'streetNum': this.form.controls.address.controls.streetNum?.value || '',
        'city': this.form.controls.address.controls.city?.value || '',
        'tk': this.form.controls.address.controls.tk?.value || ''},
      'password': this.form.get('password')?.value || ''}

       this.http.post('http://localhost:3000/api/users', data).subscribe({
      next: (response) => console.log('Success:', response),
      error: (err) => console.error('Error:', err)
    });
};

}
