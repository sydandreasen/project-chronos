export class draggable {
  /** the type of draggable item, such as a metric or a task */
  type: string = '';
  /** a value to populate the draggable's text */
  value: string = '';
  /** id of draggable item. unique compared to others in the same day */
  id: string = '';
  /** index at which this draggable should show for that day */
  idx: number = -1;
}
