import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * @param router allows managing  routes
   * @param afAuth for access to auth
   */
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          alert(
            "Access denied :( We're redirecting you back to the login screen."
          );
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}