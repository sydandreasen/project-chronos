import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerWrapperComponent } from './planner-wrapper.component';

describe('PlannerWrapperComponent', () => {
  let component: PlannerWrapperComponent;
  let fixture: ComponentFixture<PlannerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
