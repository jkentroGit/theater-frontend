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
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-play-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './play-edit.component.html',
  styleUrl: './play-edit.component.css'
})
export class PlayEditComponent {

    private http = inject(HttpClient);
    constructor(private playService: PlayService, private snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');

    if (code) {
      this.playService.getPlayByCode(code).subscribe({
        next: (res) => {
          this.form.patchValue(res.data);
          this.form.get('code')?.disable();
        },
        error: () => {
          this.snackBar.open('Το έργο δεν βρέθηκε', '', { duration: 3000 });
        }
      });
    }
  }

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

  const rawValue = this.form.getRawValue();

  const playData: Play = {
    code: rawValue.code || '',
    title: rawValue.title || '',
    year: rawValue.year || '',
    director: rawValue.director || '',
    cast: rawValue.cast || '',
    duration: rawValue.duration || ''
  };


    this.playService.updatePlay(playData.code, playData).subscribe({
      next: () => {
        this.snackBar.open('Το έργο κατωχηρώθηκε επιτυχημένα', '', { duration: 3000 });
        this.router.navigate(['/app-play-list']);
      },
      error: () => {
        this.snackBar.open('Αποτυχία κατωχήρωσης έργου', '', { duration: 3000 });
      }
    });
  }
}
