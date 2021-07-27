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
import { PlannerWrapperComponent } from './planner-wrapper.component';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/app.module';

describe('PlannerWrapperComponent', () => {
  let component: PlannerWrapperComponent;
  let fixture: ComponentFixture<PlannerWrapperComponent>;
  let ui : any;

  beforeEach(  () => {
      TestBed.configureTestingModule({
      declarations: [ PlannerWrapperComponent ],
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
    fixture = TestBed.createComponent(PlannerWrapperComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('calendar_today tooltiptext').textContent).toEqual('Monthly View');
    expect(ui.querySelector('view_week tooltiptext').textContent).toEqual('Weekly View');
    expect(ui.querySelector('today tooltiptext').textContent).toEqual('Daily View');
    expect(ui.querySelector('menu tooltiptext').textContent).toEqual('More Options');
    expect(ui.querySelector('button').textContent).toEqual('Logout');
    expect(ui.querySelector('button').textContent).toEqual('Customize Fonts');
  })
});
