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

  // FIXME we should have the array starting with a sunday date so that each date number appear on the correct day
  // of the week

  // TODO, it would be nice to have the ending dates of the previous month and beginning dates of the next month
  // like real calendars have
  generateMonth(current: Date) {
    var spot = current.getDate();
    var tracker = 0;
    var working = new Date();
    working.setMonth(current.getMonth());
    for (var i = spot; i > 0; i--) {
      working.setDate(current.getDate() - tracker);
      this.monthDates[i] = copy(working);
      tracker++;
    }
    tracker = 1;
    for (var i = spot + 1; i < 31; i++) {
      working.setDate(current.getDate() + tracker);
      this.monthDates[i] = copy(working);
      tracker++;
    }
    for (var i = 0; i < 31; i++) {
      console.log(this.monthDates[i]);
    }
  }

  // navigate to next month
  nextMonth() {
    console.log('navigate to next month');
    // TODO Royal to implement
    // should effect this.focusDate and this.monthDates

    this.focusDate.setMonth(this.focusDate.getMonth() + 1);
    this.generateMonth(this.focusDate);
  }

  // navigate to previous month
  lastMonth() {
    this.focusDate.setMonth(this.focusDate.getMonth() - 1);
    this.generateMonth(this.focusDate);
  }
}

function copy(working: Date): Date {
  var reckoning = new Date();
  reckoning.setDate(working.getDate());
  reckoning.setMonth(working.getMonth());
  return reckoning;
}
