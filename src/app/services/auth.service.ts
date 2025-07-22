import { computed, Injectable, signal } from '@angular/core';
import { User } from '../shared/interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Play } from '../shared/interfaces/play';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  currentUser = signal<User | null>(this.getUserFromToken());

  isAdmin = computed(() => this.currentUser()?.role === 'ADMIN'); //αλλαγή isAdmin με signal

  getAllUsers(): Observable<{ status: boolean; data: User[] }> {
    return this.http.get<{ status: boolean; data: User[] }>(this.baseUrl);
  };

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    const user = this.decodeUserFromToken(token);
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  getUserByEmail(email: string): Observable<{ status: boolean; data: Play }> {
    return this.http.get<{ status: boolean; data: Play }>(`${this.baseUrl}/email/${email}`);
  };

  private getUserFromToken(): User | null {
    const token = localStorage.getItem('token');
    return token ? this.decodeUserFromToken(token) : null;
  }

  private decodeUserFromToken(token: string): User {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
  username: payload.username,
  role: payload.role,
  firstname: '',
  lastname: '',
  address: {
    street: '',
    streetNum: '',
    city: '',
    tk: ''
  },
  email: '',
  mobile: '',
  password: ''
};
  }
}
