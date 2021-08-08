/**
 * Weekly View
 *
 * manages week specific logic and displays content for week
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toPng } from 'html-to-image';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { draggable } from '../../plannables/draggable/draggable.model';

/** manage weekly view */
@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss'],
})
export class WeeklyViewComponent implements OnInit {
  /** the currently focused date. defaults to today */
  @Input() focusDate: Date = new Date(); // default date to build the week around.

  /** the currently chosen font color */
  @Input() chosenColor: string = '';

  /** the font size to have for tasks, notes, and metrics */
  @Input() fontSize: string = '';

  /** the font family to have for tasks, notes, and metrics */
  @Input() fontFamily: string = '';

  /** the current options planned for all days */
  @Input() allDayOptions: { [key: string]: any } = {};

  /** set focus date back at top to communicate between */
  @Output() sendFocusDate: EventEmitter<Date> = new EventEmitter<Date>();

  /** tell wrapper to go to daily view on specific date */
  @Output() onEditDay: EventEmitter<Date> = new EventEmitter<Date>();

  /** whether draggable content should be wiped clean for exporting an image */
  hideDraggableContent: boolean = false;

  /** the currently displayed week. sunday through saturday */
  weekDates: Date[] = []; // array of dates to populate UI

  /** weekday names */
  dayNames: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  /** timer to allow for double click before single click fires */
  singleClickTimer: any = setTimeout(() => {}, 0);

  /** the user's uid */
  uid: string = '';

  /** inject services
   * @param fbService reference to custom firebase service
   * @param authService reference to custom auth service
   */
  constructor(
    private fbService: FirebaseService,
    private authService: AuthService
  ) {}

  /** setup class vars */
  ngOnInit() {
    this.uid = this.authService.getUID();
    this.generateweek(this.focusDate);
  }

  /** get the format of a given date as it'll show in the db data
   * @param date the date object to return a formatted string of
   */
  getDateString(date: Date): string {
    return date.toDateString().replace(/ /g, '');
  }

  /** jump the focus date automatically back to today */
  jumpToToday(): void {
    this.setFocusDate(new Date());
    this.generateweek(new Date());
  }

  /** jump to a new focus date.
   * @param date the date to now focus on
   */
  setFocusDate(date: Date): void {
    this.singleClickTimer = setTimeout(() => {
      this.sendFocusDate.emit(date);
    }, 80);
  }

  /** communicate to parent to edit date
   * @param date the date to switch to edit mode for
   */
  onDoubleClick(date: Date): void {
    clearTimeout(this.singleClickTimer);
    this.onEditDay.emit(date);
  }

  /** generate a new week around a new date to be focused on
   * @param current the date to generate the week around
   */
  generateweek(current: Date): void {
    let tracker = 0; // this is for num days displacement from current day
    const spot = current.getDay(); // indexed day of week, starting with Sunday
    let working = this.copy(current);
    for (let i = spot; i >= 0; i--) {
      // backfill the array, starting with the current day
      working.setFullYear(current.getFullYear());
      working.setMonth(current.getMonth());
      working.setDate(current.getDate() - tracker);
      this.weekDates[i] = this.copy(working);
      tracker++;
    }
    // re-initialize some stuff
    tracker = 1;
    working = this.copy(current);
    for (let i = spot + 1; i < 7; i++) {
      // fill rest of days until end of week
      working.setFullYear(current.getFullYear());
      working.setMonth(current.getMonth());
      working.setDate(current.getDate() + tracker);
      this.weekDates[i] = this.copy(working);
      tracker++;
    }
  }

  /** navigate to next week */
  nextWeek(): void {
    this.focusDate.setDate(this.focusDate.getDate() + 7);
    this.generateweek(this.focusDate);
  }

  /** navigate to previous week */
  lastWeek(): void {
    this.focusDate.setDate(this.focusDate.getDate() - 7);
    this.generateweek(this.focusDate);
  }

  /** copy a date so that the object references are different
   * @param working the date to copy
   * @returns the copied date
   */
  copy(working: Date): Date {
    let reckoning = new Date();
    reckoning.setFullYear(working.getFullYear());
    reckoning.setMonth(working.getMonth());
    reckoning.setDate(working.getDate());
    return reckoning;
  }

  /**
   * export an image of the week.
   * start by hiding specific
   * text from UI and setting a timer that
   * will call downloadImage() when complete
   * */
  exportWeek(): void {
    // empty the draggable content
    this.hideDraggableContent = true;

    // make a delay to have the content hiding register; then download image
    setTimeout(() => this.downloadImage(), 300);
  }

  /** after timer do the actual image save and then put the text back into the UI */
  downloadImage(): void {
    const weekGrid = document.querySelector('.week-grid') as HTMLElement;
    toPng(weekGrid)
      .then((dataUrl) => {
        // download image
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'download.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // repopulate task content
        this.hideDraggableContent = false;
      })
      .catch((error) =>
        alert('something went wrong while exporting your template')
      );
  }

  /**
   * toggle the isComplete status of a task in the DB
   * @param dateString the date to change data on
   * @param dragItem the draggable to change
   */
  toggleTaskCheckbox(dateString: string, dragItem: draggable): void {
    // double check that we are dealing with a task
    if (dragItem.type === 'task') {
      // then should have isComplete within value
      dragItem.value.isComplete = !dragItem.value.isComplete;
      this.fbService.updatePlannedObject(this.uid, dateString, dragItem);
    }
  }
}
