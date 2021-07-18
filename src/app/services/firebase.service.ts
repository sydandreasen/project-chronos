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

  /**
   * create brand new user with all default data
   * @param user the user information
   */
  createNewUserEntry(user: { [key: string]: any }): void {
    const uid = user.uid;
    // add uid to users
    // create settings
    const settingsPath = 'users/' + uid + '/settings';
    let updateObj: { [key: string]: any } = {};
    updateObj[settingsPath] = {
      fontColor: 'blue',
      fontFamily: 'Roboto',
      fontSize: 14,
    };
    // create accountInfo
    const accountInfoPath = 'users/' + uid + '/accountInfo';
    updateObj[accountInfoPath] = { email: user.email };

    // update
    this.db.ref().update(updateObj);
  }

  /**
   * complete any holes in user data with defaults
   * @param user the user information
   */
  completeExistingUser(
    user: { [key: string]: any },
    userData: { [key: string]: any }
  ): void {
    let updateObj: { [key: string]: any } = {};
    const uid = user.uid;
    let flag: boolean = false;
    // check settings
    const settingsPath = 'users/' + uid + '/settings';
    if (userData.settings) {
      // settings exist
      const settings = userData.settings;
      if (!settings.fontColor) {
        // fontColor missing
        flag = true;
        const colorPath = settingsPath + '/fontColor';
        updateObj[colorPath] = 'blue';
      }
      if (!settings.fontFamily) {
        // fontFamily missing
        flag = true;
        const famPath = settingsPath + '/fontFamily';
        updateObj[famPath] = 'Roboto';
      }
      if (!settings.fontSize) {
        // fontSize missing
        flag = true;
        const sizePath = settingsPath + '/fontSize';
        updateObj[sizePath] = 14;
      }
    } else {
      // settings don't exist. create all settings
      flag = true;
      updateObj[settingsPath] = {
        fontColor: 'blue',
        fontFamily: 'Roboto',
        fontSize: 14,
      };
    }
    // check account info
    const accountInfoPath = 'users/' + uid + '/accountInfo';
    if (userData.accountInfo) {
      const info = userData.accountInfo;
      if (!info.email) {
        // email missing
        flag = true;
        const emailPath = accountInfoPath + '/email';
        updateObj[emailPath] = user.email;
      }
    } else {
      // account info doesn't exist. create all
      flag = true;
      updateObj[accountInfoPath] = { email: user.email };
    }

    if (flag) {
      // update
      this.db.ref().update(updateObj);
    }
  }

  /**
   * a user is authenticated... are they new? does their DB content just need to be checked for holes?
   * @param user the user information
   */
  checkExistingUser(user: { [key: string]: any }): void {
    const uid = user.uid;
    this.db.ref('users/').once('value', (snapshot) => {
      const db = snapshot.val();
      if (db[uid]) {
        // user already exists
        this.completeExistingUser(user, db[uid]);
      } else {
        // create a brand new user
        this.createNewUserEntry(user);
      }
    });
  }
}
