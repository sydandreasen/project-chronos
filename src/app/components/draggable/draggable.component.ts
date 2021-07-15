import { Component, Input } from '@angular/core';
import { draggable } from './draggable.model';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
})
export class DraggableComponent {
  @Input() option: draggable = new draggable();

  @Input() fontSize: string = '';

  @Input() fontFamily: string = '';
}
