import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubtopicMaterialDto {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsString()
  @IsNotEmpty()
  topicName: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}