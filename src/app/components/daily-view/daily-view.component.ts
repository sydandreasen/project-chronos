import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

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

  slideList: Array<any> = [];

  dayOptions: Array<any> = [];

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
      let optionsParent = document.getElementById('day-options');
      let addingEl = dropItem.item.element.nativeElement.cloneNode(true);
      optionsParent?.appendChild(addingEl);
      document.querySelectorAll('.draggable').forEach((draggable) => {
        draggable.classList.remove('cdk-drag-dragging');
      });
    }
  }

  /* handle drag and drop into options */
  dropExistingOption(dropItem: CdkDragDrop<any>) {
    if (dropItem.previousContainer === dropItem.container) {
      moveItemInArray(
        dropItem.container.data,
        dropItem.previousIndex,
        dropItem.currentIndex
      );
    } //else {
    // this.dayOptions.splice(dropItem.previousIndex, 1);
    // }
  }

  onDelete(el: any) {
    // find out if element is in the day, not carousel
    // console.log(el);
    // TODO remove from DB
    // el.nativeElement.remove;
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
