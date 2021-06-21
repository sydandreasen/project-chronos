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
    this.focusDate = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() + 1
    );
  }

  // navigate to yesterday
  yesterday() {
    this.focusDate = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() - 1
    );
  }
}
