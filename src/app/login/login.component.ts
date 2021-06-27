import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
/**
 * shows/manages the login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * form to manage login. containing username and password
   */
  loginForm: FormGroup;

  /**
   * authentication instance from firebase.
   * provided by FirebaseService.
   */
  auth;

  /**
   * create instance of login component
   * @param fbService provides connections to firebase
   * @param formBuilder allows to create form group easily
   * @param router allows to manage URL navigation logic in TypeScript
   */
  constructor(
    private fbService: FirebaseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.auth = fbService.auth;

    this.loginForm = formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * grab credentials from form upon login form submission and attempt
   * logging them in via firebase authentication. if fail, alert the error.
   */
  onLogin(): void {
    const email = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials.user);
        this.router.navigate(['plan']);
      })
      .catch((error) => {
        alert(error);
      });
  }
}
