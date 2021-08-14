import 'zone.js/dist/zone-testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DailyViewComponent } from './components/planning-views/daily-view/daily-view.component';
import { LoginComponent } from './components/routed-views/login/login.component';
import { MonthlyViewComponent } from './components/planning-views/monthly-view/monthly-view.component';
import { NotFoundComponent } from './components/routed-views/not-found/not-found.component';
import { PlannerWrapperComponent } from './components/routed-views/planner-wrapper/planner-wrapper.component';
import { SignupComponent } from './components/routed-views/signup/signup.component';
import { WeeklyViewComponent } from './components/planning-views/weekly-view/weekly-view.component';



describe('AppComponent', () => {

  let fixture : ComponentFixture<AppComponent>;
  let ui : any;
  let component : AppComponent;


  beforeEach(  () => {
      TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, 
        DailyViewComponent,
        LoginComponent,
        MonthlyViewComponent,
        NotFoundComponent,
        PlannerWrapperComponent,
        SignupComponent,
        WeeklyViewComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    expect(ui.querySelector('header h1').textContent).toEqual('Project Chronos');
  })
});
