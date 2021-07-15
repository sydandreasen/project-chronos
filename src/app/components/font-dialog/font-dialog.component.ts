import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-font-dialog',
  templateUrl: './font-dialog.component.html',
  styleUrls: ['./font-dialog.component.scss'],
})
export class FontDialogComponent {
  /** form control for font size pixel number */
  fontSize: FormControl = new FormControl();

  /** allowed font sizes in pixels */
  fontSizes: number[] = [8, 10, 12, 14, 16]; //, 18, 20];

  /** form control for font family name string */
  fontFamily: FormControl = new FormControl();

  /** allowed font families */
  fontFamilies: string[] = [
    'Roboto',
    'Arial',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
  ];

  /** send font size up */
  @Output() fontSizeChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private dialogRef: MatDialogRef<MatDialog>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.fontSize.setValue(data.fontSize);
    this.fontFamily.setValue(data.fontFamily);
  }

  close() {
    this.dialogRef.close({
      fontSize: this.fontSize.value,
      fontFamily: this.fontFamily.value,
    });
  }
}
