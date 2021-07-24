import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { task } from '../draggable/draggable.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  /** the task info to display */
  @Input() info: task = new task();

  /** the font size to display */
  @Input() fontSize: string = '';

  /** the font family to display */
  @Input() fontFamily: string = '';

  /** the metric id */
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
    this.completeControl.setValue(this.info.isComplete);

    this.completeControl.valueChanges.subscribe((isComplete: boolean) => {
      this.info.isComplete = isComplete;
      this.editTask();
    });

    this.valueControl.setValue(this.info.value ? this.info.value : '');

    this.valueControl.valueChanges.subscribe((value: string) => {
      this.info.value = value;
      clearTimeout(this.editingTimer);
      this.editingTimer = setTimeout(() => {
        this.editTask();
      }, 800);
    });
  }

  /** edit the task in the DB */
  editTask(): void {
    if (this.uid && this.dateString && this.taskId) {
      this.fbSerivce.editTask(
        this.uid,
        this.dateString,
        this.taskId,
        this.info
      );
    }
  }
}
