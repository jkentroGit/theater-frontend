import { Component,  inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../../shared/interfaces/decoded-token';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Show } from '../../shared/interfaces/show';
import { ShowService } from '../../services/show.service';
import { PlayService } from '../../services/play.service';


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

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private snackBar: MatSnackBar,
  private showService: ShowService,
  private playService: PlayService
) {}

  shows: Show[] = [];
  isAdmin: boolean = false;
  playId: String = '';
  playTitle: String = '';
  playYear: String = '';
  playDirector: String = '';
  playCast: String = '';
  playDuration: String = '';


 
  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    

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

loadPlayShows() {
  this.showService.getAllShows().subscribe({
    next: (res) => {
       this.shows = res.data.filter(show => show.playId === this.playId);

    },
    error: (err) => {
      console.error('Failed to load shows', err);
    }
  });
}
}


