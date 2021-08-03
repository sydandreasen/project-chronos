import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

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

  /** injections and setup */
  constructor(
    private dialogRef: MatDialogRef<MatDialog>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fbService: FirebaseService,
    private authService: AuthService
  ) {
    this.fontSize.setValue(data.fontSize);
    this.fontFamily.setValue(data.fontFamily);
  }

  /** manage form control changes */
  ngOnInit() {
    this.fontSize.valueChanges.subscribe((fontSize: number) => {
      const uid = this.authService.getUID();
      this.fbService.editSingleSetting(uid, 'fontSize', fontSize);
    });
    this.fontFamily.valueChanges.subscribe((fontFamily: string) => {
      const uid = this.authService.getUID();
      this.fbService.editSingleSetting(uid, 'fontFamily', fontFamily);
    });
  }

  /** pass data up to parents */
  close(): void {
    this.dialogRef.close({
      fontSize: this.fontSize.value,
      fontFamily: this.fontFamily.value,
    });
  }
}
