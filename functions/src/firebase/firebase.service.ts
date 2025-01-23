import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIRESTORE_INSTANCE') private readonly firestoreInstance: any,
    @Inject('FIREBASE_AUTH') private readonly authInstance: any,
    @Inject('FIREBASE_STORAGE') private readonly storageInstance: any,
  ) {}

  get firestore() {
    return this.firestoreInstance;
  }

  get auth() {
    return this.authInstance;
  }

  get storage() {
    return this.storageInstance;
  }
}
