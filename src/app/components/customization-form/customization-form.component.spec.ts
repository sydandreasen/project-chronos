import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomizationFormComponent } from './customization-form.component';

describe('CustomizationFormComponent', () => {
  let component: CustomizationFormComponent;
  let fixture: ComponentFixture<CustomizationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomizationFormComponent],
      imports: [ MatDialogRef ],
      providers: [ MatDialogRef ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
