import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontDialogComponent } from './font-dialog.component';

describe('FontDialogComponent', () => {
  let component: FontDialogComponent;
  let fixture: ComponentFixture<FontDialogComponent>;
  let ui : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FontDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontDialogComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('h2').textContent).toEqual('Choose the font size for your tasks and metrics (in pixels).');
    expect(ui.querySelector('p').textContent).toEqual('Choose the font size (in pixels).');
    expect(ui.querySelector('button').textContent).toEqual('Close');
  })

  
});
