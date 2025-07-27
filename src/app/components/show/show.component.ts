import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PlayService } from '../../services/play.service';
import { ShowService } from '../../services/show.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Show } from '../../shared/interfaces/show';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {

constructor(private playService: PlayService, private showService: ShowService, private snackBar: MatSnackBar, 
  private router: Router, private route: ActivatedRoute) {}

days = [
  { label: 'Κυριακή', value: 0 },
  { label: 'Δευτέρα', value: 1 },
  { label: 'Τρίτη', value: 2 },
  { label: 'Τετάρτη', value: 3 },
  { label: 'Πέμπτη', value: 4 },
  { label: 'Παρασκευή', value: 5 },
  { label: 'Σάββατο', value: 6 }
];

  form =new FormGroup ({
    daysOfWeek: new FormControl ([], [Validators.required]),
    fromDate: new FormControl ('', Validators.required),
    toDate: new FormControl ('', Validators.required),
    time: new FormControl ('', [Validators.required]),
    price: new FormControl ('', [Validators.required])
  }
  );

onSubmit() {

  const code = this.route.snapshot.paramMap.get('code');

  this.playService.getPlayByCode(code?.toUpperCase() || '').subscribe({
    next: (response) => {
      if (!response.status) {
        this.snackBar.open('Το έργο δεν βρέθηκε', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
      });
        return;
      }

      const playId = response.data._id!;
      const startDate = new Date(this.form.get('fromDate')!.value!);
      const endDate = new Date(this.form.get('toDate')!.value!);
      const selectedDays: number[] = this.form.get('daysOfWeek')!.value || [];

      for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
        const dayOfWeek = day.getDay();

        if (selectedDays.includes(dayOfWeek)) {

          const showData: Show = {
            playId,
            showDate: new Date(day),
            time: this.form.get('time')?.value || '',
            price: Number(this.form.get('price')?.value || 0),
            rows: []
          };

          this.showService.createShow(showData).subscribe({
           next: (res) => {
            console.log('Προστέθηκε παράσταση')
           },
           error: (err) => {
            this.snackBar.open('Αποτυχία προσθήκης παραστάσεων', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      });
    }
  }
            this.snackBar.open('Οι παραστάσεις προστέθηκαν επιτυχημένα', '', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'bottom'
                });

    }, error: (err) => {
            this.snackBar.open('Το έργο δεν βρέθηκε', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
    }
  });
    setTimeout(() => {
    this.router.navigate(['/app-play-list']);
  }, 3000);
};
}
