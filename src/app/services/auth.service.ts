import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** whether a user is logged in */
  isAuthenticated: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.isAuthenticated = false; // to start

    this.afAuth.onAuthStateChanged((user) => {
      // subscribe
      this.isAuthenticated = !!user;
    });
  }

  /** signup a new user */
  signUp(email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['plan']);
      })
      .catch((error) => {
        alert(error);
      });
  }

  /** login an existing user */
  login(email: string, password: string): void {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['plan']);
      })
      .catch((error) => {
        alert(error);
      });
  }
}
