import { IBaseEntity } from "src/database/interfaces/base.entity";
import { DocumentReference } from "firebase/firestore";
import { ITopic } from "src/topic/entities/topic.entity";

export interface ISubtopic extends IBaseEntity {
  name: string;
  material: string;
  topic: DocumentReference<ITopic>;
}