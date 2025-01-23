import { Injectable } from '@nestjs/common';
import { firebaseAuth, firestore, storage } from './firebase.config';

@Injectable()
export class FirebaseService {

  get firestore() {
    return firestore;
  }

  get auth() {
    return firebaseAuth;
  }

  get storage() {
    return storage;
  }
}
