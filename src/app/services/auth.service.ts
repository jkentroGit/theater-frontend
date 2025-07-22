import {computed, Injectable, signal} from '@angular/core';
import { User } from '../shared/interfaces/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private http: HttpClient) {}

  currentUser = signal<User | null>(this.getUserFromToken());
  isAdmin = computed(() => this.currentUser()?.role === 'ADMIN'); //αλλαγή isAdmin με signal

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
