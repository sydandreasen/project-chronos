/**
 * AppComponent
 * houses high-level logic and provides a wrapper for the router outlet element
 * inside which other components are rendered
 */

import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';

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
   * an object filled with data from users.
   * populated through a subscription to the db
   */
  users = {};

  // TODO add logic so that people can't go to a route they aren't auth'd for

  // TODO when auth complete, change DB rules back to read and write false so that
  // read/write is only  allowed when auth completed and access is no longer public

  /**
   * initialization lifecycle function.
   * run necessary subscriptions to data.
   */
  ngOnInit() {
    // testing some initial DB setup:
    // subscribe to some data and let the variable contents change dynamically
    // get() is an option if only one snapshot in time of data is needed
    // also know that .child() calls can be used following .ref() to identify a path in the db
    let subscription = this.db.ref('users/');
    subscription.on('value', (snapshot) => {
      this.users = snapshot.val();
    });
    // write some data (overwriting)
    this.writeUserData('testUser1', 'SallyJean'); // change the name or path to see new data appear on refresh
    // update some data
    this.db
      .ref()
      .update({ 'users/testUser1/accountInfo/email': 'sallysEmail@gmail.com' }); // adds to SallyJean's info, but doesn't get rid of the property for her name
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
      (error) => {
        if (error) {
          console.log('error', error);
        } else {
          // success
        }
      }
    );
  }
}
