import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fbService: FirebaseService
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user?.uid) {
        this.fbService.checkExistingUser(user);
        this.uid = user.uid;
      }
    });
  }

  /** getter for user's uid */
  getUID(): string {
    return this.uid;
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
