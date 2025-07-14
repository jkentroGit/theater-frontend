import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { Row, Seat } from '../../shared/interfaces/row-seat';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {jwtDecode} from 'jwt-decode';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

interface DecodedToken {
  role: string;
}

@Component({
  selector: 'app-seat-plan',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule,MatSnackBarModule],
  templateUrl: './seat-plan.component.html',
  styleUrls: ['./seat-plan.component.css']
})
export class SeatPlanComponent {
  seatingPlan: Row[] = [];
  showId!: string;
  isAdmin: boolean = false;


  constructor(private showService: ShowService, private snackBar: MatSnackBar, private route: ActivatedRoute,) {}

  ngOnInit() {
    this.showId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.showId)
    if (this.showId) {
    this.loadSeatingPlan(this.showId); }

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
  }

  loadSeatingPlan(showId: string) {
    this.showService.getShowById(showId!).subscribe({
      next: (res) => {
        if (res.status) {
          this.seatingPlan = res.data.rows;
        } else {
          console.error('Failed to load seating plan');
        }
      },
      error: (err) => {
        console.error('Error loading seating plan:', err);
      }
    });
  }


getSeatIcon(status: string): string {
  switch (status) {
    case 'AVAILABLE':
      return 'crop_square'; 
    case 'SELECTED':
      return 'check_box';  
    case 'BOOKED':
      return 'disabled_by_default';
    default:
      return 'help';
  }
}

getSeatColour(status: string): string {
  switch (status) {
    case 'AVAILABLE':
      return 'text-success mat-icon-large';
    case 'SELECTED':
      return 'text-primary mat-icon-large';
    case 'BOOKED':
      return 'text-gray mat-icon-large';
    default:
      return 'text-success mat-icon-large';
  }
}

handleSeatStatus(seat: any) {
  if (this.isAdmin) {
    this.toggleAdmin(seat);
  } else {
    this.toggleSeatStatus(seat);
  }
}
toggleSeatStatus(seat: Seat) {
  if (seat.status === 'AVAILABLE') {
    seat.status = 'SELECTED';
  } else if (seat.status === 'SELECTED') {
    seat.status = 'AVAILABLE';
  }}

toggleAdmin(seat: Seat) {
  if (seat.status === 'AVAILABLE') {
    seat.status = 'BOOKED';
  } else if (seat.status === 'BOOKED') {
    seat.status = 'AVAILABLE';
  }
  }


onClickHandler() {
  const seatsToUpdate = [];  

  for (const row of this.seatingPlan) {
    for (const seat of row.seats) {
      if (seat.status === 'SELECTED') {
        seat.status = 'BOOKED';
        const label = String(seat.seatNumber);
        seatsToUpdate.push({ label, status: 'BOOKED' });
      }
      if (seat.status === 'AVAILABLE') {
        seat.status = 'AVAILABLE';
        const label = String(seat.seatNumber);
        seatsToUpdate.push({ label, status: 'AVAILABLE' });
      }
       if (seat.status === 'BOOKED') {
        seat.status = 'BOOKED';
        const label = String(seat.seatNumber);
        seatsToUpdate.push({ label, status: 'BOOKED' });
      }
    }
  }
  
  this.showService.updateSeats(this.showId, seatsToUpdate).subscribe({
    next: (res) => {
      this.snackBar.open('Seat(s) reserved successfully', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        
      });},
    error: (err) => {
      this.snackBar.open('Seat(s) not reserved', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
       
      });}
  });
}
}