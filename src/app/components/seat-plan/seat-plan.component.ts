import { Component } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { Row, Seat } from '../../shared/interfaces/row-seat';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService} from '../../services/auth.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  purchaseConfirmed = false;

  constructor(private showService: ShowService, private snackBar: MatSnackBar, private route: ActivatedRoute,private location: Location, public authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.showId = this.route.snapshot.paramMap.get('id')!;

    if (this.showId) {
    this.loadSeatingPlan(this.showId); }

   }

  openDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      // panelClass: 'bootstrap-dialog' // Optional, for custom styling
    }).afterClosed().subscribe(result => {
      if (result) {
        this.onClickHandler();

      } else {
        this.location.back();
      }
    });
  }

  loadSeatingPlan(showId: string) {
    this.showService.getShowById(showId!).subscribe({
      next: (res) => {
        if (res.status) {
          this.seatingPlan = res.data.rows;
        } else {
          this.snackBar.open('Το πλάνο δεν βρέθηκε', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',

          });
        }
      },
      error: (err) => {
        this.snackBar.open('Αποτυχία φόρτωσης πλάνου', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',

        });
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
      return 'text-success ';
    case 'SELECTED':
      return 'text-primary ';
    case 'BOOKED':
      return 'text-gray';
    default:
      return 'text-success ';
  }
}

handleSeatStatus(seat: any) {
  if (this.authService.isAdmin()) {
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
  onClickBack () {
    this.location.back();
  }
onClickHandler() {


  const seatsToUpdate = [];

  for (const row of this.seatingPlan) {
    for (const seat of row.seats) {
      if (seat.status === 'SELECTED' || seat.status === 'BOOKED') {
        seat.status = 'BOOKED';
        const label = String(seat.seatNumber);
        seatsToUpdate.push({ label, status: 'BOOKED' });
      }
      if (seat.status === 'AVAILABLE') {
        seat.status = 'AVAILABLE';
        const label = String(seat.seatNumber);
        seatsToUpdate.push({ label, status: 'AVAILABLE' });
      }
    }
  }

   this.showService.updateSeats(this.showId, seatsToUpdate).subscribe({
     next: (res) => {

       if (!this.authService.isAdmin()) {
         this.snackBar.open('Η κράτηση είναι έγκυρη', '', {
           duration: 3000,
           horizontalPosition: 'right',
           verticalPosition: 'bottom',
         })
       }
       ;

       if (this.authService.isAdmin()) {
         this.snackBar.open('Το πλάνο τροποποιήθηκε', '', {
           duration: 3000,
           horizontalPosition: 'right',
           verticalPosition: 'bottom',
         })
         this.location.back();
       }
       ;


     },
     error: (err) => {
       this.snackBar.open('Οι κράτηση δεν είναι έγκυρη', '', {
         duration: 3000,
         horizontalPosition: 'right',
         verticalPosition: 'bottom',

       });
     }
   });
  this.location.back();
}
}
