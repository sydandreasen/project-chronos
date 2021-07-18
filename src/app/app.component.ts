/**
 * AppComponent
 * houses high-level logic and provides a wrapper for the router outlet element
 * inside which other components are rendered
 */

import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * database instance for CRUD operations to be run on.
   * provided by fbService
   */
  db;

  /**
   *
   * @param fbService provides instances of firebase
   * connections like the db
   */
  constructor(private fbService: FirebaseService) {
    this.db = fbService.db;
  }

  /**
   * set name data for a user id
   * @param userId the user id to map to in the db
   * @param name the name to save to the user id's name field
   */
  // set() will OVERWRITE the data at the given path with the data specified
  // note that both set() and update() allow a second parameter callback function where you can handle an error
  // to delete data instead of write data, call remove() on a reference
  writeUserData(userId: string, name: string): void {
    this.db.ref('users/' + userId + '/accountInfo').set(
      {
        name: name,
      },
      (error: any) => {
        if (error) {
          console.log('error', error);
        } else {
          // success
        }
      }
    );
  }
}
