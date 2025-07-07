export interface Seat {
  seatNumber: number;
  status: 'AVAILABLE' | 'SELECTED' | 'BOOKED';
}

export interface Row {
  rowNumber: number;
  seats: Seat[];
}