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
  /** the currently shown date */
  @Input() focusDate: Date = new Date();

  /** set focus date back at top to communicate between */
  @Output() sendFocusDate: EventEmitter<Date> = new EventEmitter<Date>();

  slides: { image: string }[] = [];

  ngOnInit(): void {
    // test a couple images for the carousel
    this.slides.push({
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    });
    this.slides.push({
      image:
        'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228__340.jpg',
    });
    this.slides.push({
      image:
        'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg',
    });
    this.slides.push({
      image:
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg',
    });
  }

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
