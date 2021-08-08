import { Component, Input } from '@angular/core';
import { draggable } from './draggable.model';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
})
export class DraggableComponent {
  /** the draggable option - a metric or task or note*/
  @Input() option: draggable = new draggable();

  /** the font size that the draggable's text should use */
  @Input() fontSize: string = '';

  /** the font family that the draggable's text should use */
  @Input() fontFamily: string = '';

  /** chosen text color */
  @Input() chosenColor: string = '';

  /** the date string */
  @Input() dateString: string = '';

  /** the user's id */
  @Input() uid: string = '';
}
