import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { draggable } from '../draggable/draggable.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  /** the draggable with note info to display */
  @Input() dragItem: draggable = new draggable();

  /** the font size to display */
  @Input() fontSize: string = '';

  /** the font family to display */
  @Input() fontFamily: string = '';

  /** the note id */
  @Input() noteId: string = '';

  /** the date string */
  @Input() dateString: string = '';

  /** the user's id */
  @Input() uid: string = '';

  /** the note value */
  valueControl: FormControl = new FormControl(null);

  /** timer to allow for editing before DB change is made. when db change happens, the focus is lost */
  editingTimer: any = setTimeout(() => {}, 0);

  /** use the firebase service */
  constructor(private fbSerivce: FirebaseService) {}

  ngOnInit(): void {
    this.valueControl.setValue(
      this.dragItem.value.value ? this.dragItem.value.value : ''
    );

    this.valueControl.valueChanges.subscribe((value: string) => {
      this.dragItem.value.value = value;
      clearTimeout(this.editingTimer);
      this.editingTimer = setTimeout(() => {
        this.editNote();
      }, 800);
    });
  }

  /** edit the note in the DB */
  editNote(): void {
    if (this.uid && this.dateString && this.noteId) {
      this.fbSerivce.updatePlannedObject(
        this.uid,
        this.dateString,
        this.dragItem
      );
    }
  }
}
