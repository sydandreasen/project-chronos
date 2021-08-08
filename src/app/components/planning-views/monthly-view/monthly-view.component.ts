/**
 * Monthly View
 *
 * manages month specific logic and displays month content
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { draggable } from '../../plannables/draggable/draggable.model';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  styleUrls: ['./monthly-view.component.scss'],
})
export class MonthlyViewComponent implements OnInit {
  /**
   * the main focuses date. starts out as today
   * and can shift as the users specifies
   */
  @Input() focusDate: Date = new Date(); // default date to build the month around.

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

  /** the array of dates to populate UI for the month around focusDate*/
  monthDates: Date[] = [];

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
    this.generateMonth(this.focusDate);
  }

  /** get the format of a given date as it'll show in the db data
   * @param date the date to return the formatted string of
   */
  getDateString(date: Date): string {
    return date.toDateString().replace(/ /g, '');
  }

  /**
   * jump back to focus on today
   */
  jumpToToday(): void {
    this.setFocusDate(new Date());
    this.generateMonth(new Date());
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
   * @param date the date to switch to editing mode for
   */
  onDoubleClick(date: Date): void {
    clearTimeout(this.singleClickTimer);
    this.onEditDay.emit(date);
  }

  /** based on whatever the new focus date should be, generate a month around that
   * @param current the date to generate the month around
   */
  generateMonth(current: Date): void {
    this.monthDates = [];
    let firstOfMonth = this.copy(current);
    firstOfMonth.setDate(1);
    // want index to still be based on day of the week. note getDay() is zero indexed and getDate() is not
    const spot = current.getDate() - 1 + firstOfMonth.getDay();
    let tracker = 0;
    let working = this.copy(current);
    working.setMonth(current.getMonth());
    for (let i = spot; tracker < current.getDate(); i--) {
      // backfill the rest of the current month, starting with the current day
      working.setFullYear(current.getFullYear());
      working.setMonth(current.getMonth());
      working.setDate(current.getDate() - tracker);
      this.monthDates[i] = this.copy(working);
      tracker++;
    }
    // backfill days in previous month
    let tempDate = this.copy(current);
    tempDate.setDate(0); // will go to last day in previous month
    const daysInPreviousMonth = tempDate.getDate();
    const daysToBackFill = working.getDay();
    for (let i = 0; i < daysToBackFill; i++) {
      working.setFullYear(tempDate.getFullYear());
      working.setMonth(tempDate.getMonth());
      working.setDate(daysInPreviousMonth - i);
      this.monthDates[daysToBackFill - 1 - i] = this.copy(working);
    }
    // re-initialize some stuff
    tracker = 1;
    working = this.copy(current);
    let lastDayOfMonth = this.copy(current); // makes new copy
    lastDayOfMonth.setMonth(current.getMonth() + 1); // advances month
    lastDayOfMonth.setDate(0); // sets back to last day of working month
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const need6Weeks = daysInCurrentMonth + firstOfMonth.getDay() > 35; // getDay() = 0 for sunday
    const arrLen = need6Weeks ? 42 : 35;
    for (let i = spot + 1; i < arrLen; i++) {
      // fill rest of days until end of 5 weeks
      working.setFullYear(current.getFullYear());
      working.setMonth(current.getMonth());
      working.setDate(current.getDate() + tracker);
      this.monthDates[i] = this.copy(working);
      tracker++;
    }
  }

  /** navigate to next month */
  nextMonth(): void {
    this.focusDate.setMonth(this.focusDate.getMonth() + 1);
    this.generateMonth(this.focusDate);
  }

  /** navigate to previous month */
  lastMonth(): void {
    this.focusDate.setMonth(this.focusDate.getMonth() - 1);
    this.generateMonth(this.focusDate);
  }

  /** copy a date so that the copied object won't be affected when new is altered
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
