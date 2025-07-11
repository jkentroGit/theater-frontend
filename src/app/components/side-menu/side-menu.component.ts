import { Component, linkedSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  menu = [
     { text: 'Login', linkName: 'app-login'},
     { text: 'Εγγραφή χρήστη', linkName:'app-register'},
     { text: 'Πλάνο θέσεων', linkName: 'app-seat-plan'},
     { text: 'Προσθήκη έργου', linkName: 'app-play'},
     { text: 'Προσθήκη παραστάσεων', linkName: 'app-show'},
     { text: 'Λίστα έργων', linkName: 'app-play-list'}
   
    ]
}

