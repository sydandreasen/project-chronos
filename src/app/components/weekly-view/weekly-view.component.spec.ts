import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyViewComponent } from './weekly-view.component';

describe('WeeklyViewComponent', () => {
  let component: WeeklyViewComponent;
  let fixture: ComponentFixture<WeeklyViewComponent>;
  let ui : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyViewComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('jumpButton').textContent).toEqual('Jump to Today');
    expect(ui.querySelector('tooltiptext').textContent).toEqual('Previous Week');
    expect(ui.querySelector('tooltip tooltiptext').textContent).toEqual('Following Week');
    expect(ui.querySelector('span').textContent).toEqual('**Double click on any date to edit it in the daily view.**');  
  })
});
