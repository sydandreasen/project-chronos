import { Component } from '@angular/core';

/** provide a wrapper for the monthly, weekly, and daily views. manage which is shown */
@Component({
  selector: 'app-planner-wrapper',
  templateUrl: './planner-wrapper.component.html',
  styleUrls: ['./planner-wrapper.component.scss'],
})
export class PlannerWrapperComponent {
  /** start focusing on today. */
  focusDate: Date = new Date();
  /** which view should be shown. week is default */
  mode: string = 'week'; // default



  constructor() {}

  // ngOnInit(): void {
  //   // test a couple images for the carousel
  //   this.slides.push({
  //     image:
  //       'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  //   });
  //   this.slides.push({
  //     image:
  //       'https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228__340.jpg',
  //   });
  //   this.slides.push({
  //     image:
  //       'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg',
  //   });
  //   this.slides.push({
  //     image:
  //       'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg',
  //   });
  // }

  /** based on top left buttons to switch view mode
   * @param mode the view to switch to
   */
  switchMode(mode: string): void {
    if (mode === 'week') {
      this.mode = mode;
    } else if (mode === 'day') {
      this.mode = mode;
    } else if (mode === 'month') {
      this.mode = mode;
    }
  }

  /** set focus data at wrapper level to pass updated info  to views */
  setFocusDate(date: Date) {
    this.focusDate = date;
  }

  /** edit a specific day */
  editDay(date: Date) {
    this.setFocusDate(date);
    this.switchMode('day');
  }
}
