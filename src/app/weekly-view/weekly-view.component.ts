import { Component, OnInit } from '@angular/core';

/** manage weekly view */
@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss'],
})
export class WeeklyViewComponent implements OnInit {
  /** the currently focused date. defaults to today */
  focusDate: Date = new Date(); // default date to build the week around.

  /** the currently displayed week. sunday through saturday */
  weekDates: Date[] = []; // array of dates to populate UI

  /** generate initial week */
  ngOnInit(): void {
    this.generateweek(this.focusDate);
  }

  /** jump the focus date automatically back to today */
  jumpToToday() {
    this.focusDate = new Date();
    this.generateweek(this.focusDate);
  }

  /** jump to a new focus date. mainly to be used when within same week
   * @param date the date to now focus on
   */
  setFocusDate(date: Date): void {
    this.focusDate = date;
  }

  /** generate a new week around a new date to be focused on
   * @param current the date to generate the week around
   */
  generateweek(current: Date) {
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
  nextWeek() {
    this.focusDate.setDate(this.focusDate.getDate() + 7);
    this.generateweek(this.focusDate);
  }

  /** navigate to previous week */
  lastWeek() {
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
