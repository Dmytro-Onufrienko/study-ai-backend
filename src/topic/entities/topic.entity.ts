import { IBaseEntity } from "src/database/interfaces/base.entity";
import { DocumentReference } from "firebase/firestore";
import { ISubtopic } from "src/course/entities/subtopic.entity";

export interface ITopic extends IBaseEntity {
  name: string;
  subtopics: DocumentReference<ISubtopic>[];
}
