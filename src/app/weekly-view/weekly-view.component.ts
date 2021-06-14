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
    // TODO Royal to implement logic around dates
    // i.e. based on the current date, pull the day of week, and grab
    // dates for start and end of week accordingly
    // set those into this.weekDates arrray
    // this array should take care of 5 weeks of dates to ensure every date in the month can appear on the cal
    // after doing so, you should see the date numbers populate in the UI..
    // because you will also need to find list of dates any time the navigation buttons are clicked,
    // a function for this based on this.focusDate would be good instead of repeating code in
    // nextWeek() and lastWeek() functions
  }

  // navigate to next week
  nextWeek() {
    console.log('navigate to next week');
    // TODO Royal to implement
    // should effect this.focusDate and this.weekDates
  }

  // navigate to previous week
  lastWeek() {
    console.log('navigate to previous week');
    // TODO Royal to implement
    // should effect this.focusDate and this.weekDates
  }
}
