import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { draggable } from '../draggable/draggable.model';

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

  /** the font size to have for tasks and metrics */
  @Input() fontSize: number = 0;

  /** set focus date back at top to communicate between */
  @Output() sendFocusDate: EventEmitter<Date> = new EventEmitter<Date>();

  slideList: Array<draggable> = [
    { type: 'task', value: '' },
    { type: 'metric', value: '' },
  ];

  dayOptions: Array<any> = [];

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
    this.dayOptions = [];
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
    this.dayOptions = [];
  }

  /** handle drag and drop into day */
  dropNewOption(dropItem: CdkDragDrop<any>) {
    if (dropItem.previousContainer === dropItem.container) {
      moveItemInArray(
        dropItem.container.data,
        dropItem.previousIndex,
        dropItem.currentIndex
      );
    } else {
      copyArrayItem(
        dropItem.previousContainer.data,
        dropItem.container.data,
        dropItem.previousIndex,
        dropItem.currentIndex
      );
      // TODO add to DB
    }
  }

  /* handle drag and drop into options */
  dropExistingOption(dropItem: CdkDragDrop<any>) {
    if (dropItem.previousContainer !== dropItem.container) {
      this.dayOptions.splice(dropItem.currentIndex, 1);
      // TODO remove from DB
    }
  }

  /** get font size in pixels based on inputted number */
  getFontSize() {
    return this.fontSize + 'px';
  }
}
