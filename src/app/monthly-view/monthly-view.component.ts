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
    // TODO Royal to implement logic around dates
    // i.e. based on the current date, pull the date and day of week, and grab
    // dates for start and end of month accordingly
    // set those into this.monthDates arrray
    // after doing so, you should see the date numbers populate in the UI..
    // because you will also need to find list of dates any time the navigation buttons are clicked,
    // a function for this based on this.focusDate would be good instead of repeating code in
    // nextMonth() and lastMonth() functions
  }

  // navigate to next month
  nextMonth() {
    console.log('navigate to next month');
    // TODO Royal to implement
    // should effect this.focusDate and this.monthDates
  }

  // navigate to previous month
  lastMonth() {
    console.log('navigate to previous month');
    // TODO Royal to implement
    // should effect this.focusDate and this.monthDates
  }
}
