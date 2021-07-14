import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-font-size-dialog',
  templateUrl: './font-size-dialog.component.html',
  styleUrls: ['./font-size-dialog.component.scss'],
})
export class FontSizeDialogComponent {
  /** form control for font size pixel number */
  fontSize: FormControl = new FormControl();

  /** send font size up */
  @Output() fontSizeChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private dialogRef: MatDialogRef<MatDialog>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.fontSize.setValue(data.fontSize);
  }

  close() {
    this.dialogRef.close(this.fontSize.value);
  }
}
