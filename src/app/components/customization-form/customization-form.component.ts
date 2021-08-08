import { Component, Inject } from '@angular/core';
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

  /** form control for font color name string */
  fontColor: FormControl = new FormControl();

  /** allowed font colors */
  fontColors: Option[] = [
    { displayName: 'Aqua', value: '#00FFFF' },
    { displayName: 'Blue', value: '#3c96f7' },
    { displayName: 'Crimson', value: '#DC143C' },
    { displayName: 'Dark Gray', value: '#7a797a' },
    { displayName: 'Dark Red', value: '#8B0000' },
    { displayName: 'Dark Orange', value: '#FF8C00' },
    { displayName: 'Dark Khaki', value: '#BDB76B' },
    { displayName: 'Dark Salmon', value: '#E9967A' },
    { displayName: 'Firebrick', value: '#B22222' },
    { displayName: 'Fuschia', value: '#FF00FF' },
    { displayName: 'Gold', value: '#FFD700' },
    { displayName: 'Gray', value: '#c1c0c0' },
    { displayName: 'Green', value: 'green' },
    { displayName: 'Khaki', value: '#F0E68C' },
    { displayName: 'Lemon Chiffon', value: '#FFFACD' },
    { displayName: 'Light Coral', value: '#F08080' },
    { displayName: 'Light Salmon', value: '#FFA07A' },
    { displayName: 'Light Yellow', value: '#FFFFE0' },
    { displayName: 'Lime', value: '#00FF00' },
    { displayName: 'Maroon', value: '#800000' },
    { displayName: 'Moccasin', value: '#FFE4B4' },
    { displayName: 'Navy', value: '#000080' },
    { displayName: 'Olive', value: '#808000' },
    { displayName: 'Orange', value: '#FFA500' },
    { displayName: 'Orange-Red', value: '#FF4500' },
    { displayName: 'Pale Goldenrod', value: '#EEE8AA' },
    { displayName: 'Papaya Whip', value: '#FFEFD5' },
    { displayName: 'Peach Puff', value: '#FFDAB9' },
    { displayName: 'Purple', value: '#800080' },
    { displayName: 'Red', value: 'red' },
    { displayName: 'Salmon', value: '#FA8072' },
    { displayName: 'Teal', value: '#008080' },
    { displayName: 'Tomato', value: '#FF6347' },
    { displayName: 'Yellow', value: '#FFFF00' },
    // TODO keep going with shades of green at https://www.geeksforgeeks.org/html-hex-color-codes/, ordering them in alphabetical order by display name
  ];

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
    this.fontColor.setValue(data.fontColor);
  }

  /** manage form control changes */
  ngOnInit() {
    const uid = this.authService.getUID();
    this.fontSize.valueChanges.subscribe((fontSize: number) => {
      this.fbService.editSingleSetting(uid, 'fontSize', fontSize);
    });
    this.fontColor.valueChanges.subscribe((fontColor: string) => {
      this.fbService.editSingleSetting(uid, 'fontColor', fontColor);
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
      fontColor: this.fontColor.value,
      defaultView: this.defaultView.value,
    });
  }
}

export class Option {
  displayName: string = '';
  value: string = '';
}
