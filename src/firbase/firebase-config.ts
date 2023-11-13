import * as admin from 'firebase-admin';
import { environment } from '@src/utils';

export const firebaseAdmin = admin.initializeApp({
   credential: admin.credential.cert(environment.firebaseConfig as admin.ServiceAccount)
});