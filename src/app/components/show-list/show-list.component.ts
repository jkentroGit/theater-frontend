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


  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    

    if (code) {
      this.playService.getPlayByCode(code).subscribe({
        next: (res) => {
          const playId = res.data._id || '';
          const playTitle = res.data.title || '';
          
          console.log(this.shows)
          console.log(playTitle)


        },
        error: () => {
          this.snackBar.open('Το έργο δεν βρέθηκε', '', { duration: 3000 });
        }
      });
    }
  }

  loadAllShows() {
  this.showService.getAllShows().subscribe({
    next: (res) => {
      this.shows = res.data;
      console.log(this.shows)
    },
    error: (err) => {
      console.error('Failed to load shows', err);
    }
  });
}
}


