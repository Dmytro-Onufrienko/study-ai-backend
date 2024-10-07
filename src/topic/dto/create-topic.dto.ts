import { DocumentReference } from "firebase/firestore";
import { ICourse } from "src/course/entities/course.entity";

export class CreateTopicDto {
  name: string;
  subtopics: string[];
}
