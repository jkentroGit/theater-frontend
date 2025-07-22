import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Play } from '../shared/interfaces/play';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root'})

export class PlayService {

  private baseUrl = 'http://localhost:3000/api/plays';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllPlays(): Observable<{ status: boolean; data: Play[] }> {
    return this.http.get<{ status: boolean; data: Play[] }>(this.baseUrl);
  };

  getPlayById(id: string): Observable<{ status: boolean; data: Play }> {
    return this.http.get<{ status: boolean; data: Play }>(`${this.baseUrl}/${id}`);
  };

  getPlayByCode(code: string): Observable<{ status: boolean; data: Play }> {
    return this.http.get<{ status: boolean; data: Play }>(`${this.baseUrl}/code/${code}`);
  };

  createPlay(showData: Partial<Play>): Observable<any> {

  const headers = this.authService.getAuthHeaders()
  return this.http.post<{ status: boolean; data: Play }>(this.baseUrl, showData, { headers } );
  };

  updatePlay(code: string, playData: Play): Observable<any> {
    const headers = this.authService.getAuthHeaders()
    return this.http.put(`${this.baseUrl}/${code}`, playData, { headers });
}

  deletePlay(code: string): Observable<any> {
    const headers = this.authService.getAuthHeaders()
    return this.http.delete(`${this.baseUrl}/${code}`);
  };
}
