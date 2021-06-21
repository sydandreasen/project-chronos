import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss'],
})
export class WeeklyViewComponent implements OnInit {
  focusDate: Date = new Date(); // default date to build the week around.
  weekDates: Date[] = []; // array of dates to populate UI

  constructor() {}

  ngOnInit(): void {
    this.generateweek(this.focusDate);
  }

  /// NOTE getUTCDay() might cause weird issues when you're a few hours from the next/previous day
  // I think .getDay() prevents this
  // NOTE setting working equal to a new date I think was possibly causing problems when jumping over months and such, so I copied 'current'
  // also NOTE var is outdated. let is preferred
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

  // navigate to next week
  nextWeek() {
    this.focusDate.setDate(this.focusDate.getDate() + 7);
    this.generateweek(this.focusDate);
  }

  // navigate to previous week
  lastWeek() {
    this.focusDate.setDate(this.focusDate.getDate() - 7);
    this.generateweek(this.focusDate);
  }

  copy(working: Date): Date {
    let reckoning = new Date();
    reckoning.setFullYear(working.getFullYear());
    reckoning.setMonth(working.getMonth());
    reckoning.setDate(working.getDate());
    return reckoning;
  }
}
