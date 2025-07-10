import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PlayService } from '../../services/play.service';

@Component({
  selector: 'app-play-list',
  imports: [],
  templateUrl: './play-list.component.html',
  styleUrl: './play-list.component.css'
})
export class PlayListComponent {

private http = inject(HttpClient);
constructor(private playService: PlayService) {}


}

