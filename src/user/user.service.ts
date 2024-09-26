import { Injectable } from '@nestjs/common';
import admin from 'src/firebase/config/firebase-admin';

@Injectable()
export class UserService {
  async getCurrentUser(uid: string) {
    const userRecord = await admin.auth().getUser(uid);
    
    return userRecord;
  }
}
