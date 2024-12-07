import { IsArray, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
import { DocumentReference } from "firebase/firestore";
import { ICourse } from "src/course/entities/course.entity";
import { IsFirestoreReference } from "src/firebase/validation";

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({each: true})
  @IsNotEmptyObject()
  subtopics: string[];

  @IsNotEmpty()
  @IsFirestoreReference()
  course: DocumentReference<ICourse>;
}
