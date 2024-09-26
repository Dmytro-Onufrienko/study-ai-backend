import { Firestore, addDoc, collection } from '@firebase/firestore';
import { Injectable } from '@nestjs/common';
import { firestoreDB } from 'src/firebase/config/firebase';
import { Collection } from './config/collections';

@Injectable()
export class DatabaseService {
  private db: Firestore;

  constructor() {
    this.db = firestoreDB;
  }
  create(collectionName: Collection, collectionData: any) {
    return addDoc(collection(this.db, collectionName), collectionData)
  }
}
