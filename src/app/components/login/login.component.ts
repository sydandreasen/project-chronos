import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

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
   * create instance of login component
   * @param formBuilder allows to create form group easily
   * @param router allows to manage URL navigation logic in TypeScript
   * @param afAuth allows handling of Angular Firebase Authentication
   * @param authService connects to login logic
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
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
    this.authService.login(email, password);
  }
}
