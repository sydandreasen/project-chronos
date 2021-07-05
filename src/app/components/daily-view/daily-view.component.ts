import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() focusDate: Date = new Date();

  /** set focus date back at top to communicate between */
  @Output() sendFocusDate: EventEmitter<Date> = new EventEmitter<Date>();

  /**
   * reset the focused date back to today
   */
  jumpToToday() {
    this.setFocusDate(new Date());
  }

  /** jump to a new focus date.
   * @param date the date to now focus on
   */
  setFocusDate(date: Date): void {
    this.sendFocusDate.emit(date);
  }

  /**
   * navigate to tomorrow (relative to focusDate)
   */
  tomorrow() {
    let temp: Date = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() + 1
    );
    this.setFocusDate(temp);
  }

  /**
   * navigate to yesterday (relative to focusDate)
   */
  yesterday() {
    let temp: Date = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() - 1
    );
    this.setFocusDate(temp);
  }
}
