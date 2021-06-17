import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss'],
})
export class DailyViewComponent implements OnInit {
  focusDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  // navigate to tomorrow
  tomorrow() {
    console.log('navigate to tomorrow');
    // TODO Royal to implement
    // should effect this.focusDate
    this.focusDate.setDate(this.focusDate.getDate() + 1);
    console.log('Date = ' + this.focusDate);
  }

  // navigate to yesterday
  yesterday() {
    console.log('navigate to yesterday');
    // TODO Royal to implement
    // should effect this.focusDate
    this.focusDate.setDate(this.focusDate.getDate() - 1);
    console.log('Date = ' + this.focusDate);
  }
}
