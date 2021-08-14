import 'zone.js/dist/zone-testing'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { MatCarouselModule } from 'ng-mat-carousel';
import { environment } from 'src/environments/environment';

import { FontDialogComponent } from './font-dialog.component';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/app.module';

describe('FontDialogComponent', () => {
  let component: FontDialogComponent;
  let fixture: ComponentFixture<FontDialogComponent>;
  let ui : any;

  beforeEach(  () => {
      TestBed.configureTestingModule({
      declarations: [FontDialogComponent],
      imports : [
              BrowserModule,
              RouterModule.forRoot(routes),
              BrowserAnimationsModule,
              AngularFireModule.initializeApp(environment.firebase),
              ReactiveFormsModule,
              MatIconModule,
              MatTooltipModule,
              MatButtonModule,
              MatMenuModule,
              MatCarouselModule.forRoot(),
              MatSelectModule,
              MatDialogModule,
              DragDropModule,
      ]
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
