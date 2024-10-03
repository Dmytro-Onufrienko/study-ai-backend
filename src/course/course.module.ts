import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { DatabaseService } from 'src/database/database.service';
import { TopicModule } from 'src/topic/topic.module';
import { TopicService } from 'src/topic/topic.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService, DatabaseService, TopicService],
})
export class CourseModule {}
