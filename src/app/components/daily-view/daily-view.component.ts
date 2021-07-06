import { stringify } from '@angular/compiler/src/util';
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

  slides: string[] = [];

  /** initalize carousel element options */
  ngOnInit(): void {
    // test a couple images for the carousel
    this.slides.push('textarea');
    this.slides.push('input');
    this.slides.push('button');
  }

  // FIXME, why can't I interact with them? aka type stuff into textarea and input
  /** create a carousel element */
  createElement(el: string, idx: number): void {
    let element = document.createElement(el);
    element.textContent = 'test ' + el;
    element.style.height = '60%';
    element.style.width = '75%';
    element.style.textAlign = 'center';
    element.style.borderRadius = '0.75rem';
    element.style.border = '1px solid #7a797a';
    element.style.backgroundColor = 'white';
    element.style.padding = '1.2rem';

    let wrapper = document.getElementById(idx + '-slide');
    if (wrapper) {
      wrapper.innerHTML = '';
      wrapper.appendChild(element);
    }
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
