import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from 'src/app/services/firebase.service';

import { MetricsComponent } from './metrics.component';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricsComponent ],
      imports: [ FirebaseService, AngularFireDatabase ],
      providers: [FirebaseService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
