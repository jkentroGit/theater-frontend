import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../shared/interfaces/show';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private baseUrl = 'http://localhost:3000/api/shows';

  constructor(private http: HttpClient) {}

  getAllShows(): Observable<{ status: boolean; data: Show[] }> {
    return this.http.get<{ status: boolean; data: Show[] }>(this.baseUrl);
  }

  getShowById(id: string): Observable<{ status: boolean; data: Show }> {
    return this.http.get<{ status: boolean; data: Show }>(`${this.baseUrl}/${id}`);
  }

  // // Create a new show


  updateSeats(showId: string, seatsToUpdate: { label: string; status: string }[]): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.put(
    `${this.baseUrl}/${showId}`, 
    { seatsToUpdate }, 
    { headers }
  );
}

  deleteShow(showId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${showId}`);
  }
}