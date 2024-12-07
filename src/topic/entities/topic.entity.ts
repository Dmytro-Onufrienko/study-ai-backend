import { IBaseEntity } from "src/database/interfaces/base.entity";
import { DocumentReference } from "firebase/firestore";
import { ISubtopic } from "src/course/entities/subtopic.entity";
import { ICourse } from "src/course/entities/course.entity";

export interface ITopic extends IBaseEntity {
  name: string;
  subtopics: DocumentReference<ISubtopic>[];
  course: DocumentReference<ICourse>;
}
