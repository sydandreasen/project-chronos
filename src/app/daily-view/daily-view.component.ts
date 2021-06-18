import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss'],
})
export class DailyViewComponent implements OnInit {
  focusDate: Date;

  constructor() {
    this.focusDate = new Date();
  }

  ngOnInit(): void {}

  // navigate to tomorrow
  tomorrow() {
    this.focusDate.setDate(this.focusDate.getDate() + 1);
    console.log('Date = ' + this.focusDate);
  }

  // navigate to yesterday
  yesterday() {
    this.focusDate.setDate(this.focusDate.getDate() - 1);
    console.log('Date = ' + this.focusDate);
  }
}
