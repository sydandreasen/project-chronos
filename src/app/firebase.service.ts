import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  fb = firebase.initializeApp(environment.firebase);
  db = this.fb.database();
  auth = this.fb.auth();

  constructor() {}
}
