import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let ui : any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    let fb :  FormBuilder = new FormBuilder();
    let router : Router = new Router();
    let afAuth : AngularFireAuth = new AngularFireAuth();
    let authService : AuthService = new AuthService();
    let loginForm = new LoginComponent(fb, router, afAuth, authService);
    ui.loginForm.username = "asdf@gmail.com";
    ui.loginForm.password = "asdfasdf";
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
  })

  it ('should show the login form') {
    expect(ui.loginForm.toBeTruthy());
  }

  it ('should login if username and password are a match in the database') {
    expect(ui.onLogin().toBeTruthy);
  }
});
