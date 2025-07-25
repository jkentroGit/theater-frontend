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

  constructor(private http: HttpClient,  private router: Router, private snackBar: MatSnackBar) {this.tokenWatcher()}

  currentUser = signal<User | null>(this.getUserFromToken());

  isAdmin = computed(() => this.currentUser()?.role === 'ADMIN'); //computed αντι για signal

  private tokenWatcher() {
    setInterval(() => {
      const user = this.getUserFromToken();

      if (!user && this.currentUser()) {
        this.logout();
        this.snackBar.open('Ο χρόνος σύνδεσης έληξε. Παρακαλώ σθνδεθείτε ξανά', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/login']);
      }

      this.currentUser.set(user);

    }, 60 * 1000);
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
