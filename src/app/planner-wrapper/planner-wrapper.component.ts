import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner-wrapper',
  templateUrl: './planner-wrapper.component.html',
  styleUrls: ['./planner-wrapper.component.scss'],
})
export class PlannerWrapperComponent implements OnInit {
  mode = 'week'; // default

  constructor() {}

  ngOnInit(): void {}

  // based on top left buttons to switch view mode
  switchMode(mode: string) {
    if (mode === 'week') {
      this.mode = mode;
    } else if (mode === 'day') {
      this.mode = mode;
    } else if (mode === 'month') {
      this.mode = mode;
    }
  }
}
