import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html',
  styleUrls: ['./text-dialog.component.scss'],
})
export class textDialogComponent {

  /** form control for font family name string */
  fontColor: FormControl = new FormControl();

  /** allowed colors */
  fontColors: string[] = [
    'Red',
    'Blue',
    'Green'
  ];

  /** send font size up */
  //@Output() fontSizeChange: EventEmitter<number> = new EventEmitter<number>();

  /** injections and setup */
  constructor(
    private dialogRef: MatDialogRef<MatDialog>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fbService: FirebaseService,
    private authService: AuthService
  ) {
    this.fontColor.setValue(data.fontColor);
  }

  /** manage form control changes */
  ngOnInit() {
    this.fontColor.valueChanges.subscribe((fontColor: string) => {
      const uid = this.authService.getUID();
      this.fbService.editFontColor(uid, fontColor);
    });
  }

  /** pass data up to parents */
  close() {
    this.dialogRef.close({
      fontColor: this.fontColor.value,
    });
  }
}
