import * as admin from 'firebase-admin';
import 'dotenv/config';
import { join } from 'path';

const serviceAccount = require(join(__dirname, '../../../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export default admin;