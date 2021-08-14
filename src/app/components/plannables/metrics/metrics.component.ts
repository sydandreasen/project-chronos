/**
 * Metric
 *
 * manages and dislays content for a metric
 */

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { draggable } from '../draggable/draggable.model';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent {
  /** the draggable with metric info to display */
  @Input() dragItem: draggable = new draggable();

  /** the font size to display */
  @Input() fontSize: string = '';

  /** the font family to display */
  @Input() fontFamily: string = '';

  /** font color to use */
  @Input() chosenColor: string = '';

  /** the metric id */
  @Input() metricId: string = '';

  /** the date string */
  @Input() dateString: string = '';

  /** the user's id */
  @Input() uid: string = '';

  /** the metric label */
  labelControl: FormControl = new FormControl(null);

  /** the metric value */
  valueControl: FormControl = new FormControl(null);

  /** timer to allow for editing before DB change is made. when db change happens, the focus is lost */
  editingTimer: any = setTimeout(() => {}, 0);

  /** use the firebase service
   * @param fbService reference to custom firebase service
   */
  constructor(private fbSerivce: FirebaseService) {}

  /** manage form control changes */
  ngOnInit() {
    this.labelControl.setValue(
      this.dragItem.value.label ? this.dragItem.value.label : ''
    );

    this.labelControl.valueChanges.subscribe((label: string) => {
      this.dragItem.value.label = label;
      clearTimeout(this.editingTimer);
      this.editingTimer = setTimeout(() => {
        this.editMetric();
      }, 800);
    });

    this.valueControl.setValue(
      this.dragItem.value.value ? this.dragItem.value.value : ''
    );

    this.valueControl.valueChanges.subscribe((value: string) => {
      this.dragItem.value.value = value;
      clearTimeout(this.editingTimer);
      this.editingTimer = setTimeout(() => {
        this.editMetric();
      }, 800);
    });
  }

  /** edit the task in the DB */
  editMetric(): void {
    if (this.uid && this.dateString && this.metricId) {
      this.fbSerivce.updatePlannedObject(
        this.uid,
        this.dateString,
        this.dragItem
      );
    }
  }
}
