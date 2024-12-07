import { IsNotEmpty, IsString } from "class-validator";
import { DocumentReference } from "firebase/firestore";
import { IsFirestoreReference } from "src/firebase/validation";
import { ITopic } from "src/topic/entities/topic.entity";

export class CreateSubtopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsFirestoreReference()
  topic: DocumentReference<ITopic>;
}
