import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  auth;

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

  ngOnInit(): void {}

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
