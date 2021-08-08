import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { draggable } from '../../plannables/draggable/draggable.model';
import { CustomizationFormComponent } from '../../customization-form/customization-form.component';
import { UserDefaults } from 'src/app/services/user-defaults';

/** provide a wrapper for the monthly, weekly, and daily views. manage which is shown */
@Component({
  selector: 'app-planner-wrapper',
  templateUrl: './planner-wrapper.component.html',
  styleUrls: ['./planner-wrapper.component.scss'],
})
export class PlannerWrapperComponent {
  /** the trigger to open menu (the button with three horizontal lines icon) */
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  /** the user defaults to use to populate the foundation of a user in the db */
  defaults: UserDefaults = new UserDefaults();

  /** font size for tasks, notes, and metrics */
  fontSize: number = 0; // overridden in subscription

  /** font-fmaily for tasks, notes, and metrics */
  fontFamily: string = ''; // overridden in subscription

  /** start focusing on today. */
  focusDate: Date = new Date();

  /** which view should be currently shown */
  mode: string = 'week'; // overridden in subscription

  /** the user's default planning view */
  defaultMode: string = ''; // overridden in subscription;

  /** the chosen text color */
  chosenColor: string = ''; // overridden in subscription

  /** the user's current dates data -- any date may include metric/note/task data.
   * at wrapper level to pass to each view
   */
  dateInfo: { [key: string]: any } = {};

  /** the current options to be used for the day */
  allDayOptions: { [key: string]: any } = {};

  /** create planner wrapper */
  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    private router: Router,
    private fbService: FirebaseService,
    private authService: AuthService
  ) {}

  /** setup Db subscription */
  ngOnInit() {
    const uid = this.authService.getUID();
    this.subscribeToUser(uid);
  }

  /** subscribe to user's data */
  subscribeToUser(uid: string): void {
    this.fbService.db.ref('users/' + uid).on('value', (snapshot) => {
      this.chosenColor = snapshot.val().settings?.fontColor
        ? snapshot.val().settings.fontColor
        : this.defaults.fontColor;
      this.fontSize = snapshot.val().settings?.fontSize
        ? snapshot.val().settings.fontSize
        : this.defaults.fontSize;
      this.fontFamily = snapshot.val().settings?.fontFamily
        ? snapshot.val().settings.fontFamily
        : this.defaults.fontFamily;
      if (!this.defaultMode) {
        // only do on first change. not every time user data updates
        this.mode = snapshot.val().settings?.defaultView
          ? snapshot.val().settings.defaultView
          : this.defaults.defaultView;
      }
      this.defaultMode = snapshot.val().settings?.defaultView
        ? snapshot.val().settings.defaultView
        : this.defaults.defaultView;

      this.dateInfo = snapshot.val().dates;
      this.allDayOptions = {};
      let thisDayOptions: Array<draggable> = [];
      if (this.dateInfo) {
        const dates = Object.getOwnPropertyNames(this.dateInfo);
        dates.forEach((dateString) => {
          thisDayOptions = [];
          const draggableTypes = Object.getOwnPropertyNames(
            this.dateInfo[dateString]
          );
          draggableTypes.forEach((type) => {
            const draggablesOfType = this.dateInfo[dateString][type];
            const draggableIds = Object.getOwnPropertyNames(draggablesOfType);
            draggableIds.forEach((id) => {
              const draggable = this.dateInfo[dateString][type][id];
              const newDraggable: draggable = {
                type: type.substring(0, type.length - 1), // take off the plural s
                id: id,
                value: draggable.value,
                idx: draggable.idx,
              };
              thisDayOptions[newDraggable.idx] = newDraggable;
            });
          });
          this.allDayOptions[dateString] = thisDayOptions;
        });
      }
    });
  }

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
    } else {
      // shouldn't ever need this
      this.mode = this.defaults.defaultView;
    }
  }

  /** set focus data at wrapper level to pass updated info  to views */
  setFocusDate(date: Date): void {
    this.focusDate = date;
  }

  /** edit a specific day */
  editDay(date: Date): void {
    this.setFocusDate(date);
    this.switchMode('day');
  }

  /** logout of authentication */
  onLogout(): void {
    this.router.navigate(['login']);
    this.afAuth.signOut();
  }

  setColor(shade: string): void {
    this.chosenColor = shade;
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
  openCustomizationForm(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.restoreFocus = false;
    dialogConfig.data = {
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      fontColor: this.chosenColor,
      defaultView: this.defaultMode,
    };
    const fontSizeDialogRef = this.dialog.open(
      CustomizationFormComponent,
      dialogConfig
    );
    fontSizeDialogRef.afterClosed().subscribe((data) => {
      if (data?.fontSize) {
        this.setFontSize(data.fontSize);
      }
      if (data?.fontFamily) {
        this.setFontFamily(data.fontFamily);
      }
      this.setColor(data.fontColor);
      if (data?.defaultView && data?.defaultView !== this.defaultMode) {
        this.mode = data.defaultView;
      }
      this.menuTrigger?.focus();
    });
  }

  /** get font size in pixels based on inputted number */
  getFontSize(): string {
    return this.fontSize + 'px';
  }
}
