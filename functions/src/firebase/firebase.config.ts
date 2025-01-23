import * as admin from 'firebase-admin';

const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<your-database-url>.firebaseio.com',
});

export const firebaseAuth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();