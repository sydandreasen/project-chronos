import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() fb: any = null;

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: [null, Validators.required],
      confirmUser: [null, [Validators.required, this.match('username')]],
      password: [null, Validators.required],
      confirmPass: [null, [Validators.required, this.match('password')]],
    });
  }

  ngOnInit(): void {}

  onSignup(): void {
    const email = this.signupForm.get('username')?.value;
    const password = this.signupForm.get('password')?.value;

    // this.router.navigate(['plan']);
  }

  match(fieldToMatch: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      const valueToMatch = this.signupForm?.get(fieldToMatch)?.value;
      return val === valueToMatch
        ? null
        : { mismatch: val + " doesn't match " + valueToMatch };
    };
  }
}
