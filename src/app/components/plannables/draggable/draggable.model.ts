// a model class of a draggable
export class draggable {
  /** the type of draggable item, such as a metric or a task or a note */
  type: string = '';
  /** a value to populate the draggable's text */
  value: any = undefined;
  /** id of draggable item. unique compared to others in the same day */
  id: string = '';
  /** index at which this draggable should show for that day */
  idx: number = -1;
}

// a model class of a metric
export class metric {
  /** the label text for the metric */
  label: string = '';
  /** the value text for that metric */
  value: string = '';
}

// a model class of a task
export class task {
  /** the task text */
  value: string = '';
  /** whether the task has been complete -- whether the checkbox is checked */
  isComplete: boolean = false;
}

// a model class of a note
export class note {
  /** the note text */
  value: string = '';
}
