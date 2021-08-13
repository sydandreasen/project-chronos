import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from 'src/app/services/firebase.service';

import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      providers: [ FirebaseService, AngularFireDatabase],
      imports: [FirebaseService, AngularFireDatabase]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
