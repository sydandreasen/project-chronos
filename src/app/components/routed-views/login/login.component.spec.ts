import 'zone.js/dist/zone-testing'
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
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


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let ui : any;


  beforeEach(  () => {
      TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    let fb :  FormBuilder = new FormBuilder();
    // let router : Router = new Router();
    // let afAuth : AngularFireAuth = new AngularFireAuth();
    // let authService : AuthService = new AuthService();
    // let loginForm = new LoginComponent(fb, router, afAuth, authService);
    component.loginForm.get('username')?.setValue('asdf@gmail.com');
    component.loginForm.get('password')?.setValue('asdfasdf');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('p logtext').textContent).toEqual('Login');
    expect(ui.querySelector('p sutxt').textContent).toEqual('Don\'t have an account?');
    expect(ui.querySelector('p a').textContent).toEqual('Signup');
  }),

  it ('should show the login form', () => {
    expect(ui.loginForm.toBeTruthy());
  });

  it ('should login if username and password are a match in the database', () => {
    expect(ui.onLogin().toBeTruthy);
  })
});
