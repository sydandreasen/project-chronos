import { Component } from '@angular/core';
import firebase from 'firebase';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProjectChronos';

  fb = firebase.initializeApp(environment.firebase);
  db = this.fb.database();
  users = {};

  // TODO when auth complete, change DB rules back to read and write false so that
  // read/write is only  allowed when auth completed and access is no longer public

  ngOnInit() {
    // testing some initial DB setup:
    // subscribe to some data and let the variable contents change dynamically
    // get() is an option if only one snapshot in time of data is needed
    // also know that .child() calls can be used following .ref() to identify a path in the db
    var subscription = firebase.database().ref('users/');
    subscription.on('value', (snapshot) => {
      this.users = snapshot.val();
    });
    // write some data (overwriting)
    writeUserData('testUser1', 'SallyJean'); // change the name or path to see new data appear on refresh
    // update some data
    this.db
      .ref()
      .update({ 'users/testUser1/accountInfo/email': 'sallysEmail@gmail.com' }); // adds to SallyJean's info, but doesn't get rid of the property for her name
  }
}

// set() will OVERWRITE the data at the given path with the data specified
// note that both set() and update() allow a second parameter callback function where you can handle an error
// to delete data instead of write data, call remove() on a reference
export function writeUserData(userId: string, name: string) {
  firebase
    .database()
    .ref('users/' + userId + '/accountInfo')
    .set(
      {
        name: name,
      },
      (error : any) => {
        if (error) {
          console.log('error', error);
        } else {
          console.log('set was successful!');
        }
      }
    );
}
