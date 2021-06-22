import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  styleUrls: ['./monthly-view.component.scss'],
})
export class MonthlyViewComponent implements OnInit {
  focusDate: Date = new Date(); // default date to build the month around.
  monthDates: Date[] = []; // array of dates to populate UI

  constructor() {}

  ngOnInit(): void {
    var working = new Date();
    this.generateMonth(working);
  }

  isSquareMonth(date: Date) {
    let temp = this.copy(date);
    temp.setDate(1);
    return temp.getDay() === 0;
  }

  jumpToToday() {
    this.focusDate = new Date();
    this.generateMonth(this.focusDate);
  }

  // TODO as a nice to have, change styling on date circle for dates not in the main month
  // TODO as a nice to have, in all three views, alter styling on focusDate

  generateMonth(current: Date) {
    // want index to still be based on day of the week, so need to offset UNLESS the first of the month is a sunday
    let spot = this.isSquareMonth(current)
      ? current.getDate() - 1
      : current.getDate() - 1 + current.getDay(); // note spot is zero-indexed but getDate() isn't
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
    let daysInPreviousMonth = tempDate.getDate();
    let daysToBackFill = working.getDay();
    for (let i = 0; i < daysToBackFill; i++) {
      working.setFullYear(tempDate.getFullYear());
      working.setMonth(tempDate.getMonth());
      working.setDate(daysInPreviousMonth - i);
      this.monthDates[daysToBackFill - 1 - i] = this.copy(working);
    }
    // re-initialize some stuff
    tracker = 1;
    working = this.copy(current);
    for (let i = spot + 1; i < 35; i++) {
      // fill rest of days until end of 5 weeks
      working.setFullYear(current.getFullYear());
      working.setMonth(current.getMonth());
      working.setDate(current.getDate() + tracker);
      this.monthDates[i] = this.copy(working);
      tracker++;
    }
  }

  // navigate to next month
  nextMonth() {
    this.focusDate.setMonth(this.focusDate.getMonth() + 1);
    this.generateMonth(this.focusDate);
  }

  // navigate to previous month
  lastMonth() {
    this.focusDate.setMonth(this.focusDate.getMonth() - 1);
    this.generateMonth(this.focusDate);
  }

  copy(working: Date): Date {
    let reckoning = new Date();
    reckoning.setFullYear(working.getFullYear());
    reckoning.setMonth(working.getMonth());
    reckoning.setDate(working.getDate());
    return reckoning;
  }
}
