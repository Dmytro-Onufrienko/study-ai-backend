import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { DatabaseService } from 'src/database/database.service';
import { SubtopicService } from 'src/subtopic/subtopic.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, DatabaseService, SubtopicService],
})
export class TopicModule {}
