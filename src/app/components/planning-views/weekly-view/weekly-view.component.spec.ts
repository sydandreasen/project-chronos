import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from 'src/app/services/firebase.service';
import { WeeklyViewComponent } from './weekly-view.component';

describe('WeeklyViewComponent', () => {
  let component: WeeklyViewComponent;
  let fixture: ComponentFixture<WeeklyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyViewComponent ],
      providers: [ FirebaseService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
