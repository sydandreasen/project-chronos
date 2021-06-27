import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

/** manage signup form and authentication process */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  /** the form that contains inputs for signing up */
  signupForm: FormGroup;

  /** the authentication instance from firebase. provided by FirebaseService */
  auth;

  /**
   * assign clas vars
   * @param fbService provides connections to firebase
   * @param formBuilder allows easy creation of the signup form group
   * @param router allows managing navigation logic in typescript
   */
  constructor(
    private fbService: FirebaseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.auth = fbService.auth;

    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      confirmUser: [
        null,
        [Validators.required, Validators.email, this.match('username')],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPass: [
        null,
        [Validators.required, Validators.minLength(6), this.match('password')],
      ],
    });
  }

  /** upon form submission (which can only happen when form is valid), pull username and password
   * and try to authenticate them as a new user. alert if error.
   */
  onSignup(): void {
    const email = this.signupForm.get('username')?.value;
    const password = this.signupForm.get('password')?.value;

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials.user);
        this.router.navigate(['plan']);
      })
      .catch((error) => {
        alert(error);
      });
  }

  /** a validator function for making sure inputs match the field they are confirming
   * @param fieldToMatch the field name in the form which the content of the tested field should match
   * @returns a validator function which either returns null if valid (matched what it was supposed to) or validation error
   */
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
