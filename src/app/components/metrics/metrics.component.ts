import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { metric } from '../draggable/draggable.model';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent {
  /** the metric info to display */
  @Input() info: metric = new metric();

  /** the font size to display */
  @Input() fontSize: string = '';

  /** the font family to display */
  @Input() fontFamily: string = '';

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

  /** use the firebase service */
  constructor(private fbSerivce: FirebaseService) {}

  /** manage form control changes */
  ngOnInit() {
    this.labelControl.setValue(this.info.label ? this.info.label : '');

    this.labelControl.valueChanges.subscribe((label: string) => {
      this.info.label = label;
      clearTimeout(this.editingTimer);
      this.editingTimer = setTimeout(() => {
        this.editMetric();
      }, 800);
    });

    this.valueControl.setValue(this.info.value ? this.info.value : '');

    this.valueControl.valueChanges.subscribe((value: string) => {
      this.info.value = value;
      clearTimeout(this.editingTimer);
      this.editingTimer = setTimeout(() => {
        this.editMetric();
      }, 800);
    });
  }

  /** edit the task in the DB */
  editMetric(): void {
    if (this.uid && this.dateString && this.metricId) {
      this.fbSerivce.editMetric(
        this.uid,
        this.dateString,
        this.metricId,
        this.info
      );
    }
  }
}