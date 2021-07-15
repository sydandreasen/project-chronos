import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyViewComponent } from './daily-view.component';

describe('DailyViewComponent', () => {
  let component: DailyViewComponent;
  let fixture: ComponentFixture<DailyViewComponent>;
  let ui: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ui = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('jumpButton').textContent).toEqual('Jump to Today');
    expect(ui.querySelector('tooltiptext').textContent).toEqual('Previous Day');
    expect(ui.querySelector('span tooltiptext').textContent).toEqual('Following Day');
 
  })

  it ('should jump to today') {
    this.jumpToToday();
    //expect(
  }
});
