import 'zone.js/dist/zone-testing'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { routes } from '../../app.module.ts';
import { MatCarouselModule } from 'ng-mat-carousel';
import { environment } from 'src/environments/environment';

import { DailyViewComponent } from './daily-view.component';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/app.module';

describe('DailyViewComponent', () => {
  let component: DailyViewComponent;
  let fixture: ComponentFixture<DailyViewComponent>;
  let ui: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyViewComponent ],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ui = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('jumpButton').textContent).toEqual('Jump to Today');
    expect(ui.querySelector('tooltiptext').textContent).toEqual('Previous Day');
    expect(ui.querySelector('span tooltiptext').textContent).toEqual('Following Day');
 
  });

  // it ('should jump to today') {
  //   component.jumpToToday();
  //   //expect(
  // }
});
