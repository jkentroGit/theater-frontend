import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayService } from '../../services/play.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Play } from '../../shared/interfaces/play';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowService } from '../../services/show.service';
import { AuthService} from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-play-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent {


  constructor(private router: Router, private snackBar: MatSnackBar,
    public authService: AuthService, private playService: PlayService, private showService: ShowService, ) {}

  plays: Play[] = [];

  loadAllPlays() {
  this.playService.getAllPlays().subscribe({
    next: (res) => {
      this.plays = res.data;
    },
    error: (err) => {
      this.snackBar.open('Αποτυχία εύρεσης παραστάσεων', '', { duration: 3000 });
    }
  });
}

  ngOnInit(): void {

 this.loadAllPlays();

  }

  onEditPlay(play: Play) {
  this.router.navigate(['/play/edit', play.code]);
  }

  onDeletePlay(play: Play) {

  this.playService.deletePlay(play.code!).subscribe({
    next: () => {

      this.showService.deleteShowsByPlayId(play._id!).subscribe({
        next: (res) => {
          this.snackBar.open('Διαγράφηκαν παραστάσεις', '', { duration: 3000, horizontalPosition: 'right',
            verticalPosition: 'bottom' });

          this.loadAllPlays();
        },
        error: () => {
          this.snackBar.open('Το έργο διαγράφηκε, αλλά απέτυχε η διαγραφή των παραστάσεων', '', { duration: 3000, horizontalPosition: 'right',
            verticalPosition: 'bottom' });
          setTimeout(() => {
            this.loadAllPlays();
          }, 2000);

        }
      });
    },
    error: () => {
      this.snackBar.open('Αποτυχία διαγραφής έργου', '', { duration: 3000, horizontalPosition: 'right',
        verticalPosition: 'bottom' });
    }
  });
}

  onFindShow(play: Play) {
  this.router.navigate(['/show/find', play.code]);
  }

  onAddShow(play: Play) {
  this.router.navigate(['app-show', play.code]);
}
}
