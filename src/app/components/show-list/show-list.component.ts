import { Component } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Show } from '../../shared/interfaces/show';
import { ShowService } from '../../services/show.service';
import { PlayService } from '../../services/play.service';
import { AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-show-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent {

  token: string | any;

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private snackBar: MatSnackBar,
  private showService: ShowService,
  private playService: PlayService,
  public authService: AuthService
) {}

  shows: Show[] = [];

  playId: String = '';
  playTitle: String = '';
  playYear: String = '';
  playDirector: String = '';
  playCast: String = '';
  playDuration: String = '';

  cardColour: string = "green-card";


  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    this.token = localStorage.getItem('token');

    if (code) {
      this.playService.getPlayByCode(code).subscribe({
        next: (res) => {
          this.playId = res.data._id || '';
          this.playTitle = res.data.title || '';
          this.playYear = res.data.year || '';
          this.playDirector = res.data.director || '';
          this.playCast = res.data.cast || '';
          this.playDuration = res.data.duration || '';

          this.loadPlayShows();

        },
        error: () => {
          this.snackBar.open('Το έργο δεν βρέθηκε', '', { duration: 3000 });
        }
      });
    }
  }


onEditShow(show: Show) {
  this.router.navigate(['/show/edit', show._id]);
  }

onDeleteShow(show: Show) {

    if (!show._id) {
    this.snackBar.open('Η παράσταση δεν έχει έγκυρο ID', '', { duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom' });
    return;
  }

   this.showService.deleteShow(show._id).subscribe({
    next: (res) => {
      this.snackBar.open('Η παράσταση διαγράφηκε', '', { duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom' });
      this.loadPlayShows();

    },
    error: (err) => {
      this.snackBar.open('Η παράσταση δεν διαγράφηκε', '', { duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom' });
    }
  });
  }

loadPlayShows() {
  this.showService.getAllShows().subscribe({
    next: (res) => {
       this.shows = res.data.filter(show => show.playId === this.playId)
         .sort((a, b) => new Date(a.showDate).getTime() - new Date(b.showDate).getTime());
      for (const show of this.shows) {
        this.watchAvailability(show);
      }
    },
    error: (err) => {
      console.error('Failed to load shows', err);
    }
  });
}

login () {
  this.router.navigate(['app-login']);
}

watchAvailability(show: Show) {

    let seatCounter = 0;
    let bookedCounter = 0;

    this.showService.getShowById(show._id!).subscribe({
      next: (res) => {
        const showData = res.data;
        const rows = showData.rows;
        for (const row in rows) {
          const seats = rows[row].seats;
          for (const seat in seats) {
              seatCounter++;
            if (seats[seat].status === 'BOOKED') {
              bookedCounter++;
            }
          }
        }
        if (bookedCounter !== 0 && seatCounter === bookedCounter) {
          show.cardColour = "red-card";
        } else if (bookedCounter !== 0 && (seatCounter / bookedCounter) < 2) {
          show.cardColour = "yellow-card";
        } else {
          show.cardColour = "green-card";
        }
    },
      error: (err) => {
        console.error('Failed to load shows', err);
      }
})
}
}


