import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontSizeDialogComponent } from './font-size-dialog.component';

describe('FontSizeDialogComponent', () => {
  let component: FontSizeDialogComponent;
  let fixture: ComponentFixture<FontSizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontSizeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontSizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
