import { Firestore, addDoc, collection } from '@firebase/firestore';
import { Injectable } from '@nestjs/common';
import { firestoreDB } from 'src/firebase/config/firebase';
import { Collection } from './config/collections';
import { doc, DocumentData, DocumentReference, getDoc, getDocs, query, QueryFieldFilterConstraint, Timestamp, where } from 'firebase/firestore';
import { IBaseEntity } from './interfaces/base.entity';

@Injectable()
export class DatabaseService {
  private db: Firestore;

  constructor() {
    this.db = firestoreDB;
  }

  async create(collectionName: Collection, collectionData: any): Promise<DocumentReference<any, DocumentData>> {
    const currentDate = new Date();

    return await addDoc(
      this.getCollection(collectionName),
      {
        ...collectionData,
        createdAt: currentDate,
        updatedAt: currentDate
      }
    )
  }

  async getById<
    CollectionType extends IBaseEntity
  >(
    collectionName: Collection,
    documentId: string
  ): Promise<CollectionType> {
    return await this.getDoc<CollectionType>(collectionName, documentId);
  }

  async getAllByUserId<
    CollectionType extends IBaseEntity
  >(
    collectionName: Collection,
    userId: string
  ): Promise<CollectionType[]> {
    return await this.getMany(collectionName, [where('userId', '==', userId)]);
  }

  async getMany<
    CollectionType extends IBaseEntity
  >(
    collectionName: Collection,
    options: QueryFieldFilterConstraint[]
  ): Promise<CollectionType[]> {
    const q = query(this.getCollection(collectionName), ...options);
    const documentSnapshot = (await getDocs(q)).docs;

    return documentSnapshot.map(doc => {
      const {
        createdAt,
        updatedAt,
        ...otherData
      } = doc.data() as Omit<CollectionType, "id">;

      return {
        id: doc.id,
        ...otherData,
        createdAt: createdAt instanceof Timestamp ? createdAt.toDate() : createdAt,
        updatedAt: updatedAt instanceof Timestamp ? updatedAt.toDate() : updatedAt,
      } as CollectionType;
    });
  }

  async getDoc<
    CollectionType extends IBaseEntity
  >(
    collectionName: Collection,
    documentId: string
  ): Promise<CollectionType> {
    const docSnap = await getDoc(doc(this.getCollection(collectionName), documentId))

    if (docSnap.exists()) {
      const {
        createdAt,
        updatedAt,
        ...otherData
      } = { ...docSnap.data() } as Omit<CollectionType, "id">

      return {
        ...otherData,
        createdAt: createdAt instanceof Timestamp ? createdAt.toDate() : createdAt,
        updatedAt: updatedAt instanceof Timestamp ? updatedAt.toDate() : updatedAt,
        id: docSnap.id
      } as CollectionType;
    } else {
      throw new Error('Document not found');
    }
  }

  getDocRef<CollectionType extends IBaseEntity>(
    collectionName: Collection,
    documentId: string
  ): DocumentReference<CollectionType> {
    return doc(this.getCollection(collectionName), documentId) as DocumentReference<CollectionType>;
  }

  getCollection(collectionName: Collection) {
    return collection(this.db, collectionName)
  }
}
