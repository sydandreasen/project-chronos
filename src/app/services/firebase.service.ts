import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  draggable,
  metric,
  task,
} from '../components/draggable/draggable.model';

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

  // FIXME figure out why index isn't always reliable if metric/task doesn't fill whole width
  /**
   * adjust all the indexes on the metrics/tasks in the day because they reordered them
   * @param uid user's id
   * @param date string representing the date
   * @param prevIdx the index where the moved one used to be
   * @param newIdx the index where the moved one should now be
   * @param allDraggablesInDay all the draggable options in the day
   */
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
    allDraggablesInDay.forEach((draggable: draggable) => {
      if (draggable.idx === prevIdx) {
        draggable.idx = newIdx;
        this.updateMetricOrTask(uid, date, draggable);
      } else if (
        draggable.idx >= Math.min(prevIdx, newIdx) &&
        draggable.idx <= Math.max(prevIdx, newIdx)
      ) {
        if (prevIdx < newIdx) {
          draggable.idx--;
        } else if (prevIdx > newIdx) {
          draggable.idx++;
        }
        this.updateMetricOrTask(uid, date, draggable);
      }
    });
  }

  /**
   * create a brand new metric or task in the db
   * @param uid  the user id
   * @param date a string representing the date to put the metric/task on
   * @param dragItem the item being dropped into the day
   * @param idx the index at which that item shall be dropped
   * @param allDraggablesInDay all the draggables already in the day before dropping this one
   */
  writeMetricOrTask(
    uid: string,
    date: string,
    dragItem: draggable,
    idx: number,
    allDraggablesInDay: Array<draggable>
  ): void {
    dragItem.idx = idx;
    let writeObj: { [key: string]: any } = {};
    writeObj.value = dragItem.value;
    writeObj.idx = dragItem.idx;

    // get id for metric or tasks, unique within the day
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

    allDraggablesInDay?.splice(dragItem.idx, 0, dragItem); // put it in the right place in the array of options
    this.updateMetricOrTask(uid, date, dragItem);
  }

  /**
   * update a single metric/task that's already been configured with whatever needs updating
   * @param uid user's id
   * @param date string representing date to save stuff under
   * @param dragItem the draggable item to be updated in the DB
   */
  updateMetricOrTask(uid: string, date: string, dragItem: draggable): void {
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
   * @param draggableType the draggable type, such as metric or task
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

  /** generate a unique ID for the metric or task */
  createUniqueID(): string {
    return (
      Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) + ''
    );
  }

  /**
   * update a metric's content after editing the label or input fields
   * @param uid the user id
   * @param date the dateString
   * @param metridId the metric's id
   * @param updateObj the draggable:value object; type metric
   */
  editMetric(
    uid: string,
    date: string,
    metricId: string,
    updateObj: metric
  ): void {
    let objWithVal = { value: updateObj };
    this.db
      .ref('users/' + uid + '/dates/' + date + '/metrics/' + metricId + '/')
      .update(objWithVal);
  }

  /** update a metric's content after editing the textarea or checkbox fields
   * @param uid the user id
   * @param date the dateString
   * @param taskId the task's id
   * @param updateObj the dragggable:value object; type task
   */
  editTask(uid: string, date: string, taskId: string, updateObj: task): void {
    let objWithVal = { value: updateObj };
    this.db
      .ref('users/' + uid + '/dates/' + date + '/tasks/' + taskId + '/')
      .update(objWithVal);
  }

  /**
   * set the font size in settings
   * @param uid the user's id
   * @param fontSize the customized font size
   */
  editFontSize(uid: string, fontSize: number) {
    this.db.ref('users/' + uid + '/settings/').update({ fontSize: fontSize });
  }

  /**
   * set the font family in settings
   * @param uid the user's id
   * @param fontFamily the customized font family
   */
  editFontFamily(uid: string, fontFamily: string) {
    this.db
      .ref('users/' + uid + '/settings/')
      .update({ fontFamily: fontFamily });
  }

  /**
   * set the font color in settings
   * @param uid the user's id
   * @param fontColor the customized font color
   */
  editFontColor(uid: string, fontColor: string) {
    this.db.ref('users/' + uid + '/settings/').update({ fontColor: fontColor });
  }
}
