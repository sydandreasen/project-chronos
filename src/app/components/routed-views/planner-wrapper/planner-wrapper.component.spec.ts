import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { PlannerWrapperComponent } from './planner-wrapper.component';

describe('PlannerWrapperComponent', () => {
  let component: PlannerWrapperComponent;
  let fixture: ComponentFixture<PlannerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerWrapperComponent ],
      imports: [AngularFireAuthModule, ReactiveFormsModule],
      providers: [ AngularFireAuth ]
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
