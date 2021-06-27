import { Component } from '@angular/core';

/**
 * shows/manages daily view of plan endpoint
 */
@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss'],
})
export class DailyViewComponent {
  /**
   * the currently shown date
   */
  focusDate: Date = new Date();

  /**
   * reset the focused date back to today
   */
  jumpToToday() {
    this.focusDate = new Date();
  }

  /**
   * navigate to tomorrow (relative to focusDate)
   */
  tomorrow() {
    this.focusDate = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() + 1
    );
  }

  /**
   * navigate to yesterday (relative to focusDate)
   */
  yesterday() {
    this.focusDate = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() - 1
    );
  }
}
