import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { draggable } from '../components/plannables/draggable/draggable.model';
import { UserDefaults } from './user-defaults';

/** a service that can be injected in any component to provide connections to
 * firebase while only initializing the app here
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  editColorFamily(uid: string, colorFamily: string) {
    throw new Error('Method not implemented.');
  }
  /** connection to real-time database */
  db;

  /** the user defaults to use to populate the foundation of a user in the db */
  defaults: UserDefaults = new UserDefaults();

  /** set up FirebaseService */
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
    updateObj[settingsPath] = this.defaults;
    // create accountInfo
    const accountInfoPath = 'users/' + uid + '/accountInfo';
    updateObj[accountInfoPath] = { email: user.email };

    // update
    this.db.ref().update(updateObj);
  }

  /**
   * complete any holes in user data with defaults
   * @param user the user information (as returned from auth -- not just the uid)
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
      const requiredSettings = Object.getOwnPropertyNames(this.defaults);
      requiredSettings.forEach((setting: string, index: number) => {
        if (!settings[setting]) {
          flag = true;
          const path = settingsPath + '/' + setting;
          updateObj[path] = Object.values(this.defaults)[index];
        }
      });
    } else {
      // settings don't exist. create all settings
      flag = true;
      updateObj[settingsPath] = this.defaults;
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
   * @param user the user information (as returned from auth, not just the uid)
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

  /**
   * adjust all the indexes on the planned objects in the day because they reordered them
   * @param uid user's id
   * @param date string representing the date
   * @param prevIdx the index where the moved one used to be
   * @param newIdx the index where the moved one should now be
   * @param allDraggablesInDay all the draggable options in the day
   */
  reorderPlannedObject(
    uid: string,
    date: string,
    prevIdx: number,
    newIdx: number,
    allDraggablesInDay: Array<draggable>
  ): void {
    allDraggablesInDay.forEach((draggable: draggable) => {
      if (draggable.idx === prevIdx) {
        // item from prevIdx should always go to newIdx
        draggable.idx = newIdx;
        this.updatePlannedObject(uid, date, draggable);
      } else if (
        // is this item between the indices touched by the dragged object?
        draggable.idx >= Math.min(prevIdx, newIdx) &&
        draggable.idx <= Math.max(prevIdx, newIdx)
      ) {
        if (prevIdx < newIdx) {
          // if prevIdx < newIdx, items between should decrease their idx by one
          draggable.idx--;
        } else if (prevIdx > newIdx) {
          // if prevIdx > newIdx, all items between should increase their idx by one
          draggable.idx++;
        }
        this.updatePlannedObject(uid, date, draggable);
      }
    });
  }

  /**
   * create a brand new planned object in the db
   * @param uid  the user id
   * @param date a string representing the date to put the planned object on
   * @param dragItem the item being dropped into the day
   * @param allDraggablesInDay all the draggables already in the day before dropping this one
   */
  writePlannedObject(
    uid: string,
    date: string,
    dragItem: draggable,
    allDraggablesInDay: Array<draggable>
  ): void {
    let writeObj: { [key: string]: any } = {};
    writeObj.value = dragItem.value;
    writeObj.idx = dragItem.idx;

    // get id for new planned object, unique within the day
    let usedIds: string[] = [];
    if (allDraggablesInDay) {
      allDraggablesInDay.forEach((dragItem: draggable) => {
        if (dragItem.id) {
          usedIds.push(dragItem.id);
        }
      });
    }
    let itemId: string = this.createUniqueID();
    while (usedIds.includes(itemId)) {
      // if happens to be non-unique, try to make a new one
      itemId = this.createUniqueID();
    }
    dragItem.id = itemId;

    this.updatePlannedObject(uid, date, dragItem);
  }

  /**
   * update a single planned object
   * @param uid user's id
   * @param date string representing date to save stuff under
   * @param dragItem the draggable item to be updated in the DB
   */
  updatePlannedObject(uid: string, date: string, dragItem: draggable): void {
    // use type and id from draggable to find path and
    // use idx and value from draggable to fill that path in the DB with data
    let updateObj: { [key: string]: any } = {};
    updateObj.idx = dragItem.idx;
    updateObj.value = dragItem.value;
    this.db
      .ref(
        'users/' +
          uid +
          '/dates/' +
          date +
          '/' +
          dragItem.type +
          's/' +
          dragItem.id +
          '/'
      )
      .update(updateObj);
  }

  /**
   * delete a draggable
   * @param uid the user's id
   * @param date the dateString
   * @param draggableType the draggable type
   * @param draggableId the id of the draggable to delete
   */
  deleteDraggable(
    uid: string,
    date: string,
    draggableType: string,
    draggableId: string
  ): void {
    this.db
      .ref(
        'users/' +
          uid +
          '/dates/' +
          date +
          '/' +
          draggableType +
          's/' +
          draggableId
      )
      .remove();
  }

  /** generate a unique ID for the planned object */
  createUniqueID(): string {
    return (
      Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) + ''
    );
  }

  /**
   * edit a single setting
   * @param uid the user's id
   * @param settingType the type of setting in the user's settings
   * @param settingValue the value to assign to the settingType in the db
   */
  editSingleSetting(uid: string, settingType: string, settingValue: any): void {
    let updateObj: { [key: string]: any } = {};
    updateObj[settingType] = settingValue;
    this.db.ref('users/' + uid + '/settings/').update(updateObj);
  }
}
