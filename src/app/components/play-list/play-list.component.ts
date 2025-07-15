import { Component,  inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayService } from '../../services/play.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Play } from '../../shared/interfaces/play';
import { MatTooltipModule } from '@angular/material/tooltip';
import { jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../../shared/interfaces/decoded-token';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowService } from '../../services/show.service';

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
    MatSnackBarModule
  ],
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent {

  
  constructor(private router: Router, private snackBar: MatSnackBar,) {}
  private playService = inject(PlayService);
  private showService = inject(ShowService);
  plays: Play[] = [];
  isAdmin: boolean = false;

  loadAllPlays() {
  this.playService.getAllPlays().subscribe({
    next: (res) => {
      this.plays = res.data;
    },
    error: (err) => {
      console.error('Failed to load plays', err);
    }
  });
}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
           if (token) {
            try {
            const decoded = jwtDecode<DecodedToken>(token);
            this.isAdmin = decoded.role === 'ADMIN';
          } catch (err) {
            console.error('Token decode failed', err);
            this.isAdmin = false;
          }
        };

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
          this.snackBar.open('Διαγράφηκαν παραστάσεις', '', { duration: 3000 });

         
          this.loadAllPlays();
        },
        error: () => {
          this.snackBar.open('Το έργο διαγράφηκε, αλλά απέτυχε η διαγραφή των παραστάσεων', '', { duration: 3000 });
          this.loadAllPlays();
        }
      });
    },
    error: () => {
      this.snackBar.open('Αποτυχία διαγραφής έργου', '', { duration: 3000 });
    }
  });
}

  onFindShow(play: Play) {{
  this.router.navigate(['/show/find', play.code]);
  } 
}
}