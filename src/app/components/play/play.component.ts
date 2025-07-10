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
import { Play } from '../../shared/interfaces/play';
import { HttpClient } from '@angular/common/http';
import { PlayService } from '../../services/play.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-play',
  standalone: true,  
  imports: [
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {

    private http = inject(HttpClient);
    constructor(private playService: PlayService, private snackBar: MatSnackBar) {}

   form =new FormGroup ({
    code: new FormControl ('', [Validators.required]),
    title: new FormControl ('', [Validators.required]),
    year: new FormControl ('', [Validators.required]),
    director: new FormControl ('', Validators.required),
    cast: new FormControl ('', Validators.required),
    duration: new FormControl ('', [Validators.required])        
  }
  );

onSubmit() {
  const playData: Play = {
      'code': this.form.get('code')?.value || '',
      'title': this.form.get('title')?.value || '',
      'year': this.form.get('year')?.value || '',
      'director':this.form.get('director')?.value || '',
      'cast':this.form.get('cast')?.value || '',
      'duration': this.form.get('duration')?.value || ''}

      this.playService.createPlay(playData).subscribe({
      next: (res) => {
        this.snackBar.open('Play submitted successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        
      });
      this.form.reset();},
      error: (err) => {
        this.snackBar.open('Play failed to submit', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
       
      });}
  });
};

}

