import { Component, linkedSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../../shared/interfaces/decoded-token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

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
        };
  }
}

