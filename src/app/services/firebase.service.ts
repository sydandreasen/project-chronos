import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { draggable } from '../components/draggable/draggable.model';

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

  // TODO add docs
  reorderMetricOrTask(
    uid: string,
    date: string,
    prevIdx: number,
    newIdx: number,
    allDraggablesInDay: Array<draggable>
  ) {
    // item from prevIdx should always go to newIdx
    // if prevIdx > newIdx, all items previously at idx of newIdx or greater and less than prevIdx should increase their idx by one
    // if prevIdx < newIdx, items between should decrease their idx by one

    console.log(JSON.stringify(allDraggablesInDay));
    allDraggablesInDay.forEach((draggable: draggable) => {
      if (draggable.idx === prevIdx) {
        {
          draggable.idx = newIdx;
        }
      } else if (
        draggable.idx >= Math.min(prevIdx, newIdx) &&
        draggable.idx <= Math.max(prevIdx, newIdx)
      ) {
        if (prevIdx < newIdx) {
          draggable.idx--;
        } else if (prevIdx > newIdx) {
          draggable.idx++;
        }
      }
    });
    console.log(JSON.stringify(allDraggablesInDay));

    // maybe try to use dayOptions and just use all and then update each of those where needed

    // use safe operators in case no metrics and/or tasks for day
    // work on metrics

    // work on tasks
  }

  // TODO add docs
  writeMetricOrTask(
    uid: string,
    date: string,
    dragItem: draggable,
    idx: number,
    allDraggablesInDay: Array<draggable>
  ): void {
    // TODO, depending on where placed, might need to update indexes for others. possibly call reorder method after just creating the one?
    dragItem.idx = idx;
    let writeObj: { [key: string]: any } = {};
    writeObj.value = dragItem.value; // FIXME
    writeObj.idx = dragItem.idx;

    // get id for metric or tasks, unique within the day
    let usedIds: string[] = [];
    allDraggablesInDay.forEach((dragItem: draggable) => {
      if (dragItem.id) {
        usedIds.push(dragItem.id);
      }
    });
    let itemId: string = this.createUniqueID();
    while (usedIds.includes(itemId)) {
      // if happens to be non-unique, try to make a new one
      itemId = this.createUniqueID();
    }
    dragItem.id = itemId;

    allDraggablesInDay.splice(dragItem.idx, 0, dragItem); // put it in the right place in the array of options

    // use update()
    this.db
      .ref(
        'users/' +
          uid +
          '/dates/' +
          date +
          '/' +
          dragItem.type +
          's/' +
          itemId +
          '/'
      )
      .update(writeObj);
  }

  createUniqueID(): string {
    return (
      Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) + ''
    );
  }
}
