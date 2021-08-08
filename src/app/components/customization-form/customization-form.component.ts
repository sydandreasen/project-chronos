/**
 * Customization Form
 *
 * displays and manages planner customization options
 */

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
    { displayName: 'Bisque', value: '#FFE4C4' },
    { displayName: 'Blanched Almond', value: '#FFEBCD' },
    { displayName: 'Blue', value: '#3c96f7' },
    { displayName: 'Brown', value: '#A52A2A' },
    { displayName: 'Burlywood', value: '#DEB887' },
    { displayName: 'Chocolate', value: '#D2691E' },
    { displayName: 'Cornflower Blue', value: '#6495ED' },
    { displayName: 'Crimson', value: '#DC143C' },
    { displayName: 'Dark Gray', value: '#7a797a' },
    { displayName: 'Dark Green', value: '#006400' },
    { displayName: 'Dark Red', value: '#8B0000' },
    { displayName: 'Dark Orange', value: '#FF8C00' },
    { displayName: 'Dark Khaki', value: '#BDB76B' },
    { displayName: 'Dark Salmon', value: '#E9967A' },
    { displayName: 'Deep Sky Blue', value: '#00BFFF' },
    { displayName: 'Dodger Blue', value: '#1E90FF' },
    { displayName: 'Firebrick', value: '#B22222' },
    { displayName: 'Forest Green', value: '#228B22' },
    { displayName: 'Fuschia', value: '#FF00FF' },
    { displayName: 'Gold', value: '#FFD700' },
    { displayName: 'Gray', value: '#c1c0c0' },
    { displayName: 'Green', value: 'green' },
    { displayName: 'Khaki', value: '#F0E68C' },
    { displayName: 'Lawn Green', value: '#7CFC00' },
    { displayName: 'Lemon Chiffon', value: '#FFFACD' },
    { displayName: 'Light Coral', value: '#F08080' },
    { displayName: 'Light Salmon', value: '#FFA07A' },
    { displayName: 'Light Sky Blue', value: '#87CEFA' },
    { displayName: 'Light Yellow', value: '#FFFFE0' },
    { displayName: 'Lime', value: '#00FF00' },
    { displayName: 'Maroon', value: '#800000' },
    { displayName: 'Medium Blue', value: '#0000CD' },
    { displayName: 'Medium Spring Green', value: '#00FA9A' },
    { displayName: 'Moccasin', value: '#FFE4B4' },
    { displayName: 'Navy', value: '#000080' },
    { displayName: 'Olive', value: '#808000' },
    { displayName: 'Orange', value: '#FFA500' },
    { displayName: 'Orange-Red', value: '#FF4500' },
    { displayName: 'Pale Goldenrod', value: '#EEE8AA' },
    { displayName: 'Pale Green', value: '#98FB98' },
    { displayName: 'Papaya Whip', value: '#FFEFD5' },
    { displayName: 'Peach Puff', value: '#FFDAB9' },
    { displayName: 'Powder Blue', value: '#B0E0E6' },
    { displayName: 'Purple', value: '#800080' },
    { displayName: 'Red', value: 'red' },
    { displayName: 'Rosy Brown', value: '#BC8F8F' },
    { displayName: 'Royal Blue', value: '#4169E1' },
    { displayName: 'Saddle Brown', value: '#8B4513' },
    { displayName: 'Salmon', value: '#FA8072' },
    { displayName: 'Sandy Brown', value: '#F4A460' },
    { displayName: 'Sea Green', value: '#2E8B57' },
    { displayName: 'Sienna', value: '#A0522D' },
    { displayName: 'Sky Blue', value: '#87CEEB' },
    { displayName: 'Spring Green', value: '#00FF7F' },
    { displayName: 'Steel Blue', value: '#4682B4' },
    { displayName: 'Tan', value: '#D2B48C' },
    { displayName: 'Teal', value: '#008080' },
    { displayName: 'Tomato', value: '#FF6347' },
    { displayName: 'Wheat', value: '#F5DEB3' },
    { displayName: 'Yellow', value: '#FFFF00' },
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

  /** injections and setup
   * @param dialogRef
   * @param data
   * @param fbService reference to custom firebase service
   * @param authService reference to custom auth service
   */
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

/** option object */
export class Option {
  displayName: string = '';
  value: string = '';
}
