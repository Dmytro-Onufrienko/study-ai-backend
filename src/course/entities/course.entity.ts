import { IBaseEntity } from "src/database/interfaces/base.entity";
import { DocumentReference } from 'firebase/firestore';
import { ITopic } from "src/topic/entities/topic.entity";

export interface ICourse extends IBaseEntity {
  name: string;
  topics: DocumentReference<ITopic>[];
}
