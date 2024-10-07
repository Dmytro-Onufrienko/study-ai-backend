import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { DatabaseService } from 'src/database/database.service';
import { TopicService } from 'src/topic/topic.service';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { SubtopicService } from 'src/subtopic/subtopic.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [
    CourseService,
    DatabaseService,
    TopicService,
    OpenAiService,
    SubtopicService
  ],
})
export class CourseModule {}
