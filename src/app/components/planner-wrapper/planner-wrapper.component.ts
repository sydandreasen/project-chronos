import { Component, Input, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { FontDialogComponent } from '../font-dialog/font-dialog.component';

/** provide a wrapper for the monthly, weekly, and daily views. manage which is shown */
@Component({
  selector: 'app-planner-wrapper',
  templateUrl: './planner-wrapper.component.html',
  styleUrls: ['./planner-wrapper.component.scss'],
})
export class PlannerWrapperComponent {
  /** the trigger to open menu (the button with three horizontal lines icon) */
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  /** font size for tasks and metrics */
  fontSize: number = 14; // TODO set this in onInit or something after getting default from DB

  /** font-fmaily for tasks and metrics */
  fontFamily: string = 'Roboto'; // TODO set this in onInit or something after getting default from DB

  /** start focusing on today. */
  focusDate: Date = new Date();
  /** which view should be shown. week is default */
  mode: string = 'week'; // default

  /** create planner wrapper */
  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    private router: Router
  ) {}

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
    this.router.navigate(['login']);
    this.afAuth.signOut();
  }

  /** set a new font size */
  setFontSize(size: number): void {
    this.fontSize = size;
  }

  /** set a new font-family */
  setFontFamily(family: string): void {
    this.fontFamily = family;
  }

  /** open the dialog for setting font size */
  openFontDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.restoreFocus = false;
    dialogConfig.data = {
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
    };
    const fontSizeDialogRef = this.dialog.open(
      FontDialogComponent,
      dialogConfig
    );
    fontSizeDialogRef.afterClosed().subscribe((data) => {
      this.setFontSize(data.fontSize);
      this.setFontFamily(data.fontFamily);
      this.menuTrigger?.focus();
    });
  }
}
