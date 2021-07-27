import 'zone.js/dist/zone-testing'
import { MonthlyViewComponent } from './monthly-view.component';
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
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/app.module';


describe('MonthlyViewComponent', () => {
  let component: MonthlyViewComponent;
  let fixture: ComponentFixture<MonthlyViewComponent>;
  let ui : any;

  beforeEach(  () => {
      TestBed.configureTestingModule({
      declarations: [ MonthlyViewComponent ],
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
    fixture = TestBed.createComponent(MonthlyViewComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    let date: Date = new Date("2022-01-16");
    component.generateMonth(date); 
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('jumpButton').textContent).toEqual('Jump to Today');
    expect(ui.querySelector('tooltiptext').textContent).toEqual('Previous Month');
    expect(ui.querySelector('month-grid h4').textContent).toEqual('Sunday');
    expect(ui.querySelector('month-grid h4').textContent).toEqual('Monday');
    expect(ui.querySelector('month-grid h4').textContent).toEqual('Tuesday');
    expect(ui.querySelector('month-grid h4').textContent).toEqual('Wednesday');
    expect(ui.querySelector('month-grid h4').textContent).toEqual('Thursday');
    expect(ui.querySelector('month-grid h4').textContent).toEqual('Friday');
    expect(ui.querySelector('month-grid h4').textContent).toEqual('Saturday');
    expect(ui.querySelector('span').textContent).toEqual('Day Content');
    expect(ui.querySelector('tooltiptext').textContent).toEqual('Following Month');
    expect(ui.querySelector('span').textContent).toEqual('**Double click on any date to edit it in the daily view.**');
  })

  // it('should create a working jumpToToday() button') {
  // },
  

  // it('should set firstOfMonth variable to the correct date') {
  //   let firstDay : Date = new Date("2022-10-1");
  //   let firstOfMonth = 
  //   expect(firstOfMonth.toEqual(firstDay));
  // }
})