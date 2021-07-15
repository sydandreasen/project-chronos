import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let ui : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('p CreateAcctext').textContent).toEqual('Create an Acccount');
    expect(ui.querySelector('button').textContent).toEqual('Sign up');
    expect(ui.querySelector('p litxt').textContent).toEqual('Already have an account?');
    expect(ui.querySelector('p a').textContent).toEqual('Log In');
    
  })
});
