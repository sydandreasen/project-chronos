import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
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

  /** the font color chosen */
  @Input() chosenColor: String = '';

  /** the font size to have for tasks and metrics */
  @Input() fontSize: number = 0;

  /** the font family to have for tasks and metrics */
  @Input() fontFamily: string = '';

  /** the user's current metric/task data */
  @Input() dateInfo: { [key: string]: any } = {};

  /** set focus date back at top to communicate between */
  @Output() sendFocusDate: EventEmitter<Date> = new EventEmitter<Date>();

  /** the draggable options that appear as slides in the carousel */
  slideList: Array<draggable> = [
    { type: 'task', value: '', id: '', idx: -1 },
    { type: 'metric', value: '', id: '', idx: -1 },
  ];

  /** the current options to be used for the day */
  dayOptions: Array<draggable> = [];

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

    console.log(this.dateInfo);
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
      // update dragged one's idx
      this.fbService.reorderMetricOrTask(
        this.uid,
        this.focusDate.toDateString().replace(/ /g, ''),
        dropItem.previousIndex,
        dropItem.currentIndex,
        this.dayOptions
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
        this.focusDate.toDateString().replace(/ /g, ''),
        JSON.parse(JSON.stringify(this.slideList[dropItem.previousIndex])),
        this.dayOptions.length, // currentIndex provided by library seemed off having the first drop into the day always go to the end. let them reorder from there
        this.dayOptions
      );
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
