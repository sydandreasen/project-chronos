import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-customization-form',
  templateUrl: './customization-form.component.html',
  styleUrls: ['./customization-form.component.scss'],
})
export class CustomizationFormComponent {
  /** form control for font size pixel number */
  fontSize: FormControl = new FormControl();

  /** allowed font sizes in pixels */
  fontSizes: number[] = [8, 10, 12, 14, 16]; //, 18, 20];

  /** form control for font family name string */
  fontFamily: FormControl = new FormControl();

  /** form control for default view name string */
  defaultView: FormControl = new FormControl();

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

  /** injections and setup */
  constructor(
    private dialogRef: MatDialogRef<MatDialog>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fbService: FirebaseService,
    private authService: AuthService
  ) {
    this.fontSize.setValue(data.fontSize);
    this.fontFamily.setValue(data.fontFamily);
    this.defaultView.setValue(data.defaultView);
  }

  /** manage form control changes */
  ngOnInit() {
    const uid = this.authService.getUID();
    this.fontSize.valueChanges.subscribe((fontSize: number) => {
      this.fbService.editSingleSetting(uid, 'fontSize', fontSize);
    });
    this.fontFamily.valueChanges.subscribe((fontFamily: string) => {
      this.fbService.editSingleSetting(uid, 'fontFamily', fontFamily);
    });
    this.defaultView.valueChanges.subscribe((defaultView: string) => {
      this.fbService.editSingleSetting(uid, 'defaultView', defaultView);
    });
  }

  /** pass data up to parents */
  close(): void {
    this.dialogRef.close({
      fontSize: this.fontSize.value,
      fontFamily: this.fontFamily.value,
      defaultView: this.defaultView.value,
    });
  }
}
