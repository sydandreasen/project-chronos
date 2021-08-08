import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { draggable } from '../draggable/draggable.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  /** the draggable with task info to display */
  @Input() dragItem: draggable = new draggable();

  /** the font size to display */
  @Input() fontSize: string = '';

  /** the font family to display */
  @Input() fontFamily: string = '';

  /** font color to use */
  @Input() chosenColor: string = '';

  /** the task id */
  @Input() taskId: string = '';

  /** the date string */
  @Input() dateString: string = '';

  /** the user's id */
  @Input() uid: string = '';

  /** whether the task has been completed */
  completeControl: FormControl = new FormControl(null);

  /** the task value */
  valueControl: FormControl = new FormControl(null);

  /** timer to allow for editing before DB change is made. when db change happens, the focus is lost */
  editingTimer: any = setTimeout(() => {}, 0);

  /** use the firebase service */
  constructor(private fbSerivce: FirebaseService) {}

  /** manage form control changes */
  ngOnInit() {
    this.completeControl.setValue(this.dragItem.value.isComplete);

    this.completeControl.valueChanges.subscribe((isComplete: boolean) => {
      this.dragItem.value.isComplete = isComplete;
      this.editTask();
    });

    this.valueControl.setValue(
      this.dragItem.value.value ? this.dragItem.value.value : ''
    );

    this.valueControl.valueChanges.subscribe((value: string) => {
      this.dragItem.value.value = value;
      clearTimeout(this.editingTimer);
      this.editingTimer = setTimeout(() => {
        this.editTask();
      }, 800);
    });
  }

  /** edit the task in the DB */
  editTask(): void {
    if (this.uid && this.dateString && this.taskId) {
      this.fbSerivce.updatePlannedObject(
        this.uid,
        this.dateString,
        this.dragItem
      );
    }
  }
}
