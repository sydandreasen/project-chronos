import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/** a service that can be injected in any component to provide connections to
 * firebase while only initializing the app here
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  /** connection to real-time database */
  db;

  constructor(private afDatabase: AngularFireDatabase) {
    this.db = afDatabase.database;
  }
}
