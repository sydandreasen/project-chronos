import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerWrapperComponent } from './planner-wrapper.component';

describe('PlannerWrapperComponent', () => {
  let component: PlannerWrapperComponent;
  let fixture: ComponentFixture<PlannerWrapperComponent>;
  let ui : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerWrapperComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('calendar_today tooltiptext').textContent).toEqual('Monthly View');
    expect(ui.querySelector('view_week tooltiptext').textContent).toEqual('Weekly View');
    expect(ui.querySelector('today tooltiptext').textContent).toEqual('Daily View');
    expect(ui.querySelector('menu tooltiptext').textContent).toEqual('More Options');
    expect(ui.querySelector('button').textContent).toEqual('Logout');
    expect(ui.querySelector('button').textContent).toEqual('Customize Fonts');
  })
});
