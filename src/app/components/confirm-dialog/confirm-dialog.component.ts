import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
