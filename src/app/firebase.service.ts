import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import firebase from 'firebase';

/** a service that can be injected in any component to provide connections to
 * firebase while only initializing the app here
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  /** firebase app connection */
  fb = firebase.initializeApp(environment.firebase);

  /** connection to real-time database */
  db = this.fb.database();

  /** connection to authentication */
  auth = this.fb.auth();
}
