import { Component, Input, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { FontSizeDialogComponent } from '../font-size-dialog/font-size-dialog.component';

/** provide a wrapper for the monthly, weekly, and daily views. manage which is shown */
@Component({
  selector: 'app-planner-wrapper',
  templateUrl: './planner-wrapper.component.html',
  styleUrls: ['./planner-wrapper.component.scss'],
})
export class PlannerWrapperComponent {
  /** the trigger to open menu (the button with three horizontal lines icon) */
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  /** grab a font size change */
  fontSize: number = 14; // TODO set this in onInit or something after getting default from DB

  /** start focusing on today. */
  focusDate: Date = new Date();
  /** which view should be shown. week is default */
  mode: string = 'week'; // default

  /** create planner wrapper */
  constructor(private afAuth: AngularFireAuth, private dialog: MatDialog) {}

  /** based on top left buttons to switch view mode
   * @param mode the view to switch to
   */
  switchMode(mode: string): void {
    if (mode === 'week') {
      this.mode = mode;
    } else if (mode === 'day') {
      this.mode = mode;
    } else if (mode === 'month') {
      this.mode = mode;
    }
  }

  /** set focus data at wrapper level to pass updated info  to views */
  setFocusDate(date: Date) {
    this.focusDate = date;
  }

  /** edit a specific day */
  editDay(date: Date) {
    this.setFocusDate(date);
    this.switchMode('day');
  }

  /** logout of authentication */
  onLogout(): void {
    this.afAuth.signOut();
  }

  /** set a new font size */
  setFontSize(size: number): void {
    this.fontSize = size;
  }

  /** open the dialog for setting font size */
  openFontSizeDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.restoreFocus = false;
    dialogConfig.data = { fontSize: 14 };
    const fontSizeDialogRef = this.dialog.open(
      FontSizeDialogComponent,
      dialogConfig
    );
    fontSizeDialogRef.afterClosed().subscribe((fontSize) => {
      this.setFontSize(fontSize);
      this.menuTrigger?.focus();
    });
  }
}
