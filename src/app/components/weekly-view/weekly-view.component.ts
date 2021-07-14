import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/** manage weekly view */
@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss'],
})
export class WeeklyViewComponent implements OnInit {
  /** the currently focused date. defaults to today */
  @Input() focusDate: Date = new Date(); // default date to build the week around.

  @Input() chosenColor: String = '';

  /** set focus date back at top to communicate between */
  @Output() sendFocusDate: EventEmitter<Date> = new EventEmitter<Date>();

  /** tell wrapper to go to daily view on specific date */
  @Output() onEditDay: EventEmitter<Date> = new EventEmitter<Date>();

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

  /** generate initial week */
  ngOnInit(): void {
    this.generateweek(this.focusDate);
  }

  /** jump the focus date automatically back to today */
  jumpToToday() {
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

  /** communicate to parent to edit date */
  onDoubleClick(date: Date): void {
    clearTimeout(this.singleClickTimer);
    this.onEditDay.emit(date);
  }

  /** generate a new week around a new date to be focused on
   * @param current the date to generate the week around
   */
  generateweek(current: Date): void {
    let tracker = 0; // this is for num days displacement from current day
    let spot = current.getDay(); // indexed day of week, starting with Sunday
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
}
