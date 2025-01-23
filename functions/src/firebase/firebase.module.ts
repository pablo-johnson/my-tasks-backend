import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { firestore, firebaseAuth, storage } from './firebase.config';

@Module({
  providers: [
    FirebaseService,
    { provide: 'FIRESTORE_INSTANCE', useValue: firestore },
    { provide: 'FIREBASE_AUTH', useValue: firebaseAuth },
    { provide: 'FIREBASE_STORAGE', useValue: storage },
  ],
  exports: [FirebaseService, 'FIRESTORE_INSTANCE', 'FIREBASE_AUTH', 'FIREBASE_STORAGE'],
})
export class FirebaseModule {}
