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

  // FIXME why does february get generated after clicking through June?
  generateweek(current: Date) {
    var tracker = 0;
    var spot = current.getUTCDay();
    var working = new Date();
    for (var i = spot; i >= 0; i--) {
      working.setDate(current.getDate() - tracker);
      this.weekDates[i] = this.copy(working);
      tracker++;
    }
    tracker = 1;
    for (var i = spot + 1; i < 31; i++) {
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
    var reckoning = new Date();
    reckoning.setDate(working.getDate());
    reckoning.setMonth(working.getMonth());
    return reckoning;
  }
}
