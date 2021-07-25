import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { draggable, metric, task } from '../draggable/draggable.model';

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

  /** the font color chosen */
  @Input() chosenColor: String = '';

  /** the font size to have for tasks and metrics */
  @Input() fontSize: string = '';

  /** the font family to have for tasks and metrics */
  @Input() fontFamily: string = '';

  /** the current options planned for all days */
  @Input() allDayOptions: { [key: string]: any } = {};

  /** set focus date back at top to communicate between */
  @Output() sendFocusDate: EventEmitter<Date> = new EventEmitter<Date>();

  /** date string for DB location and finding write info in allDayOptions */
  dateString: string = '';

  /** the draggable options that appear as slides in the carousel */
  slideList: Array<draggable> = [
    { type: 'task', value: new task(), id: '', idx: -1 },
    { type: 'metric', value: new metric(), id: '', idx: -1 },
  ];

  /** the user's uid */
  uid: string = '';

  /** inject services */
  constructor(
    private fbService: FirebaseService,
    private authService: AuthService
  ) {}

  /** setup class vars */
  ngOnInit() {
    this.uid = this.authService.getUID();
    this.setStringDate();
  }

  /**
   * reset the focused date back to today
   */
  jumpToToday() {
    this.setFocusDate(new Date());
    this.setStringDate();
  }

  /** jump to a new focus date.
   * @param date the date to now focus on
   */
  setFocusDate(date: Date): void {
    this.focusDate = date;
    this.sendFocusDate.emit(date);
    this.dateString = this.focusDate.toDateString().replace(/ /g, '');
  }

  /* set string date for accessing correct data */
  setStringDate(): void {
    this.dateString = this.focusDate.toDateString().replace(/ /g, '');
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
    this.setStringDate();
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
    this.setStringDate();
  }

  /** handle drag and drop into day */
  dropNewOption(dropItem: CdkDragDrop<any>) {
    if (dropItem.previousContainer === dropItem.container) {
      // update dragged one's idx
      this.fbService.reorderMetricOrTask(
        this.uid,
        this.dateString,
        dropItem.previousIndex,
        dropItem.currentIndex,
        this.allDayOptions[this.dateString]
      );
      moveItemInArray(
        dropItem.container.data,
        dropItem.previousIndex,
        dropItem.currentIndex
      );
    } else {
      // write new metric/task
      this.fbService.writeMetricOrTask(
        this.uid,
        this.dateString,
        JSON.parse(JSON.stringify(this.slideList[dropItem.previousIndex])),
        this.allDayOptions[this.dateString]?.length | 0, // currentIndex provided by library seemed off having the first drop into the day always go to the end. let them reorder from there
        this.allDayOptions[this.dateString]
      );
    }
  }

  /* handle drag and drop into options */
  dropExistingOption(dropItem: CdkDragDrop<any>) {
    if (dropItem.previousContainer !== dropItem.container) {
      // grab item to be deleted
      let deleteItem: draggable =
        this.allDayOptions[this.dateString][dropItem.previousIndex];

      // re-assign new indexes to any following the deleted one
      this.fbService.reorderMetricOrTask(
        this.uid,
        this.dateString,
        dropItem.previousIndex,
        (this.allDayOptions[this.dateString].length - 1) | 0, // end of array
        this.allDayOptions[this.dateString]
      );

      // delete the drug one, which should now be at the end
      this.fbService.deleteDraggable(
        this.uid,
        this.dateString,
        deleteItem.type,
        deleteItem.id
      );
    }
  }
}
