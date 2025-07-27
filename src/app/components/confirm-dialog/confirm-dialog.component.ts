import { Component, } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
  imports: [
    CommonModule, MatButtonModule
  ],
})

export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,) {}

  confirm() {
    this.dialogRef.close(true);
  };

  cancel() {
    this.dialogRef.close(false);
  };
}
