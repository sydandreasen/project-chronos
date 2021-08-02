import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import {
  draggable,
  metric,
  task,
  note,
} from '../../plannables/draggable/draggable.model';

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
  @Input() chosenColor: string = '';

  /** the font size to have for tasks, notes, and metrics */
  @Input() fontSize: string = '';

  /** the font family to have for tasks, notes and metrics */
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
    { type: 'note', value: new note(), id: '', idx: -1 },
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
    this.dateString = this.getStringDate(this.focusDate);
  }

  /** generate metrics, notes, and tasks for the week based on the focused day */
  generateWeek(): void {
    // items to base generation on
    const basis: Array<draggable> = this.allDayOptions[this.dateString];
    let tallyForBasisDraggableTypes: { [key: string]: any } = {};
    let examples: { [key: string]: any } = {};
    basis?.forEach((dragItem: draggable) => {
      if (tallyForBasisDraggableTypes[dragItem.type]) {
        tallyForBasisDraggableTypes[dragItem.type]++;
      } else {
        tallyForBasisDraggableTypes[dragItem.type] = 1;
        // make an example
        examples[dragItem.type] = new draggable();
        examples[dragItem.type].type = dragItem.type;
        examples[dragItem.type].value = this.getFreshDraggableValue(dragItem);
      }
    });
    // dates to edit
    const dayOfWeek: number = this.focusDate.getDay(); // zero-indexed
    for (let i = 0; i < 7; i++) {
      if (i !== dayOfWeek) {
        const temp = new Date(
          this.focusDate.getFullYear(),
          this.focusDate.getMonth(),
          this.focusDate.getDate() + i - dayOfWeek
        );

        const tempStringDate: string = this.getStringDate(temp);
        const compareDraggables: Array<draggable> =
          this.allDayOptions[tempStringDate];
        let tallyForExistingDraggableTypes: { [key: string]: any } = {};
        compareDraggables?.forEach((dragItem: draggable) => {
          if (tallyForExistingDraggableTypes[dragItem.type]) {
            tallyForExistingDraggableTypes[dragItem.type]++;
          } else {
            tallyForExistingDraggableTypes[dragItem.type] = 1;
          }
        });
        const draggableTypesToHave = Object.getOwnPropertyNames(
          tallyForBasisDraggableTypes
        );
        draggableTypesToHave.forEach((neededType) => {
          // if there's not enough of that type already, add as many as needed
          if (
            !tallyForExistingDraggableTypes[neededType] ||
            tallyForExistingDraggableTypes[neededType] <
              tallyForBasisDraggableTypes[neededType]
          ) {
            for (
              let i = tallyForExistingDraggableTypes[neededType] | 0;
              i < tallyForBasisDraggableTypes[neededType];
              i++
            ) {
              // write draggables to the day such that the total of that type on the day becomes no more than in the model day
              this.fbService.writeMetricOrTask(
                // TODO rename this to be more generic
                this.uid,
                tempStringDate,
                examples[neededType],
                this.allDayOptions[tempStringDate]?.length | 0,
                this.allDayOptions[tempStringDate]
              );
            }
          }
        });
      }
    }
  }

  /** return a new draggable value based on its type
   * @param draggable the draggable item to get the value of based on type
   */
  getFreshDraggableValue(
    draggable: draggable
  ): metric | task | note | undefined {
    switch (draggable.type) {
      case 'metric':
        return new metric();
        break;
      case 'task':
        return new task();
        break;
      case 'note':
        return new note();
        break;
      default:
        return undefined; // shouldn't ever happen
    }
  }

  /**
   * reset the focused date back to today
   */
  jumpToToday(): void {
    this.setFocusDate(new Date());
    this.dateString = this.getStringDate(this.focusDate);
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
  getStringDate(date: Date): string {
    return date.toDateString().replace(/ /g, '');
  }

  /**
   * navigate to tomorrow (relative to focusDate)
   */
  tomorrow(): void {
    const temp: Date = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() + 1
    );
    this.setFocusDate(temp);
    this.dateString = this.getStringDate(this.focusDate);
  }

  /**
   * navigate to yesterday (relative to focusDate)
   */
  yesterday(): void {
    const temp: Date = new Date(
      this.focusDate.getFullYear(),
      this.focusDate.getMonth(),
      this.focusDate.getDate() - 1
    );
    this.setFocusDate(temp);
    this.dateString = this.getStringDate(this.focusDate);
  }

  /** handle drag and drop into day */
  dropNewOption(dropItem: CdkDragDrop<any>): void {
    if (dropItem.previousContainer === dropItem.container) {
      // update dragged one's idx
      this.fbService.reorderMetricOrTask(
        // TODO rename to be more generic
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
      // write new metric/task/note
      this.fbService.writeMetricOrTask(
        // TODO rename to be more generic
        this.uid,
        this.dateString,
        JSON.parse(JSON.stringify(this.slideList[dropItem.previousIndex])),
        this.allDayOptions[this.dateString]?.length | 0, // currentIndex provided by library seemed off having the first drop into the day always go to the end. let them reorder from there
        this.allDayOptions[this.dateString]
      );
    }
  }

  /* handle drag and drop into options */
  dropExistingOption(dropItem: CdkDragDrop<any>): void {
    if (dropItem.previousContainer !== dropItem.container) {
      // grab item to be deleted
      const deleteItem: draggable =
        this.allDayOptions[this.dateString][dropItem.previousIndex];

      // re-assign new indexes to any following the deleted one
      this.fbService.reorderMetricOrTask(
        // TODO rename to be more generic
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
