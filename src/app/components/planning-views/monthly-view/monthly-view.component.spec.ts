import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

import { MonthlyViewComponent } from './monthly-view.component';

describe('MonthlyViewComponent', () => {
  let component: MonthlyViewComponent;
  let fixture: ComponentFixture<MonthlyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyViewComponent ],
      imports: [ RouterModule, FirebaseService, AngularFireDatabase ], 
      providers: [FirebaseService, AngularFireDatabase]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
