/**
 * AuthGuard
 *
 * used to protect certain url endpoints from being accessed by unauthenticated users
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * inject services
   * @param router allows managing  routes
   * @param afAuth for access to auth
   */
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  /** control redirect to login or if someone should be allowed to the route they're trying to access
   * @param route
   * @param state
   * @returns promise of whether they're allowed to the route or not
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}
