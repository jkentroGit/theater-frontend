import {computed, Injectable, signal} from '@angular/core';
import { User } from '../shared/interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Play } from '../shared/interfaces/play';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })

export class AuthService {

  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient,  private router: Router, private snackBar: MatSnackBar) {
    this.tokenWatcher();
    setInterval(() => this.tokenWatcher(), 30 * 1000);}

  currentUser = signal<User | null>(this.getUserFromToken());
  isAdmin = computed(() => this.currentUser()?.role === 'ADMIN'); //computed αντι για signal

  private tokenWatcher() {
    const token = localStorage.getItem('token');

    if (!token) {
      if (this.currentUser()) {
        this.logout();
      }
      return;
    }
    if (this.isTokenExpired(token)) {

      this.snackBar.open('Ο χρόνος σύνδεσης έληξε. Παρακαλώ συνδεθείτε ξανά', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });

      setTimeout(() => {
       this.logout();
      }, 3000);
      return;
    }
  }

  getAllUsers(): Observable<{ status: boolean; data: User[] }> {
    return this.http.get<{ status: boolean; data: User[] }>(this.baseUrl);
  };

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  deleteUser(username: string): Observable<any> {
    const headers = this.getAuthHeaders()
    return this.http.delete(`${this.baseUrl}/${username}`, { headers });

  };

  login(token: string) {
    localStorage.setItem('token', token);
    const user = this.decodeUserFromToken(token);
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
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

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) return false;

      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(payload.exp);
      return expirationDate.valueOf() < new Date().valueOf();
    } catch {
      return true;
    }
  }
}
