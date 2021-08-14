/**
 * AuthService
 *
 * handles authentication state, distributing of the user id, and logging in/signing up users
 */

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** the users id */
  uid: string = '';

  /**
   * create injections and subscription to auth state change
   * @param router reference to router service
   * @param afAuth reference to angular fire auth service
   * @param fbService referenc to custom firebase service
   */
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

  /** getter for user's uid
   * @returns the user's id
   */
  getUID(): string {
    return this.uid;
  }

  /** signup a new user
   * @param email the user email to use
   * @param password the user password to use
   */
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

  /** login an existing user
   * @param email the user email to use
   * @param password the user password to use
   */
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
