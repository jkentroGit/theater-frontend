import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayService } from '../../services/play.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Play } from '../../shared/interfaces/play';
import { MatTooltipModule } from '@angular/material/tooltip';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../../shared/interfaces/decoded-token';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-play-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent {

  private playService = inject(PlayService);
  plays: Play[] = [];
  isAdmin: boolean = false;

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
        }

    this.playService.getAllPlays().subscribe({
      next: (res) => {
        this.plays = res.data;
      },
      error: (err) => {
        console.error('Failed to load plays', err);
    
      }
    });
  }

  onEditPlay(play: Play) {
  
}

  onDeletePlay(play: Play) {
  
}

  onFindShow(play: Play) {
 
}
}